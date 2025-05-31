let formulario = document.getElementById("formulario");
console.log("Haciendo submit")
formulario.addEventListener("submit", function(e) {
    e.preventDefault(); 

    const nombreUsuario = document.getElementById("username").value;
    const contrasenaUsuario = document.getElementById("password").value;

    fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombreUsuario, contrasenaUsuario })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Credenciales incorrectas");
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("token", data.token); // guardamos token
        localStorage.setItem("username", nombreUsuario); // guardamos nombre de usuario
        window.location.href = "menuLogged.html"; 
    })
    .catch(error => {
        const errorMsg = document.getElementById("error-msg");
        errorMsg.textContent = "Login fallido. Revisa tus datos.";
    });
});

