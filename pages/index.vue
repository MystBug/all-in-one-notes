<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})

const { user } = useUserSession()
</script>

<template>
  <div>
    <h1>Welcome {{ user?.name }}</h1>
    <NuxtLink to="/dashboard">dashboard</NuxtLink>
  </div>
</template>
