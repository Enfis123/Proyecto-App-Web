document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los elementos del formulario
    var nombreInput = document.getElementById("nombre");
    var apellidoInput = document.getElementById("apellido");
    var emailInput = document.getElementById("email");
    var contraseñaInput = document.getElementById("contraseña");
    var confirmarContraseñaInput = document.getElementById("confirmarContraseña");
    var mensajeError = document.getElementById("mensajeError");
  
    // Agregar un evento al botón de "Iniciar Sesión"
    var iniciarSesionBtn = document.getElementById("iniciarSesionBtn");
    iniciarSesionBtn.addEventListener("click", function(event) {
      event.preventDefault(); // Evitar el envío del formulario por defecto
  
      // Obtener los valores ingresados por el usuario
      var nombre = nombreInput.value;
      var apellido = apellidoInput.value;
      var email = emailInput.value;
      var contraseña = contraseñaInput.value;
      var confirmarContraseña = confirmarContraseñaInput.value;
  
      // Validar las credenciales
      if (nombre === "Aplicaciones" &&
          apellido === "Web" &&
          email === "aplicacionesweb@gmail.com" &&
          contraseña === "12345" &&
          confirmarContraseña === "12345") {
        // Credenciales correctas, almacenar los datos en el LocalStorage
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);
        localStorage.setItem("email", email);
  
        // Redireccionar a la página principal
        window.location.href = "paginaPrincipal";
      } else {
        // Credenciales incorrectas, mostrar mensaje de error
        mensajeError.textContent = "Credenciales incorrectas. Por favor, verifica tus datos.";
      }
    });
  });
  