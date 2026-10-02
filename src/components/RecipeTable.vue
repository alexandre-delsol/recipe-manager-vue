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
</script>

<template>
  <NDataTable
    :columns="columns"
    :data="recipes"
    :scroll-x="700"
  />
</template>
