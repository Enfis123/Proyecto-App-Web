// JavaScript para el inicio de sesión

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el formulario de inicio de sesión
    const form = document.querySelector("form");
  
    // Escuchar el evento de envío del formulario
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Evitar el envío del formulario por defecto
  
      // Obtener los valores de los campos de entrada
      const email = document.getElementById("email").value;
      const password = document.getElementById("contraseña").value;
  
      // Obtener las credenciales almacenadas en el Local Storage
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
  
      // Verificar si las credenciales coinciden
      if (email === storedEmail && password === storedPassword) {
        // Credenciales correctas, redirigir a la página principal
        window.location.href = "paginaPrincipal.html";
      } else {
        // Credenciales incorrectas, mostrar advertencia
        const errorMessage = document.getElementById("mensajeError");
        errorMessage.textContent = "Credenciales incorrectas";
      }
    });
  });
  