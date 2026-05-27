const ACCESS_HASH = '747dd1f585976e57d49695f0f4483fbb99a60bbda8ad23f66f14654386e4592b';
const ACCESS_FLAG = 'canada-2026-access';

const state = {
  data: null,
  activeDayId: null,
  query: '',
  expanded: new Set()
};

const assignedImages = new Map();
const assignedImageUrls = new Set();

const scenicImages = [
  'assets/moraine-lake.jpg',
  'assets/lake-louise.jpg'
];

const accurateImages = {
  moraineLake: 'assets/moraine-lake.jpg',
  lakeLouise: 'assets/lake-louise.jpg',
  emeraldLake: 'assets/lake-louise.jpg',
  takakkawFalls: 'assets/lake-louise.jpg',
  johnstonCanyon: 'assets/lake-louise.jpg',
  bowLake: 'assets/lake-louise.jpg',
  peytoLake: 'assets/lake-louise.jpg',
  banffTown: 'assets/moraine-lake.jpg',
  sulphurMountain: 'assets/lake-louise.jpg'
};

const accurateImageRules = [
  { terms: ['moraine', 'lake moraine'], url: accurateImages.moraineLake },
  { terms: ['takakkaw'], url: accurateImages.takakkawFalls },
  { terms: ['emerald', 'yoho'], url: accurateImages.emeraldLake },
  { terms: ['johnston'], url: accurateImages.johnstonCanyon },
  { terms: ['peyto'], url: accurateImages.peytoLake },
  { terms: ['bow lake', 'icefields', 'parkway', 'jasper'], url: accurateImages.bowLake },
  { terms: ['sulphur', 'sulfur', 'gondola'], url: accurateImages.sulphurMountain },
  { terms: ['lake louise', 'lakeshore', 'lake agnes', 'fairview', 'park and ride'], url: accurateImages.lakeLouise },
  { terms: ['banff high school', 'banff train', 'banff avenue', 'pueblo de banff', 'banff town'], url: accurateImages.banffTown }
];

const onlineImageByKey = {
  hero: commonsImage('Moraine Lake, Banff National Park.jpg'),

  'day-card-day-5-31': commonsImage('Calgary skyline (15077898737).jpg'),
  'day-photo-day-5-31': commonsImage('Calgary International Airport (2) (7385398770).jpg'),
  'activity-day-5-31-14-0': commonsImage('International Terminal of Calgary Airport, Jul 2017.jpg'),
  'activity-day-5-31-16-1': commonsImage('Avis car rental agency at Philadelphia International Airport.jpg'),
  'activity-day-5-31-22-2': commonsImage('Calgary view from Airport.jpg'),
  'activity-day-5-31-23-3': commonsImage('Calgary Skyline 2015.png'),

  'day-card-day-6-1': commonsImage('Banff Town.jpg'),
  'day-photo-day-6-1': commonsImage('Bow Falls (24298947467).jpg'),
  'activity-day-6-1-24-0': commonsImage('Three Sisters from Police Creek.jpg'),
  'activity-day-6-1-27-1': commonsImage('Supermarket aisle sign in Calgary, Alberta, Canada.jpg'),
  'activity-day-6-1-30-2': commonsImage('Views of The Three Sisters, Canmore.jpg'),
  'activity-day-6-1-31-3': commonsImage('Bow Falls Banff (AB) September 2019 (49581486441).jpg'),
  'activity-day-6-1-32-4': commonsImage('Banff Avenue (3866849216).jpg'),

  'day-card-day-6-2': commonsImage('Lake Louise Alberta.JPG'),
  'day-photo-day-6-2': commonsImage('Moraine Lake-Banff NP.JPG'),
  'activity-day-6-2-34-0': commonsImage('Moraine lake banff.jpg'),
  'activity-day-6-2-37-1': commonsImage('Lake Louise in summer.jpg'),
  'activity-day-6-2-38-2': commonsImage('Moraine lake , banff national park.jpg'),
  'activity-day-6-2-39-3': commonsImage('Lake Louise in Summer 2020.jpg'),
  'activity-day-6-2-40-4': commonsImage('Banff Gondola Sulphur Mountain (15800344652).jpg'),
  'activity-day-6-2-41-5': commonsImage('Lake Agnes Tea House (15464773570).jpg'),

  'day-card-day-6-3': commonsImage('Icefields Parkway - Banff-Jasper National Parks (33757574146).jpg'),
  'day-photo-day-6-3': commonsImage('Bow Lake beim Icefields Parkway.jpg'),
  'activity-day-6-3-44-0': commonsImage('IceFieldsParkway.jpg'),
  'activity-day-6-3-46-1': commonsImage('Bow Lake-Crowfoot Glacier.jpg'),
  'activity-day-6-3-47-2': commonsImage('Peyto Lake-Banff NP-Canada.jpg'),
  'activity-day-6-3-48-3': commonsImage('Athabasca Glacier 2025.jpg'),
  'activity-day-6-3-49-4': commonsImage('Stutfield Glacier Viewpoint (27435092899).jpg'),
  'activity-day-6-3-50-5': commonsImage('Icefields Parkway (11) (9577863577).jpg'),
  'activity-day-6-3-51-6': commonsImage('Athabasca Glacier.jpg'),
  'activity-day-6-3-55-7': commonsImage('Jasper townsite.jpg'),

  'day-card-day-6-4': commonsImage('Jasper National Park Pyramid Lake.jpg'),
  'day-photo-day-6-4': commonsImage('Maligne Lake - Jasper.jpg'),
  'activity-day-6-4-58-0': commonsImage('Jasper, Alberta.jpg'),
  'activity-day-6-4-59-1': commonsImage('Patricia Lake.jpg'),
  'activity-day-6-4-60-2': commonsImage('Lake Edith Jasper.jpg'),
  'activity-day-6-4-61-3': commonsImage('Medicine Lake, Jasper National Park.jpg'),
  'activity-day-6-4-63-4': commonsImage('Icefields Parkway.jpg'),

  'day-card-day-6-5': commonsImage('Emerald lake Yoho national park.jpg'),
  'day-photo-day-6-5': commonsImage('Takakkaw Falls.jpg'),
  'activity-day-6-5-66-0': commonsImage('Emerald Lake - Yoho National Park.JPG'),
  'activity-day-6-5-67-1': commonsImage('Emerald lake yoho nationalpark.JPG'),
  'activity-day-6-5-68-2': commonsImage('Takakkaw Falls, Yoho National Park, Canada (54881495395).jpg'),
  'activity-day-6-5-69-3': commonsImage('Lake Louise (32987175500).jpg'),
  'activity-day-6-5-70-4': commonsImage('Fairmont Chateau Lake Louise (8168776624).jpg'),

  'day-card-day-6-6': commonsImage('Johnston Canyon - Banff (29473002666).jpg'),
  'day-photo-day-6-6': commonsImage('Lake Agnes Tea House - panoramio.jpg'),
  'activity-day-6-6-72-0': commonsImage('Johnston Canyon in Banff National Park.jpg'),
  'activity-day-6-6-73-1': commonsImage('Johnston Canyon View.jpg'),
  'activity-day-6-6-75-2': commonsImage('Lake Louise, Banff National Park (7853823842).jpg'),
  'activity-day-6-6-76-3': commonsImage('Tea at Lake Agnes.jpg'),

  'day-card-day-6-7': commonsImage('Calgary AB Airport Calgary-International-Airport 2022-09-29 (48).jpg'),
  'day-photo-day-6-7': commonsImage('Calgary Airport overview.jpg'),
  'activity-day-6-7-78-0': commonsImage('CalgaryAirportFlyover.jpg'),
  'activity-day-6-7-82-1': commonsImage('WestJet 737 MAX 8.jpg')
};

