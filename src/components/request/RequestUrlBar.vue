<template>
  <div class="flex items-center gap-2">
    <UFieldGroup class="w-full">
      <USelect
        v-model="request.method"
        :items="methodOptions"
        class="w-32"
      />

      <UInput
        v-model="request.url"
        placeholder="https://api.example.com/users"
        class="flex-1"
        @keydown.enter="requestStore.send"
      />
    </UFieldGroup>

    <UButton
      icon="i-lucide-send"
      label="Enviar"
      :loading="loading"
      :disabled="!canSend"
      color="primary"
      @click="requestStore.send"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const requestStore = useRequestStore()
const { request, loading, canSend } = storeToRefs(requestStore)

const methodOptions = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
]
</script>
