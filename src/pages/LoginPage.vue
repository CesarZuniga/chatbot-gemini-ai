<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '80%' } : { 'width': '30%' }">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Iniciar Sesión
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <!-- <q-form class="q-gutter-md">
              <q-input filled v-model="username" label="Username" lazy-rules />

              <q-input type="password" filled v-model="password" label="Password" lazy-rules />


            </q-form> -->
          </q-card-section>
          <q-card-actions align="center">
            <!-- <q-btn dense fab-mini label="Iniciar Sesión" to="/" type="button" color="primary" class="col-5" /> -->
            <q-btn glossy dense fab-mini outline color="primary" class="col-5" @click="loginGoogle">
              <template v-slot>
                <q-icon name="mdi-google" color="blue"></q-icon>
                <q-item-label class="q-pt-xs text-h6 text-bold text-red">o</q-item-label>
                <q-item-label class="text-h6 text-bold text-yellow">o</q-item-label>
                <q-item-label class="text-h6 text-bold text-blue">g</q-item-label>
                <q-item-label class="text-h6 text-bold text-green">l</q-item-label>
                <q-item-label class="text-h6 text-bold text-red">e</q-item-label>
              </template>

            </q-btn>

          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

function loginGoogle() {
  const user = getAuth().currentUser;
  console.log(user);
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider).then(
    () => {
      router.push({ path: '/' });
    }
  ).catch();
}
onMounted(() => {
  if (getAuth().currentUser) {
    router.push({ path: '/' });
  }
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, rgba(15, 23, 42, 0.89) 5%, #dd4b39 100%);
}
</style>
