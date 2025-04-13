<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})
</script>

<template>
  <div>
    <TextHeading>Welcome to your dashboard
    </TextHeading>
    <ULink to="/">home</ULink>
  </div>
</template>
