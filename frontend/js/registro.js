document.addEventListener("DOMContentLoaded", () => {
  //Almacena en variable form la etiqueta con id registroForm
  const form = document.getElementById("registroForm");
 //Añade un evento para cuando le das al botón submit del form
  form.addEventListener("submit", function (e) {
    e.preventDefault();
/*Obtiene los valores que introdujo el usuario */
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const es_profesor = document.getElementById("es_profesor").checked;

    /*Llama al endpoint de registrar usuario */
    fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password, email, es_profesor })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error en el registro");
      }
      return res.json();
    })
    .then(data => {
      //Si todo fue bien, se registra y te redirije al login
      alert("Listo! Ahora puedes iniciar sesión.");
      window.location.href = "login.html";
    })
    .catch(err => {
      console.error(err);
      document.getElementById("mensaje").textContent = "Error al registrarse. Prueba con otro nombre o correo.";
    });
  });
});
