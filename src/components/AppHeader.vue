<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipeStore'
import { Close, Menu } from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { NIcon, NMenu, NSplit } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const recipeStore = useRecipeStore()
const { favorites } = storeToRefs(recipeStore)
const isDark = defineModel<boolean>()
const isMenuOpen = ref(false)

const menuOptions = computed<MenuOption[]>(() => [
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
    label: `Bibliothèque (${favorites.value.length})`
  }
])

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
    <nav class="relative mx-auto w-full max-w-7xl">
      <!-- Desktop -->
      <div class="hidden w-full sm:block">
        <NSplit class="w-full" :default-size="0.8" :resize-trigger-size="0">
          <template #1>
            <NMenu class="w-full" mode="horizontal" :value="activeMenuKey" :options="menuOptions"
              @update:value="handleMenuUpdate" />
          </template>

          <template #2>
            <div class="flex h-full items-center justify-end">
              <button type="button" :aria-label="isDark
                ? 'Activer le mode clair'
                : 'Activer le mode sombre'
                " class="rounded-lg p-2
               text-stone-600 transition
               hover:bg-orange-100 hover:text-orange-600
               dark:bg-stone-900
               dark:text-stone-300
               dark:hover:bg-stone-800
               dark:hover:text-orange-400" @click="isDark = !isDark">
                {{ isDark ? '☀️' : '🌙' }}
              </button>
            </div>
          </template>
        </NSplit>
      </div>

      <!-- Mobile -->
      <div v-if="isMenuOpen" class="absolute left-0 top-full z-50 w-full
         border-t border-stone-200 bg-white shadow-lg
         sm:hidden
         dark:border-stone-700 dark:bg-stone-950">
        <NMenu mode="vertical" :value="activeMenuKey" :options="menuOptions" @update:value="handleMenuUpdate" />
      </div>
      <div class="flex items-center justify-between sm:hidden">
        <!-- Menu burger -->
        <button type="button" :aria-label="isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'" class="rounded-lg p-2 text-stone-600 transition
           hover:bg-orange-100 hover:text-orange-600
           dark:bg-stone-900
           dark:text-stone-300
           dark:hover:bg-stone-800
           dark:hover:text-orange-400" @click="isMenuOpen = !isMenuOpen">
          <NIcon size="24">
            <Menu v-if="!isMenuOpen" />
            <Close v-else />
          </NIcon>
        </button>

        <!-- Dark mode mobile -->
        <button type="button" :aria-label="isDark
          ? 'Activer le mode clair'
          : 'Activer le mode sombre'
          " class="rounded-lg p-2
           text-stone-600 transition
           hover:bg-orange-100 hover:text-orange-600
           dark:bg-stone-900
           dark:text-stone-300
           dark:hover:bg-stone-800
           dark:hover:text-orange-400" @click="isDark = !isDark">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>
  </header>
</template>
