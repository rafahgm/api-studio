import type { Workspace } from '../features/workspaces'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { createWorkspace, openWorkspace } from '../features/workspaces'

export const useWorkspaceStore = defineStore('workspace', () => {
  const currentWorkspace = ref<Workspace | null>(null)
  const sidebarOpen = ref<boolean>(true)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const booting = ref<boolean>(false)

  const hasWorkspace = computed(() => currentWorkspace.value !== null)

  async function setCurrentWorkspace(workspace: Workspace) {
    const colelctionStore = useCollectionsStore()
    currentWorkspace.value = workspace

    await saveLastWorkspacePath(workspace.path)
    await colelctionStore.load(workspace.path)
  }

  async function boot() {
    booting.value = true
    error.value = null
    try {
      const config = await getAppConfig()

      if (!config.last_workspace_path)
        return

      const workspace = await openWorkspace(config.last_workspace_path)
      await setCurrentWorkspace(workspace)
    }
    catch {
      currentWorkspace.value = null
      await clearLastWorkspacePath()
      error.value = 'O último workspace não pôde ser aberto'
    }
    finally {
      booting.value = false
    }
  }

  async function create(path: string, name: string) {
    loading.value = true
    error.value = null

    try {
      const workspace = await createWorkspace(path, name)
      await setCurrentWorkspace(workspace)
    }
    catch (err) {
      error.value = String(err)
    }
    finally {
      loading.value = false
    }
  }

  async function open(path: string) {
    loading.value = true
    error.value = null

    try {
      const workspace = await openWorkspace(path)
      await setCurrentWorkspace(workspace)
    }
    catch (err) {
      error.value = String(err)
    }
    finally {
      loading.value = false
    }
  }

  async function close() {
    const colelctionStore = useCollectionsStore()

    currentWorkspace.value = null
    error.value = null

    colelctionStore.clear()

    await clearLastWorkspacePath()
  }

  return {
    boot,
    currentWorkspace,
    loading,
    error,
    hasWorkspace,
    create,
    open,
    close,
    booting,
    sidebarOpen,
  }
})
