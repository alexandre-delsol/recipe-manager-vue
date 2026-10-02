import { searchRecipes as fetchRecipes } from '@/services/mealDB'
import type { RecipeSummary } from '@/types/recipe'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type SearchState =
    | { statut: 'chargement' }
    | { statut: 'succes'; recipes: RecipeSummary[] }
    | { statut: 'erreur'; message: string }

export const useRecipeStore = defineStore('recipe', () => {
    const searchState = ref<SearchState | null>(null)
    const favorites = ref<RecipeSummary[]>([])
    watch(
        favorites,
        (newFavorites) => {
            localStorage.setItem(
                'recipe-favorites',
                JSON.stringify(newFavorites)
            )
        },
        { deep: true }
    )

    function loadFavorites(): RecipeSummary[] {
        const storedFavorites = localStorage.getItem('recipe-favorites')

        if (!storedFavorites) {
            return []
        }

        try {
            return JSON.parse(storedFavorites) as RecipeSummary[]
        } catch {
            return []
        }
    }

    function addFavorite(recipe: RecipeSummary) {
        if (recipe.id === '') return

        const alreadyFavorite = favorites.value.some(
            (favorite) => favorite.id === recipe.id
        )

        if (alreadyFavorite) return

        favorites.value.push(recipe)
    }

    function removeFavorite(id: string) {
        favorites.value = favorites.value.filter(
            (favorite) => favorite.id !== id
        )
    }

    function isFavorite(id: string): boolean {
        return favorites.value.some(
            (favorite) => favorite.id === id
        )
    }



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
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
    }
})

