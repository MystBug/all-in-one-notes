<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const { clear: clearSession, user } = useUserSession()

const logout = async () => {
  await clearSession()
  await navigateTo('/login')
  console.log('logging out?')
}

const items2 = computed(() => {
  const arr: DropdownMenuItem[] = [
    {
      label: 'Light',
      icon: 'i-lucide-moon',
    }
  ]

  if (user.value) arr.push({
    type: 'label',
    label: user.value!.name,
    icon: 'i-lucide-user',
  })

  if (user.value) arr.push({
    label: 'Logout',
    icon: 'i-lucide-log-out',
    onSelect: () => logout()
  })

  return arr
})
</script>

<template>
  <div
    class="flex justify-between p-4 border-b-2 dark:border-primary-700 border-primary-300 shadow-xl dark:bg-slate-950 bg-slate-50">
    <div class="spacer" />
    <UDropdownMenu :items="items2" :ui="{
      content: 'w-48'
    }">
      <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
    </UDropdownMenu>
  </div>
</template>
