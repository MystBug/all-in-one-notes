<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()
const { credentials, loggedIn } = storeToRefs(store)

const { clear: clearSession } = useUserSession()

const logout = async () => {
  await clearSession().then(() => {
    credentials.value.email = ''
    loggedIn.value = false
  })
  await navigateTo('/login')
}

const items2 = computed(() => {
  const arr: DropdownMenuItem[] = [
    {
      label: 'Light',
      icon: 'i-lucide-moon',
    }
  ]

  if (loggedIn.value) arr.push({
    type: 'label',
    label: credentials.value.email,
    icon: 'i-lucide-user',
  })

  if (loggedIn.value) arr.push({
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
