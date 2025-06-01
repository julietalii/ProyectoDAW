document.addEventListener("DOMContentLoaded", () => {
  const usuarioId = localStorage.getItem("usuario_id");
  const token = localStorage.getItem("token");
  const contenedor = document.getElementById("reservasContainer");

  if (!usuarioId || !token) {
    contenedor.innerHTML = `<p style="color:red;">Usuario no autenticado. Redirigiendo...</p>`;
    setTimeout(() => window.location.href = "login.html", 2000);
    return;
  }

 
  fetch(`http://127.0.0.1:8000/api/mis-reservas/${usuarioId}/`, {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.mensaje) {
        contenedor.innerHTML = `<p>${data.mensaje}</p>`;
        return;
      }

      contenedor.innerHTML = ""; 
      data.forEach(reserva => {
        const div = document.createElement("div");
        div.className = "reserva";
        div.innerHTML = `
          <strong>${reserva.nombre_clase}</strong><br>
          ${reserva.fecha} ${reserva.hora}<br>
          ID: ${reserva.id}<br>
          <button onclick="cancelarReserva(${reserva.id})">Cancelar</button>
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error cargando reservas:", err);
      contenedor.innerHTML = `<p style="color:red;">Error al conectar con el servidor</p>`;
    });
});

function cancelarReserva(reservaId) {
  const token = localStorage.getItem("token");

  fetch(`http://127.0.0.1:8000/api/cancelar-reserva/${reservaId}/`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cancelar la reserva");
      return res.json();
    })
    .then(data => {
      alert(data.mensaje || "Reserva cancelada");
      location.reload();
    })
    .catch(err => {
      console.error("Error cancelando:", err);
      alert("Hubo un error al cancelar la reserva.");
    });
}
