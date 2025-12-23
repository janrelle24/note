/*fetch("/api/list").then(res => {
    if (res.status === 401) {
        location.href = "/login.html";
    }
});*/
if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    fetch("/api/list").then(res => {
        if (res.status === 401) {
            location.href = "/login.html";
        }
    });
}
//login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if(!username || !password){
            alert("Please enter username and password");
            return;
        }
        try{
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if(res.ok) {
                window.location.href = "/"; //redirect to home page
            }else{
                alert(data.error || "Invalid username or password");
            }

        }catch(err){
            console.error(err);
            alert("Server error. Please try again.");
        }
    });
}

//signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const username = document.getElementById("signupUsername").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();
        const confirm = document.getElementById("signupConfirm").value.trim();

        if(!username || !email || !password || !confirm){
            alert("Please fill in all fields");
            return;
        }
        if(password !== confirm){
            alert("Passwords do not match");
            return;
        }
        try{
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
            const dat = await res.json();
            if(res.ok){
                alert("Registration successful!");
                window.location.href = "/login.html"; //redirect to login page
            }else{
                alert(dat.error || "Registration failed");
            }
        }catch (err){
            console.error(err);
            alert("Server error. Please try again.");
        }
    });
}
//logout
const logout = document.getElementById("logout");
if (logout){
    logout.addEventListener("click", async (e) =>{
        e.preventDefault();

        try{
            const res = await fetch("/api/logout", {
                method: "POST"
            });
            if(res.ok){
                window.location.href = "/login.html"; //redirect to login page
            }else{
                alert("Logout failed");
            }
        }catch(err){
            console.error(err);
            alert("Server error. Please try again.");
        }
    });
}

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

/* ----------------- MULTIPLE NOTES SYSTEM ----------------- */
let noteCount = 1;
let notes = {
    1: {
        content: "",
        filename: null
    }
};
let activeNote = 1;

// Switch Notes
function switchNote(id) {
    // Save current note before switching
    let currentTa = document.getElementById("notebook" + activeNote);
    if (currentTa) {
        notes[activeNote].content = currentTa.value;
    }

    // Hide all textareas
    document.querySelectorAll(".note-area").forEach(n => n.style.display = "none");
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

    // Show new note
    
    document.getElementById("notebook" + id).value =
        notes[id].content || "";
    document.getElementById("notebook" + id).style.display = "block";
    document.querySelector(`[data-note="${id}"]`).classList.add("active");

    activeNote = id;
}

// Create new note tab + textarea
function createNote(id) {
    // Create tab
    let tab = document.createElement("button");
    tab.classList.add("tab-btn");
    tab.dataset.note = id;
    tab.innerHTML = `
        <span class="tab-title">Note ${id}</span>
        <i class="fa-solid fa-x close-tab"></i>
    `;

    document.getElementById("noteTabs").appendChild(tab);

    // Create textarea
    let ta = document.createElement("textarea");
    ta.classList.add("note-area");
    ta.id = "notebook" + id;
    ta.style.display = "none";
    document.querySelector(".note-container").appendChild(ta);

    notes[id] = {
        content: "",
        filename: null
    };
}

// Add new note button
document.getElementById("addNoteBtn").addEventListener("click", () => {
    noteCount++;
    createNote(noteCount);
    switchNote(noteCount);
});

// Handle tab clicks (Event Delegation)
document.getElementById("noteTabs").addEventListener("click", (e) => {
    if (e.target.classList.contains("close-tab")) {
        e.stopPropagation(); // stop tab switch

        let tab = e.target.parentElement;
        let id = Number(tab.dataset.note);

        // Prevent closing last note
        if (Object.keys(notes).length === 1) {
            alert("You must have at least one note.");
            return;
        }

        let isActive = id === activeNote;

         // Remove textarea & tab
        document.getElementById("notebook" + id)?.remove();
        // Remove tab
        tab.remove();
        // Remove from notes object
        delete notes[id];

        // If closed note was active
        if (isActive) {
            let remainingId = Number(Object.keys(notes)[0]);
            activeNote = remainingId; 
            switchNote(remainingId);
        }
        return;
    }
    // SWITCH TAB
    let tab = e.target.closest(".tab-btn");
    if (tab) {
        let id = Number(tab.dataset.note);
        switchNote(id);
    }
}); 

//new file
document.querySelector("#fileMenu a:nth-child(1)").onclick = () => {
    if (confirm("Create new note? Unsaved text will be lost.")) {
        document.getElementById("notebook" + activeNote).value = "";
        document.querySelector(
            `[data-note="${activeNote}"] .tab-title`
        ).innerText = "Note " + activeNote;
    }
};

