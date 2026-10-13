<script setup lang="ts">
import { storeToRefs } from 'pinia'

import RecipeTable from '@/components/RecipeTable.vue'
import { useRecipeStore } from '@/stores/recipeStore'
import AppPanel from '@/components/AppPanel.vue'

const recipeStore = useRecipeStore()
const { favorites } = storeToRefs(recipeStore)
</script>

<template>
  <main class="mx-auto min-w-0 max-w-6xl px-4 py-8">
    <AppPanel>
    <h1 class="mb-8 text-3xl font-bold">
      My Library
    </h1>
    <p>
      Number of favorites: {{ favorites.length }}
    </p>
    <p v-if="favorites.length === 0">
      No favorite recipes yet.
    </p>

      <div v-show="favorites.length > 0" class="w-full overflow-x-auto">
        <RecipeTable :recipes="favorites" />
      </div>
    </AppPanel>
  </main>
</template>

<style scoped></style>
