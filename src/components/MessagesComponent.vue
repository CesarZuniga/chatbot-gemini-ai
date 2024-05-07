<template>
  <div class="q-pa-md row justify-center full-width">
    <div style="width: 100%">
      <template v-for="msg in value" v-bind:key="msg">
        <q-chat-message
          v-if="msg.send"
          :avatar="user?.photoURL || undefined"
          :name="user?.displayName || undefined"
          sent
          bg-color="teal-1"
        >
          <div v-html="msg.text"></div>
        </q-chat-message>
        <q-chat-message
          v-else
          avatar="logo.png"
          :name="'Gemini'"
          bg-color="blue-grey-1"
          text-color=""
        >
          <!-- <VMarkdownView :content="msg.text"> </VMarkdownView> -->
          <q-markdown :src="msg.text"></q-markdown>
          <q-inner-loading
            v-if="msg.loading"
            :showing="msg.loading"
          ></q-inner-loading>
        </q-chat-message>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCurrentUser } from 'vuefire';
import { Message } from './models';
import { QMarkdown } from 'quasar-ui-qmarkdown-v2';
import 'quasar-ui-qmarkdown-v2/dist/index.css';
const user = useCurrentUser();
const props = defineProps({
  // v-model
  messages: {
    type: Array<Message>,
    default: [],
  },
});

const value = computed(() => {
  return props.messages;
});
</script>

<style scoped lang="scss">
:deep(th) {
  border: solid 0.5px lightgray;
}
:deep(td) {
  border: solid 0.5px lightgray;
}
</style>
