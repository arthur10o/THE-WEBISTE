function set_mode(theme) {
    if (theme == "light") {
        document.getElementById("button_dark_light_mode").innerHTML = '<ion-icon name="moon-outline"></ion-icon> Dark Mode';

        document.body.style.color = dark_color;
        document.body.style.backgroundColor = light_color;

        for (let i = 0; i < contrast_element.length; i++) {
            contrast_element[i].style.color = light_color;
            contrast_element[i].style.backgroundColor = dark_color;
        }
    } else if (theme == "dark") {
        document.getElementById("button_dark_light_mode").innerHTML = '<ion-icon name="sunny-outline"></ion-icon> Light Mode';

        document.body.style.color = light_color;
        document.body.style.backgroundColor = dark_color;

        for (let i = 0; i < contrast_element.length; i++) {
            contrast_element[i].style.color = dark_color;
            contrast_element[i].style.backgroundColor = light_color;
        }
    } else {
        alert("A problem occurred when changing mode !");
        return;
    }
}

function toggle_light_and_dark_mode() {
    let last_state_light_dark_mode = localStorage.getItem("last_state_light_dark_mode");
    if (last_state_light_dark_mode == "light") {
        set_mode("dark");
        localStorage.setItem("last_state_light_dark_mode", "dark");
    } else if (last_state_light_dark_mode == "dark") {
        set_mode("light");
        localStorage.setItem("last_state_light_dark_mode", "light");
    }
}

let dark_color = "#3C3C3C";
let light_color = "#B8B8B8";
let contrast_element = document.getElementsByClassName("contrast");

addEventListener("load", function() {
    let last_state_light_dark_mode = localStorage.getItem("last_state_light_dark_mode");
    if (last_state_light_dark_mode == "dark") {
        set_mode("dark");
    } else {
        set_mode("light");
    }
});


document.getElementById("submit").addEventListener("mouseover", function() {
    let last_state_light_dark_mode = localStorage.getItem("last_state_light_dark_mode");

    if (last_state_light_dark_mode == "light") {
        document.getElementById("submit").style.color = "#D1D1D1";
    } else if (last_state_light_dark_mode == "dark") {
        document.getElementById("submit").style.color = "#3C3C3C";
    }
});

document.getElementById("submit").addEventListener("mouseout", function() {
    let last_state_light_dark_mode = localStorage.getItem("last_state_light_dark_mode");

    if (last_state_light_dark_mode == "light") {
        set_mode("light");
    } else if (last_state_light_dark_mode == "dark") {
        set_mode("dark");
    }
});