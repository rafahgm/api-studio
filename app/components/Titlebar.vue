<template>
  <div
    class="flex items-center w-full shrink-0 bg-elevated/50 h-10 select-none"
    data-tauri-drag-region
  >
    <div class="px-3 flex gap-3">
      <UTooltip :text="workspaceStore.sidebarOpen ? $t('workspace.sidebar.close') : $t('workspace.sidebar.open')">
        <UButton
          :icon="workspaceStore.sidebarOpen ? 'i-lucide-panel-left-close' : 'i-lucide-panel-left-open'"
          size="sm"
          color="neutral"
          variant="ghost"

          @click="handleSidebar"
        />
      </UTooltip>

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
</template>

<script setup lang="ts">
import { getCurrentWindow } from '@tauri-apps/api/window'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const appWindow = getCurrentWindow()

const workspaceStore = useWorkspaceStore()

const isMaximized = ref(false)

const maximizeIcon = computed(() =>
  isMaximized.value ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2',
)

function handleSidebar() {
  workspaceStore.sidebarOpen = !workspaceStore.sidebarOpen
}

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