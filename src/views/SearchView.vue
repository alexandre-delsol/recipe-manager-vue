<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeCardSkeleton from '@/components/RecipeCardSkeleton.vue'
import RecipeSearch from '@/components/RecipeSearch.vue'
import { useRecipes } from '@/composables/useRecipes'
import { useRecipeStore } from '@/stores/recipeStore'
import { NButton, NSelect } from 'naive-ui'
import { storeToRefs } from 'pinia'

import { onMounted, ref } from 'vue'
const recipeStore = useRecipeStore()
const { searchState } = storeToRefs(recipeStore)


const searchQuery = ref('')

const selectedCategory = ref<string | null>(null)
const selectedArea = ref<string | null>(null)

async function handleSearch(query: string) {
  const hasQuery = query.trim() !== ''
  const hasCategory = selectedCategory.value !== null
  const hasArea = selectedArea.value !== null

  if (!hasQuery && !hasCategory && !hasArea) {
    await recipeStore.loadDefaultRecipes(8)
    return
  }

  await recipeStore.searchRecipes({
    query,
    category: selectedCategory.value,
    area: selectedArea.value
  })
}
const skeletonCards = Array.from(
  { length: 8 },
  (_, index) => `skeleton-${index + 1}`
)

async function resetFilters() {
  searchQuery.value = ''
  selectedCategory.value = null
  selectedArea.value = null

  await recipeStore.loadDefaultRecipes(8)
}

const {
  categories,
  areaOptions,
  loadFilters
} = useRecipes()

async function selectCategory(category: string) {
  if (category === selectedCategory.value) {
    selectedCategory.value = null
  } else {
    selectedCategory.value = category
  }

  await handleSearch(searchQuery.value)
}

async function initializePage() {
  await loadFilters()
  await recipeStore.loadDefaultRecipes(8)
}

async function handleAreaChange() {
  await handleSearch(searchQuery.value)
}
onMounted(initializePage)
</script>

<template>
  <RecipeSearch v-model="searchQuery" @search="handleSearch" />

  <div class="w-full space-y-6 p-4">
    <section>
      <h2 class="mb-3 text-lg font-semibold">
        Category
      </h2>

      <div class="flex flex-wrap gap-2">
        <NButton v-for="category in categories" :key="category.strCategory"
          :type="selectedCategory === category.strCategory ? 'primary' : 'default'"
          @click="selectCategory(category.strCategory)">
          {{ category.strCategory }}
        </NButton>
      </div>
    </section>

    <section class="w-full sm:max-w-xs">
      <h2 class="mb-3 text-lg font-semibold">
        Cuisine area
      </h2>

      <NSelect v-model:value="selectedArea" :options="areaOptions" @update:value="handleAreaChange"
        placeholder="Select a cuisine area" class="w-full" />
    </section>
    <NButton secondary @click="resetFilters">
      Reset filters
    </NButton>
  </div>

  <div v-if="searchState?.status === 'loading'" class="flex flex-wrap justify-center gap-4">
    <RecipeCardSkeleton v-for="skeleton in skeletonCards" :key="skeleton" />
  </div>

  <p v-else-if="searchState?.status === 'error'" class="p-4">
    {{ searchState.message }}
  </p>

  <div v-else-if="searchState?.status === 'sucess'" class="flex flex-wrap justify-center gap-4">
    <RecipeCard v-for="recipe in searchState.recipes" :key="recipe.id" :recipe="recipe" />
  </div>

</template>

<style scoped></style>