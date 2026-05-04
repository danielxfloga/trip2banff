const ACCESS_HASH = '747dd1f585976e57d49695f0f4483fbb99a60bbda8ad23f66f14654386e4592b';
const ACCESS_FLAG = 'canada-2026-access';

const state = {
  data: null,
  activeDayId: null,
  query: '',
  expanded: new Set()
};

const assignedImages = new Map();
const imageUseCounts = new Map();

const scenicImages = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1533873984035-25970ab07461?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1400&q=80'
];

const iconSvg = {
  plane: '<img class="plane-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Airplane_silhouette_gray_40.svg/500px-Airplane_silhouette_gray_40.svg.png?utm_source=commons.wikimedia.org&amp;utm_campaign=index&amp;utm_content=thumbnail" alt="" title="Josh Baumgartner, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons">',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 11 7 6h10l2 5"/><path d="M4 11h16v7H4z"/><path d="M6.5 18v2"/><path d="M17.5 18v2"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></svg>',
  food: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2v20"/><path d="M10 2v7a4 4 0 0 1-8 0V2"/><path d="M17 2v20"/><path d="M17 2c3 2 4 5 4 9h-4"/></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 11V5"/><path d="M3 16h18"/><path d="M21 16v-5a3 3 0 0 0-3-3h-7v8"/><path d="M3 16v4"/><path d="M21 16v4"/><path d="M7 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>',
  waterfall: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3h14"/><path d="M8 3c0 4 3 4 3 8s-3 4-3 8"/><path d="M14 3c0 3 2 4 2 7 0 4-4 4-4 9"/><path d="M4 21c2-2 5-2 8 0s6 2 8 0"/></svg>',
  lake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 21c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="m5 13 4-6 3 4 2-3 5 5"/></svg>',
  mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 20 7-14 4 8 2-4 5 10H3Z"/><path d="m10 6 2 4 2-1"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21s7-5.2 7-12A7 7 0 0 0 5 9c0 6.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="m21 15-5-5L5 19"/></svg>'
};

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}

function imageSearchUrl(query) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query || 'Banff Canadá montañas cascadas')}`;
}

function actionIcon(name) {
  return `<span class="action-icon" aria-hidden="true">${iconSvg[name] || iconSvg.pin}</span>`;
}

function actionLabel(iconName, label) {
  return `${actionIcon(iconName)}<span>${escapeHtml(label)}</span>`;
}

function iconOnlyLabel(iconName) {
  return actionIcon(iconName);
}

function notesLabel(isOpen) {
  return isOpen ? 'Ocultar notas' : 'Ver notas';
}

function notesButtonMarkup(isOpen) {
  return iconOnlyLabel('note');
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function hasAccess() {
  return sessionStorage.getItem(ACCESS_FLAG) === 'ok';
}

function showAccess() {
  document.body.classList.add('locked');
  $('#accessScreen')?.removeAttribute('hidden');
  $('#accessCode')?.setAttribute('type', ['pass', 'word'].join(''));
  requestAnimationFrame(() => $('#accessCode')?.focus());
}

function showTrip() {
  document.body.classList.remove('locked');
  $('#accessScreen')?.setAttribute('hidden', '');
}

async function verifyAccess(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const input = $('#accessCode');
  const error = $('#accessError');
  form.classList.add('checking');
  error.hidden = true;

  const isValid = await sha256(input.value.trim()) === ACCESS_HASH;
  form.classList.remove('checking');

  if (!isValid) {
    input.value = '';
    error.hidden = false;
    input.focus();
    return;
  }

  sessionStorage.setItem(ACCESS_FLAG, 'ok');
  await loadTrip();
}

function hashString(value = '') {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function imagePool() {
  return Array.from(new Set([...(state.data?.fallbackImages || []), ...scenicImages].filter(Boolean)));
}

function assignImage(key, url) {
  assignedImages.set(key, url);
  imageUseCounts.set(url, (imageUseCounts.get(url) || 0) + 1);
  return url;
}

function chooseImage(key, query, fallback) {
  const normalizedKey = key || `${query || 'scenic'}-${assignedImages.size}`;
  if (assignedImages.has(normalizedKey)) return assignedImages.get(normalizedKey);

  const pool = imagePool();
  const candidates = Array.from(new Set([fallback, ...pool].filter(Boolean)));
  if (!candidates.length) return '';

  const start = hashString(`${normalizedKey}|${query || ''}`) % candidates.length;
  for (let offset = 0; offset < candidates.length; offset += 1) {
    const url = candidates[(start + offset) % candidates.length];
    if (!imageUseCounts.has(url)) return assignImage(normalizedKey, url);
  }

  const chosen = candidates.reduce((best, url) => {
    const currentCount = imageUseCounts.get(url) || 0;
    const bestCount = imageUseCounts.get(best) || 0;
    return currentCount < bestCount ? url : best;
  }, candidates[start]);
  return assignImage(normalizedKey, chosen);
}

function hydrateImages() {
  $$('[data-image-query]').forEach((node, index) => {
    const query = node.dataset.imageQuery;
    const fallback = node.dataset.fallback;
    const key = node.dataset.imageKey || `${query}-${index}`;
    const url = chooseImage(key, query, fallback);
    if (url) node.style.setProperty('--img', `url('${url.replace(/'/g, "%27")}')`);
  });
}

