function showPeticionesContent() {
  const peticionesContent = document.getElementById('peticionesContent');

  // Llamada a la API para obtener todas las peticiones
  fetch('/api/peticiones', { method: "GET" })
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        peticionesContent.innerHTML = '<p>No hay peticiones disponibles.</p>';
      } else {
        let html = '<div class="peticiones-grid">';
        const requestsPromises = data.map(request => {
          const title = request.title;
          const apiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(title)}`;
          const headers = {
            "Accept-Version": "v1",
            "Authorization": "Client-ID Sco2YJQdiGI7sbsdTr2tBNEFk0pMHEuh3BX3aZBlq6I"
          };

          return fetch(apiUrl, { method: "GET", headers })
            .then(response => response.json())
            .then(imageData => {
              const imageUrl = imageData.urls.small;

              // Obtenemos las monedas requeridas de la petición actual
              const coinsRequired = request.coins_required;

              html += `
                <div class="peticion-card">
                  <img src="${imageUrl}" alt="${title}" class="peticion-image">
                  <div class="peticion-info">
                    <h3 class="peticion-title">${title}</h3>
                    <p class="peticion-description">${request.description}</p>
                    <p class="peticion-coins">Monedas requeridas: ${coinsRequired}</p>
                  </div>
                </div>
              `;
            })
            .catch(error => {
              console.error('Error al obtener la imagen:', error);
            });
        });

        Promise.all(requestsPromises)
          .then(() => {
            html += '</div>';
            peticionesContent.innerHTML = html;
            // Aplicar estilos CSS para llenar de izquierda a derecha
            applyGridStyles();
          });
      }
    })
    .catch(error => {
      console.error('Error al obtener las peticiones:', error);
      peticionesContent.innerHTML = '<p>Error al obtener las peticiones.</p>';
    });
}
function applyGridStyles() {
  const peticionesGrid = document.querySelector('.peticiones-grid');
  const cards = Array.from(peticionesGrid.getElementsByClassName('peticion-card'));
  const gridWidth = peticionesGrid.offsetWidth;

  let currentRow = 0;
  let currentColumn = 0;
  const cardWidth = cards[0].offsetWidth;
  const numColumns = Math.floor(gridWidth / cardWidth);

  cards.forEach((card, index) => {
    card.style.top = `${currentRow * cardWidth}px`;
    card.style.left = `${currentColumn * cardWidth}px`;

    currentColumn++;
    if (currentColumn >= numColumns) {
      currentColumn = 0;
      currentRow++;
    }
  });
}

// Llamar a la función showPeticionesContent cuando se hace clic en el botón "Peticiones"
const peticionesButton = document.querySelector('.menuButton');
peticionesButton.addEventListener('click', function () {
  handleClick('peticiones');
  showPeticionesContent();
});
