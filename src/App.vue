<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import { themeOverrides } from '@/theme/theme'
import { NConfigProvider } from 'naive-ui'
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <AppHeader />
    <RouterView />
  </NConfigProvider>
</template>
