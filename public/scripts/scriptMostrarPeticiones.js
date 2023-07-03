function showPeticionesContent() {
    const peticionesContent = document.getElementById('peticionesContent');
    let storedRequests = localStorage.getItem('requests');
  
    if (storedRequests) {
      storedRequests = JSON.parse(storedRequests);
  
      if (storedRequests.length === 0) {
        peticionesContent.innerHTML = '<p>No hay peticiones disponibles.</p>';
      } else {
        let html = '<div class="peticiones-grid">';
        storedRequests.forEach(request => {
          const title = request.title;
          const apiUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(title)}`;
          const headers = {
            "Accept-Version": "v1",
            "Authorization": "Client-ID Sco2YJQdiGI7sbsdTr2tBNEFk0pMHEuh3BX3aZBlq6I"
          };
  
          fetch(apiUrl, { method: "GET", headers })
            .then(response => response.json())
            .then(data => {
              const imageUrl = data.urls.small;
  
              html += `
                <div class="peticion-card">
                  <img src="${imageUrl}" alt="${title}" class="peticion-image">
                  <div class="peticion-info">
                    <h3 class="peticion-title">${title}</h3>
                    <p class="peticion-description">${request.description}</p>
                  </div>
                </div>
              `;
  
              peticionesContent.innerHTML = html;
            })
            .catch(error => {
              console.error('Error al obtener la imagen:', error);
            });
        });
        html += '</div>';
      }
    } else {
      peticionesContent.innerHTML = '<p>No hay peticiones disponibles.</p>';
    }
  }
  
  // Llamar a la función showPeticionesContent cuando se hace clic en el botón "Peticiones"
  const peticionesButton = document.querySelector('.menuButton');
  peticionesButton.addEventListener('click', function () {
    handleClick('peticiones');
    showPeticionesContent();
  });
  