const onlineImageRules = [
  {
    terms: ['moraine', 'rockpile'],
    files: ['Moraine Lake.jpg', 'LakeMoraine.jpg', 'Moraine Lake - Banff National Park.jpg', 'Moraine Lake-Banff NP.JPG']
  },
  {
    terms: ['lake louise', 'lakeshore', 'fairview'],
    files: ['Lake Louise Alberta.JPG', 'Lake Louise in summer.jpg', 'Lake Louise from Beehive.JPG']
  },
  {
    terms: ['yoho', 'emerald'],
    files: ['Emerald lake Yoho national park.jpg', 'Emerald Lake-Yoho.jpg', 'Emerald Lake, Yoho.jpg']
  },
  {
    terms: ['takakkaw', 'falls', 'cascada'],
    files: ['Takakkaw Falls.jpg', 'Takakkaw falls.JPG', 'Takakkaw Falls, Yoho National Park.jpg']
  },
  {
    terms: ['johnston', 'canyon'],
    files: ['Johnston Canyon - Banff National Park (29676794635).jpg', 'JOHNSTON CANYON.jpg', 'Johnston Canyon (32526977764).jpg']
  },
  {
    terms: ['jasper', 'pyramid', 'patricia', 'medicine', 'maligne', 'edith'],
    files: ['Pyramid Lake (Alberta).jpg', 'Pyramid lake in Jasper National Park.jpg', 'Medicine Lake in Jasper National Park.jpg', 'Maligne Lake.JPG']
  },
  {
    terms: ['icefields', 'athabasca', 'bow lake', 'crowfoot', 'peyto', 'glacier'],
    files: ['Bow Lake-Bow Glacier.jpg', 'Crowfoot glacier.jpg', 'Athabasca glacier.jpg', 'Columbia Icefield along Icefields Parkway.jpg']
  },
  {
    terms: ['banff', 'bow falls', 'town', 'avenue'],
    files: ['Town of banff.jpg', 'Banff Avenue, Banff (7889960184).jpg', 'Bow Falls (2677514387).jpg', 'Banff from Sulphur Mountain (7800642484).jpg']
  },
  {
    terms: ['calgary', 'airport', 'avis', 'westjet', 'vuelo'],
    files: ['Calgary Airport.jpg', 'Calgary-Airport-interior.jpg', 'Calgary Airport (34410026506).jpg', 'Parked Viva Aerobus airplane at a gate at Calgary International Airport (YYC).jpg']
  }
];

const genericOnlineImageFiles = [
  'Three Sister Mountains, Canmore, Alberta.jpg',
  'Icefields Parkway 001.jpg',
  'Jasper National Park 14.jpg',
  'Sulphur Mountain Banff.jpg',
  'Town of Banff viewed from Sulphur Mountain.jpg',
  'Bow Lake, Crowfoot Glacier, et al.jpg'
];

const iconSvg = {
  plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.5 21 13 13l8-3-8-3-2.5-8-2.5 8-8 3 8 3 2.5 8Z"/><path d="m13 13 3 3"/><path d="m8 13-3 3"/></svg>',
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
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const motionContexts = new Map();
const liquidState = {
  raf: 0,
  observers: [],
  supportsSvg: undefined
};
let scrollTriggerRegistered = false;

const liquidSurfaceSelector = [
  '.access-card',
  '.topbar',
  '.hero-copy',
  '.hero-glass',
  '.stat',
  '.searchbar',
  '.timeline-shell',
  '.day-intro',
  '.timeline-card',
  '.schedule-list',
  '.schedule-item',
  '.embedded-map'
].join(',');

const softLiquidSurfaceSelector = [
  '.ghost-button',
  '.chip',
  '.date-pill',
  '.meta-pill',
  '.map-link',
  '.tiny-link',
  '.toggle-more',
  '.icon-bubble'
].join(',');

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}

function normalizeText(value = '') {
  return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function imageSearchUrl(query) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query || 'Banff Canadá montañas cascadas')}`;
}

function commonsImage(fileName, width = 1600, variant = '') {
  const source = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`;
  return variant ? `${source}&codexVariant=${encodeURIComponent(variant)}` : source;
}

function cssImageUrl(url) {
  return `url("${url.replace(/"/g, '%22')}")`;
}

function imageUrlKey(url) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete('width');
    return parsed.toString();
  } catch {
    return url;
  }
}

