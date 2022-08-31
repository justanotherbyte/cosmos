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
var CURRENT_FOLDER_VIEW = null;

document.addEventListener("DOMContentLoaded", () => {
    clearFolderList();
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
                let mobileClone = clone.cloneNode(true);

                clone.getElementById("folder-name").innerHTML = fName;
                mobileClone.getElementById("folder-name").innerHTML = fName;
                
                function dfInternal() {
                    console.log("calling");
                    deleteFolder(fName)
                }
                
                clone.getElementById("delete-btn").onclick = dfInternal
                mobileClone.getElementById("delete-btn").onclick = dfInternal
                foldersList.appendChild(mobileClone);
                foldersListMobile.appendChild(clone);
            }
        }

        // load first folder's notes
        folderName.innerHTML = folders[0][0];
    })
})

function dispatchFakeEvent(evName, item) {
    let ev = new Event(evName);
    item.dispatchEvent(ev);
}

/** @param {String} [name] */
function createNewFolder(name) {
    invoke("create_note_folder", {"name": name}).then(create => {
        console.log(create)
    })
}

/** @param {String} [name] */
function deleteFolder(name) {
    console.log("deleting folder");
    invoke("delete_note_folder", {"name": name}).then(_ => {
        dispatchFakeEvent("DOMContentLoaded", document);
    })
}

function clearFolderList() {
    while (foldersList.firstChild) {
        foldersList.removeChild(foldersList.firstChild);
    }
    while (foldersListMobile.firstChild) {
        foldersListMobile.removeChild(foldersListMobile.firstChild);
    }
}

folderCreateButton.addEventListener("click", () => {
    createNewFolder(folderCreateInput.value);
    dispatchFakeEvent("DOMContentLoaded", document);
});