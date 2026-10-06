<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeSearch from '@/components/RecipeSearch.vue'
import { getAreas, getCategories, getRandomRecipe } from '@/services/mealDB'
import { useRecipeStore } from '@/stores/recipeStore'
import type { RecipeArea, RecipeCategory, RecipeSummary } from '@/types/recipe'
import { NButton, NSelect } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
const recipeStore = useRecipeStore()
const { searchState } = storeToRefs(recipeStore)

const categories = ref<RecipeCategory[]>([])
const areas = ref<RecipeArea[]>([])
const searchQuery = ref('')

const selectedCategory = ref<string | null>(null)
const selectedArea = ref<string | null>(null)

async function handleSearch(query: string) {
  await recipeStore.searchRecipes({
    query,
    category: selectedCategory.value,
    area: selectedArea.value
  })
}

async function loadFilters() {
  const resultCategories = await getCategories()
  const resultAreas = await getAreas()

  categories.value = resultCategories
  areas.value = resultAreas
}

async function selectCategory(category: string) {
  if (category === selectedCategory.value) {
    selectedCategory.value = null
  } else {
    selectedCategory.value = category
  }

  await handleSearch(searchQuery.value)
}

const areaOptions = computed(() =>
  areas.value.map((area) => ({
    label: area.strArea,
    value: area.strArea
  }))
)

async function initializePage() {
  await loadFilters()
  await recipeStore.loadDefaultRecipes(20)
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
        Catégories
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
        Pays
      </h2>

      <NSelect v-model:value="selectedArea" :options="areaOptions" @update:value="handleAreaChange"
        placeholder="Sélectionner un pays" class="w-full" />
    </section>
  </div>

  <p v-if="searchState?.statut === 'chargement'" class="p-4">
    Chargement...
  </p>

  <p v-else-if="searchState?.statut === 'erreur'" class="p-4">
    {{ searchState.message }}
  </p>

  <div v-else-if="searchState?.statut === 'succes'" class="flex flex-wrap justify-center gap-4">
    <RecipeCard v-for="recipe in searchState.recipes" :key="recipe.id" :recipe="recipe" />
  </div>
</template>

<style scoped></style>