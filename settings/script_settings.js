async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function update_connection_history() {
    let connection_history_element = document.getElementById('connection_history');
    let user_information = JSON.parse(localStorage.getItem("users_information"));
    let user_connect = localStorage.getItem("username_connected");
    let find_user_on_user_list = user_information.find(user=>user.username == user_connect);

    if (find_user_on_user_list) {
        let connection_history_user = find_user_on_user_list.connection_history;
        connection_history_element.innerText = connection_history_user.join('\n');
    } else {
        alert("An error has occured !");
        return;
    }
}

async function checkChanges() {
    let changesMade = false;
    if (document.getElementById("username").value !== initialValues.username) changesMade = true;
    if (document.getElementById("password").value !== initialValues.password) changesMade = true;
    if (document.getElementById("password_confirmation").value !== initialValues.password_confirmation) changesMade = true;
    if (document.getElementById("email").value !== initialValues.email) changesMade = true;
    if (document.getElementById("lang").value !== initialValues.lang) changesMade = true;
    if (document.getElementById("photo").value !== initialValues.photo) changesMade = true;
    return changesMade;
}

async function resert_changes() {
    document.getElementById("username").value = initialValues.username;
    document.getElementById("password").value = initialValues.password;
    document.getElementById("password_confirmation").value = initialValues.password_confirmation;
    document.getElementById("email").value = initialValues.email;
    document.getElementById("lang").value = initialValues.lang;
    document.getElementById("photo").value = initialValues.photo;
}

async function change_username() {
    let username_element = document.getElementById("username").value;
    if (username_element != "") {
        let user_information = JSON.parse(localStorage.getItem("users_information"));
        let user_connect = localStorage.getItem("username_connected");
        let find_user_on_user_list = user_information.find(user=>user.username == user_connect);
        if(find_user_on_user_list) {
            find_user_on_user_list.username = username_element;
            localStorage.setItem("users_information", JSON.stringify(user_information));
            localStorage.setItem("username_connected", username_element);
        }
    }
}

async function change_password() {
    let password_element = document.getElementById("password").value;
    let password_confirmation_element = document.getElementById("password_confirmation").value;
    if ((password_element != "") && (password_confirmation_element != "")) {
        if (password_confirmation_element == password_element) {
            const password_hashed = await hashString(password_element);
            let user_information = JSON.parse(localStorage.getItem("users_information"));
            let user_connect = localStorage.getItem("username_connected");
            let find_user_on_user_list = user_information.find(user=>user.username == user_connect);
            if(find_user_on_user_list) {
                find_user_on_user_list.password = password_hashed;
                localStorage.setItem("users_information", JSON.stringify(user_information));
            }
        }
    }
}

async function save_change() {
    if (await checkChanges()) {
        const confirmation = confirm("Do you want to confirm all the changes ?");
        if (confirmation) {
            await change_username();
            await change_password();
            await resert_changes();
        } else if (!confirmation) {
            alert("Your changes have not been modified !");
            location.reload();
        }
    } else {
        alert("You haven't made any changes !")
    }
}

const initialValues = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    password_confirmation: document.getElementById("password_confirmation").value,
    email: document.getElementById("email").value,
    lang: document.getElementById("lang").value,
    photo: document.getElementById("photo").value
};

addEventListener("load", async function() {
    await update_connection_history();
});