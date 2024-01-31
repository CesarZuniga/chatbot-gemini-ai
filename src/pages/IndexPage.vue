<template>
  <q-page class="row q-pb-none items-center justify-evenly">
    <q-scroll-area ref="scroll" style="height: 60vh; width: 85vw;">
      <MessagesComponentVue :messages="msgs"></MessagesComponentVue>
    </q-scroll-area>
    <!-- <q-input :disable="msgs.some(x => x.loading)" @keyup.enter="addMsg()" class="row col-10" dense outlined autogrow
      type="textarea" rounded v-model="text" label="Escribe un mensaje" counter style="resize: none;">
      <template v-slot:after>
        <q-btn :disable="msgs.some(x => x.loading)" @click="addMsg" round dense flat icon="send" />
      </template>
    </q-input> -->
    <q-editor placeholder="Escribe un mensaje..." :toolbar="[['send']]" max-height="7rem"
      :disable="msgs.some(x => x.loading)" @keyup.enter="addMsg()" class="q-pt-none row col-10" v-model="text"
      min-height="7rem">
      <template v-slot:send>
        <q-btn :disable="msgs.some(x => x.loading)" @click="addMsg" round dense flat icon="send" style="" />

      </template>
    </q-editor>
  </q-page>
</template>

<script setup lang="ts">
import MessagesComponentVue from 'src/components/MessagesComponent.vue';
import { onMounted, ref } from 'vue';
import { Message } from 'src/components/models';
import { QScrollArea } from 'quasar';
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const text = ref('');
const scroll = ref(QScrollArea);
const msgs = ref(new Array<Message>())
onMounted(() => {
  if (sessionStorage.getItem('messages')) {
    msgs.value = JSON.parse(sessionStorage.getItem('messages') || '');
  }
});
function addMsg() {
  if (msgs.value.some(x => x.loading)) {
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
    sendMsg()
  }
}
function sendMsg() {

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  let history = new Array<Message>;
  history = [...msgs.value];
  if (history.length > 1) {
    history.splice(history.length - 1, 1);
    history.splice(history.length - 1, 1);
  }

  const chat = model.startChat({
    history: history?.map(h => { return { role: h.send ? 'user' : 'model', parts: h.text }; }),
    generationConfig: {
      //maxOutputTokens: 100,
    },
  });
  const msg = msgs.value[msgs.value.length - 2].text;
  chat.sendMessage(`responde solamente en formato html no markdown: ${msg}`).then(result => {
    if (msgs.value.some(x => x.loading)) {
      let response = result.response.text();
      for (let index = 0; index < response.length; index++) {
        response = response.replace('\n', '');
        response = response.replace('`', '');
        response = response.replace('html', '');
      }
      const index = msgs.value.findIndex(x => x.loading);
      msgs.value[index].loading = false;
      msgs.value[index].text = response
      sessionStorage.setItem('messages', JSON.stringify(msgs.value));
    }
  }).catch(() => {
    if (msgs.value.some(x => x.loading)) {
      const index = msgs.value.findIndex(x => x.loading);
      msgs.value[index].loading = false;
      sessionStorage.setItem('messages', JSON.stringify(msgs.value));
    }
  });
}
</script>
<style scoped  lang="scss">
textarea {
  resize: none !important;
}

:deep(.q-editor__toolbars-container) {
  position: absolute;
  left: 85%;
  padding: 4.4rem;
}
</style>
