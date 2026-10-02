import type { RecipeSummary } from '@/types/recipe'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { searchRecipes as fetchRecipes } from '@/services/mealDB'

type SearchState =
    | { statut: 'chargement' }
    | { statut: 'succes'; recipes: RecipeSummary[] }
    | { statut: 'erreur'; message: string }

export const useRecipeStore = defineStore('recipe', () => {
    const searchState = ref<SearchState | null>(null)

    async function searchRecipes(query: string) {
        searchState.value = { statut: 'chargement' }

        try {
            const result = await fetchRecipes(query)

            searchState.value = {
                statut: 'succes',
                recipes: result
            }
        } catch (error) {
            if (error instanceof Error) {
                searchState.value = {
                    statut: 'erreur',
                    message: error.message
                }
            }
        }
    }

    return {
        searchState,
        searchRecipes,
    }
})

