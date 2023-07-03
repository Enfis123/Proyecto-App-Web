document.addEventListener("DOMContentLoaded", function() {
  // Obtener referencias a los elementos del formulario
  var nombreInput = document.getElementById("nombre");
  var apellidoInput = document.getElementById("apellido");
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("password");
  var confirmarContraseñaInput = document.getElementById("confirmarContraseña");
  var mensajeError = document.getElementById("mensajeError");

  // Agregar un evento al botón de "Registrarse"
  var registrarseBtn = document.getElementById("iniciarSesionBtn");
  registrarseBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los valores ingresados por el usuario
    var nombre = nombreInput.value;
    var apellido = apellidoInput.value;
    var email = emailInput.value;
    var password = passwordInput.value;
    var confirmarContraseña = confirmarContraseñaInput.value;

    // Validar las credenciales y realizar el registro
    if (nombre !== "" && apellido !== "" && email !== "" && password !== "" && confirmarContraseña !== "") {
      // Validar la contraseña
      if (password !== confirmarContraseña) {
        mensajeError.textContent = "Las contraseñas no coinciden.";
        return;
      }

      // Guardar los datos en el LocalStorage
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      // Redireccionar a la página de inicio de sesión
      window.location.href = "/inicioSesion";
    } else {
      // Mostrar mensaje de error si hay campos vacíos
      mensajeError.textContent = "Por favor, completa todos los campos.";
    }
  });
});
