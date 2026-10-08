<script setup lang="ts">
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'
import { ref, watch } from 'vue'

import AppHeader from './components/AppHeader.vue'
import { darkThemeOverrides, lightThemeOverrides } from './theme/theme'

const savedTheme = localStorage.getItem('dark-mode')

const isDark = ref<boolean>(
  savedTheme === 'true'
)
watch(
  isDark,
  (value) => {
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem('dark-mode',`${value}`)
  },
  { immediate: true }
)
</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : null"
    :theme-overrides="isDark ? darkThemeOverrides : lightThemeOverrides">
    <NMessageProvider placement="bottom-left">
      <div class="min-h-screen bg-stone-50 text-stone-800 dark:bg-stone-950 dark:text-stone-100">
        <AppHeader v-model="isDark" />
        <RouterView />
      </div>
    </NMessageProvider>
  </NConfigProvider>
</template>