function googleMapsEmbedUrl(url, fallbackQuery = 'Banff Alberta') {
  const fallback = new URLSearchParams({ output: 'embed', q: fallbackQuery }).toString();
  if (!url) return `https://www.google.com/maps?${fallback}`;

  try {
    const parsed = new URL(url, window.location.href);
    const path = parsed.pathname;

    if (path.includes('/maps/dir/')) {
      const origin = parsed.searchParams.get('origin') || fallbackQuery;
      const destination = parsed.searchParams.get('destination') || fallbackQuery;
      const waypoints = parsed.searchParams.get('waypoints');
      const routeTarget = [waypoints, destination].filter(Boolean).join(' to ');
      const params = new URLSearchParams({ output: 'embed', saddr: origin, daddr: routeTarget });
      return `https://www.google.com/maps?${params.toString()}`;
    }

    if (path.includes('/maps/search')) {
      const pathQuery = decodeURIComponent((path.split('/maps/search/')[1] || '').split('/@')[0] || '').replace(/\+/g, ' ');
      const query = parsed.searchParams.get('query') || pathQuery || fallbackQuery;
      const params = new URLSearchParams({ output: 'embed', q: query });
      const coords = path.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(\d+)z/);
      if (coords) {
        params.set('ll', `${coords[1]},${coords[2]}`);
        params.set('z', coords[3]);
      }
      return `https://www.google.com/maps?${params.toString()}`;
    }
  } catch {}

  return `https://www.google.com/maps?${fallback}`;
}

function mapPanelId(context, type, key, index) {
  return `map-${context}-${type}-${String(key || index).replace(/[^a-z0-9_-]/gi, '-')}-${index}`;
}

function mapToggleButton(type, targetId) {
  const iconName = type === 'food' ? 'food' : 'pin';
  const label = type === 'food' ? 'Comida' : 'Abrir ruta';
  return `<button class="tiny-link icon-only map-toggle" data-map-target="${escapeHtml(targetId)}" type="button" aria-label="${label}">${iconOnlyLabel(iconName)}</button>`;
}

function renderEmbeddedMap(type, targetId, sourceUrl, fallbackQuery) {
  const label = type === 'food' ? 'Restaurantes cercanos' : 'Mapa de la ruta';
  return `
    <div class="embedded-map" id="${escapeHtml(targetId)}" hidden>
      <iframe title="${escapeHtml(label)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen data-src="${escapeHtml(googleMapsEmbedUrl(sourceUrl, fallbackQuery))}"></iframe>
    </div>`;
}

function bindMapToggles() {
  $$('.map-toggle').forEach(button => button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.mapTarget);
    if (!panel) return;
    const frame = panel.querySelector('iframe');
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    panel.classList.toggle('open', willOpen);
    button.classList.toggle('active', willOpen);
    if (willOpen && frame && !frame.src) frame.src = frame.dataset.src;
    if (willOpen) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    scheduleLiquidGlassRefresh();
  }));
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
  scheduleLiquidGlassRefresh();
  animateAccessScreen();
  requestAnimationFrame(() => $('#accessCode')?.focus());
}

