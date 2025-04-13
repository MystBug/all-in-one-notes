<script setup lang="ts">
import { z } from "zod";

const { loggedIn, fetch: refreshSession } = useUserSession()
const credentials = reactive({
  email: '',
  password: '',
})

if (loggedIn.value) navigateTo('/')

async function login() {
  $fetch('/api/login', {
    method: 'POST',
    body: credentials
  })
    .then(async () => {
      // Refresh the session on client-side and redirect to the home page
      await refreshSession()
      await navigateTo('/')
    })
    .catch(() => alert('Bad credentials'))
}
</script>

<template>
  <form @submit.prevent="login">
    <UInput v-model="credentials.email" type="email" placeholder="Email" />
    <UInput v-model="credentials.password" type="password" placeholder="Password" />
    <UButton type="submit">Login</UButton>
  </form>
</template>
