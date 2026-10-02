import type { Recipe, RecipeSummary } from "@/types/recipe"
import type { Ingredient } from '@/types/ingredient'
import type { MealDbRecipeSummary } from '@/types/recipe'
type MealDbMeal = {
    idMeal: string
    strMeal: string
    strMealAlternate: string | null
    strCategory: string
    strArea: string
    strInstructions: string
    strMealThumb: string
    strTags: string | null
    strYoutube: string | null

    strIngredient1: string
    strIngredient2: string
    strIngredient3: string
    strIngredient4: string
    strIngredient5: string
    strIngredient6: string
    strIngredient7: string
    strIngredient8: string
    strIngredient9: string
    strIngredient10: string
    strIngredient11: string
    strIngredient12: string
    strIngredient13: string
    strIngredient14: string
    strIngredient15: string
    strIngredient16: string | null
    strIngredient17: string | null
    strIngredient18: string | null
    strIngredient19: string | null
    strIngredient20: string | null

    strMeasure1: string
    strMeasure2: string
    strMeasure3: string
    strMeasure4: string
    strMeasure5: string
    strMeasure6: string
    strMeasure7: string
    strMeasure8: string
    strMeasure9: string
    strMeasure10: string
    strMeasure11: string
    strMeasure12: string
    strMeasure13: string
    strMeasure14: string
    strMeasure15: string
    strMeasure16: string | null
    strMeasure17: string | null
    strMeasure18: string | null
    strMeasure19: string | null
    strMeasure20: string | null

    strSource: string | null
    strImageSource: string | null
    strCreativeCommonsConfirmed: string | null
    dateModified: string | null

    [key: `strIngredient${number}`]: string | null
    [key: `strMeasure${number}`]: string | null
}

type MealDbResponse = {
    meals: MealDbMeal[] | null
}
type MealDbSearchResponse = {
    meals: MealDbRecipeSummary[] | null
}

export async function searchRecipes(query: string): Promise<RecipeSummary[]> {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data = await response.json() as MealDbSearchResponse

    if (data.meals === null || data.meals.length === 0) {
        throw new Error(`Recette inexistante`)
    }

    return data.meals.map((meal) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        thumbnail: meal.strMealThumb,
        category: meal.strCategory,
        area: meal.strArea
    }))
}
export async function getRecipeById(id: string): Promise<Recipe> {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data = await response.json() as MealDbResponse

    if (data.meals === null || data.meals.length === 0) {
        throw new Error(`Recette inexistante`)
    }


    const meal = data.meals[0]

    if (!meal) {
        throw new Error(`Recette inexistante`)
    }
    const ingredients: Ingredient[] = []

    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (name && name.trim()) {
            const image = `https://www.themealdb.com/images/ingredients/${name.replaceAll(' ', '_')}.png`
            ingredients.push({
                name,
                measure: measure ?? "A votre convenance",
                image
            })
        }
    }
    const recipe: Recipe = {
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        thumbnail: meal.strMealThumb,
        instructions: meal.strInstructions,
        youtube: meal.strYoutube,
        ingredients
    }

    return recipe
}