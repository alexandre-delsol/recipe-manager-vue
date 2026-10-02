<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isDark = defineModel<boolean>()

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

const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 640)

const activeMenuKey = computed(() => {
  if (route.path.startsWith('/recipes')) {
    return '/recipes'
  }

  return route.path
})

function handleMenuUpdate(key: string) {
  router.push(key)
}

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <header class="w-full">
    <nav class="mx-auto flex w-full max-w-7xl items-center">
      <div class="flex-1">
        <NMenu
          class="w-full"
          :mode="isMobile ? 'vertical' : 'horizontal'"
          :value="activeMenuKey"
          :options="menuOptions"
          @update:value="handleMenuUpdate"
        />
      </div>

      <button
        type="button"
        class="cursor-pointer
          ml-4 shrink-0 rounded-lg p-2
          text-stone-600 transition
          hover:bg-orange-100 hover:text-orange-600
          dark:bg-stone-900
          dark:text-stone-300
          dark:hover:bg-stone-800
          dark:hover:text-orange-400
        "
        @click="isDark = !isDark"
      >
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

