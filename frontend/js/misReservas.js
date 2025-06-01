document.addEventListener("DOMContentLoaded", () => {
  const usuarioId = localStorage.getItem("usuario_id");
  console.log("ID guardado en localStorage:", usuarioId); // <- DEBUG

  if (!usuarioId) {
    alert("Usuario no logueado. Redirigiendo al inicio...");
    window.location.href = "login.html";
    return;
  }

  fetch(`http://127.0.0.1:8000/api/mis-reservas/${usuarioId}/`, {
    method: "GET",
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error al obtener las reservas");
      }
      return res.json();
    })
    .then(data => {
      const contenedor = document.getElementById("reservasContainer");

      if (data.mensaje) {
        contenedor.innerHTML = `<p>${data.mensaje}</p>`;
        return;
      }

      data.forEach(reserva => {
        const div = document.createElement("div");
        div.className = "reserva";
        div.innerHTML = `
          <strong>${reserva.nombre_clase}</strong><br>
          ${reserva.fecha} ${reserva.hora}<br>
          ID de reserva: ${reserva.id}
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error al cargar las reservas:", err);
      document.getElementById("reservasContainer").innerHTML = `
        <p style="color: red;">Error al conectar con el servidor.</p>
      `;
    });
});
