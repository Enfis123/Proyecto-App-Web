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
  var palabrasNuevas = input.value.split(",").map(function(palabra) {
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

  palabras.forEach(function(palabra, index) {
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
window.onload = function() {
  var palabras = JSON.parse(localStorage.getItem("palabras"));
  if (palabras) {
    var palabrasContainer = document.getElementById("about-words");
    palabrasContainer.textContent = palabras.join("    ");
  }
};