<script setup lang="ts">
import type { RecipeSummary } from '@/types/recipe'
import { NCard } from 'naive-ui'

defineProps<{
    recipe: RecipeSummary
}>()
</script>

<template>
    <RouterLink
        :to="`/recipes/${recipe.id}`"
        class="block w-64"
    >
        <NCard
            class="h-full border border-stone-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-orange-600 hover:shadow-lg hover:shadow-orange-500/20 dark:border-stone-700 dark:bg-stone-900"
        >
            <img
                class="h-40 w-full object-cover"
                :src="recipe.thumbnail"
                :alt="recipe.name"
            >

            <h2 class="mt-3 text-lg font-bold text-stone-800 dark:text-white">
                {{ recipe.name }}
            </h2>

            <p class="mt-1 text-sm text-stone-600 dark:text-stone-300">
                {{ recipe.category }}
            </p>

            <p class="text-sm text-stone-500 dark:text-stone-400">
                {{ recipe.area }}
            </p>
        </NCard>
    </RouterLink>
</template>

<style scoped></style>
