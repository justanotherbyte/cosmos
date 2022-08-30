const folderComponent = document.getElementById("t-sidebar-item");
const foldersDrawer = document.getElementById("drawer-folders");
const foldersList = document.getElementById("folders-list");
const foldersListMobile = document.getElementById("folders-list-mobile");

const newFolder = document.getElementById("new-folder");
const newFolderMobile = document.getElementById("new-folder-mobile");
const folderCreateButton = document.getElementById("folder-create-modal-btn");
const folderCreateInput = document.getElementById("folder-create-input");

const notesGrid = document.getElementById("notes-grid");
const suchEmpty = document.getElementById("such-empty");
const folderName = document.getElementById("folder-name-heading");

const tauri = window.__TAURI__;
const invoke = window.__TAURI__.invoke;

document.addEventListener("DOMContentLoaded", () => {
    invoke("get_note_folders").then(folders => {
        if (folders.length === 0) {
            // just for the giggles
            let notesGrid = document.getElementById("notes-grid");
            notesGrid.classList.add("hidden");
            suchEmpty.classList.remove("hidden");
            folderName.classList.add("hidden");
        } else {
            suchEmpty.classList.add("hidden");
            notesGrid.classList.remove("hidden");
            folderName.classList.remove("hidden");
            for (let i = 0; i < folders.length; i++) {
                let folder = folders[i];
                let fName = folder[0];

                let clone = folderComponent.content.cloneNode(true);
                clone.getElementById("folder-name").innerHTML = fName;
                foldersList.appendChild(clone.cloneNode(true));
                foldersListMobile.appendChild(clone);
            }
        }

        // load first folder's notes
        folderName.innerHTML = folders[0][0];
        
    })
})

/** @param {String} [name] */
function createNewFolder(name) {
    invoke("create_note_folder", {"name": name}).then(create => {
        console.log(create)
    })
}

/** @param {String} [name] */
function deleteFolder(name) {
    
}

folderCreateButton.addEventListener("click", () => {
    createNewFolder(folderCreateInput.value);
    let ev = new Event("DOMContentLoaded");
    while (foldersList.firstChild) {
        foldersList.removeChild(foldersList.firstChild);
    }
    while (foldersListMobile.firstChild) {
        foldersListMobile.removeChild(foldersListMobile.firstChild);
    }
    document.dispatchEvent(ev);
});