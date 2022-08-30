#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod notes;
mod models;

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            notes::get_note_folders,
            notes::create_note_folder
        ])
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();
            let app_dir = app.path_resolver().app_dir().unwrap();
            
            if !app_dir.exists() {
                let mut internal = app_dir.clone();
                std::fs::create_dir(&internal).unwrap();

                dbg!("Initial app dir didn't exist, so we made it");

                // since that parent directory never existed
                // we'll oblige and create the user's first folder
                internal.push("Notes");
                std::fs::create_dir(&internal).unwrap();
                dbg!("Made notes folder");
            } else {
                // the app directory exists
                // we make a check to see if there's a "Notes" folder
                // if not we'll make one

                let mut internal = app_dir.clone();
                internal.push("Notes");
                if !internal.exists() {
                    dbg!("App Dir exists, but Notes Folder does not exist");
                    std::fs::create_dir(&internal).unwrap();
                    dbg!("Made notes folder");
                }
            }

            let app_dir = std::fs::read_dir(app_dir).unwrap();

            tauri::async_runtime::spawn(async move {
                // initialize your app here instead of sleeping :)
                
                for path in app_dir {
                    println!("{}", path.unwrap().path().display())
                }

                println!("Initializing...");
                std::thread::sleep(std::time::Duration::from_secs(2));
                println!("Done initializing.");
        
                // After it's done, close the splashscreen and display the main window
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
              });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
