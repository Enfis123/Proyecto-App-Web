
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

function storeData() {
  const skills = Array.from(selectedSkills.querySelectorAll('.selected-skill-text')).map(skill => skill.textContent);
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const coins = coinsRange.value;

  if (skills.length === 0) {
    alert('Debes agregar al menos una habilidad.');
    return;
  }

  if (title === '' || description === '') {
    alert('Debes ingresar un título y una descripción.');
    return;
  }

  const requestData = {
    skills,
    title,
    description,
    coins
  };

  let storedRequests = localStorage.getItem('requests');

  if (storedRequests) {
    storedRequests = JSON.parse(storedRequests);
    storedRequests.push(requestData);
  } else {
    storedRequests = [requestData];
  }

  localStorage.setItem('requests', JSON.stringify(storedRequests));

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
}

const createButton = document.querySelector('.create-button');
createButton.addEventListener('click', storeData);
