const loadJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
};

const renderReleases = async () => {
  const container = document.getElementById('releases-container');
  if (!container) return;
  const releases = await loadJson('data/releases.json');
  container.innerHTML = `<div class="release-grid">${releases.map((release) => `
    <article class="release-card reveal">
      <h2>${release.title}</h2>
      <p>${release.description}</p>
      <p><strong>Status:</strong> ${release.status}</p>
      <button class="btn" data-video="${release.youtubeEmbed}" data-title="${release.title}">Load Video</button>
    </article>`).join('')}
  </div>`;

  container.querySelectorAll('button[data-video]').forEach((button) => {
    button.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.className = 'release-video';
      frame.loading = 'lazy';
      frame.src = button.dataset.video;
      frame.title = button.dataset.title || 'AVN Hunter release video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      button.replaceWith(frame);
    });
  });
};

const renderTransmissions = async () => {
  const container = document.getElementById('transmissions-container');
  if (!container) return;
  const transmissions = await loadJson('data/transmissions.json');
  container.innerHTML = transmissions.map((item) => `
    <article class="transmission-card reveal">
      <h2>${item.title}</h2>
      <p><strong>DATE:</strong> ${item.date}</p>
      <p><strong>SOURCE:</strong> ${item.source}</p>
      <p><strong>STATUS:</strong> ${item.status}</p>
      <p>${item.message}</p>
      <a class="btn" href="${item.url}">DECODE MESSAGE</a>
    </article>`).join('');
};

const runDiscovery = () => {
  const key = 'avn-hunter-discovery';
  const visits = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, String(visits));
  if (visits === 3) {
    const footer = document.querySelector('.site-footer');
    if (footer) footer.insertAdjacentHTML('beforeend', '<p class="glitch-hover">TRANSMISSION UNLOCKED: OBSERVER EYES ON YOU.</p>');
  }
};

Promise.allSettled([renderReleases(), renderTransmissions()]).finally(runDiscovery);
