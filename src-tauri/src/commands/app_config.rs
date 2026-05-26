use serde::{Deserialize, Serialize};
use std::fs;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct AppConfig {
    pub last_workspace_path: Option<String>,
}

fn config_path(app: &tauri::AppHandle) -> Result<std::path::PathBuf, String> {
    let dir = app.path().app_config_dir().map_err(|e| e.to_string())?;

    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;

    Ok(dir.join("app-config.json"))
}

#[tauri::command]
pub fn get_app_config(app: tauri::AppHandle) -> Result<AppConfig, String> {
    let path = config_path(&app)?;

    if !path.exists() {
        return Ok(AppConfig::default());
    }

    let content = fs::read_to_string(path).map_err(|e| e.to_string())?;

    serde_json::from_str(&content).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_last_workspace_path(
    app: tauri::AppHandle,
    workspace_path: String,
) -> Result<(), String> {
    let path = config_path(&app)?;

    let config = AppConfig {
        last_workspace_path: Some(workspace_path),
    };

    let content = serde_json::to_string_pretty(&config).map_err(|e| e.to_string())?;

    fs::write(path, content).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn clear_last_workspace_path(app: tauri::AppHandle) -> Result<(), String> {
    let path = config_path(&app)?;

    let config = AppConfig {
        last_workspace_path: None,
    };

    let content = serde_json::to_string_pretty(&config).map_err(|e| e.to_string())?;

    fs::write(path, content).map_err(|e| e.to_string())
}
