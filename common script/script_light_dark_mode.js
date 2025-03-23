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
    for (let i = 0; i < hover_element.length; i++) {
        hover_element[i].style.color = "inherit";
    }
}

function toggle_light_and_dark_mode() {
    let last_state_light_dark_mode = localStorage.getItem("last_state_light_dark_mode");
    let connection_state = localStorage.getItem("connection_state");
    if (last_state_light_dark_mode == "light") {
        set_mode("dark");
        localStorage.setItem("last_state_light_dark_mode", "dark");
        if (connection_state == "true") {
            let user_information = JSON.parse(localStorage.getItem("users_information"));
            let user_connect = localStorage.getItem("username_connected");
            let find_user_connected = user_information.find(user=>user.username == user_connect);
            find_user_connected.light_dark_mode = "dark";
            localStorage.setItem("users_information", JSON.stringify(user_information));
        }
    } else if (last_state_light_dark_mode == "dark") {
        set_mode("light");
        localStorage.setItem("last_state_light_dark_mode", "light");
        if (connection_state == "true") {
            let user_information = JSON.parse(localStorage.getItem("users_information"));
            let user_connect = localStorage.getItem("username_connected");
            let find_user_connected = user_information.find(user=>user.username == user_connect);
            find_user_connected.light_dark_mode = "light";
            localStorage.setItem("users_information", JSON.stringify(user_information));
        }
    }
}

const dark_color = "#3C3C3C";
const light_color = "#B8B8B8";
const dark_color_hover = "#2A2A2A ";
const light_color_hover = "#D1D1D1";
const contrast_element = document.getElementsByClassName("contrast");
let hover_element = document.getElementsByClassName("hover");

addEventListener("load", function() {
    let last_state_light_dark_mode = localStorage.getItem("last_state_light_dark_mode");
    let connection_state = localStorage.getItem("connection_state");

    if (connection_state == "true") {
        let users_information = JSON.parse(localStorage.getItem("users_information"));
        let user_connected = localStorage.getItem("username_connected");
        let find_user_connected = users_information.find(user=>user.username == user_connected);
        let last_state_light_dark_mode_user_connecter = find_user_connected.light_dark_mode;
        set_mode(last_state_light_dark_mode_user_connecter);
    } else {
        if (last_state_light_dark_mode == "dark") {
            set_mode("dark");
        } else {
            set_mode("light");
            localStorage.setItem("last_state_light_dark_mode", "light");
        }
    }
});

for (let i = 0; i < hover_element.length; i++) {
    hover_element[i].addEventListener("mouseover", function() {
        let last_state_light_dark_mode = localStorage.getItem("last_state_light_dark_mode");

        let color = last_state_light_dark_mode === "light" ? light_color_hover : dark_color_hover;
        hover_element[i].style.color = color;
    });

    hover_element[i].addEventListener("mouseout", function() {
        let last_state_light_dark_mode = localStorage.getItem("last_state_light_dark_mode");

        let color = last_state_light_dark_mode === "light" ? light_color : dark_color;
        hover_element[i].style.color = color;
    });
}