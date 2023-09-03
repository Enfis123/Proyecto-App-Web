document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a los elementos del formulario de edición de perfil
    var firstNameInput = document.getElementById("first-name");
    var lastNameInput = document.getElementById("last-name");
    var emailInput = document.getElementById("email");
    var guardarCambiosBtn = document.getElementById("btnGuardarCambiosPerfil");
    var mensajeError = document.getElementById("mensajeError");

    // Agregar un evento al botón "Guardar Cambios"
    guardarCambiosBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores ingresados por el usuario
        var firstName = firstNameInput.value;
        var lastName = lastNameInput.value;

        // Enviar los datos al servidor para guardar los cambios de perfil
        fetch('/api/editarPerfil', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email: emailInput.value })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Cambios guardados con éxito
                    window.location.href = "/perfil";
                } else {
                    // Mostrar mensaje de error del servidor si es necesario
                    mensajeError.textContent = "Error al guardar los cambios.";
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});

// Agrega un evento de clic al botón "Eliminar Usuario"
document.getElementById('btnEliminarUsuario').addEventListener('click', function () {
    // Muestra un cuadro de diálogo de confirmación
    const confirmar = confirm('¿Estás seguro de que deseas eliminar tu usuario? Esta acción no se puede deshacer.');

    // Si el usuario confirmó, redirecciona o realiza la acción de eliminación aquí
    if (confirmar) {
        // Puedes redirigir a una página de confirmación de eliminación o realizar la eliminación del usuario aquí
        alert('Usuario eliminado exitosamente.');
        // window.location.href = 'paginaDeConfirmacion.html'; // Ejemplo de redirección
    }
});
