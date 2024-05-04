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
          <vue-markdown :source="msg.text">
            <q-inner-loading :showing="msg.loading"></q-inner-loading
          ></vue-markdown>
        </q-chat-message>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCurrentUser } from 'vuefire';
import { Message } from './models';
import VueMarkdown from 'vue-markdown';
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
