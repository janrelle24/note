// start dropdown
/*
function dropDown(id){
    // Close all menus first
    let dropdowns = document.getElementsByClassName("menu-content");
    for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id !== id) {
            dropdowns[i].classList.remove("show");
        }
    }
     // Then toggle the one clicked
    document.getElementById(id).classList.toggle("show");
}

// Close when clicking outside menus
window.onclick = function(event){
    if(!event.target.matches('.menu-btn')){
        let dropdowns = document.getElementsByClassName("menu-content");z
        for (let i = 0; i < dropdowns.length; i++){
            if (dropdowns[i].classList.contains('show')) {
                dropdowns[i].classList.remove('show');
            }
        }
    }
}
//end dropdown*/
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