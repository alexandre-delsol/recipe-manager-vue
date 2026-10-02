<script setup lang="ts">
import { TrashOutline } from '@vicons/ionicons5'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NDataTable, NIcon } from 'naive-ui'
import { h } from 'vue'

import { useRecipeStore } from '@/stores/recipeStore'
import type { RecipeSummary } from '@/types/recipe'

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
                NButton,
                {
                    type: 'error',
                    secondary: true,
                    onClick: () => recipeStore.removeFavorite(row.id),
                },
                {
                    icon: () =>
                        h(NIcon, null, {
                            default: () => h(TrashOutline),
                        }),
                    default: () => 'Supprimer',
                },
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
        <NDataTable :columns="columns" :data="recipes" :scroll-x="700" />
    </div>

    <!-- Mobile -->
    <div class="space-y-3 sm:hidden">
        <div v-for="recipe in recipes" :key="recipe.id" class="flex items-center justify-between gap-3
             rounded-lg border border-stone-200 bg-white p-4
             dark:border-stone-700 dark:bg-stone-900">
            <div class="min-w-0">
                <h2 class="truncate font-semibold text-stone-800
                 dark:text-stone-100">
                    {{ recipe.name }}
                </h2>

                <p class="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {{ recipe.category }} · {{ recipe.area }}
                </p>
            </div>

            <NButton type="error" secondary circle aria-label="Supprimer des favoris" title="Supprimer des favoris"
                class="shrink-0" @click="removeFavorite(recipe.id)">
                <template #icon>
                    <NIcon>
                        <TrashOutline />
                    </NIcon>
                </template>
            </NButton>
        </div>
    </div>
</template>