use std::{fs, path::PathBuf};

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct WorkspaceManifest {
    pub name: String,
    pub version: u8,
    pub created_at: String,
}

#[derive(Debug, Serialize)]
pub struct CreateWorkspaceResult {
    pub path: String,
    pub manifest: WorkspaceManifest,
}

#[tauri::command]
pub fn create_workspace(base_path: String, name: String) -> Result<CreateWorkspaceResult, String> {
    let workspace_path = PathBuf::from(base_path);
    let meta_path: PathBuf = workspace_path.join(".api-studio");

    if meta_path.exists() {
        return Err("Já existe um workspace nesse diretório".into());
    }

    fs::create_dir_all(&meta_path).map_err(|e| e.to_string())?;
    fs::create_dir_all(meta_path.join("environments")).map_err(|e| e.to_string())?;
    fs::create_dir_all(meta_path.join("collections")).map_err(|e| e.to_string())?;
    fs::create_dir_all(meta_path.join("requests")).map_err(|e| e.to_string())?;
    fs::create_dir_all(meta_path.join("history")).map_err(|e| e.to_string())?;

    let manifest = WorkspaceManifest {
        name,
        version: 1,
        created_at: chrono::Utc::now().to_rfc3339(),
    };

    let manifest_json = serde_json::to_string_pretty(&manifest).map_err(|e| e.to_string())?;

    fs::write(meta_path.join("workspace.json"), manifest_json).map_err(|e| e.to_string())?;
    fs::write(
        meta_path.join("collections").join("default.json"),
        serde_json::json!({
            "id": "default",
            "name": "Default",
            "requests": []
        })
        .to_string(),
    )
    .map_err(|e| e.to_string())?;

    Ok(CreateWorkspaceResult {
        path: workspace_path.to_string_lossy().to_string(),
        manifest,
    })
}

#[tauri::command]
pub fn open_workspace(workspace_path: String) -> Result<CreateWorkspaceResult, String> {
    let path = PathBuf::from(&workspace_path);

    if !path.exists() {
        return Err("A pasta selecionada não existe".into());
    }

    let manifest_path = path.join(".api-studio").join("workspace.json");

    if !manifest_path.exists() {
        return Err("Esta pasta não contém um workspace válido".into());
    }

    let mainfest_content = fs::read_to_string(manifest_path).map_err(|e| e.to_string())?;

    let manifest: WorkspaceManifest =
        serde_json::from_str(&mainfest_content).map_err(|e| e.to_string())?;

    Ok(CreateWorkspaceResult {
        path: path.to_string_lossy().to_string(),
        manifest,
    })
}
