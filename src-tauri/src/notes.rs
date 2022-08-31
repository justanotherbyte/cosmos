use crate::models::FolderCreate;

#[tauri::command]
pub async fn get_note_folders(app_handle: tauri::AppHandle) -> Vec<(String, String)> {
    let mut notes_folder = app_handle.path_resolver().app_dir().unwrap();
    notes_folder.push("Notes");

    let mut folders = vec![];

    let dir_iter = notes_folder.read_dir().unwrap();
    for item in dir_iter {
        if item.is_err() {
            continue
        }

        let item = item.unwrap();
        let item_name = item.file_name();
        let item_name = item_name.to_str().unwrap();
        let path = item.path();

        if path.is_dir() {
            let entry = (item_name.into(), path.to_str().unwrap().into());
            folders.push(entry);
        }
    }

    folders
}

#[tauri::command]
pub async fn create_note_folder(app_handle: tauri::AppHandle, name: String) -> FolderCreate {
    let mut notes_folder = app_handle.path_resolver().app_dir().unwrap();
    notes_folder.push("Notes");
    notes_folder.push(name);

    let path = notes_folder.to_str().unwrap().into();

    if notes_folder.exists() {
        FolderCreate {
            exists: true,
            path
        }
    } else {
        std::fs::create_dir(notes_folder).unwrap();
        FolderCreate {
            exists: false,
            path
        }
    }
}

#[tauri::command]
pub async fn delete_note_folder(app_handle: tauri::AppHandle, name: String) {
    let mut notes_folder = app_handle.path_resolver().app_dir().unwrap();
    notes_folder.push("Notes");
    notes_folder.push(name);

    if notes_folder.exists() {
        std::fs::remove_dir(notes_folder).unwrap();
    }
}