function dayMatches(day, query) {
  if (!query) return true;
  const haystack = [day.title, day.optimizedTitle, day.stay, day.dateLabel, ...day.schedule.map(x => `${x.title} ${x.note}`), ...day.activities.map(x => `${x.title} ${x.description} ${x.research}`)].join(' ').toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function setActiveDay(dayId) {
  state.activeDayId = dayId;
  const day = state.data.days.find(x => x.id === dayId) || state.data.days[0];
  $('#activeDayName').textContent = `${day.dateLabel} - ${day.title}`;
  $('#timelineTitle').textContent = day.optimizedTitle || day.title;
  $('#googleImagesLink').href = imageSearchUrl(day.imageQuery);
  $('#googleImagesLink').innerHTML = actionLabel('image', 'Buscar imágenes');
  renderDays();
  renderTimeline(day);
  hydrateImages();
  $('#timelineShell').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderHero() {
  const { metadata, days } = state.data;
  const activityCount = days.reduce((sum, day) => sum + day.activities.length, 0);
  const mapCount = days.reduce((sum, day) => sum + day.activities.filter(x => x.mapUrl).length + day.schedule.filter(x => x.mapUrl).length, 0);
  $('#tripTitle').textContent = metadata.title;
  $('#tripSubtitle').textContent = `${metadata.travelers} - ${metadata.dates} - ${metadata.destination}. Detalles del viaje organizados en tarjetas, mapas, notas de investigación y línea de tiempo por día.`;
  $('#heroStats').innerHTML = `
    <div class="stat"><strong>${days.length}</strong><span>Días</span></div>
    <div class="stat"><strong>${activityCount}</strong><span>Actividades</span></div>
    <div class="stat"><strong>${mapCount}</strong><span>Rutas</span></div>`;
  const first = days[1] || days[0];
  $('.hero-image').dataset.imageKey = 'hero';
  $('.hero-image').dataset.imageQuery = `${metadata.destination} cascadas montañas lago`;
  $('.hero-image').dataset.fallback = first.fallbackImage;
}

function renderChips() {
  $('#chips').innerHTML = state.data.days.map(day => `<button class="chip ${day.id === state.activeDayId ? 'active' : ''}" data-day-id="${day.id}" type="button">${escapeHtml(day.dateLabel)} ${escapeHtml(day.dayCode)}</button>`).join('');
  $$('#chips .chip').forEach(button => button.addEventListener('click', () => setActiveDay(button.dataset.dayId)));
}

function renderDays() {
  renderChips();
  const filtered = state.data.days.filter(day => dayMatches(day, state.query));
  if (!filtered.length) {
    $('#dayGrid').innerHTML = '<div class="empty-state no-results"><h3>Sin resultados</h3><p>Prueba con Banff, Jasper, Lake Louise, traslado o cascadas.</p></div>';
    return;
  }
  $('#dayGrid').innerHTML = filtered.map((day, index) => `
    <article class="day-card ${day.id === state.activeDayId ? 'active' : ''}" data-day-id="${day.id}" style="animation-delay:${index * 60}ms">
      <div class="day-card-image" data-image-key="day-card-${escapeHtml(day.id)}" data-image-query="${escapeHtml(day.imageQuery)}" data-fallback="${escapeHtml(day.fallbackImage)}"></div>
      <div class="day-card-content">
        <span class="date-pill">${escapeHtml(day.dayCode)} - ${escapeHtml(day.dateLabel)}</span>
        <h3>${escapeHtml(day.optimizedTitle || day.title)}</h3>
        <div class="day-card-meta">
          <span class="meta-pill">${iconSvg.bed} ${escapeHtml(day.stay || 'Traslado')}</span>
          <span class="meta-pill">${iconSvg.pin} ${day.activities.length} paradas</span>
        </div>
      </div>
    </article>`).join('');
  $$('#dayGrid .day-card').forEach(card => card.addEventListener('click', () => setActiveDay(card.dataset.dayId)));
}

function renderTimeline(day) {
  const activities = day.activities.length ? day.activities : day.schedule.map(x => ({ ...x, phase: x.time || 'Agenda', description: x.note }));
  $('#timelineShell').innerHTML = `
    <div class="day-detail-head">
      <div class="day-intro">
        <span class="eyebrow">${escapeHtml(day.dayName)} - ${escapeHtml(day.dateLabel)}</span>
        <h2>${escapeHtml(day.optimizedTitle || day.title)}</h2>
        <p>${escapeHtml(day.stay ? `Base / hospedaje: ${day.stay}.` : 'Día de traslado.')} Estos detalles incluyen mapas, notas de investigación, búsqueda de imágenes y una línea de tiempo por día.</p>
      </div>
      <div class="day-photo" data-image-key="day-photo-${escapeHtml(day.id)}" data-image-query="${escapeHtml(day.imageQuery)}" data-fallback="${escapeHtml(day.fallbackImage)}"></div>
    </div>
    <div class="timeline">
      ${activities.map((item, index) => renderTimelineItem(item, index)).join('')}
    </div>
    ${renderSchedule(day.schedule)}
  `;
  $$('.toggle-more').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.timeline-card');
    const key = button.dataset.key;
    card.classList.toggle('open');
    if (card.classList.contains('open')) state.expanded.add(key); else state.expanded.delete(key);
    const isOpen = card.classList.contains('open');
    button.innerHTML = notesButtonMarkup(isOpen);
    button.setAttribute('aria-label', notesLabel(isOpen));
    button.title = notesLabel(isOpen);
  }));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: .2 });
  $$('.timeline-item').forEach(item => observer.observe(item));
}