function showTrip() {
  document.body.classList.remove('locked');
  $('#accessScreen')?.setAttribute('hidden', '');
  scheduleLiquidGlassRefresh();
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

function findAccurateImage(query = '') {
  const normalized = normalizeText(query);
  const match = accurateImageRules.find(rule => rule.terms.some(term => normalized.includes(term)));
  return match?.url || '';
}

function imagePool() {
  const localFallbacks = (state.data?.fallbackImages || []).filter(url => !/^https?:\/\//i.test(url));
  return Array.from(new Set([...Object.values(accurateImages), ...localFallbacks, ...scenicImages].filter(Boolean)));
}

function assignImage(key, imageValue, sourceUrl = '') {
  assignedImages.set(key, imageValue);
  if (sourceUrl) assignedImageUrls.add(imageUrlKey(sourceUrl));
  return imageValue;
}

function colorRamp(seed, theme) {
  const palettes = {
    moraine: ['#183b57', '#5aa5b0', '#d7f3f0', '#e8b16b'],
    lake: ['#264b5c', '#79b6bf', '#dcefed', '#c68d59'],
    yoho: ['#1e4f50', '#78aa87', '#e7f4dc', '#cfa95f'],
    canyon: ['#3f5b49', '#9d7754', '#f1d8b8', '#77a9b5'],
    ice: ['#243c5a', '#7ea8c5', '#edf6fb', '#c6d5df'],
    town: ['#163d4a', '#c37c59', '#f4e6cf', '#6ea7a6'],
    transit: ['#173e52', '#6b9fb0', '#eff8f4', '#d69b63'],
    waterfall: ['#173f4f', '#6ea7b5', '#eaf7f8', '#c6d7cc'],
    gondola: ['#213b50', '#7aa6b2', '#f2f5ee', '#d09a60'],
    trail: ['#214939', '#82a875', '#f2ead3', '#bd8452'],
    food: ['#344233', '#a77758', '#fff2de', '#d89661'],
    default: ['#163f52', '#6fb7bd', '#eef7ef', '#d3a45e']
  };
  const ramp = palettes[theme] || palettes.default;
  return ramp.map((color, index) => {
    const amount = ((seed >> (index * 3)) & 7) - 3;
    return shadeHex(color, amount * 4);
  });
}

function shadeHex(hex, amount) {
  const value = hex.replace('#', '');
  const parts = [0, 2, 4].map(index => parseInt(value.slice(index, index + 2), 16));
  const shifted = parts.map(part => Math.max(0, Math.min(255, part + amount)).toString(16).padStart(2, '0'));
  return `#${shifted.join('')}`;
}

function imageTheme(query = '') {
  const normalized = normalizeText(query);
  if (/(desayuno|breakfast|comida|food|cafe|restaurant|lunch|dinner|snack)/.test(normalized)) return 'food';
  if (/(airport|aeropuerto|traslado|transit|shuttle|train station|high school|parking|regreso|salir|ruta|park and ride)/.test(normalized)) return 'transit';
  if (normalized.includes('takakkaw') || normalized.includes('falls') || normalized.includes('cascada')) return 'waterfall';
  if (normalized.includes('gondola') || normalized.includes('sulphur') || normalized.includes('sulfur')) return 'gondola';
  if (normalized.includes('moraine')) return 'moraine';
  if (normalized.includes('yoho') || normalized.includes('emerald') || normalized.includes('takakkaw')) return 'yoho';
  if (normalized.includes('johnston') || normalized.includes('canyon')) return 'canyon';
  if (normalized.includes('jasper') || normalized.includes('icefields') || normalized.includes('peyto') || normalized.includes('bow lake')) return 'ice';
  if (normalized.includes('hiking') || normalized.includes('trail') || normalized.includes('agnes') || normalized.includes('fairview') || normalized.includes('mirador')) return 'trail';
  if (normalized.includes('banff') || normalized.includes('calgary')) return 'town';
  if (normalized.includes('lake') || normalized.includes('louise') || normalized.includes('agnes')) return 'lake';
  return 'default';
}

function buildPines(seed, dark, mid, baseY = 820) {
  return Array.from({ length: 11 }, (_, index) => {
    const x = 34 + index * 128 + ((seed >> (index % 16)) & 31);
    const height = 62 + ((seed >> ((index + 5) % 18)) & 63);
    const trunk = height * .2;
    const color = index % 2 ? dark : mid;
    return `
      <path d="M${x} ${baseY - height} L${x - height * .32} ${baseY - trunk} H${x - height * .16} L${x - height * .45} ${baseY + 6} H${x + height * .45} L${x + height * .16} ${baseY - trunk} H${x + height * .32}Z" fill="${color}" opacity=".64"/>
      <rect x="${x - 4}" y="${baseY - trunk}" width="8" height="${trunk + 18}" rx="4" fill="${dark}" opacity=".58"/>`;
  }).join('');
}

function scenicForeground(theme, seed, colors, layout) {
  const { dark, mid, light, warm } = colors;
  const { lakeY, ridgeA, ridgeB, pathShift } = layout;
  const shift = pathShift - 70;

  if (theme === 'transit') {
    return `
      <path d="M0 900 L390 ${lakeY + 92} C520 ${lakeY + 28} 710 ${lakeY + 42} 860 ${lakeY - 16} L1400 ${lakeY + 110} V900Z" fill="${dark}" opacity=".34"/>
      <path d="M${220 + shift} 900 C${320 + shift} 744 ${560 + shift} 718 ${725 + shift} ${lakeY + 28} S1050 ${lakeY + 2} 1240 ${lakeY - 64}" fill="none" stroke="${warm}" stroke-width="74" stroke-linecap="round" opacity=".72"/>
      <path d="M${220 + shift} 900 C${320 + shift} 744 ${560 + shift} 718 ${725 + shift} ${lakeY + 28} S1050 ${lakeY + 2} 1240 ${lakeY - 64}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-dasharray="34 34" opacity=".72"/>
      <rect x="${740 + shift * .18}" y="${lakeY - 78}" width="196" height="82" rx="24" fill="${dark}" opacity=".88"/>
      <rect x="${768 + shift * .18}" y="${lakeY - 54}" width="50" height="30" rx="8" fill="${light}" opacity=".76"/>
      <rect x="${832 + shift * .18}" y="${lakeY - 54}" width="50" height="30" rx="8" fill="${light}" opacity=".76"/>
      <circle cx="${790 + shift * .18}" cy="${lakeY + 10}" r="18" fill="${light}" opacity=".92"/>
      <circle cx="${900 + shift * .18}" cy="${lakeY + 10}" r="18" fill="${light}" opacity=".92"/>`;
  }

  if (theme === 'waterfall') {
    return `
      <path d="M0 ${ridgeA + 54} C150 ${ridgeA - 50} 260 ${ridgeB + 48} 430 ${ridgeA + 4} V900 H0Z" fill="${dark}" opacity=".76"/>
      <path d="M1400 ${ridgeA + 28} C1250 ${ridgeA - 82} 1100 ${ridgeB + 36} 922 ${ridgeA - 8} V900 H1400Z" fill="${dark}" opacity=".72"/>
      <path d="M630 ${ridgeA - 40} C674 ${ridgeA + 90} 596 ${ridgeB + 130} 650 ${lakeY + 206}" fill="none" stroke="#fff" stroke-width="48" stroke-linecap="round" opacity=".84"/>
      <path d="M704 ${ridgeA - 10} C740 ${ridgeA + 84} 704 ${ridgeB + 162} 752 ${lakeY + 180}" fill="none" stroke="${light}" stroke-width="20" stroke-linecap="round" opacity=".86"/>
      <ellipse cx="690" cy="${lakeY + 220}" rx="210" ry="56" fill="#fff" opacity=".34" filter="url(#soft-${seed})"/>`;
  }

  if (theme === 'canyon') {
    return `
      <path d="M0 ${ridgeB - 20} C180 ${ridgeA + 24} 230 ${ridgeB + 180} 430 900 H0Z" fill="${warm}" opacity=".60"/>
      <path d="M1400 ${ridgeB - 42} C1190 ${ridgeA + 16} 1140 ${ridgeB + 208} 950 900 H1400Z" fill="${dark}" opacity=".64"/>
      <path d="M310 900 C470 770 540 720 674 ${lakeY + 72} S910 ${lakeY + 108} 1080 900Z" fill="${mid}" opacity=".72"/>
      <path d="M420 900 C560 796 676 768 814 ${lakeY + 148}" fill="none" stroke="#fff" stroke-width="10" stroke-opacity=".34"/>`;
  }

  if (theme === 'gondola') {
    return `
      <path d="M0 ${lakeY + 82} C300 ${lakeY - 32} 650 ${lakeY + 122} 1400 ${lakeY - 46} V900 H0Z" fill="${dark}" opacity=".32"/>
      <path d="M-20 ${ridgeA + 18} C360 ${ridgeA - 72} 850 ${ridgeB - 118} 1440 ${ridgeA - 54}" fill="none" stroke="${dark}" stroke-width="8" opacity=".70"/>
      <path d="M-20 ${ridgeA + 70} C360 ${ridgeA - 18} 850 ${ridgeB - 64} 1440 ${ridgeA - 4}" fill="none" stroke="${dark}" stroke-width="5" opacity=".45"/>
      <rect x="${610 + shift * .35}" y="${ridgeA - 62}" width="124" height="92" rx="24" fill="${warm}" opacity=".86"/>
      <rect x="${638 + shift * .35}" y="${ridgeA - 36}" width="70" height="34" rx="10" fill="${light}" opacity=".78"/>
      <path d="M${672 + shift * .35} ${ridgeA - 62} V${ridgeA - 96}" stroke="${dark}" stroke-width="7" stroke-linecap="round"/>`;
  }

  if (theme === 'trail') {
    return `
      ${buildPines(seed, dark, mid, 826)}
      <path d="M${140 + shift} 900 C${360 + shift} 782 ${354 + shift} 690 ${560 + shift} ${lakeY + 42} S930 ${lakeY + 44} 1130 ${lakeY - 58}" fill="none" stroke="${warm}" stroke-width="42" stroke-linecap="round" opacity=".70"/>
      <path d="M${140 + shift} 900 C${360 + shift} 782 ${354 + shift} 690 ${560 + shift} ${lakeY + 42} S930 ${lakeY + 44} 1130 ${lakeY - 58}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-dasharray="26 32" opacity=".42"/>`;
  }

  if (theme === 'food') {
    return `
      <path d="M0 ${lakeY + 114} C260 ${lakeY + 30} 470 ${lakeY + 118} 690 ${lakeY + 28} S1110 ${lakeY + 62} 1400 ${lakeY - 18} V900 H0Z" fill="${dark}" opacity=".34"/>
      <rect x="${470 + shift * .25}" y="${lakeY + 6}" width="310" height="160" rx="26" fill="${warm}" opacity=".82"/>
      <path d="M430 ${lakeY + 26} L625 ${lakeY - 104} L826 ${lakeY + 26}Z" fill="${dark}" opacity=".78"/>
      <rect x="${540 + shift * .25}" y="${lakeY + 62}" width="82" height="104" rx="14" fill="${dark}" opacity=".62"/>
      <circle cx="${846 + shift * .18}" cy="${lakeY + 136}" r="56" fill="${light}" opacity=".78"/>
      <path d="M828 ${lakeY + 112} C802 ${lakeY + 72} 850 ${lakeY + 62} 828 ${lakeY + 22}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55"/>`;
  }

  if (theme === 'town') {
    return `
      <path d="M0 ${lakeY + 120} C330 ${lakeY + 28} 620 ${lakeY + 132} 1400 ${lakeY + 20} V900 H0Z" fill="${dark}" opacity=".36"/>
      <rect x="${160 + shift * .22}" y="${lakeY + 18}" width="192" height="128" rx="18" fill="${warm}" opacity=".78"/>
      <path d="M126 ${lakeY + 28} L256 ${lakeY - 62} L386 ${lakeY + 28}Z" fill="${dark}" opacity=".82"/>
      <rect x="${444 + shift * .18}" y="${lakeY + 50}" width="276" height="98" rx="18" fill="${mid}" opacity=".58"/>
      <path d="M418 ${lakeY + 58} L582 ${lakeY - 36} L746 ${lakeY + 58}Z" fill="${dark}" opacity=".70"/>
      ${buildPines(seed >> 2, dark, mid, 850)}`;
  }

  if (theme === 'ice') {
    return `
      <path d="M0 ${lakeY + 94} C270 ${lakeY - 26} 438 ${lakeY + 86} 620 ${lakeY - 20} S1030 ${lakeY + 30} 1400 ${lakeY - 78} V900 H0Z" fill="${mid}" opacity=".58"/>
      <path d="M434 ${ridgeA + 8} L612 ${ridgeA - 152} L838 ${ridgeA + 28} L738 ${lakeY + 84} L520 ${lakeY + 28}Z" fill="${light}" opacity=".72"/>
      <path d="M612 ${ridgeA - 152} L692 ${lakeY + 58} L520 ${lakeY + 28}Z" fill="#fff" opacity=".44"/>
      <path d="M470 ${lakeY + 124} C610 ${lakeY + 88} 720 ${lakeY + 150} 920 ${lakeY + 92}" fill="none" stroke="#fff" stroke-width="13" stroke-opacity=".42"/>`;
  }

  if (theme === 'yoho') {
    return `
      <ellipse cx="${760 + shift * .18}" cy="${lakeY + 86}" rx="260" ry="78" fill="${dark}" opacity=".42"/>
      ${buildPines(seed, dark, mid, lakeY + 82)}
      <path d="M0 ${lakeY + 150} C260 ${lakeY + 86} 440 ${lakeY + 164} 640 ${lakeY + 118} S1020 ${lakeY + 126} 1400 ${lakeY + 72} V900 H0Z" fill="${mid}" opacity=".42"/>`;
  }

  return `
    <path d="M${180 + pathShift} 900 C${260 + pathShift} 780 ${360 + pathShift} 745 ${520 + pathShift} ${lakeY + 36}" fill="none" stroke="${warm}" stroke-opacity=".46" stroke-width="20" stroke-linecap="round"/>
    ${buildPines(seed, dark, mid, 860)}`;
}

function buildScenicLayer(key, query = '') {
  const seed = hashString(`${key}|${query}`);
  const theme = imageTheme(query);
  const [dark, mid, light, warm] = colorRamp(seed, theme);
  const ridgeA = 250 + (seed % 90);
  const ridgeB = 340 + ((seed >> 4) % 90);
  const sunX = 170 + ((seed >> 7) % 920);
  const sunY = 110 + ((seed >> 11) % 180);
  const mist = 0.22 + ((seed >> 15) % 20) / 100;
  const lakeY = 604 + ((seed >> 19) % 40);
  const pathShift = (seed >> 22) % 170;
  const foreground = scenicForeground(theme, seed, { dark, mid, light, warm }, { lakeY, ridgeA, ridgeB, pathShift });
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
      <defs>
        <linearGradient id="sky-${seed}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${light}" stop-opacity=".98"/>
          <stop offset=".52" stop-color="${mid}" stop-opacity=".72"/>
          <stop offset="1" stop-color="${dark}" stop-opacity=".86"/>
        </linearGradient>
        <linearGradient id="lake-${seed}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${mid}" stop-opacity=".92"/>
          <stop offset=".55" stop-color="${light}" stop-opacity=".58"/>
          <stop offset="1" stop-color="${dark}" stop-opacity=".84"/>
        </linearGradient>
        <filter id="soft-${seed}">
          <feGaussianBlur stdDeviation="18"/>
        </filter>
      </defs>
      <rect width="1400" height="900" fill="url(#sky-${seed})"/>
      <circle cx="${sunX}" cy="${sunY}" r="${78 + (seed % 28)}" fill="${warm}" opacity=".30" filter="url(#soft-${seed})"/>
      <path d="M0 ${ridgeB} L120 ${ridgeA} L235 ${ridgeB - 38} L360 ${ridgeA - 80} L520 ${ridgeB - 18} L650 ${ridgeA - 112} L805 ${ridgeB - 34} L960 ${ridgeA - 70} L1100 ${ridgeB - 24} L1250 ${ridgeA - 96} L1400 ${ridgeB - 44} V900 H0Z" fill="${dark}" opacity=".78"/>
      <path d="M0 ${ridgeB + 88} L160 ${ridgeB - 16} L300 ${ridgeB + 56} L475 ${ridgeA - 10} L645 ${ridgeB + 76} L820 ${ridgeA - 34} L980 ${ridgeB + 62} L1150 ${ridgeA + 18} L1400 ${ridgeB + 82} V900 H0Z" fill="${mid}" opacity=".58"/>
      <path d="M225 ${ridgeB - 32} L360 ${ridgeA - 80} L438 ${ridgeB - 11} L360 ${ridgeA - 28}Z M555 ${ridgeB - 62} L650 ${ridgeA - 112} L728 ${ridgeB - 42} L650 ${ridgeA - 46}Z M1164 ${ridgeB - 48} L1250 ${ridgeA - 96} L1320 ${ridgeB - 56} L1250 ${ridgeA - 40}Z" fill="#fff" opacity=".54"/>
      <path d="M0 ${lakeY} C210 ${lakeY - 56} 344 ${lakeY + 18} 520 ${lakeY - 22} S850 ${lakeY - 12} 1030 ${lakeY - 46} S1260 ${lakeY - 3} 1400 ${lakeY - 36} V900 H0Z" fill="url(#lake-${seed})"/>
      <path d="M80 ${lakeY + 82} C270 ${lakeY + 28} 450 ${lakeY + 118} 640 ${lakeY + 55} S985 ${lakeY + 90} 1320 ${lakeY + 35}" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="12"/>
      ${foreground}
      <rect y="${lakeY - 80}" width="1400" height="150" fill="#fff" opacity="${mist}" filter="url(#soft-${seed})"/>
      <rect width="1400" height="900" fill="none" stroke="#fff" stroke-opacity=".24" stroke-width="18"/>
    </svg>`;
  return `url("${svgDataUri(svg)}")`;
}

function baseImageFor(query = '') {
  return imageTheme(query) === 'moraine' ? accurateImages.moraineLake : accurateImages.lakeLouise;
}

function buildImageValue(key, query = '') {
  return `${buildScenicLayer(key, query)}, url("${baseImageFor(query)}")`;
}

function chooseOnlineImageSource(key, query = '') {
  const exact = onlineImageByKey[key];
  if (exact) return exact;

  const normalized = normalizeText(`${key} ${query}`);
  const rule = onlineImageRules.find(item => item.terms.some(term => normalized.includes(term)));
  const files = rule?.files || genericOnlineImageFiles;
  const primaryIndex = Math.abs(hashString(`${key}|${query}`)) % files.length;
  const ordered = [...files.slice(primaryIndex), ...files.slice(0, primaryIndex), ...genericOnlineImageFiles];
  const available = ordered
    .map(file => commonsImage(file))
    .find(url => !assignedImageUrls.has(imageUrlKey(url)));

  return available || commonsImage(genericOnlineImageFiles[assignedImages.size % genericOnlineImageFiles.length]);
}

function chooseImage(key, query, fallback) {
  const normalizedKey = key || `${query || 'scenic'}-${assignedImages.size}`;
  if (assignedImages.has(normalizedKey)) return assignedImages.get(normalizedKey);

  const source = chooseOnlineImageSource(normalizedKey, `${query || ''} ${fallback || ''}`);
  return assignImage(normalizedKey, cssImageUrl(source), source);
}

function setBackgroundImage(node, imageValue) {
  node.style.setProperty('--img', imageValue);
}

function hydrateImages() {
  $$('[data-image-query]').forEach((node, index) => {
    const query = node.dataset.imageQuery;
    const fallback = node.dataset.fallback;
    const key = node.dataset.imageKey || `${query}-${index}`;
    const url = chooseImage(key, query, fallback);
    if (url) setBackgroundImage(node, url);
  });
}

function svgDataUri(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22')}`;
}

function supportsSvgBackdropFilter() {
  if (liquidState.supportsSvg !== undefined) return liquidState.supportsSvg;

  const testSvg = '<svg xmlns="http://www.w3.org/2000/svg"><filter id="x"><feGaussianBlur stdDeviation="1"/></filter></svg>';
  const testValue = `url("${svgDataUri(testSvg)}#x")`;
  const probe = document.createElement('div');
  probe.style.backdropFilter = testValue;
  probe.style.webkitBackdropFilter = testValue;
  liquidState.supportsSvg = Boolean(probe.style.backdropFilter || probe.style.webkitBackdropFilter);
  return liquidState.supportsSvg;
}

function buildLiquidBackdropFilter(width, height, radius, settings) {
  const safeWidth = Math.max(48, Math.round(width));
  const safeHeight = Math.max(48, Math.round(height));
  const safeRadius = Math.max(8, Math.round(radius || 24));
  const depth = Math.max(4, Math.round(settings.depth));
  const innerWidth = Math.max(1, safeWidth - depth * 2);
  const innerHeight = Math.max(1, safeHeight - depth * 2);
  const innerRadius = Math.max(2, safeRadius - depth);
  const soften = Math.max(2, Math.round(depth / 1.8));

  const mapSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}">
      <defs>
        <linearGradient id="x" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="rgb(96,128,128)"/>
          <stop offset=".42" stop-color="rgb(128,128,128)"/>
          <stop offset=".58" stop-color="rgb(128,128,128)"/>
          <stop offset="1" stop-color="rgb(160,128,128)"/>
        </linearGradient>
        <linearGradient id="y" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgb(128,96,128)"/>
          <stop offset=".42" stop-color="rgb(128,128,128)"/>
          <stop offset=".58" stop-color="rgb(128,128,128)"/>
          <stop offset="1" stop-color="rgb(128,160,128)"/>
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="${soften}"/></filter>
      </defs>
      <rect width="100%" height="100%" rx="${safeRadius}" fill="rgb(128,128,128)"/>
      <rect x="${depth}" y="${depth}" width="${innerWidth}" height="${innerHeight}" rx="${innerRadius}" fill="url(#x)" opacity=".42" filter="url(#soft)"/>
      <rect x="${depth}" y="${depth}" width="${innerWidth}" height="${innerHeight}" rx="${innerRadius}" fill="url(#y)" opacity=".34" filter="url(#soft)"/>
    </svg>`;

  const mapUri = svgDataUri(mapSvg);
  const strength = Math.max(8, Number(settings.strength || 42));

  const filterSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}">
      <defs>
        <filter id="displace" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feImage href="${mapUri}" x="0" y="0" width="${safeWidth}" height="${safeHeight}" preserveAspectRatio="none" result="map"/>
          <feDisplacementMap in="SourceGraphic" in2="map" scale="${strength}" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
    </svg>`;

  const filterUrl = `url("${svgDataUri(filterSvg)}#displace")`;
  return `blur(${settings.preBlur}px) ${filterUrl} blur(${settings.postBlur}px) brightness(${settings.brightness}) saturate(${settings.saturation})`;
}

function liquidSettingsFor(surface) {
  if (surface.matches('.hero-glass, .access-card')) {
    return { depth: 14, strength: 42, preBlur: 1.4, postBlur: .8, brightness: 1.06, saturation: 1.42 };
  }
  if (surface.matches('.timeline-shell, .hero-copy')) {
    return { depth: 16, strength: 36, preBlur: 1.8, postBlur: .8, brightness: 1.04, saturation: 1.32 };
  }
  return { depth: 11, strength: 30, preBlur: 1.1, postBlur: .7, brightness: 1.05, saturation: 1.34 };
}

function ensureLiquidLayers(surface) {
  if (surface.dataset.liquidReady === 'true') return;
  surface.classList.add('liquid-glass');
  if (getComputedStyle(surface).position === 'static') surface.classList.add('liquid-positioned');

  const filter = document.createElement('span');
  filter.className = 'liquid-filter';
  filter.setAttribute('aria-hidden', 'true');

  const tint = document.createElement('span');
  tint.className = 'liquid-tint';
  tint.setAttribute('aria-hidden', 'true');

  surface.prepend(tint);
  surface.prepend(filter);
  surface.dataset.liquidReady = 'true';
}

function updateLiquidSurface(surface) {
  const rect = surface.getBoundingClientRect();
  if (rect.width < 18 || rect.height < 18) return;

  ensureLiquidLayers(surface);
  const filter = surface.querySelector(':scope > .liquid-filter');
  if (!filter) return;

  if (!supportsSvgBackdropFilter()) {
    surface.classList.add('no-svg-glass');
    return;
  }

  const radius = parseFloat(getComputedStyle(surface).borderTopLeftRadius) || 24;
  const filterValue = buildLiquidBackdropFilter(rect.width, rect.height, radius, liquidSettingsFor(surface));
  filter.style.backdropFilter = filterValue;
  filter.style.webkitBackdropFilter = filterValue;
  surface.classList.remove('no-svg-glass');
}

function enhanceLiquidGlass() {
  liquidState.observers.forEach(observer => observer.disconnect());
  liquidState.observers = [];

  $$(liquidSurfaceSelector).forEach(surface => {
    if (surface.closest('[hidden]')) return;
    updateLiquidSurface(surface);

    const observer = new ResizeObserver(() => updateLiquidSurface(surface));
    observer.observe(surface);
    liquidState.observers.push(observer);
  });

  $$(softLiquidSurfaceSelector).forEach(surface => {
    if (!surface.closest('[hidden]')) surface.classList.add('soft-liquid-glass');
  });
}

function scheduleLiquidGlassRefresh() {
  cancelAnimationFrame(liquidState.raf);
  liquidState.raf = requestAnimationFrame(enhanceLiquidGlass);
}

function canUseMotion() {
  const enabled = Boolean(window.gsap && !reducedMotion.matches);
  document.body.classList.toggle('gsap-ready', enabled);
  if (enabled && window.ScrollTrigger && !scrollTriggerRegistered) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    scrollTriggerRegistered = true;
  }
  return enabled;
}

