<template>
  <div class="q-pa-md row justify-center full-width">
    <div style="width: 100%; ">
      <template v-for=" msg in value" v-bind:key="msg">
        <q-chat-message v-if="msg.send" :avatar="user?.photoURL || undefined" :name="user?.displayName || undefined" sent
          bg-color="teal-1">
          <div v-html="msg.text"></div>
        </q-chat-message>
        <q-chat-message v-else avatar="logo.png" :name="'Gemini'" bg-color="blue-grey-1" text-color="">
          <q-spinner-dots v-if="msg.loading" size="2rem" />
          <vue-markdown v-else :source="msg.text" />
        </q-chat-message>
      </template>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useCurrentUser } from 'vuefire'
import { Message } from './models';
import VueMarkdown from 'vue-markdown-render'
const user = useCurrentUser();
const props = defineProps({
  // v-model
  messages: {
    type: Array<Message>,
    default: [],
  },
});

const value = computed(
  () => {
    return props.messages;
  }
);

</script>

<style scoped lang="scss"></style>
