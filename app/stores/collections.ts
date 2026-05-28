import { computed, ref } from 'vue'
import { listCollections, type Collection } from '~/features/collecitons'

export const useCollectionsStore = defineStore('collections', () => {
  const items = ref<Collection[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const hasCollections = computed(() => items.value.length > 0)

  async function load(workspacePath: string) {
    loading.value = true
    error.value = null

    try {
      items.value = await listCollections(workspacePath)
    }
    catch (err) {
      error.value = String(err)
    }
    finally {
      loading.value = false
    }
  }

  function clear() {
    items.value = []
    error.value = null
  }

  return {
    items,
    loading,
    error,
    hasCollections,
    load,
    clear,
  }
})