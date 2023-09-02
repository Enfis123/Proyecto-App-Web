// scriptEditPerfil.js
document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profile-form');
  
    // Event listener para el envío del formulario
    profileForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Evita que se envíe el formulario automáticamente
  
      // Obtener los valores ingresados por el usuario
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const email = document.getElementById('email').value;
  
      // Realizar aquí el código para actualizar el perfil en el servidor (por ejemplo, mediante una solicitud AJAX)
  
      // Ejemplo de una solicitud AJAX ficticia
      setTimeout(function () {
        alert('Perfil actualizado correctamente');
      }, 1000);
    });
  });
  