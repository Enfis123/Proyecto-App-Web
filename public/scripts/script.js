// Código JavaScript aquí

// Ejemplo de una función genérica
function saludar(nombre) {
    console.log("Hola, " + nombre + "!");
  }
  
  // Ejemplo de evento de clic en un botón
  var boton = document.querySelector("#miBoton");
  boton.addEventListener("click", function() {
    saludar("Juan");
  });
  