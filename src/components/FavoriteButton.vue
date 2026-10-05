<script setup lang="ts">
import type { RecipeSummary } from '@/types/recipe'
import { Heart, HeartOutline } from '@vicons/ionicons5'
import { NButton, NIcon, useMessage } from 'naive-ui'

import { useRecipeStore } from '@/stores/recipeStore'

const props = defineProps<{
  recipe: RecipeSummary
  compact?: boolean
}>()

const message = useMessage()

const recipeStore = useRecipeStore()

function toggleFavorite() {
  if (recipeStore.isFavorite(props.recipe.id)) {
    recipeStore.removeFavorite(props.recipe.id)
    message.success('Recette retirée des favoris')
  } else {
    recipeStore.addFavorite(props.recipe)
    message.success('Recette ajoutée aux favoris')
  }
}

</script>

<template>
  <NButton :aria-label="recipeStore.isFavorite(recipe.id)
    ? 'Retirer des favoris'
    : 'Ajouter aux favoris'" :title="recipeStore.isFavorite(recipe.id)
        ? 'Retirer des favoris'
        : 'Ajouter aux favoris'" class="rounded-lg transition-all duration-200
           hover:-translate-y-0.5 hover:shadow-md
           dark:bg-stone-800 dark:hover:bg-stone-700" @click="toggleFavorite">
    <template #icon>
      <NIcon>
        <Heart v-if="recipeStore.isFavorite(recipe.id)" class="text-orange-600 dark:text-orange-400" />
        <HeartOutline v-else class="text-stone-600 dark:text-stone-300" />
      </NIcon>
    </template>

    <span v-if="!compact" :class="recipeStore.isFavorite(recipe.id)
      ? 'font-medium text-orange-600 dark:text-orange-400'
      : 'text-stone-700 dark:text-stone-200'">
      {{ recipeStore.isFavorite(recipe.id)
        ? 'Retirer des favoris'
        : 'Ajouter aux favoris'
      }}
    </span>
  </NButton>
</template>