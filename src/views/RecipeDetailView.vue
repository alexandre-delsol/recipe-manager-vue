<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

import type { Recipe } from '@/types/recipe'
import { getRecipeById } from '@/services/mealDB'

const route = useRoute()

const recipe = ref<Recipe | null>(null)
const errorMessage = ref<string | null>(null)
const loading = ref(true)

onMounted(async () => {
    try {
        const result = await getRecipeById(route.params.id as string)

        recipe.value = result
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
    <h1>Détail de la recette</h1>

    <p v-if="loading">
        Chargement...
    </p>

    <p v-else-if="errorMessage">
        {{ errorMessage }}
    </p>


    <div v-else-if="recipe">
        <h2>{{ recipe.name }}</h2>

        <img :src="recipe.thumbnail" :alt="`Photo de ${recipe.name}`">

        <p>Catégorie : {{ recipe.category }}</p>

        <p>Origine : {{ recipe.area }}</p>

        <h3>Ingrédients</h3>

        <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
                <img :src="`https://www.themealdb.com/images/ingredients/${ingredient.name.replaceAll(' ', '_')}.png`"
                    :alt="ingredient.name">

                <span>
                    {{ ingredient.name }} — {{ ingredient.measure }}
                </span>
            </li>
        </ul>

        <h3>Instructions</h3>

        <p>{{ recipe.instructions }}</p>

        <a v-if="recipe.youtube" :href="recipe.youtube" target="_blank" rel="noopener noreferrer">
            Voir la recette sur YouTube
        </a>
    </div>


</template>

<style scoped></style>
