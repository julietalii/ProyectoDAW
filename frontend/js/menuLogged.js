document.getElementById("logoutBoton").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario_id");
    localStorage.removeItem("username");
    window.location.href = "inicio.html";
});
