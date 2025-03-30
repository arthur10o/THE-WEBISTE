function logout() {
    localStorage.setItem("connection_state", false);
    localStorage.setItem("username_connected","");
    localStorage.setItem('last_connection', "");
    window.location = "../index/index.html";
}