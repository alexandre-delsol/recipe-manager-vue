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
    category: string
    area: string
}

export type MealDbRecipeSummary = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
}