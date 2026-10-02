<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import FavoriteButton from '@/components/FavoriteButton.vue'
import { getRandomRecipe } from '@/services/mealDB'
import type { Recipe } from '@/types/recipe'

const recipe = ref<Recipe | null>(null)
const loading = ref(true)
const loadingRandomRecipe = ref(false)
const errorMessage = ref<string | null>(null)

async function loadRandomRecipe() {
    loadingRandomRecipe.value = true
    errorMessage.value = null

    try {
        const result = await getRandomRecipe()
        recipe.value = result
    } catch (error) {
        if (error instanceof Error) {
            errorMessage.value = error.message
        }
    } finally {
        loadingRandomRecipe.value = false
    }
}

async function loadInitialRecipe() {
    loading.value = true
    errorMessage.value = null

    try {
        const result = await getRandomRecipe()
        recipe.value = result
    } catch (error) {
        if (error instanceof Error) {
            errorMessage.value = error.message
        }
    } finally {
        loading.value = false
    }
}

onMounted(loadInitialRecipe)
</script>

<template>
    <main class="mx-auto max-w-5xl px-4 py-8">
        <section class="mb-10 text-center">
            <h1 class="text-4xl font-bold text-stone-800 dark:text-white">
                Recipe Manager
            </h1>

            <p
                class="mx-auto mt-4 max-w-2xl text-stone-600
                       dark:text-stone-300"
            >
                Découvrez de nouvelles recettes, consultez leur détail
                et gérez votre bibliothèque de recettes favorites.
            </p>
        </section>

        <!-- Premier chargement -->
        <p
            v-if="loading"
            class="text-center text-stone-500 dark:text-stone-400"
        >
            Chargement...
        </p>

        <!-- Erreur -->
        <p
            v-else-if="errorMessage"
            class="mx-auto max-w-xl rounded-lg bg-red-50 p-4
                   text-center text-red-700
                   dark:bg-red-950 dark:text-red-300"
        >
            {{ errorMessage }}
        </p>

        <!-- Recette -->
        <section
            v-else-if="recipe"
            class="mx-auto max-w-4xl overflow-hidden rounded-2xl
                   border border-stone-200 bg-white shadow-lg
                   dark:border-stone-700 dark:bg-stone-900"
        >
            <img
                class="h-64 w-full object-cover sm:h-80"
                :src="recipe.thumbnail"
                :alt="`Photo de ${recipe.name}`"
            >

            <div class="p-6">
                <div
                    class="flex flex-col gap-4
                           sm:flex-row sm:items-start sm:justify-between"
                >
                    <div class="min-w-0">
                        <h2
                            class="text-3xl font-bold text-stone-800
                                   dark:text-white"
                        >
                            {{ recipe.name }}
                        </h2>

                        <div class="mt-4 flex flex-wrap gap-3">
                            <span
                                class="rounded-full bg-orange-100 px-3 py-1
                                       text-sm font-medium text-orange-700
                                       dark:bg-orange-950 dark:text-orange-300"
                            >
                                {{ recipe.category }}
                            </span>

                            <span
                                class="rounded-full bg-stone-100 px-3 py-1
                                       text-sm font-medium text-stone-700
                                       dark:bg-stone-800 dark:text-stone-200"
                            >
                                {{ recipe.area }}
                            </span>
                        </div>
                    </div>

                    <FavoriteButton
                        :recipe="{
                            id: recipe.id,
                            name: recipe.name,
                            thumbnail: recipe.thumbnail,
                            category: recipe.category,
                            area: recipe.area
                        }"
                    />
                </div>

                <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                    <RouterLink
                        :to="`/recipes/${recipe.id}`"
                        class="inline-block rounded-lg bg-orange-600
                               px-5 py-2.5 font-medium text-white
                               transition hover:bg-orange-700
                               dark:hover:bg-orange-500"
                    >
                        Découvrir la recette
                    </RouterLink>

                    <button
                        type="button"
                        :disabled="loadingRandomRecipe"
                        class="inline-block rounded-lg bg-orange-600
                               px-5 py-2.5 font-medium text-white
                               transition hover:bg-orange-700
                               disabled:cursor-not-allowed
                               disabled:opacity-50
                               dark:hover:bg-orange-500
                               cursor-pointer"
                        @click="loadRandomRecipe"
                    >
                        {{ loadingRandomRecipe
                            ? 'Chargement...'
                            : '🎲 Une autre recette'
                        }}
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>