<script setup lang="ts">
const store = useAuthStore()
const {credentials} = storeToRefs(store)
definePageMeta({
  middleware: ['authenticated'],
})

await callOnce('user', () => store.fetchUser())
</script>

<template>
  <div>
    <TextHeading>Welcome {{ credentials.email }}</TextHeading>
    <ULink to="/dashboard">dashboard</ULink>

    <USeparator class="py-4" />

    <div class="container">
      <UCard>
        <template #header>
          Your TODO's
        </template>

        <ul>
          <li>
            <UCheckbox label="check me" />
            <UCheckbox label="check me too" description="This is a checkbox." />
            <UCheckbox label="check me three" />
            <UCheckbox label="check me four" description="This is a checkbox." />
          </li>
        </ul>

      </UCard>
    </div>
  </div>
</template>
