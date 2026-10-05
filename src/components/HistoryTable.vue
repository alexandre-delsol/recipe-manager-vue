<script setup lang="ts">
import { EyeOutline, TrashOutline } from '@vicons/ionicons5'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NIcon, useMessage } from 'naive-ui'
import { h } from 'vue'
import { RouterLink } from 'vue-router'

import { useRecipeStore } from '@/stores/recipeStore'
import type { RecipeHistoryItem } from '@/types/recipe'

defineProps<{
    recipes: RecipeHistoryItem[]
}>()

const message = useMessage()
const recipeStore = useRecipeStore()

function formatVisitedAt(visitedAt: string): string {
    return new Date(visitedAt).toLocaleString('fr-FR', {
        dateStyle: 'short',
        timeStyle: 'short',
    })
}

function removeHistoryItem(id: string) {
    recipeStore.removeHistoryItem(id)
    message.success('Recette retirée de l’historique')
}

const columns: DataTableColumns<RecipeHistoryItem> = [
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
        title: 'Dernière visite',
        key: 'visitedAt',
        render(row) {
            return formatVisitedAt(row.visitedAt)
        },
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
                            onClick: () => removeHistoryItem(row.id),
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
</script>

<template>
    <!-- Desktop / tablette -->
    <div class="hidden sm:block">
        <NDataTable
            :columns="columns"
            :data="recipes"
            :scroll-x="900"
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

                <p class="mt-1 text-xs text-stone-400 dark:text-stone-500">
                    {{ formatVisitedAt(recipe.visitedAt) }}
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
                    aria-label="Supprimer de l'historique"
                    title="Supprimer de l'historique"
                    @click="removeHistoryItem(recipe.id)"
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
