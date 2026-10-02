<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui'
import { ref, watch } from 'vue'

import AppHeader from './components/AppHeader.vue'
import { darkThemeOverrides, lightThemeOverrides } from './theme/theme'

const isDark = ref(false)
watch(
  isDark,
  (value) => {
    document.documentElement.classList.toggle('dark', value)
  },
  { immediate: true }
)
</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : null"
    :theme-overrides="isDark ? darkThemeOverrides : lightThemeOverrides">
    <div class="min-h-screen bg-stone-50 text-stone-800 dark:bg-stone-950 dark:text-stone-100">
      <AppHeader v-model="isDark" />
      <RouterView />
    </div>
  </NConfigProvider>
</template>
