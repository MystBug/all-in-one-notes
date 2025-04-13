<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})
</script>

<template>
  <div>
    <h1>Welcome to your dashboard</h1>
    <NuxtLink to="/">home</NuxtLink>
  </div>
</template>
