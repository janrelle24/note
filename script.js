// start dropdown
let activeMenu = null;

// CLICK MENU BUTTON
document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let parent = e.target.parentElement;
        let menuId = parent.dataset.menu;

        // If clicking the same open menu → close it
        if (activeMenu === menuId) {
            document.getElementById(menuId).classList.remove("show");
            activeMenu = null;
            return;
        }

        // Close all menus
        document.querySelectorAll(".menu-content").forEach(m => m.classList.remove("show"));

        // Open clicked menu
        document.getElementById(menuId).classList.add("show");
        activeMenu = menuId;
    });
});

// HOVER TO SWITCH WHEN A MENU IS OPEN
document.querySelectorAll(".menu").forEach(menu => {
    menu.addEventListener("mouseenter", () => {
        if (activeMenu) {
            let menuId = menu.dataset.menu;

            // Switch to hovered menu
            document.querySelectorAll(".menu-content").forEach(m => m.classList.remove("show"));
            document.getElementById(menuId).classList.add("show");
            activeMenu = menuId;
        }
    });
});

// CLICK OUTSIDE → CLOSE ALL
window.addEventListener("click", (e) => {
    if (!e.target.matches('.menu-btn')) {
        document.querySelectorAll(".menu-content").forEach(m => m.classList.remove("show"));
        activeMenu = null;
    }
});
//end dropdown

//notebook functions
/*let note = document.getElementById("notebook");*/
/* ----------------- MULTIPLE NOTES SYSTEM ----------------- */
let noteCount = 1;
let notes = { 1: "" };
let activeNote = 1;

// Switch Notes
function switchNote(id) {
    notes[activeNote] = document.getElementById("notebook" + activeNote).value;

    document.querySelectorAll(".note-area").forEach(n => n.style.display = "none");
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

    document.getElementById("notebook" + id).style.display = "block";
    document.querySelector(`[data-note="${id}"]`).classList.add("active");

    activeNote = id;
}

// Add New Note
document.getElementById("addNoteBtn").onclick = () => {
    noteCount++;
    let newId = noteCount;

    // CREATE TAB
    let tab = document.createElement("button");
    tab.classList.add("tab-btn");
    tab.dataset.note = newId;
    tab.innerText = "Note " + newId;
    tab.onclick = () => switchNote(newId);
    document.getElementById("noteTabs").appendChild(tab);

    // CREATE TEXTAREA
    let ta = document.createElement("textarea");
    ta.classList.add("note-area");
    ta.id = "notebook" + newId;
    ta.style.display = "none";
    document.querySelector(".note-container").appendChild(ta);

    notes[newId] = "";

    switchNote(newId);
};

//new file
document.querySelector("#fileMenu a:nth-child(1)").onclick = () => {
    if (confirm("Create new note? Unsaved text will be lost.")) {
        notes.value = "";
    }
};

// OPEN FILE (text file)
document.querySelector("#fileMenu a:nth-child(2)").onclick = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";

    input.onchange = () => {
        let reader = new FileReader();
        reader.onload = () => { note.value = reader.result; };
        reader.readAsText(input.files[0]);
    };

    input.click();
};

// SAVE FILE
document.querySelector("#fileMenu a:nth-child(3)").onclick = () => {
    // Ask user for a filename
    let filename = prompt("Enter file name:", "OnlineNoteBook.txt");

    // If user clicks Cancel → stop save
    if (filename === null) return;

    // If no extension → add .txt
    if (!filename.includes(".")) {
        filename += ".txt";
    }

    let blob = new Blob([note.value], { type: "text/plain" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
};

/*
// ===== EDIT MENU =====

// UNDO
document.querySelector("#editMenu a:nth-child(1)").onclick = () => document.execCommand("undo");

// REDO
document.querySelector("#editMenu a:nth-child(2)").onclick = () => document.execCommand("redo");

// CUT
document.querySelector("#editMenu a:nth-child(3)").onclick = () => document.execCommand("cut");

// COPY
document.querySelector("#editMenu a:nth-child(4)").onclick = () => document.execCommand("copy");

// PASTE
document.querySelector("#editMenu a:nth-child(5)").onclick = () => document.execCommand("paste");


// ===== VIEW MENU =====

// ZOOM IN
document.querySelector("#viewMenu a:nth-child(1)").onclick = () => {
    let size = parseFloat(window.getComputedStyle(note).fontSize);
    note.style.fontSize = (size + 2) + "px";
};

// ZOOM OUT
document.querySelector("#viewMenu a:nth-child(2)").onclick = () => {
    let size = parseFloat(window.getComputedStyle(note).fontSize);
    if (size > 8) note.style.fontSize = (size - 2) + "px";
};

// FULLSCREEN
document.querySelector("#viewMenu a:nth-child(3)").onclick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};*/