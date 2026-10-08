const loadArchiveData = async () => {
  const [characters, locations] = await Promise.all([
    fetch('data/characters.json').then((r) => r.json()),
    fetch('data/locations.json').then((r) => r.json())
  ]);
  return { characters, locations };
};

const renderArchive = ({ characters, locations }) => {
  const container = document.getElementById('archive-container');
  if (!container) return;

  const cards = [...characters, ...locations].map((entry) => `
    <article class="archive-card">
      <h2>${entry.name}</h2>
      <p><strong>TYPE:</strong> ${entry.type}</p>
      <p>${entry.description}</p>
      <p class="note">ACCESS: ${entry.access}</p>
    </article>
  `).join('');

  container.innerHTML = `<div class="archive-grid">${cards}</div>`;
};

const initializeArchive = async () => {
  const trigger = document.getElementById('view-intel');
  if (!trigger) return;

  trigger.addEventListener('click', async () => {
    const data = await loadArchiveData();
    renderArchive(data);
    trigger.classList.add('hidden');
  }, { once: true });
};

initializeArchive();
