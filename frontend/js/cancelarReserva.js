// Esperamos a que el contenido esté cargado antes de ejecutar código
document.addEventListener("DOMContentLoaded", () => {
  /*Recuperamos id de usuario y su token */
  const usuarioId = localStorage.getItem("usuario_id");
  const token = localStorage.getItem("token");
  const contenedor = document.getElementById("reservasContainer");

  /*Si no hay token o id de usuario volvemos a login.html*/
  if (!usuarioId || !token) {
    contenedor.innerHTML = `<p style="color:red;">Usuario no autenticado. Redirigiendo...</p>`;
    setTimeout(() => window.location.href = "login.html", 2000);
    return;
  }

  /*Hacemos llamada al backend, concretamente al endpoint que lista las reservas asociadas al usuario autenticado */
  fetch(`http://127.0.0.1:8000/api/mis-reservas/${usuarioId}/`, {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      /*Si el backend devuelve un mensaje, quiere decir que no hay reservas asociadas a ursuario, por lo que termina la ejecución */
      if (data.mensaje) {
        contenedor.innerHTML = `<p>${data.mensaje}</p>`;
        return;
      }
      /*En caso de no haber mensaje, quiere decir que hay reservas, y las mostrará en div */
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
    /*Manejador de errores */
    .catch(err => {
      console.error("Error cargando reservas:", err);
      contenedor.innerHTML = `<p style="color:red;">Error al conectar con el servidor</p>`;
    });
});

/*Función cancelar reserva:  */
function cancelarReserva(reservaId) {
  const token = localStorage.getItem("token");

  /*Hace llamada al endpoint delete del backend  */
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
    /*Si todo va bien, aviso de reserva cancelada con éxito */
    .then(data => {
      alert(data.mensaje || "Reserva cancelada");
      location.reload();
    })
    /*Manejador de errores */
    .catch(err => {
      console.error("Error cancelando:", err);
      alert("Hubo un error al cancelar la reserva.");
    });
}
