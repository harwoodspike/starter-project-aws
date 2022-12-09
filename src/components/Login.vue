<script setup lang="ts">
  import { ref } from "vue";
  import { useUserStore } from '../stores/user';

  const { signIn } = useUserStore()
  const username = ref('')
  const password = ref('')
</script>

<template>
  <input type="text" placeholder="Username" v-model="username">
  <input type="password" placeholder="Password" @keyup.enter="signIn(username, password)" v-model="password">
  <button @click="signIn(username, password)">Login</button>
</template>

<style scoped>

</style>