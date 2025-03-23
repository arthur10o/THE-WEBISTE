async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.getElementById("login_form").addEventListener("submit", async function() {
    event.preventDefault();
    let username_enter = document.getElementById("username").value;
    let password_enter = document.getElementById("password").value;
    let password_confirmation_enter = document.getElementById("password_confirmation").value;
    let date_of_connection = Date();
    const valide_email_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (password_confirmation_enter != password_enter) {
        document.getElementById("error_message").textContent = "Your email or password is wrong !";
        return;
    } else {
        let password_hash = await hashString(password_enter);
        let user_information = JSON.parse(localStorage.getItem("users_information"));
        try {
            let find_user_on_user_list = user_information.find(user=>user.username == username_enter);
            if (find_user_on_user_list == null) {
                document.getElementById("error_message").textContent = "Your email or password is wrong !";
                return;
            } else {
                if (find_user_on_user_list.password == password_hash) {
                    localStorage.setItem("connection_state", true);
                    localStorage.setItem("username_connected", username_enter);
                    window.location.href = "../index/index.html";
                } else {
                    document.getElementById("error_message").textContent = "Your email or password is wrong !";
                    return;
                }
            }
        } catch {
            alert("An error has occurred ! Please try again !")
        }
    }
})