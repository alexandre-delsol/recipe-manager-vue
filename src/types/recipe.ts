import type { Ingredient } from './ingredient'

export type Recipe = {
    id: string;
    name: string;
    category: string;
    area: string;
    thumbnail: string;
    instructions: string;
    youtube: string | null;
    ingredients: Ingredient[];
}

export type RecipeSummary = {
    id: string
    name: string
    thumbnail: string
    category: string | null
    area: string | null
}

export type RecipeFilters = {
    query: string | null
    category: string | null
    area: string | null
}

export type RecipeCategory = {
    strCategory: string 
}

export type RecipeArea = {
    strArea: string 
}

export type RecipeHistoryItem = RecipeSummary & {
    visitedAt: string
}

export type MealDbRecipeSummary = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
}