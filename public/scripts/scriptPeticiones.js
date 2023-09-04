
const coinsRange = document.getElementById('coins-range');
const coinsValue = document.getElementById('coins-value');
const skillsInput = document.getElementById('skills-input');
const selectedSkills = document.getElementById('selected-skills');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');

coinsRange.addEventListener('input', () => {
  coinsValue.textContent = coinsRange.value;
});

skillsInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && skillsInput.value.trim() !== '') {
    addSkill(skillsInput.value.trim());
    skillsInput.value = '';
    event.preventDefault();
  }
});

function addSkill(skill) {
  const skillItem = document.createElement('div');
  skillItem.classList.add('selected-skill');
  skillItem.innerHTML = `
    <span class="selected-skill-text">${skill}</span>
    <button type="button" class="btn-close" aria-label="Close"></button>
  `;
  selectedSkills.appendChild(skillItem);

  const closeButton = skillItem.querySelector('.btn-close');
  closeButton.addEventListener('click', () => {
    skillItem.remove();
  });

  // Llenar automáticamente el título y la descripción
  titleInput.value = skill;
  descriptionInput.value = `Necesito ayuda con ${skill}`;
}
// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null; // Si no se encuentra la cookie, devuelve null o maneja el caso como desees
}
function storeData() {
  const skills = Array.from(selectedSkills.querySelectorAll('.selected-skill-text')).map(skill => skill.textContent);
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const coins_required = parseFloat(coinsRange.value); // Convert to a number
  console.log(coins_required);
  console.log('Tipo de dato de coins:', typeof coins); // Muestra el tipo de dato en la consola

  if (skills.length === 0) {
    alert('Debes agregar al menos una habilidad.');
    return;
  }

  if (title === '' || description === '') {
    alert('Debes ingresar un título y una descripción.');
    return;
  }
  const user_id = getCookie('usuarioId'); // Obtén el valor de la cookie 'usuarioId'

  const requestData = {
    user_id,
    skills,
    title,
    description,
    coins_required
  };
  console.log('Tipo de dato de coins:', typeof coins); // Muestra el tipo de dato en la consola

  // Realizar una solicitud POST a la API para guardar la nueva petición
  fetch('/api/peticiones', { // Utiliza la ruta acortada aquí
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('No se pudo crear la petición.');
      }
    })
    .then(data => {
      // Procesar la respuesta de la API si es necesario
      console.log('Respuesta de la API:', data);

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      overlay.innerHTML = `
        <div class="popup">
          <p>Solicitud creada correctamente.</p>
          <button class="close-button">Cerrar</button>
        </div>
      `;
      document.body.appendChild(overlay);

      const closeButton = overlay.querySelector('.close-button');
      closeButton.addEventListener('click', () => {
        overlay.remove();
      });

      selectedSkills.innerHTML = '';
      titleInput.value = '';
      descriptionInput.value = '';
      coinsRange.value = 0;
      coinsValue.textContent = 0;
    })
    .catch(error => {
      alert('Error al crear la petición: ' + error.message);
    });
}

const createButton = document.querySelector('.create-button');
createButton.addEventListener('click', storeData);
