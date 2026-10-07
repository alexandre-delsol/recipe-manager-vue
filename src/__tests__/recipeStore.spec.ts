import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useRecipeStore } from '@/stores/recipeStore'
import type { RecipeSummary } from '@/types/recipe'

describe('recipeStore', () => {
    const recipe: RecipeSummary = {
        id: '52772',
        name: 'Teriyaki Chicken Casserole',
        thumbnail: 'https://example.com/recipe.jpg',
        category: 'Chicken',
        area: 'Japanese',
    }

    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
    })

    it('ajoute une recette aux favoris', () => {
        const store = useRecipeStore()

        store.addFavorite(recipe)

        expect(store.favorites).toHaveLength(1)
        expect(store.favorites[0]).toEqual(recipe)
    })

    it('n’ajoute pas deux fois la même recette', () => {
        const store = useRecipeStore()

        store.addFavorite(recipe)
        store.addFavorite(recipe)

        expect(store.favorites).toHaveLength(1)
    })

    it('supprime une recette des favoris', () => {
        const store = useRecipeStore()

        store.addFavorite(recipe)
        store.removeFavorite(recipe.id)

        expect(store.favorites).toHaveLength(0)
    })

    it('indique si une recette est dans les favoris', () => {
        const store = useRecipeStore()

        expect(store.isFavorite(recipe.id)).toBe(false)

        store.addFavorite(recipe)

        expect(store.isFavorite(recipe.id)).toBe(true)
    })
})
