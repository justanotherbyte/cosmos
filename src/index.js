const folderComponent = document.getElementById("t-sidebar-item");
const foldersDrawer = document.getElementById("drawer-folders");
const foldersList = document.getElementById("folder-list");

foldersList.appendChild(folderComponent.content.cloneNode(true))

const tauri = window.__TAURI__;