function runMotion(key, callback) {
  if (!canUseMotion()) return;
  motionContexts.get(key)?.revert();
  motionContexts.set(key, window.gsap.context(() => callback(window.gsap), document.body));
}

function animateAccessScreen() {
  runMotion('access', gsap => {
    gsap.fromTo('.access-card', { autoAlpha: 0, y: 28, scale: .98 }, { autoAlpha: 1, y: 0, scale: 1, duration: .8, ease: 'power3.out' });
  });
}

function animatePageEntrance() {
  runMotion('page', gsap => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline
      .addLabel('shell')
      .fromTo('.topbar', { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: .55 })
      .addLabel('hero', '-=.15')
      .fromTo('.hero-copy', { autoAlpha: 0, y: 30, scale: .985 }, { autoAlpha: 1, y: 0, scale: 1, duration: .75 }, '-=.2')
      .fromTo('.hero-card', { autoAlpha: 0, y: 34, scale: .98 }, { autoAlpha: 1, y: 0, scale: 1, duration: .8 }, '-=.58')
      .addLabel('content', '-=.28')
      .fromTo('.section-head', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .45, stagger: .08 }, '-=.35');
  });
}

function animateDayCards() {
  runMotion('days', gsap => {
    gsap.fromTo('#dayGrid .day-card',
      { autoAlpha: 0, y: 24, scale: .975, rotateX: 3 },
      { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .6, stagger: .045, ease: 'power3.out', overwrite: true, clearProps: 'transform' }
    );
  });
}

