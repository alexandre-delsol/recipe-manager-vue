<script setup lang="ts">
import { storeToRefs } from 'pinia'

import RecipeTable from '@/components/RecipeTable.vue'
import { useRecipeStore } from '@/stores/recipeStore'

const recipeStore = useRecipeStore()

const { favorites } = storeToRefs(recipeStore)
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <h1 class="mb-8 text-3xl font-bold">
      Ma bibliothèque
    </h1>

    <p v-if="favorites.length === 0">
      Aucune recette favorite.
    </p>

    <div v-show="favorites.length > 0">
      <RecipeTable :recipes="favorites" />
    </div>
  </main>
</template>

<style scoped>
</style>