function renderTimelineItem(item, index) {
  const key = `${item.row || index}`;
  const hasDetails = item.research || item.description;
  const googleQuery = item.imageQuery || `${item.title} Banff Canadá`;
  const noteIsOpen = state.expanded.has(key);
  const actions = [
    item.flightUrl ? `<a class="tiny-link icon-only" href="${escapeHtml(item.flightUrl)}" target="_blank" rel="noreferrer" aria-label="Ver vuelo en FlightAware">${iconOnlyLabel('plane')}</a>` : '',
    item.foodUrl ? `<a class="tiny-link icon-only" href="${escapeHtml(item.foodUrl)}" target="_blank" rel="noreferrer" aria-label="Comida">${iconOnlyLabel('food')}</a>` : '',
    item.mapUrl ? `<a class="tiny-link icon-only" href="${escapeHtml(item.mapUrl)}" target="_blank" rel="noreferrer" aria-label="Abrir ruta">${iconOnlyLabel('pin')}</a>` : '',
    `<a class="tiny-link icon-only" href="${escapeHtml(imageSearchUrl(googleQuery))}" target="_blank" rel="noreferrer" aria-label="Buscar imágenes" title="Buscar imágenes">${iconOnlyLabel('image')}</a>`,
    hasDetails ? `<button class="toggle-more icon-only" data-key="${escapeHtml(key)}" type="button" aria-label="${notesLabel(noteIsOpen)}" title="${notesLabel(noteIsOpen)}">${notesButtonMarkup(noteIsOpen)}</button>` : ''
  ].join('');
  return `
    <article class="timeline-item" style="transition-delay:${Math.min(index * 70, 560)}ms">
      <span class="timeline-dot"></span>
      <div class="time-block"><strong>${escapeHtml(item.phase || item.time || 'Plan')}</strong><span>Fila ${escapeHtml(item.row)}</span></div>
      <div class="timeline-card ${state.expanded.has(key) ? 'open' : ''}">
        <div class="timeline-card-main">
          <div class="timeline-copy">
            <div class="timeline-title-row">
              <span class="icon-bubble">${iconSvg[item.icon] || iconSvg.pin}</span>
              <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description || item.note || '')}</p></div>
            </div>
            ${item.research ? `<div class="research"><strong>Investigación útil</strong><br>${escapeHtml(item.research)}</div>` : ''}
            <div class="timeline-actions">${actions}</div>
          </div>
          <div class="activity-image" data-image-key="activity-${escapeHtml(key)}-${index}" data-image-query="${escapeHtml(googleQuery)}" data-fallback="${escapeHtml(item.fallbackImage || '')}"></div>
        </div>
        ${hasDetails ? `<div class="details-row"><p>${escapeHtml(item.research || item.description || '')}</p></div>` : ''}
      </div>
    </article>`;
}

