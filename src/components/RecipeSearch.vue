<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
import type { FormRules } from 'naive-ui'
import { reactive, useTemplateRef } from 'vue'

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  search: [query: string]
}>()

const rules: FormRules = {
  query: {
    required: true,
    message: 'Veuillez saisir une recette',
    trigger: ['input', 'blur']
  }
}

const formModel = reactive({
  query: model
})

const formRef = useTemplateRef('form')

async function handleSubmit() {
  try {
    await formRef.value?.validate()
    emit('search', model.value)
  } catch {
    return
  }
}
</script>

<template>
  <NForm
    ref="form"
    :model="formModel"
    :rules="rules"
    class="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6"
    @submit.prevent="handleSubmit"
  >
    <NFormItem
      path="query"
      class="mb-0"
    >
      <div class="flex w-full flex-col gap-2 sm:flex-row">
        <NInput
          v-model:value="model"
          placeholder="Rechercher une recette..."
          size="large"
          clearable
        />

        <NButton
          type="primary"
          size="large"
          attr-type="submit"
        >
          Rechercher
        </NButton>
      </div>
    </NFormItem>
  </NForm>
</template>

<style scoped></style>

