<script setup lang="ts">
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
    <input v-model="credentials.email" type="email" placeholder="Email">
    <input v-model="credentials.password" type="password" placeholder="Password">
    <button type="submit">Login</button>
  </form>
</template>
