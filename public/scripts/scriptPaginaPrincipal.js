document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los enlaces del menú
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  
    // Obtener todas las secciones de contenido
    const contentSections = document.querySelectorAll(".contenido-seccion");
  
    // Agregar el evento de clic a cada enlace del menú
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
  
        // Remover la clase "active" de todos los enlaces del menú
        navLinks.forEach(function (link) {
          link.parentElement.classList.remove("active");
        });
  
        // Ocultar todas las secciones de contenido
        contentSections.forEach(function (section) {
          section.classList.remove("active");
        });
  
        // Agregar la clase "active" al enlace del menú clicado
        this.parentElement.classList.add("active");
  
        // Obtener el atributo data-section del enlace clicado
        const sectionId = this.getAttribute("data-section");
  
        // Mostrar la sección de contenido correspondiente al enlace clicado
        const activeSection = document.getElementById(sectionId);
        activeSection.classList.add("active");
      });
    });
  });