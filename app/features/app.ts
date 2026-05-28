import { invoke } from '@tauri-apps/api/core'

export interface AppConfig {
  last_workspace_path: string | null
}

export function getAppConfig() {
  return invoke<AppConfig>('get_app_config')
}

export function saveLastWorkspacePath(workspacePath: string) {
  return invoke<void>('save_last_workspace_path', {
    workspacePath,
  })
}

export function clearLastWorkspacePath() {
  return invoke<void>('clear_last_workspace_path')
}