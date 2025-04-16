<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
const { credentials } = storeToRefs(store)
const pwd = ref('')

async function login() {
  store.fetchUser(pwd.value)
}
</script>

<template>
  <form @submit.prevent="login">
    <UInput v-model="credentials.email" autofocus type="email" placeholder="Email" />
    <UInput v-model="pwd" type="password" placeholder="Password" />
    <UButton type="submit">Login</UButton>
  </form>
</template>
