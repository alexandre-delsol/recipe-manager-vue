<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeSearch from '@/components/RecipeSearch.vue'
import { useRecipeStore } from '@/stores/recipeStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const recipeStore = useRecipeStore()
const { searchState } = storeToRefs(recipeStore)

const searchQuery = ref('')

async function handleSearch(query: string) {
  await recipeStore.searchRecipes(query)
}

handleSearch('')
</script>

<template>
  <RecipeSearch
    v-model="searchQuery"
    @search="handleSearch"
  />

  <p v-if="searchState?.statut === 'chargement'">
    Chargement...
  </p>

  <p v-else-if="searchState?.statut === 'erreur'">
    {{ searchState.message }}
  </p>

  <div
    v-else-if="searchState?.statut === 'succes'"
    class="flex flex-wrap justify-center gap-4"
  >
    <RecipeCard
      v-for="recipe in searchState.recipes"
      :key="recipe.id"
      :recipe="recipe"
    />
  </div>
</template>

<style scoped></style>

