<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import FavoriteButton from '@/components/FavoriteButton.vue'
import { getRecipeById } from '@/services/mealDB'
import type { Recipe, RecipeSummary } from '@/types/recipe'
import { useRecipeStore } from '@/stores/recipeStore'

const route = useRoute()

const recipe = ref<Recipe | null>(null)
const errorMessage = ref<string | null>(null)
const loading = ref(true)

const recipeStore = useRecipeStore()



onMounted(async () => {
    try {
        const result = await getRecipeById(route.params.id as string)

        recipe.value = result
        const historyRecipe: RecipeSummary = {
            id: result.id,
            name: result.name,
            thumbnail: result.thumbnail,
            category: result.category,
            area: result.area
        }
        recipeStore.addToHistory(historyRecipe)
    } catch (error) {
        if (error instanceof Error) {
            errorMessage.value = error.message
        }
    } finally {
        loading.value = false
    }
})

const youtubeEmbedUrl = computed(() => {
    const youtubeUrl = recipe.value?.youtube

    if (!youtubeUrl) return null

    const url = new URL(youtubeUrl)
    const videoId = url.searchParams.get('v')

    if (!videoId) return null

    return `https://www.youtube-nocookie.com/embed/${videoId}`
})
</script>

<template>
    <main class="mx-auto max-w-6xl px-4 py-8 text-stone-800 dark:text-stone-100 sm:px-6 lg:px-8">

        <h1 class="mb-8 text-3xl font-bold text-stone-800 dark:text-white">
            Recipe Details
        </h1>

        <p v-if="loading" class="text-stone-500 dark:text-stone-400">
            Loading...
        </p>

        <p v-else-if="errorMessage" class="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
            {{ errorMessage }}
        </p>

        <div v-else-if="recipe" class="grid gap-8 lg:grid-cols-2">


            <section>
                <img class="w-full rounded-2xl object-cover shadow-[0_8px_20px_rgba(234,88,12,0.25)] transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(234,88,12,0.40)]"
                    :src="recipe.thumbnail" :alt="`Photo of ${recipe.name}`">

                <div class="mt-6">
                    <h2 class="text-3xl font-bold text-stone-800 dark:text-white">
                        {{ recipe.name }}
                    </h2>
                    <FavoriteButton :recipe="{
                        id: recipe.id,
                        name: recipe.name,
                        thumbnail: recipe.thumbnail,
                        category: recipe.category,
                        area: recipe.area
                    }" />
                    <div class="mt-4 flex flex-wrap gap-3">
                        <span
                            class="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                            {{ recipe.category }}
                        </span>

                        <span
                            class="rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                            {{ recipe.area }}
                        </span>
                    </div>
                </div>
            </section>


            <section>
                <h3
                    class="mb-4 border-b-2 border-orange-600 pb-2 text-2xl font-semibold text-stone-800 dark:text-white">
                    Ingredients
                </h3>

                <ul class="grid gap-4 sm:grid-cols-2">
                    <li v-for="ingredient in recipe.ingredients" :key="ingredient.name"
                        class="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-stone-700 dark:bg-stone-900">
                        <img class="h-14 w-14 rounded-full object-cover" :src="ingredient.image" :alt="ingredient.name">

                        <span class="text-sm text-stone-700 dark:text-stone-200">
                            <strong class="text-stone-900 dark:text-white">
                                {{ ingredient.name }}
                            </strong>
                            <br>
                            {{ ingredient.measure }}
                        </span>
                    </li>
                </ul>
            </section>


            <section class="lg:col-span-2">
                <h3
                    class="mb-4 border-b-2 border-orange-600 pb-2 text-2xl font-semibold text-stone-800 dark:text-white">
                    Instructions
                </h3>

                <p class="whitespace-pre-line leading-7 text-stone-700 dark:text-stone-200">
                    {{ recipe.instructions }}
                </p>


                <iframe v-if="youtubeEmbedUrl" :src="youtubeEmbedUrl" title="Recipe video on YouTube"
                    class="mt-4 aspect-video w-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>
            </section>

        </div>
    </main>
</template>

<style scoped></style>
