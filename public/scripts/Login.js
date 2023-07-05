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
    if (!isValidEmail(email)) {
      // Correo electrónico inválido, mostrar mensaje de error
      mensajeError.textContent = "Correo electrónico inválido.";
    } else if (email === storedEmail && contraseña === storedContraseña) {
      // Credenciales válidas, redireccionar a la página de perfil
      window.location.href = "/perfil";
    } else {
      // Credenciales incorrectas, mostrar mensaje de error
      mensajeError.textContent = "Credenciales incorrectas.";
    }
  });

  // Función para validar el formato del correo electrónico
  function isValidEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
});