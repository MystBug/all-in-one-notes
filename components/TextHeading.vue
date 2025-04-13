<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'h1',
    validator: value => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value as string),
  }
})
</script>

<template>
  <component :is="type">
    <slot />
  </component>
</template>
