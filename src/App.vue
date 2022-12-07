<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { useUserStore } from './stores/user';
import { storeToRefs } from "pinia";
import Login from "./components/Login.vue";
import { Auth } from '@aws-amplify/auth';

const  { user } = storeToRefs(useUserStore())
const  { setUser } = useUserStore()

Auth
    .currentAuthenticatedUser({ bypassCache: false })
    .then(user => setUser(user))
    .catch(err => console.log(err));

import { Hub } from 'aws-amplify';

Hub.listen('auth', ({ payload }) => {
  const { event } = payload;
  if (event === 'autoSignIn') {
    setUser(payload.data)

  } else if (event === 'autoSignIn_failure') {
    // redirect to sign in page
  }
})
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div v-if="user">
    Logged In<br />
  </div>
  <div v-else>
    Not Logged In<br />
    <Login />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
