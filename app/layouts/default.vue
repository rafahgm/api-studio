<template>
  <div class="flex flex-col flex-1">
    <div
      class="flex items-center select-none h-(--ui-header-height)"
      data-tauri-drag-region
    >
      <div class="px-4 gap-4 flex items-center">
        <div class="flex gap-1">
          <UButton
            label="Arquivo"
            color="neutral"
            size="sm"
            variant="ghost"
            trailing-icon="i-lucide-chevron-down"
          />

          <UButton
            label="Workspace"
            color="neutral"
            size="sm"
            variant="ghost"
            trailing-icon="i-lucide-chevron-down"
          />
        </div>
      </div>

      <div class="flex ml-auto">
        <UButton
          icon="i-lucide-minus"
          class="size-10 rounded-none"
          color="neutral"
          variant="ghost"
          block
          @click="handleMinimize"
        />

        <UButton
          :icon="maximizeIcon"
          class="size-10 rounded-none"
          color="neutral"
          variant="ghost"
          block
          @click="handleMaximize"
        />

        <UButton
          icon="i-lucide-x"
          class="size-10 rounded-none"
          color="error"
          block
          @click="handleClose"
        />
      </div>
    </div>

    <div class="flex flex-1 min-h-0">
      <USidebar
        v-model:open="workspaceStore.sidebarOpen"
        collapsible="none"
        :ui="{
          gap: 'h-[calc(100%-var(--ui-header-height))]',
          container:
            'absolute top-(--ui-header-height) bottom-0 h-[calc(100%-var(--ui-header-height))]'
        }"
      />

      <div class="flex-1 p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentWindow } from '@tauri-apps/api/window'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const appWindow = getCurrentWindow()

const workspaceStore = useWorkspaceStore()

const isMaximized = ref(false)

const maximizeIcon = computed(() =>
  isMaximized.value ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2'
)

function handleMinimize() {
  appWindow.minimize()
}

function handleMaximize() {
  appWindow.toggleMaximize()
}

let unlistenResize: (() => void) | null = null

onMounted(async () => {
  isMaximized.value = await appWindow.isMaximized()
  unlistenResize = await appWindow.onResized(async () => {
    isMaximized.value = await appWindow.isMaximized()
  })
})

onUnmounted(() => {
  unlistenResize?.()
})

function handleClose() {
  appWindow.close()
}
</script>
