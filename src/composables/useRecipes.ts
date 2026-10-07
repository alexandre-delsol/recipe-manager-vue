import { computed, ref } from 'vue'
import { getAreas, getCategories } from '@/services/mealDB'
import type { RecipeArea, RecipeCategory } from '@/types/recipe'

export function useRecipes() {
    const categories = ref<RecipeCategory[]>([])
    const areas = ref<RecipeArea[]>([])

    async function loadFilters() {
        const resultCategories = await getCategories()
        const resultAreas = await getAreas()

        categories.value = resultCategories
        areas.value = resultAreas
    }

    const areaOptions = computed(() =>
        areas.value.map((area) => ({
            label: area.strArea,
            value: area.strArea
        }))
    )

    return {
        categories,
        areaOptions,
        loadFilters
    }
}