document.querySelector('form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Evita el envío del formulario

  // Obtén los valores de los campos
  const email = document.getElementById('email').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Obtén los elementos para mostrar los mensajes de error
  const newPasswordError = document.getElementById('new-password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  // Limpia los mensajes de error anteriores
  newPasswordError.textContent = '';
  confirmPasswordError.textContent = '';

  // Validación de campos vacíos
  if (email === '' || newPassword === '' || confirmPassword === '') {
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

  // Realizar solicitud POST a la API para buscar al usuario por correo
  try {
    const response = await fetch('/api/registro/buscarPorCorreo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();

    if (data.success) {
      // Usuario encontrado, actualiza la contraseña
      const responseUpdate = await fetch('/api/registro/actualizarContrasena', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, contraseña: newPassword })
      });

      const dataUpdate = await responseUpdate.json();

      if (dataUpdate.success) {
        // Contraseña actualizada con éxito
        alert('La contraseña se ha restablecido correctamente.');
        // Redireccionar a la página de inicio de sesión solo si todos los campos son válidos
        window.location.href = "/inicioSesion";
      } else {
        // Error al actualizar la contraseña
        console.error('Error al actualizar la contraseña:', dataUpdate.error);
        document.getElementById('error-text').textContent = 'Error al restablecer la contraseña.';
      }
    } else {
      // Usuario no encontrado
      document.getElementById('error-text').textContent = 'El correo electrónico no existe.';
    }
  } catch (error) {
    console.error('Error al buscar al usuario:', error);
    document.getElementById('error-text').textContent = 'Error al buscar al usuario.';
  }
});
