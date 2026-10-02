<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue'
import { searchRecipes } from '@/services/mealDB'
import type { RecipeSummary } from '@/types/recipe'
import { onMounted, ref } from 'vue'

const recipes = ref<RecipeSummary[]>([])
const errorMessage = ref<string | null>(null)
const loading = ref(true)

async function loadRecipes() {
    const result = await searchRecipes('chicken')

    recipes.value = result
}

onMounted(async () => {
    try {
        await loadRecipes()
    } catch (error) {
        if (error instanceof Error) {
            errorMessage.value = error.message
        }
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <h1>Recherche</h1>

    <p v-if="loading">
        Chargement...
    </p>

    <p v-else-if="errorMessage">
        {{ errorMessage }}
    </p>

    <div class="flex flex-wrap justify-center gap-4 " v-else>
        <RecipeCard  v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
</template>

<style scoped></style>
