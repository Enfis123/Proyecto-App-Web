document.addEventListener("DOMContentLoaded", function() {
  // Obtener referencias a los elementos del formulario
  var emailInput = document.getElementById("email");
  var contraseñaInput = document.getElementById("contraseña");
  var mensajeError = document.getElementById("mensajeError");

  // Agregar un evento al botón de "Iniciar Sesión"
  var iniciarSesionBtn = document.getElementById("iniciarSesionBtn");
  iniciarSesionBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores ingresados por el usuario
    var email = emailInput.value;
    var contraseña = contraseñaInput.value;

    // Realizar solicitud POST a la API para verificar las credenciales
    fetch('/api/login/login', {  // Actualiza la ruta de la solicitud
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, contraseña })
    })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Credenciales válidas, redireccionar a la página de perfil
            window.location.href = "/perfil";
          } else {
            // Credenciales incorrectas, mostrar mensaje de error
            mensajeError.textContent = "Credenciales incorrectas.";
          }
        })
        .catch(error => {
          console.error('Error al iniciar sesión:', error);
          mensajeError.textContent = "Error al iniciar sesión.";
        });
  });
});
