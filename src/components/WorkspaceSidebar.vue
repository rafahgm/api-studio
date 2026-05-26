<template>
  <USidebar
    v-model:open="workspaceStore.sidebarOpen"
    rail
  >
    <template #header>
      <span class="text-xs font-semibold text-muted uppercase">Collections</span>

      <UTooltip text="Criar nova collection">
        <UButton
          class="ml-auto"
          icon="i-lucide-circle-plus"
          color="neutral"
          variant="ghost"
          size="sm"
        />
      </UTooltip>
    </template>

    <template #default>
      <UTree
        v-if="collectionsStore.hasCollections"
        selection-behavior="replace"
        :items="collectionsTree"
      />

      <UEmpty
        v-else
        icon="i-lucide-book-marked"
        title="Você ainda não possui nenhuma collection"
        description="Crie sua primeira collection para fazer as requests"
        :actions="[{
          label: 'Criar collection',
          icon: 'i-lucide-circle-plus',
        }]"
      />
    </template>
  </USidebar>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const collectionsStore = useCollectionsStore()
const workspaceStore = useWorkspaceStore()

const collectionsTree = computed(() => collectionsStore.items.map(c => ({
  label: c.name,
  onSelect: (e: Event) => {
    e.preventDefault()
  },
  children: [
    ...c.requests.map(r => ({ label: r })),
    {
      label: 'Criar nova request',
      icon: 'i-lucide-circle-plus',
    },
  ],
})))
</script>
