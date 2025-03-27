async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

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
        localStorage.setItem("last_connection", creation_date);
        window.location.href = "../index/index.html";
    }
})