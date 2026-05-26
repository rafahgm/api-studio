use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf};

#[derive(Debug, Serialize, Deserialize)]
pub struct Collection {
    pub id: String,
    pub name: String,
    pub requests: Vec<String>,
}

#[tauri::command]
pub fn list_collections(workspace_path: String) -> Result<Vec<Collection>, String> {
    let collections_path = PathBuf::from(&workspace_path)
        .join(".api-studio")
        .join("collections");

    if !collections_path.exists() {
        return Err("Diretório de collections não econtrado".into());
    }

    let mut collections = Vec::new();

    for entry in fs::read_dir(collections_path).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();

        if path.extension().and_then(|ext| ext.to_str()) != Some("json") {
            continue;
        }

        let content = fs::read_to_string(&path).map_err(|e| e.to_string())?;
        let collection: Collection = serde_json::from_str(&content).map_err(|e| e.to_string())?;

        collections.push(collection);
    }

    Ok(collections)
}
