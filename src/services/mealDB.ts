import type {
    Recipe,
    RecipeSummary,
    RecipeFilters,
    RecipeCategory,
    RecipeArea
} from '@/types/recipe'
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

type MealDbRandomResponse = {
    meals: MealDbMeal[]
}

type MealDbCategoryResponse = {
    meals: RecipeCategory[] | null
}

type MealDbAreaResponse = {
    meals: RecipeArea[] | null
}

type MealDbFilterResult = {
    idMeal: string
    strMeal: string
    strMealThumb: string
}

type MealDbFilterResponse = {
    meals: MealDbFilterResult[] | null
}

export async function getCategories(): Promise<RecipeCategory[]> {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data = await response.json() as MealDbCategoryResponse

    if (data.meals === null || data.meals.length === 0) {
        throw new Error('Aucune catégorie trouvée')
    }

    return data.meals
}

export async function getAreas(): Promise<RecipeArea[]> {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data = await response.json() as MealDbAreaResponse

    if (data.meals === null || data.meals.length === 0) {
        throw new Error('Aucun pays trouvé')
    }

    return data.meals
}

async function getMealById(id: string): Promise<MealDbMeal> {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data = await response.json() as MealDbResponse

    if (data.meals === null || data.meals.length === 0) {
        throw new Error('Recette inexistante')
    }

    const meal = data.meals[0]

    if (!meal) {
        throw new Error('Recette inexistante')
    }

    return meal
}

function mapMealToSummary(meal: MealDbMeal): RecipeSummary {
    return {
        id: meal.idMeal,
        name: meal.strMeal,
        thumbnail: meal.strMealThumb,
        category: meal.strCategory,
        area: meal.strArea
    }
}

export async function searchRecipes(
    filters: RecipeFilters
): Promise<RecipeSummary[]> {

    if (
        filters.query !== null &&
        filters.query.trim() !== ''
    ) {
        const params = new URLSearchParams()
        params.set('s', filters.query)

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?${params.toString()}`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`)
        }

        const data = await response.json() as MealDbSearchResponse

        if (data.meals === null || data.meals.length === 0) {
            throw new Error('Aucune recette trouvée pour cette recherche')
        }

        return data.meals.map((meal) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            thumbnail: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea
        }))
    }

 
    if (
        filters.category === null &&
        filters.area === null
    ) {
        throw new Error('Aucun filtre de recherche')
    }


    const filterParams = new URLSearchParams()

    if (filters.category !== null) {
        filterParams.set('c', filters.category)
    } else if (filters.area !== null) {
        filterParams.set('a', filters.area)
    }

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${filterParams.toString()}`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data = await response.json() as MealDbFilterResponse

    if (data.meals === null || data.meals.length === 0) {
        throw new Error('Aucune recette trouvée pour ce filtre')
    }

    const meals = await Promise.all(
        data.meals.map((meal) => getMealById(meal.idMeal))
    )

    let filteredMeals = meals


    if (filters.area !== null) {
        filteredMeals = filteredMeals.filter(
            (meal) => meal.strArea === filters.area
        )
    }

    if (filters.category !== null) {
        filteredMeals = filteredMeals.filter(
            (meal) => meal.strCategory === filters.category
        )
    }

    if (filteredMeals.length === 0) {
        throw new Error('Aucune recette trouvée pour ces filtres')
    }
console.log(
    filteredMeals.map((meal) => ({
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea
    }))
)
    return filteredMeals.map(mapMealToSummary)
}

function mapMealToRecipe(meal: MealDbMeal): Recipe {
    const ingredients: Ingredient[] = []

    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]

        if (name && name.trim()) {
            const image =
                `https://www.themealdb.com/images/ingredients/${name.replace(/ /g, '_')}.png`

            ingredients.push({
                name,
                measure: measure ?? 'A votre convenance',
                image
            })
        }
    }

    return {
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        thumbnail: meal.strMealThumb,
        instructions: meal.strInstructions,
        youtube: meal.strYoutube,
        ingredients
    }
}

export async function getRecipeById(id: string): Promise<Recipe> {
    const meal = await getMealById(id)

    return mapMealToRecipe(meal)
}

export async function getRandomRecipe(): Promise<Recipe> {
    const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
    )

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
    }

    const data = await response.json() as MealDbRandomResponse

    if (data.meals.length === 0) {
        throw new Error('Aucune recette trouvée')
    }

    const meal = data.meals[0]

    if (!meal) {
        throw new Error('Aucune recette trouvée')
    }

    return mapMealToRecipe(meal)
}

export async function getDefaultRecipes(
    count: number
): Promise<RecipeSummary[]> {
    const requests = Array.from(
        { length: count },
        () => getRandomRecipe()
    )

    const recipes = await Promise.all(requests)

    const uniqueRecipes = recipes.filter(
        (recipe, index, array) =>
            array.findIndex((item) => item.id === recipe.id) === index
    )

    return uniqueRecipes.map((recipe) => ({
        id: recipe.id,
        name: recipe.name,
        thumbnail: recipe.thumbnail,
        category: recipe.category,
        area: recipe.area
    }))
}

