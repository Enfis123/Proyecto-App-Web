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

    // Obtener los datos almacenados en el LocalStorage
    var storedEmail = localStorage.getItem("email");
    var storedContraseña = localStorage.getItem("password");

    // Validar las credenciales
    if (email === storedEmail && contraseña === storedContraseña) {
      // Credenciales válidas, redireccionar a la página de perfil
      window.location.href = "/perfil";
    } else {
      // Credenciales incorrectas, mostrar mensaje de error
      mensajeError.textContent = "Credenciales incorrectas.";
    }
  });
});