function renderSchedule(schedule) {
  if (!schedule.length) return '';
  return `
    <div class="schedule-list">
      <h3>Detalles del viaje</h3>
      <div class="schedule-grid">
        ${schedule.map(item => `
          <div class="schedule-item">
            <span class="schedule-time">${escapeHtml(item.time || '-')}</span>
            <div><div class="schedule-title">${escapeHtml(item.title)}</div>${item.note ? `<p>${escapeHtml(item.note)}</p>` : ''}${item.flightUrl ? `<a class="tiny-link icon-only" href="${escapeHtml(item.flightUrl)}" target="_blank" rel="noreferrer" aria-label="Ver vuelo en FlightAware">${iconOnlyLabel('plane')}</a>` : ''}${item.foodUrl ? `<a class="tiny-link icon-only" href="${escapeHtml(item.foodUrl)}" target="_blank" rel="noreferrer" aria-label="Comida">${iconOnlyLabel('food')}</a>` : ''}${item.mapUrl ? `<a class="tiny-link icon-only" href="${escapeHtml(item.mapUrl)}" target="_blank" rel="noreferrer" aria-label="Abrir ruta">${iconOnlyLabel('pin')}</a>` : ''}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

async function loadTrip() {
  showTrip();
  if (state.data) {
    hydrateImages();
    return;
  }

  const response = await fetch('itinerary.json', { cache: 'no-cache' });
  if (!response.ok) throw new Error('No se pudieron cargar los detalles del viaje');

  state.data = await response.json();
  state.activeDayId = state.data.days[0]?.id;
  renderHero();
  renderDays();
  renderTimeline(state.data.days[0]);
  hydrateImages();
  $('#search').addEventListener('input', event => {
    state.query = event.target.value.trim();
    renderDays();
    hydrateImages();
  });
  $('#expandAll').addEventListener('click', () => {
    const day = state.data.days.find(x => x.id === state.activeDayId);
    (day?.activities || []).forEach(item => state.expanded.add(`${item.row}`));
    setActiveDay(state.activeDayId);
  });
  $('#collapseAll').addEventListener('click', () => {
    state.expanded.clear();
    setActiveDay(state.activeDayId);
  });
  $('#logout').addEventListener('click', () => {
    sessionStorage.removeItem(ACCESS_FLAG);
    location.reload();
  });
}

async function init() {
  $('#accessForm')?.addEventListener('submit', verifyAccess);
  if (!hasAccess()) {
    showAccess();
    return;
  }
  await loadTrip();
}

init().catch(error => {
  showTrip();
  $('#tripTitle').textContent = 'No se pudieron cargar los detalles del viaje';
  $('#tripSubtitle').textContent = error.message;
});
