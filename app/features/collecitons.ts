import { invoke } from '@tauri-apps/api/core'

export interface Collection {
  id: string
  name: string
  requests: string[]
}

export async function listCollections(workspacePath: string) {
  return invoke<Collection[]>('list_collections', {
    workspacePath,
  })
}