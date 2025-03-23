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

async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

let dark_color = "#3C3C3C";
let light_color = "#B8B8B8";
let contrast_element = document.getElementsByClassName("contrast");

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

document.getElementById("sign_up_form").addEventListener("submit", async function() {
    event.preventDefault();
    let email_enter = document.getElementById("mail").value;
    let username_enter = document.getElementById("username").value;
    let age_enter = document.getElementById("age").value;
    let gender_enter = document.getElementById("sex").value;
    let password_enter = document.getElementById("password").value;
    let password_confirmation_enter = document.getElementById("password_confirmation").value;
    let creation_date = Date();
    const valide_email_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (password_confirmation_enter != password_enter) {
        document.getElementById("error_message").textContent = "Invalid password !";
        return;
    } else if (!valide_email_format.test(email_enter)) {
        document.getElementById("error_message").textContent = "Invalid email !";
        return;
    } else if (gender_enter == document.getElementById("select_a_gender").value) {
        document.getElementById("error_message").textContent = "Select a gender !";
        return;
    }else {
        let email_hash = await hashString(email_enter);
        let password_hash = await hashString(password_enter);
        
        let user_information = {
            "username" : username_enter,
            "email" : email_hash,
            "password" : password_hash,
            "Date_of_creation" : creation_date,
            "light_dark_mode" : localStorage.getItem("last_state_light_dark_mode"),
            "age" : age_enter,
            "gender" : gender_enter,
        }

        let list_users_information = JSON.parse(localStorage.getItem("users_information")) || [];
        list_users_information.push(user_information);
        localStorage.setItem("users_information", JSON.stringify(list_users_information));
        localStorage.setItem("connection_state", true);
        localStorage.setItem("username_connected", username_enter);
        window.location.href = "../index/index.html";
    }
})


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