function animateTimeline() {
  runMotion('timeline', gsap => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: true } });
    timeline
      .addLabel('day')
      .fromTo('.day-detail-head > *',
      { autoAlpha: 0, y: 22 },
      { autoAlpha: 1, y: 0, duration: .55, stagger: .08, clearProps: 'transform' },
      'day')
      .addLabel('items', '-=.2')
      .fromTo('.timeline-item',
      { autoAlpha: 0, x: -18, scale: .99 },
      { autoAlpha: 1, x: 0, scale: 1, duration: .55, stagger: .055, clearProps: 'transform' },
      'items')
      .addLabel('schedule', '-=.18')
      .fromTo('.schedule-item',
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: .45, stagger: .035, clearProps: 'transform' },
      'schedule');
  });
}

function setupScrollAnimations() {
  if (!canUseMotion() || !window.ScrollTrigger) return;

  motionContexts.get('scroll')?.revert();
  motionContexts.set('scroll', window.gsap.context(() => {
    const { gsap, ScrollTrigger } = window;
    gsap.set('.hero-image, .day-card-image, .day-photo, .activity-image', { force3D: true });

    gsap.to('.hero-image', {
      yPercent: 8,
      scale: 1.12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: .8
      }
    });

    ScrollTrigger.batch('#dayGrid .day-card', {
      start: 'top 88%',
      end: 'bottom 12%',
      interval: .08,
      batchMax: 4,
      onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, stagger: .06, duration: .55, ease: 'power3.out', overwrite: true }),
      onLeaveBack: batch => gsap.to(batch, { autoAlpha: .74, y: 18, scale: .985, stagger: .04, duration: .35, ease: 'power2.out', overwrite: true })
    });

    ScrollTrigger.batch('.timeline-card', {
      start: 'top 84%',
      end: 'bottom 10%',
      interval: .08,
      batchMax: 3,
      onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, stagger: .06, duration: .55, ease: 'power3.out', overwrite: true }),
      onLeaveBack: batch => gsap.to(batch, { autoAlpha: .82, y: 16, scale: .992, stagger: .04, duration: .35, ease: 'power2.out', overwrite: true })
    });

    gsap.utils.toArray('.activity-image').forEach((image, index) => {
      gsap.fromTo(image,
        { yPercent: -3, scale: 1.05 },
        {
          yPercent: 3,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: image.closest('.timeline-item') || image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: .7,
            refreshPriority: index + 10
          }
        }
      );
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '#timelineShell',
        start: 'top 82%',
        end: 'bottom 18%',
        scrub: .8,
        refreshPriority: 2
      },
      defaults: { ease: 'none' }
    })
      .fromTo('.timeline-dot', { scale: .86 }, { scale: 1.08, stagger: .08 }, 0)
      .fromTo('.time-block', { y: 14 }, { y: -8, stagger: .08 }, 0);

    ScrollTrigger.refresh();
  }, document.body));
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
  setupScrollAnimations();
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
  $('.hero-image').dataset.imageQuery = `${metadata.destination} Moraine Lake Lake Louise Emerald Lake`;
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
  animateDayCards();
  scheduleLiquidGlassRefresh();
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
      ${activities.map((item, index) => renderTimelineItem(item, index, day.id)).join('')}
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
  bindMapToggles();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: .2 });
  $$('.timeline-item').forEach(item => observer.observe(item));
  animateTimeline();
  scheduleLiquidGlassRefresh();
}

