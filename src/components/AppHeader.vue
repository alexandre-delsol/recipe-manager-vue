<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { NMenu } from 'naive-ui'
import { computed, onMounted, onUnmounted, ref } from 'vue'

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
        <nav class="mx-auto w-full max-w-7xl">
            <NMenu class="w-full flex flex-col text-center sm:flex-row" :mode="isMobile ? 'vertical' : 'horizontal'"
                :value="route.path" :options="menuOptions" @update:value="handleMenuUpdate" />
        </nav>
    </header>
</template>

<style scoped>
:deep(.n-menu-item) {
    flex: 1;
}

:deep(.n-menu-item-content--selected) {
    background-color: #ffedd5;
    color: #c2410c;
}

:deep(.n-menu-item-content:hover) {
    background-color: #fff7ed;
}
</style>