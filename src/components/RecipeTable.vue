<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NIcon } from 'naive-ui'
import { h } from 'vue'
import { EyeOutline, TrashOutline } from '@vicons/ionicons5'
import { useRecipeStore } from '@/stores/recipeStore'
import type { RecipeSummary } from '@/types/recipe'
import { RouterLink } from 'vue-router'

defineProps<{
    recipes: RecipeSummary[]
}>()

const recipeStore = useRecipeStore()

const columns: DataTableColumns<RecipeSummary> = [
    {
        title: 'Nom',
        key: 'name',
    },
    {
        title: 'Catégorie',
        key: 'category',
    },
    {
        title: 'Origine',
        key: 'area',
    },
    {
        title: 'Actions',
        key: 'actions',
        render(row) {
            return h(
                'div',
                {
                    class: 'flex gap-2',
                },
                [
                    h(
                        RouterLink,
                        {
                            to: `/recipes/${row.id}`,
                        },
                        {
                            default: () =>
                                h(
                                    NButton,
                                    {
                                        type: 'primary',
                                        secondary: true,
                                    },
                                    {
                                        icon: () =>
                                            h(NIcon, null, {
                                                default: () => h(EyeOutline),
                                            }),
                                        default: () => 'Voir',
                                    },
                                ),
                        },
                    ),

                    h(
                        NButton,
                        {
                            type: 'error',
                            secondary: true,
                            onClick: () => removeFavorite(row.id),
                        },
                        {
                            icon: () =>
                                h(NIcon, null, {
                                    default: () => h(TrashOutline),
                                }),
                            default: () => 'Supprimer',
                        },
                    ),
                ],
            )
        },
    },
]

function removeFavorite(id: string) {
    recipeStore.removeFavorite(id)
}
</script>

<template>
    <!-- Desktop / tablette -->
    <div class="hidden sm:block">
        <NDataTable
            :columns="columns"
            :data="recipes"
            :scroll-x="700"
        />
    </div>

    <!-- Mobile -->
    <div class="space-y-3 sm:hidden">
        <div
            v-for="recipe in recipes"
            :key="recipe.id"
            class="flex items-center justify-between gap-3
                   rounded-lg border border-stone-200 bg-white p-4
                   dark:border-stone-700 dark:bg-stone-900"
        >
            <div class="min-w-0">
                <h2
                    class="truncate font-semibold text-stone-800
                           dark:text-stone-100"
                >
                    {{ recipe.name }}
                </h2>

                <p class="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {{ recipe.category }} · {{ recipe.area }}
                </p>
            </div>

            <div class="flex shrink-0 gap-2">
                <RouterLink :to="`/recipes/${recipe.id}`">
                    <NButton
                        type="primary"
                        secondary
                        circle
                        aria-label="Voir la recette"
                        title="Voir la recette"
                    >
                        <template #icon>
                            <NIcon>
                                <EyeOutline />
                            </NIcon>
                        </template>
                    </NButton>
                </RouterLink>

                <NButton
                    type="error"
                    secondary
                    circle
                    aria-label="Supprimer des favoris"
                    title="Supprimer des favoris"
                    @click="removeFavorite(recipe.id)"
                >
                    <template #icon>
                        <NIcon>
                            <TrashOutline />
                        </NIcon>
                    </template>
                </NButton>
            </div>
        </div>
    </div>
</template>