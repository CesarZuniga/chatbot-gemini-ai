<template>
  <q-card class=" row no-shadow" bordered>
    <q-card-section class="col-12 text-center q-pa-lg">

      <q-btn @click="openGithub" icon="mdi-github" flat dense color="grey-8"></q-btn>
      <!-- <q-btn icon="mdi-facebook" flat dense color="grey-8"></q-btn>
      <q-btn icon="mdi-twitter" flat dense color="grey-8"></q-btn>
      <q-btn icon="mdi-instagram" flat dense color="grey-8"></q-btn> -->


      <div class="text-body1 q-mt-sm text-grey-8 text-weight-bold">
        © {{ new Date().getFullYear() }} Chatboot AI, Inc. All rights reserved.
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
function openGithub() {
  window.open('https://github.com/CesarZuniga/chatbot-gemini-ai')
}
</script>

<style scoped></style>