function renderTimelineItem(item, index, dayId = 'day') {
  const key = `${dayId}-${item.row || index}`;
  const hasDetails = item.research || item.description;
  const googleQuery = item.imageQuery || `${item.title} Banff Canadá`;
  const noteIsOpen = state.expanded.has(key);
  const foodPanelId = item.foodUrl ? mapPanelId('timeline', 'food', key, index) : '';
  const routePanelId = item.mapUrl ? mapPanelId('timeline', 'route', key, index) : '';
  const actions = [
    item.flightUrl ? `<a class="tiny-link icon-only" href="${escapeHtml(item.flightUrl)}" target="_blank" rel="noreferrer" aria-label="Ver vuelo en FlightAware">${iconOnlyLabel('plane')}</a>` : '',
    item.foodUrl ? mapToggleButton('food', foodPanelId) : '',
    item.mapUrl ? mapToggleButton('route', routePanelId) : '',
    `<a class="tiny-link icon-only" href="${escapeHtml(imageSearchUrl(googleQuery))}" target="_blank" rel="noreferrer" aria-label="Buscar imágenes" title="Buscar imágenes">${iconOnlyLabel('image')}</a>`,
    hasDetails ? `<button class="toggle-more icon-only" data-key="${escapeHtml(key)}" type="button" aria-label="${notesLabel(noteIsOpen)}" title="${notesLabel(noteIsOpen)}">${notesButtonMarkup(noteIsOpen)}</button>` : ''
  ].join('');
  const maps = [
    item.foodUrl ? renderEmbeddedMap('food', foodPanelId, item.foodUrl, `Restaurants near ${item.title} Banff`) : '',
    item.mapUrl ? renderEmbeddedMap('route', routePanelId, item.mapUrl, item.title) : ''
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
        ${maps}
        ${hasDetails ? `<div class="details-row"><p>${escapeHtml(item.research || item.description || '')}</p></div>` : ''}
      </div>
    </article>`;
}

function renderScheduleItem(item, index) {
  const key = `${item.row || index}`;
  const foodPanelId = item.foodUrl ? mapPanelId('schedule', 'food', key, index) : '';
  const routePanelId = item.mapUrl ? mapPanelId('schedule', 'route', key, index) : '';
  const actions = [
    item.flightUrl ? `<a class="tiny-link icon-only" href="${escapeHtml(item.flightUrl)}" target="_blank" rel="noreferrer" aria-label="Ver vuelo en FlightAware">${iconOnlyLabel('plane')}</a>` : '',
    item.foodUrl ? mapToggleButton('food', foodPanelId) : '',
    item.mapUrl ? mapToggleButton('route', routePanelId) : ''
  ].join('');
  const maps = [
    item.foodUrl ? renderEmbeddedMap('food', foodPanelId, item.foodUrl, `Restaurants near ${item.title}`) : '',
    item.mapUrl ? renderEmbeddedMap('route', routePanelId, item.mapUrl, item.title) : ''
  ].join('');

  return `
    <div class="schedule-item">
      <span class="schedule-time">${escapeHtml(item.time || '-')}</span>
      <div class="schedule-copy">
        <div class="schedule-title">${escapeHtml(item.title)}</div>
        ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ''}
        <div class="timeline-actions">${actions}</div>
        ${maps}
      </div>
    </div>`;
}

function renderSchedule(schedule) {
  if (!schedule.length) return '';
  return `
    <div class="schedule-list">
      <h3>Detalles del viaje</h3>
      <div class="schedule-grid">
        ${schedule.map((item, index) => renderScheduleItem(item, index)).join('')}
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
  animatePageEntrance();
  setupScrollAnimations();
  scheduleLiquidGlassRefresh();
  $('#search').addEventListener('input', event => {
    state.query = event.target.value.trim();
    renderDays();
    hydrateImages();
    setupScrollAnimations();
  });
  $('#expandAll').addEventListener('click', () => {
    const day = state.data.days.find(x => x.id === state.activeDayId);
    (day?.activities || []).forEach(item => state.expanded.add(`${day.id}-${item.row}`));
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
