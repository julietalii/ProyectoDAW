document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("usuario_id");

  if (!token || !userId) {
    alert("No has iniciado sesión");
    window.location.href = "login.html";
    return;
  }

  const claseSelect = document.getElementById("clase");
  const mensaje = document.getElementById("mensaje");

  // Cargamos las clases qu e están disponibles 
  fetch("http://127.0.0.1:8000/api/clases/", {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      data.forEach(clase => {
        const option = document.createElement("option");
        option.value = clase.id;
        option.textContent = `${clase.nombre} - ${clase.fecha} a las ${clase.hora}`;
        claseSelect.appendChild(option);
      });
    });

  // Creamos reserva
  document.getElementById("reservarBtn").addEventListener("click", () => {
    const claseId = claseSelect.value;

    fetch("http://127.0.0.1:8000/api/reservar/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({ clase_id: claseId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.mensaje) {
          mensaje.textContent = data.mensaje;
        } else {
          mensaje.textContent = "Error al hacer la reserva.";
        }
      })
      .catch(err => {
        console.error("Error:", err);
        mensaje.textContent = "Error al conectar con el servidor.";
      });
  });
});
