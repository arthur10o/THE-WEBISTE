async function light_mode () {
    /* Function to activate light mode */
    document.getElementById("button_dark_light_mode").textContent = "Activate Dark mode";
    document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";
    document.body.style.color = dark_color;
    document.body.style.background = light_color;
}

async function dark_mode() {
    /* Function to activate dark mode */
    document.getElementById("button_dark_light_mode").textContent = "Activate light mode";
    document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";
    document.body.style.color = light_color;
    document.body.style.background = dark_color;
}

async function change_dark_light_mode() {
    /* Function to change dark and light mode duringe loading */
    let state_mode = localStorage.getItem("state_dark_black_mode");
    if(state_mode == 0) {
        await light_mode();
    }else if(state_mode == 1){
        await dark_mode();
    }
}

async function toggle_dark_light_mode() {
    /* Function to switch between light and dark mode */
    let state_mode = localStorage.getItem("state_dark_black_mode");
    if(state_mode == 0) {
        light_mode();
        state_mode = 1;
    }else if(state_mode == 1){
        dark_mode();
        state_mode = 0;
    }
    localStorage.setItem("state_dark_black_mode", state_mode);
}

let dark_color = "#3C3C3C";
let light_color = "#B8B8B8";

addEventListener("load", function() {
    change_dark_light_mode();
    document.getElementById("button_dark_light_mode").addEventListener("click", toggle_dark_light_mode)
})