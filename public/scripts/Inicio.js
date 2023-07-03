document.addEventListener('DOMContentLoaded', function() {
    // Obtiene todos los elementos de la barra de navegación
    var navItems = document.querySelectorAll('.navbar-nav .nav-item');
    // Obtiene todos los elementos de contenido de las secciones
    var secciones = document.querySelectorAll('.contenido-seccion');
  
    // Oculta todas las secciones de contenido, excepto la sección "Noticias"
    secciones.forEach(function(seccion) {
      seccion.style.display = 'none';
    });
    document.getElementById('EspacioNoticias').style.display = 'block';
  
    // Recorre todos los elementos de la barra de navegación
    navItems.forEach(function(item) {
      // Agrega un evento de clic a cada elemento
      item.addEventListener('click', function() {
        // Remueve la clase "active" de todos los elementos de la barra de navegación
        navItems.forEach(function(navItem) {
          navItem.classList.remove('active');
        });
  
        // Agrega la clase "active" al elemento seleccionado
        this.classList.add('active');
  
        // Obtiene el valor del atributo "data-section" del elemento seleccionado
        var seccion = this.querySelector('a').getAttribute('data-section');
  
        // Oculta todas las secciones de contenido
        secciones.forEach(function(seccion) {
          seccion.style.display = 'none';
        });
  
        // Muestra el contenido de la sección seleccionada
        document.getElementById(seccion).style.display = 'block';
      });
    });
  });
  