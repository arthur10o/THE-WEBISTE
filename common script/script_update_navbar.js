async function update_index_navbar() {
    const connection_state = localStorage.getItem("connection_state") || "false";

    console.log(connection_state);

    if (connection_state == "true") {
        var logout = document.createElement("button");
        var settigs = document.createElement("a");
        var parent = document.getElementById("nav_ul");

        logout.innerHTML = '<ion-icon name="exit-outline"></ion-icon>Logout';
        settigs.innerHTML = '<ion-icon name="person-outline"></ion-icon>Settings';

        parent.appendChild(logout);
        parent.appendChild(settigs);
    } else if (connection_state == "false") {
        var login = document.createElement('a');
        var sign_up = document.createElement("a");
        var parent = document.getElementById("nav_ul");

        login.href = "../login/login.html";
        sign_up.href = "../sign up/sign_up.html";

        login.innerHTML = '<ion-icon name="log-in-outline"></ion-icon>Login';
        sign_up.innerHTML = '<ion-icon name="people-outline"></ion-icon>Sign up';

        parent.appendChild(login);
        parent.appendChild(sign_up);
    } else {
        alert('Please refresh the page ! A problem has occurred !');
    }
}

window.addEventListener("load", async function () {
    await update_index_navbar();
});