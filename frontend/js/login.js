let formulario = document.getElementById("formulario");
console.log("Haciendo submit")
/*Evento que se activa con submit */
formulario.addEventListener("submit", function(e) {
    e.preventDefault(); 
/*Obtenemos valores introducidos por el usuario */
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
/*Llamamos a la API para hacer el login */
    fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }) //Envía usuario y contraseña
    })
    .then(response => {
        /*  Si hay algún campo incorrecto, lanza mensaje */
        if (!response.ok) {
            throw new Error("Credenciales incorrectas");
        }
        return response.json(); //Si va todo bien, convierte respuesta a JSON
    })
    .then(data => {
        console.log("Datos recibidos del backend:", data);
        console.log(data);
        localStorage.setItem("usuario_id", data.id);
        console.log(data.id);
        localStorage.setItem("token", data.token); // guardamos token
        localStorage.setItem("username", username); // guardamos nombre de usuario
        window.location.href = "menuLogged.html";  //Te lleva a la ventana de usuario, donde puedes gestionar reservas
    })
    /*Manejador de errores */
    .catch(error => {
        const errorMsg = document.getElementById("error-msg");
        errorMsg.textContent = "Login fallido. Revisa tus datos.";
    });
});

