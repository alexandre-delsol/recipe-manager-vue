<script setup lang="ts">
import { NCard, NSkeleton } from 'naive-ui'
</script>

<template>
  <NCard
    class="w-full max-w-64 border border-stone-200 bg-white
           dark:border-stone-700 dark:bg-stone-900"
  >
    <NSkeleton
      height="160px"
      width="100%"
      :sharp="false"
    />

    <div class="mt-3 flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1 space-y-2">
        <NSkeleton
          height="24px"
          width="80%"
          :sharp="false"
        />

        <NSkeleton
          height="20px"
          width="60%"
          :sharp="false"
        />

        <NSkeleton
          height="20px"
          width="45%"
          :sharp="false"
        />
      </div>

      <NSkeleton
        circle
        height="32px"
        width="32px"
      />
    </div>
  </NCard>
</template>
