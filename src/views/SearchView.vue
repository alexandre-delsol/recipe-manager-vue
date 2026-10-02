
<script setup lang="ts">
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

    <div v-else>
        <div v-for="recipe in recipes" :key="recipe.id">
            <h2>{{ recipe.name }}</h2>
            <img :src="recipe.thumbnail" :alt="recipe.name">
            <p>{{ recipe.category }}</p>
            <p>{{ recipe.area }}</p>
        </div>
    </div>
</template>

<style scoped></style>
