#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();
            let app_dir = app.path_resolver().app_dir().unwrap();
            
            if !app_dir.exists() {
                std::fs::create_dir(&app_dir).unwrap()
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
