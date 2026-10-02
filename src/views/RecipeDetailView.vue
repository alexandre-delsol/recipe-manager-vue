<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

import type { Recipe } from '@/types/recipe'
import { getRecipeById } from '@/services/mealDB'

const route = useRoute()

const recipe = ref<Recipe | null>(null)
const errorMessage = ref<string | null>(null)

// onMounted(async () => {
//     try {
//         const result = await getRecipeById(route.params.id as string)

//         recipe.value = result
//     } catch (error) {
//         if (error instanceof Error) {
//             errorMessage.value = error
//         }
//     })
</script>

<template>
    <h1>Détail de la recette</h1>
    <p v-if="recipe">
        {{ recipe.name }}

    </p>
</template>

<style scoped></style>