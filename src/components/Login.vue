<script setup lang="ts">
  import { ref } from "vue";
  import { Auth } from '@aws-amplify/auth';
  import { useUserStore } from '../stores/user';

  const { setUser } = useUserStore()
  const username = ref('')
  const password = ref('')
  const login = async () => {
    try {
      const user = await Auth.signIn(username.value, password.value)
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        Auth.completeNewPassword(
            user,               // the Cognito User Object
            'testingtesting',       // the new password
            // OPTIONAL, the required attributes
            {
              email: 'xxxx@example.com',
            }
        ).then(user => {
          // at this time the user is logged in if no MFA required
          console.log(user);
        }).catch(e => {
          console.log(e);
        });
      }

      console.log('user', user, user.challengeParam)
      setUser(user)
      // Auth
      //     .currentAuthenticatedUser({ bypassCache: false })
      //     .then(user => setUser(user))
      //     .catch(err => console.log(err));
    } catch (e) {
      console.error(e)
    }
  }
</script>

<template>
  <input type="text" placeholder="Username" v-model="username">
  <input type="password" placeholder="Password" v-model="password">
  <button @click="login">Login</button>
</template>

<style scoped>

</style>