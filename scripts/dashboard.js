const username = document.getElementById("username")
const logoutbtn = document.getElementById("logoutBtn");

logoutbtn.addEventListener("click", () => {
    sessionStorage.removeItem("session");
});

window.addEventListener("pageshow", () => {
    let name = sessionStorage.getItem("name");
    username.innerHTML = name;
});