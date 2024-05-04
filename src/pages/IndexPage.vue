<template>
  <q-page class="row q-pb-none items-center justify-evenly">
    <q-scroll-area ref="scroll" style="height: 60vh; width: 85vw">
      <MessagesComponentVue :messages="msgs"></MessagesComponentVue>
    </q-scroll-area>
    <!-- <q-input :disable="msgs.some(x => x.loading)" @keyup.enter="addMsg()" class="row col-10" dense outlined autogrow
      type="textarea" rounded v-model="text" label="Escribe un mensaje" counter style="resize: none;">
      <template v-slot:after>
        <q-btn :disable="msgs.some(x => x.loading)" @click="addMsg" round dense flat icon="send" />
      </template>
    </q-input> -->
    <q-editor
      style="border-radius: 20px"
      ref="editor"
      placeholder="Escribe un mensaje..."
      :toolbar="[['send']]"
      max-height="6rem"
      :disable="msgs.some((x) => x.loading)"
      @keyup.enter="addMsg()"
      class="q-pt-none q-mb-sm row col-10"
      v-model="text"
      min-height="6rem"
    >
      <template v-slot:send>
        <q-btn
          :disable="msgs.some((x) => x.loading)"
          @click="addMsg"
          round
          dense
          flat
          icon="send"
          style=""
        />
      </template>
    </q-editor>
    <q-footer reveal>
      <FooterComponent></FooterComponent>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import MessagesComponentVue from 'src/components/MessagesComponent.vue';
import { onMounted, ref } from 'vue';
import { Message } from 'src/components/models';
import { QEditor, QScrollArea } from 'quasar';
import { GoogleGenerativeAI } from '@google/generative-ai';
import FooterComponent from 'src/components/FooterComponent.vue';
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const text = ref('');
const editor = ref(QEditor);
const scroll = ref(QScrollArea);
const msgs = ref(new Array<Message>());
onMounted(() => {
  if (sessionStorage.getItem('messages')) {
    msgs.value = JSON.parse(sessionStorage.getItem('messages') || '');
  }
  editor.value?.focus();
});
async function addMsg() {
  if (msgs.value.some((x) => x.loading)) {
    return;
  }
  if (text.value && text.value.trim()) {
    const send: Message = { text: text.value, send: true, loading: false };
    msgs.value.push(send);
    const recive: Message = { text: '', send: false, loading: true };
    msgs.value.push(recive);
    text.value = '';
    scroll.value?.setScrollPosition('vertical', msgs.value.length * 1000, 500);
    sessionStorage.setItem('messages', JSON.stringify(msgs.value));
    await sendMsg();
  }
}
async function sendMsg() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  let history = new Array<Message>();
  history = [...msgs.value];
  if (history.length > 1) {
    history.splice(history.length - 1, 1);
    history.splice(history.length - 1, 1);
  }

  const chat = model.startChat({
    history: history?.map((h) => {
      return { role: h.send ? 'user' : 'model', parts: h.text };
    }),
    generationConfig: {
      //maxOutputTokens: 100,
    },
  });
  const msg = msgs.value[msgs.value.length - 2].text;
  try {
    const result = await chat.sendMessageStream(
      `responde solamente en formato markdown si presenta error el formato markdown por favor corrigelo: ${msg}`
    );
    if (msgs.value.some((x) => x.loading)) {
      const index = msgs.value.findIndex((x) => x.loading);
      for await (const chuck of result.stream) {
        const content = chuck.text();
        msgs.value[index].text += content;
        scroll.value?.setScrollPosition(
          'vertical',
          msgs.value.length * 1000,
          500
        );
      }
      //let response = result.response.text();

      msgs.value[index].loading = false;

      sessionStorage.setItem('messages', JSON.stringify(msgs.value));
      editor.value?.focus();
    }
  } catch (error) {
    if (msgs.value.some((x) => x.loading)) {
      const index = msgs.value.findIndex((x) => x.loading);
      msgs.value[index].loading = false;
      sessionStorage.setItem('messages', JSON.stringify(msgs.value));
      editor.value?.focus();
    }
  }
}
</script>
<style scoped lang="scss">
textarea {
  resize: none !important;
}

:deep(.q-editor__toolbars-container) {
  .q-editor__toolbar {
    border: none;
  }

  position: absolute;
  margin-left: 80%;
  padding-top: 3.4rem;

  @media only screen and (max-width: 480px) {
    margin-left: 73%;
  }

  @media only screen and (max-width: 698px) and (min-width: 481px) {
    margin-left: 76%;
  }

  @media only screen and (max-width: 960px) and (min-width: 699px) {
    margin-left: 78%;
  }
}
</style>
