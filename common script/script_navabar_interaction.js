async function update_index_navbar() {
    const connection_state = localStorage.getItem("connection_state") || "false";

    if (connection_state == "true") {
        let page_name = document.title;
        let logout = document.createElement("button");
        let parent = document.getElementById("nav_ul");

        if (page_name == "THE WEBISTE : Settings") {
            let home = document.createElement("a");
            
            home.href = "../index/index.html";
            home.innerHTML = '<ion-icon name="home-outline"></ion-icon>Home';
            parent.appendChild(home);
        } else if (page_name == "THE WEBSITE") {
            let settigs = document.createElement("a");
            
            settigs.href = "../settings/settings.html";
            settigs.innerHTML = '<ion-icon name="person-outline"></ion-icon>Settings';
            parent.appendChild(settigs);
        }
        logout.setAttribute("onclick","logout()");
        logout.innerHTML = '<ion-icon name="exit-outline"></ion-icon>Logout';

        parent.appendChild(logout);
    } else if (connection_state == "false") {
        let login = document.createElement('a');
        let sign_up = document.createElement("a");
        let parent = document.getElementById("nav_ul");

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