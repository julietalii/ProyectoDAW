document.getElementById("logoutBoton").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario_id");
    localStorage.removeItem("username");
    window.location.href = "inicio.html";
});
//script para cerrar la sesión
//mediante un evento, cuando seleccionamos el botón de cerrar sesión
//borra token, id y nombre de localStorage
//por último, nos devuelve a la página principal