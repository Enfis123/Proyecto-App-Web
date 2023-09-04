document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a los elementos del perfil
  var nombreUsuario = document.getElementById("nombreUsuario");
  var correoUsuario = document.getElementById("correoUsuario");

  // Obtener el perfil del usuario logeado
  fetch('/api/perfiles', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(usuario => {
      // Actualizar el nombre y el correo del usuario en la página
      nombreUsuario.textContent = usuario.nombre;
      correoUsuario.textContent = usuario.email;
    })
    .catch(error => {
      console.error('Error al obtener el perfil del usuario:', error);
    });

  
});

function mostrarVentanaEditar(request_id) {
  // Obtener la petición correspondiente desde el API
  fetch(`/api/peticiones/${request_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(peticion => {
      // Llenar los campos de la ventana flotante con la información de la petición
      const editTitleInput = document.getElementById('edit-title');
      const editDescriptionTextarea = document.getElementById('edit-description');
      const editCoinsInput = document.getElementById('edit-coins');

      editTitleInput.value = peticion.title;
      editDescriptionTextarea.value = peticion.description;
      editCoinsInput.value = peticion.coins_required;

      // Mostrar la ventana flotante de edición
      const editModal = document.getElementById('edit-peticion-modal');
      editModal.style.display = 'block';

      // Configurar el botón "Cancelar" para cerrar la ventana modal
      const cancelButton = document.getElementById('cancel-button');
      cancelButton.addEventListener('click', function () {
        cerrarVentanaModal();
      });

      // Configurar el botón "Guardar" para realizar la actualización a través de la API
      const saveButton = document.getElementById('save-button');
      saveButton.addEventListener('click', function () {
        // Obtener los valores editados de los campos de edición
        const editedTitle = editTitleInput.value;
        const editedDescription = editDescriptionTextarea.value;
        const editedCoins = editCoinsInput.value;

        // Obtener el ID de la petición actual (puedes almacenarlo en una variable global o como un atributo en el botón "Editar")

        // Construir el objeto de datos para la actualización
        const updatedData = {
          title: editedTitle,
          description: editedDescription,
          coins_required: editedCoins, // Asegúrate de usar el nombre correcto del campo
        };

        // Realizar una solicitud PUT al API para actualizar la petición
        fetch(`/api/peticiones/${request_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        })
          .then(response => response.json())
          .then(updatedPeticion => {
            // Cerrar la ventana modal de edición
            cerrarVentanaModal();

            // Actualizar la interfaz de usuario con la información actualizada si es necesario
            // Esto puede incluir la actualización de la lista de peticiones

            // Aquí puedes realizar otras acciones después de la actualización
          })
          .catch(error => {
            console.error('Error al actualizar la petición:', error);
          });
      });
    })
    .catch(error => {
      console.error('Error al obtener la petición:', error);
    });
}



function mostrarVentanaEliminar(request_id) {
  // Mostrar la ventana modal de eliminación
  const deleteModal = document.getElementById('delete-peticion-modal');
  deleteModal.style.display = 'block';

  // Configurar el botón "Eliminar" para llamar a la función eliminarPeticion
  const confirmDeleteButton = document.getElementById('confirm-delete-button');
  confirmDeleteButton.addEventListener('click', function () {
    eliminarPeticion(request_id);
  });
}

// JavaScript para manejar la eliminación de la petición
function eliminarPeticion(request_id) {
  // Realizar una solicitud DELETE a tu API para eliminar la petición con el ID request_id
  fetch(`/api/peticiones/${request_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        // Petición eliminada con éxito
        // Puedes realizar cualquier acción adicional necesaria, como actualizar la lista de peticiones
        // Por ejemplo, puedes llamar a la función mostrarPeticiones() para actualizar la lista después de la eliminación
        mostrarPeticiones();
      } else {
        console.error('Error al eliminar la petición:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error al eliminar la petición:', error);
    })
    .finally(() => {
      // Después de eliminar la petición, cierra la ventana modal
      const deleteModal = document.getElementById('delete-peticion-modal');
      deleteModal.style.display = 'none';
    });
}

function mostrarContenido(id) {
  // Ocultar todos los contenidos
  var contenidos = document.getElementsByClassName('tab-content')[0].children;
  for (var i = 0; i < contenidos.length; i++) {
    contenidos[i].style.display = 'none';
  }

  // Mostrar el contenido seleccionado
  var contenido = document.getElementById(id);
  if (contenido) {
    contenido.style.display = 'block';
  }
}
function guardarPalabras() {
  var input = document.getElementById("about-input");
  var palabrasNuevas = input.value.split(",").map(function (palabra) {
    return palabra.trim();
  });

  // Obtener las palabras antiguas desde el localStorage
  var palabrasAntiguas = JSON.parse(localStorage.getItem("palabras")) || [];

  // Combinar las palabras antiguas y las nuevas
  var palabras = palabrasAntiguas.concat(palabrasNuevas);

  // Guardar las palabras actualizadas en el localStorage
  localStorage.setItem("palabras", JSON.stringify(palabras));

  // Mostrar todas las palabras en el contenedor
  var palabrasContainer = document.getElementById("about-words");
  palabrasContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar las palabras

  palabras.forEach(function (palabra, index) {
    var label = document.createElement("label");
    label.textContent = palabra;
    label.classList.add("word-label");

    if (index >= palabrasAntiguas.length) {
      label.classList.add("new-word-label");
    } else {
      label.classList.add("old-word-label");
    }

    palabrasContainer.appendChild(label); // Agregar las palabras al final del contenedor
  });

  // Limpiar el campo de entrada de texto
  input.value = "";
}

//muestra palabras antiguas
window.onload = function () {
  var palabras = JSON.parse(localStorage.getItem("palabras"));
  if (palabras) {
    var palabrasContainer = document.getElementById("about-words");
    palabrasContainer.textContent = palabras.join("    ");
  }
};
function mostrarPeticiones() {
  // Ocultar otros contenidos si es necesario
  ocultarContenido('about-content');

  // Realizar una solicitud a la API para obtener las peticiones
  fetch('/api/peticiones', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(peticiones => {
      const peticionesContainer = document.getElementById('peticiones-list');
      peticionesContainer.innerHTML = ''; // Limpiar el contenedor

      peticiones.forEach(peticion => {
        const peticionElement = document.createElement('li');
        
        // Agregar título y descripción de la petición
        peticionElement.innerHTML = `
          <h4> Titulo: ${peticion.title}</h4>
          <p> Descripcion: ${peticion.description}</p>
          <p> Monedas Requeridas:${peticion.coins_required}</p>

        `;
        
        // Agregar icono de eliminar y actualizar con clases de estilo
        const iconosElement = document.createElement('div');
        iconosElement.classList.add('iconos-peticion');
        iconosElement.innerHTML = `
          <i class="fas fa-edit editar-icon" onclick="mostrarVentanaEditar(${peticion.request_id})"></i>
          <i class="fas fa-trash eliminar-icon" onclick="mostrarVentanaEliminar(${peticion.request_id})"></i>
        `;
        
        // Agregar los elementos de iconos al elemento de petición
        peticionElement.appendChild(iconosElement);
        
        // Agregar el elemento de petición al contenedor de peticiones
        peticionesContainer.appendChild(peticionElement);
      });
    })
    .catch(error => {
      console.error('Error al obtener las peticiones:', error);
    });
}

function ocultarContenido(id) {
  const contenido = document.getElementById(id);
  if (contenido) {
    contenido.style.display = 'none';
  }
}
function cerrarVentanaModal() {
  const editModal = document.getElementById('edit-peticion-modal');
  editModal.style.display = 'none';
}