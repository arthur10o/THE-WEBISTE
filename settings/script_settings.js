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

addEventListener("load", async function() {
    await update_connection_history();
});