// OPEN FILE (text file)
const fileModal = document.getElementById("fileModal");
const fileList = document.getElementById("fileList");
const closeModal = document.getElementById("closeModal");
document.querySelector("#fileMenu a:nth-child(2)").onclick = async () => {
    try{
        //get list of files from server
        let res = await fetch("/api/list");
        let files = await res.json();

        if (files.length === 0) {
            alert("No saved notes found.");
            return;
        }
        // Clear list
        fileList.innerHTML = "";
        // Populate file list
        files.forEach(filename => {
            let li = document.createElement("li");
            li.textContent = "file-item";

            li.innerHTML = `
                <span class="file-name">${filename}</span>
                <div class="file-actions">
                    <button class="open-btn" title="Open">
                        <i class="fa-solid fa-folder-open"></i>
                    </button>
                    <button class="rename-btn" title="Rename">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="delete-btn" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;

            li.querySelector(".open-btn").onclick = () => openFile(filename);
            li.querySelector(".delete-btn").onclick = () => deleteFile(filename);
            li.querySelector(".rename-btn").onclick = () => renameFile(filename);

            fileList.appendChild(li);
        });
        // Show modal
        fileModal.style.display = "flex";
    } catch(err){
        alert("Failed to open file");
        console.error(err);
    }

};
closeModal.onclick = () => fileModal.style.display = "none";
fileModal.onclick = e => {
    if (e.target === fileModal) fileModal.style.display = "none";
};

//Open file
async function openFile(filename) {
    try {
        let res = await fetch(`/api/open/${filename}`);
        let data = await res.json();

        let ta = document.getElementById("notebook" + activeNote);
        ta.value = data.content;

        notes[activeNote].content = data.content;
        notes[activeNote].filename = filename;

        document.querySelector(
            `[data-note="${activeNote}"] .tab-title`
        ).innerText = filename.replace(".txt", "");

        fileModal.style.display = "none";
    } catch (err) {
        alert("Failed to open file");
        console.error(err);
    }
}
//delete file
async function deleteFile(filename) {
    if (!confirm(`Delete "${filename}"?`)) return;

    try {
        await fetch("/api/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename })
        });

        // If currently open file
        if (notes[activeNote].filename === filename) {
            notes[activeNote].filename = null;
            document.getElementById("notebook" + activeNote).value = "";
            document.querySelector(
                `[data-note="${activeNote}"] .tab-title`
            ).innerText = "Note " + activeNote;
        }

        alert("File deleted");
        fileModal.style.display = "none";
    } catch (err) {
        alert("Delete failed");
        console.error(err);
    }
}
//rename file
async function renameFile(oldName) {
    let newName = prompt("Rename file:", oldName);
    if (!newName || newName === oldName) return;

    if (!newName.endsWith(".txt")) {
        newName += ".txt";
    }

    try {
        await fetch("/api/rename", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldName, newName })
        });

        // If active note
        if (notes[activeNote].filename === oldName) {
            notes[activeNote].filename = newName;
            document.querySelector(
                `[data-note="${activeNote}"] .tab-title`
            ).innerText = newName.replace(".txt", "");
        }

        alert("File renamed");
        fileModal.style.display = "none";
    } catch (err) {
        alert("Rename failed");
        console.error(err);
    }
}


// SAVE FILE
//connect to server to save file
document.querySelector("#fileMenu a:nth-child(3)").onclick = async () => {
    
    let note = notes[activeNote];
    let current = document.getElementById("notebook" + activeNote);

    // Save current content
    note.content = current.value;

    // Ask filename ONLY if not saved before
    if (!note.filename) {
        let filename = prompt("Enter file name:", "OnlineNoteBook.txt");
        if (filename === null) return;

        if (!filename.includes(".")) {
            filename += ".txt";
        }

        note.filename = filename;

        // Update tab title
        document.querySelector(
            `[data-note="${activeNote}"] .tab-title`
        ).innerText = filename.replace(".txt", "");
    }
    await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            filename: note.filename,
            content: note.content
        })
    });
    alert("File saved successfully!");
    /*
    // Create file
    let blob = new Blob([note.content], { type: "text/plain" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = note.filename;
    a.click();

    URL.revokeObjectURL(url);*/
};




// ===== EDIT MENU =====

// UNDO
document.querySelector("#editMenu a:nth-child(1)").onclick = () =>
    document.execCommand("undo");

// REDO
document.querySelector("#editMenu a:nth-child(2)").onclick = () =>
    document.execCommand("redo");

// CUT
document.querySelector("#editMenu a:nth-child(3)").onclick = () => {
    let current = document.getElementById("notebook" + activeNote);
    let selected = current.value.substring(current.selectionStart, current.selectionEnd);

    navigator.clipboard.writeText(selected).then(() => {
        current.value =
            current.value.slice(0, current.selectionStart) +
            current.value.slice(current.selectionEnd);
    });
};

// COPY
document.querySelector("#editMenu a:nth-child(4)").onclick = () => {
    let current = document.getElementById("notebook" + activeNote);
    navigator.clipboard.writeText(current.value.substring(current.selectionStart, current.selectionEnd));
};


// PASTE
document.querySelector("#editMenu a:nth-child(5)").onclick = async () => {
    let current = document.getElementById("notebook" + activeNote);
    let text = await navigator.clipboard.readText();

    let start = current.selectionStart;
    let end = current.selectionEnd;

    current.value =
        current.value.slice(0, start) +
        text +
        current.value.slice(end);

    current.selectionStart = current.selectionEnd = start + text.length;
};



// ===== VIEW MENU =====

// ZOOM IN
document.querySelector("#viewMenu a:nth-child(1)").onclick = () => {
    let current = document.getElementById("notebook" + activeNote);
    let size = parseFloat(window.getComputedStyle(current).fontSize);
    current.style.fontSize = (size + 2) + "px";
};

// ZOOM OUT
document.querySelector("#viewMenu a:nth-child(2)").onclick = () => {
    let current = document.getElementById("notebook" + activeNote);
    let size = parseFloat(window.getComputedStyle(current).fontSize);
    if (size > 8) current.style.fontSize = (size - 2) + "px";
};

// FULLSCREEN
document.querySelector("#viewMenu a:nth-child(3)").onclick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};