<script setup lang="ts">
import FavoriteButton from '@/components/FavoriteButton.vue'
import type { RecipeSummary } from '@/types/recipe'
import { NCard } from 'naive-ui'

defineProps<{
  recipe: RecipeSummary
}>()
</script>

<template>
  <NCard
    class="w-full max-w-64 border border-stone-200 bg-white
           transition-all duration-200
           hover:-translate-y-1 hover:border-orange-600
           hover:shadow-lg hover:shadow-orange-500/20
           dark:border-stone-700 dark:bg-stone-900"
  >
    <RouterLink
      :to="`/recipes/${recipe.id}`"
      class="block"
    >
      <img
        :src="recipe.thumbnail"
        :alt="recipe.name"
        class="h-40 w-full object-cover"
      >
    </RouterLink>

    <div class="mt-3 flex items-start justify-between gap-3">
      <RouterLink
        :to="`/recipes/${recipe.id}`"
        class="min-w-0 flex-1"
      >
        <h2 class="text-lg font-bold text-stone-800 dark:text-white">
          {{ recipe.name }}
        </h2>

        <p class="mt-1 text-sm text-stone-600 dark:text-stone-300">
          {{ recipe.category }}
        </p>

        <p class="text-sm text-stone-500 dark:text-stone-400">
          {{ recipe.area }}
        </p>
      </RouterLink>

      <FavoriteButton
        :recipe="recipe"
        compact
      />
    </div>
  </NCard>
</template>
