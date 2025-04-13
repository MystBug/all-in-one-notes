<script lang="ts" setup>
const { clear: clearSession, loggedIn } = useUserSession()

const logout = async () => {
  await clearSession()
  await navigateTo('/login')
  console.log('logging out?')
}
</script>

<template>
  <button v-if="loggedIn" @click="logout">Logout</button>
</template>