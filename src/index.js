const folderComponent = document.getElementById("t-sidebar-item");
const foldersDrawer = document.getElementById("drawer-folders");
const foldersList = document.getElementById("folders-list");
const foldersListMobile = document.getElementById("folders-list-mobile");

foldersList.appendChild(folderComponent.content.cloneNode(true))
foldersList.appendChild(folderComponent.content.cloneNode(true))
foldersListMobile.appendChild(folderComponent.content.cloneNode(true))
foldersListMobile.appendChild(folderComponent.content.cloneNode(true))

const tauri = window.__TAURI__;

