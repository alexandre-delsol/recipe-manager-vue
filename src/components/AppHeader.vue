<script setup lang="ts">
import { Menu, Close } from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { NIcon, NMenu } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isDark = defineModel<boolean>()
const isMenuOpen = ref(false)

const menuOptions: MenuOption[] = [
  {
    key: '/',
    label: 'Accueil'
  },
  {
    key: '/recipes',
    label: 'Recettes'
  },
  {
    key: '/library',
    label: 'Bibliothèque'
  }
]

const router = useRouter()
const route = useRoute()

const activeMenuKey = computed(() => {
  if (route.path.startsWith('/recipes')) {
    return '/recipes'
  }

  return route.path
})

function handleMenuUpdate(key: string) {
  router.push(key)
  isMenuOpen.value = false
}
</script>

<template>
  <header class="w-full">
    <nav class="relative mx-auto flex w-full max-w-7xl items-center">
      <!-- Menu burger mobile -->
      <button type="button" aria-label="Ouvrir le menu" class="rounded-lg p-2 text-stone-600 transition
               hover:bg-orange-100 hover:text-orange-600
               sm:hidden
               dark:bg-stone-900
               dark:text-stone-300
               dark:hover:bg-stone-800
               dark:hover:text-orange-400" @click="isMenuOpen = !isMenuOpen">
        <NIcon size="24">
          <Menu v-if="!isMenuOpen" />
          <Close v-else />
        </NIcon>
      </button>

      <!-- Navigation desktop -->
      <div class="hidden flex-1 sm:block">
        <NMenu class="w-full" mode="horizontal" :value="activeMenuKey" :options="menuOptions"
          @update:value="handleMenuUpdate" />
      </div>

      <!-- Navigation mobile -->
      <div v-if="isMenuOpen" class="absolute left-0 top-full z-50 w-full
         border-t border-stone-200 bg-white shadow-lg
         sm:hidden
         dark:border-stone-700 dark:bg-stone-950">
        <NMenu mode="vertical" :value="activeMenuKey" :options="menuOptions" @update:value="handleMenuUpdate" />
      </div>

      <!-- Dark mode -->
      <button type="button" :aria-label="isDark ? 'Activer le mode clair' : 'Activer le mode sombre'" class="ml-auto shrink-0 cursor-pointer rounded-lg p-2
               text-stone-600 transition
               hover:bg-orange-100 hover:text-orange-600
               dark:bg-stone-900
               dark:text-stone-300
               dark:hover:bg-stone-800
               dark:hover:text-orange-400" @click="isDark = !isDark">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </nav>
  </header>
</template>

<style scoped>
:deep(.n-menu-item) {
  flex: 1;
}
</style>