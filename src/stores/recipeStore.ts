import { getDefaultRecipes as fetchDefaultRecipes, searchRecipes as fetchRecipes } from '@/services/mealDB'
import type {
    RecipeFilters,
    RecipeHistoryItem,
    RecipeSummary
} from '@/types/recipe'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
type SearchState =
    | { statut: 'chargement' }
    | { statut: 'succes'; recipes: RecipeSummary[] }
    | { statut: 'erreur'; message: string }

export const useRecipeStore = defineStore('recipe', () => {


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
    const favorites = ref<RecipeSummary[]>(loadFavorites())

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

    function loadHistory(): RecipeHistoryItem[] {
        const storedHistory = localStorage.getItem('recipe-history')

        if (!storedHistory) {
            return []
        }

        try {
            return JSON.parse(storedHistory) as RecipeHistoryItem[]
        } catch {
            return []
        }
    }

    const history = ref<RecipeHistoryItem[]>(loadHistory())

    watch(
        history,
        (newHistory) => {
            localStorage.setItem(
                'recipe-history',
                JSON.stringify(newHistory)
            )
        },
        { deep: true }
    )

    function addToHistory(recipe: RecipeSummary) {
        const visitedAt = new Date()

        const historyItem: RecipeHistoryItem = {
            ...recipe,
            visitedAt: visitedAt.toISOString()
        }

        history.value = history.value.filter(
            (historyRecipe) => historyRecipe.id !== recipe.id
        )

        history.value.unshift(historyItem)
    }
    function removeHistoryItem(id: string) {
        history.value = history.value.filter(
            (historyRecipe) => historyRecipe.id !== id
        )
    }
    function clearHistory() {
        history.value = []
    }

    const searchState = ref<SearchState | null>(null)

    async function searchRecipes(filters: RecipeFilters) {
        searchState.value = { statut: 'chargement' }

        try {
            const result = await fetchRecipes(filters)

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
    async function loadDefaultRecipes(count: number) {
        searchState.value = { statut: 'chargement' }

        try {
            const recipes = await fetchDefaultRecipes(count)

            searchState.value = {
                statut: 'succes',
                recipes
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
        history,
        addToHistory,
        removeHistoryItem,
        clearHistory,
        loadDefaultRecipes
    }
})

