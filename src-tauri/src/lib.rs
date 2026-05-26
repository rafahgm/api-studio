mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            commands::workspaces::create_workspace,
            commands::workspaces::open_workspace,
            commands::collections::list_collections,
            commands::app_config::get_app_config,
            commands::app_config::save_last_workspace_path,
            commands::app_config::clear_last_workspace_path,
            commands::http::execute_request
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
