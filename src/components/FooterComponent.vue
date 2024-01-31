<template>
  <q-card-section class="col-12 text-center q-pb-xs q-pt-xs">

    <q-btn @click="openGithub" icon="mdi-github" flat dense></q-btn>
    <!-- <q-btn icon="mdi-facebook" flat dense color="grey-8"></q-btn>
      <q-btn icon="mdi-twitter" flat dense color="grey-8"></q-btn>
      <q-btn icon="mdi-instagram" flat dense color="grey-8"></q-btn> -->


    <div class=" q-mt-sm  text-bold">
      © {{ new Date().getFullYear() }} DigiTech, Inc. All rights reserved.
    </div>
  </q-card-section>
</template>

<script setup>
function openGithub() {
  window.open('https://github.com/CesarZuniga/chatbot-gemini-ai')
}
</script>

<style scoped></style>
