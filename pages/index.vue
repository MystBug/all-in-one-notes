<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})

const { user } = useUserSession()
</script>

<template>
  <div>
    <TextHeading>Welcome {{ user?.name }}</TextHeading>
    <ULink to="/dashboard">dashboard</ULink>
  </div>
</template>
