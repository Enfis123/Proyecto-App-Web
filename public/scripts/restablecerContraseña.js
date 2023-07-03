document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario

  // Obtén los valores de los campos
  const username = document.getElementById('username').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Obtén los elementos para mostrar los mensajes de error
  const newPasswordError = document.getElementById('new-password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  // Limpia los mensajes de error anteriores
  newPasswordError.textContent = '';
  confirmPasswordError.textContent = '';

  // Validación de campos vacíos
  if (username === '' || newPassword === '' || confirmPassword === '') {
    document.getElementById('error-text').textContent = 'Todos los campos son obligatorios.';
    return; // Detén la ejecución
  }

  // Validación de longitud y coincidencia de contraseñas
  if (newPassword.length < 8 || newPassword !== confirmPassword) {
    if (newPassword.length < 8) {
      newPasswordError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (newPassword !== confirmPassword) {
      confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
    }
    return; // Detén la ejecución
  }

  // Validación de la contraseña según los requisitos
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    newPasswordError.textContent = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.';
    return; // Detén la ejecución
  }

  // Restablecer la contraseña en el Local Storage si el usuario existe
  const storedUsername = localStorage.getItem('nombre');
  if (storedUsername === username) {
    // Restablecer la contraseña
    localStorage.setItem('password', newPassword);
    alert('La contraseña se ha restablecido correctamente.');

    // Redireccionar a la página de inicio de sesión solo si todos los campos son válidos
    window.location.href = "/inicioSesion";
  } else {
    // Usuario no encontrado en el Local Storage
    document.getElementById('error-text').textContent = 'El nombre de usuario no existe.';
  }
});
