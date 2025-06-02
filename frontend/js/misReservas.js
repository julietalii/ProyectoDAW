document.addEventListener("DOMContentLoaded", () => {
  //guarda el id del usuario de localStorage
  const usuarioId = localStorage.getItem("usuario_id");
  console.log("ID guardado en localStorage:", usuarioId); 

  //si no hay id, te redirige a login, pues solo puedes acceder a esta vista si inicias sesión
  if (!usuarioId) {
    alert("Usuario no logueado. Redirigiendo al inicio...");
    window.location.href = "login.html";
    return;
  }
//si estás logueado, llama al endpoint de reservas clasificadas por usuario
  fetch(`http://127.0.0.1:8000/api/mis-reservas/${usuarioId}/`, {
    method: "GET",
    headers: {
      /*Envía token de autorización para poder acceder */
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
      /*En contenedor se muestran o las reservas o el mensaje */
      const contenedor = document.getElementById("reservasContainer");
      /*Si existe mensaje, lo muestra */
      if (data.mensaje) {
        contenedor.innerHTML = `<p>${data.mensaje}</p>`;
        return;
      }
      /*Si no existe mensaje, para cada reserva crea un div con la información de la reserva */
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
