import { invoke } from '@tauri-apps/api/core'

export interface WorkspaceManifest {
  name: string
  version: number
  created_at: string
}

export interface Workspace {
  path: string
  manifest: WorkspaceManifest
}

export interface CreateWorkspaceResult {
  path: string
  manifest: WorkspaceManifest
}

export async function createWorkspace(basePath: string, name: string) {
  if (!basePath || Array.isArray(basePath)) {
    throw new Error('Diretório inválido')
  }

  return invoke<CreateWorkspaceResult>('create_workspace', {
    basePath,
    name,
  })
}

export async function openWorkspace(workspacePath: string) {
  return invoke<Workspace>('open_workspace', {
    workspacePath,
  })
}