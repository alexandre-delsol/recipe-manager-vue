<script setup lang="ts">
import { storeToRefs } from 'pinia'

import HistoryTable from '@/components/HistoryTable.vue'
import { useRecipeStore } from '@/stores/recipeStore'

const recipeStore = useRecipeStore()
const { history } = storeToRefs(recipeStore)
</script>

<template>
    <main class="mx-auto min-w-0 max-w-6xl px-4 py-8">
        <p>
            Nombre dans l'historique : {{ history.length }}
        </p>
        <p v-if="history.length === 0">
            Aucune recette favorite.
        </p>

        <div v-show="history.length > 0" class="w-full overflow-x-auto">
            <HistoryTable :recipes="history" />
        </div>
    </main>
</template>

<style scoped></style>
