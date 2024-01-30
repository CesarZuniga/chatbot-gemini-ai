<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar size="60px">
          <img style="border-radius: 100px;" src="logo.png">
        </q-avatar>
        <q-toolbar-title>
          Chatboot AI
        </q-toolbar-title>
        <q-space />
        <q-btn round flat>
          <q-avatar size="26px">
            <img :src="currentUser?.photoURL || 'profile.svg'">
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-card class="text-center q-pa-lg">
                <q-avatar>
                  <img style="border-radius: 100px;" :src="currentUser?.photoURL || 'profile.svg'">
                </q-avatar>
                <q-item-label :lines="1" class="text-bold q-pt-lg ">
                  {{ currentUser?.displayName }}
                </q-item-label>
                <q-item-label caption :lines="1" class="text-bold q-pb-sm">
                  {{ currentUser?.email }}
                </q-item-label>

                <q-card-actions align="center">
                  <q-btn @click="signOutUser" label="Cerrar sesión" outline dense class="text-accent"></q-btn>
                </q-card-actions>

              </q-card>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <FooterComponent></FooterComponent>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import FooterComponent from 'src/components/FooterComponent.vue';
const router = useRouter();
const currentUser = ref(getAuth().currentUser)
onMounted(() => {
  currentUser.value = getAuth().currentUser;
});
const signOutUser = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    router.push('/login');
  });
};

</script>
