document.addEventListener("DOMContentLoaded", function() {
  // Obtener el formulario y el campo de búsqueda
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  // Agregar el evento de clic al botón de búsqueda
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener el término de búsqueda
    const searchTerm = searchInput.value;

    // Imprimir el término de búsqueda en la consola
    console.log("Término de búsqueda:", searchTerm);

    // Realizar la lógica de búsqueda
    // Aquí puedes agregar tu propia implementación para realizar la búsqueda

    // Limpiar el campo de búsqueda
    searchInput.value = "";
  });
});
