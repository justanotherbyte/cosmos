use serde::Serialize;

#[derive(Serialize)]
pub struct FolderCreate {
    pub exists: bool,
    pub path: String
}