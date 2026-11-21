const paths = {
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.4"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.4"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  book: '<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M8 3v18m3-13h6m-6 4h5"/>',
  bookmark: '<path d="M6 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-6-4-6 4Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  search: '<circle cx="10.5" cy="10.5" r="5.8"/><path d="m15 15 4.5 4.5"/>',
  'arrow-down': '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  'arrow-up': '<path d="M12 20V4m-6 6 6-6 6 6"/>',
  'arrow-up-right': '<path d="M6 18 18 6M8 6h10v10"/>',
  'arrow-right': '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  'arrow-left': '<path d="M20 12H4m6-6-6 6 6 6"/>',
  'chevron-right': '<path d="m9 5 7 7-7 7"/>',
  shuffle: '<path d="M4 7h2c5.5 0 6.5 10 12 10h2m-3-3 3 3-3 3M4 17h2c1.5 0 2.8-.8 3.8-2m4.4-6c1.1-1.3 2.4-2 3.8-2h2m-3-3 3 3-3 3"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.4"/><path d="M10.5 18.5h3"/>',
  monitor: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M12 16.5v4m-4 0h8"/>',
  spark: '<path d="M12 2.8c.8 5.3 3.1 8 9 9.2-5.9 1.2-8.2 3.9-9 9.2-.8-5.3-3.1-8-9-9.2 5.9-1.2 8.2-3.9 9-9.2Z"/>',
  bag: '<rect x="4.5" y="7" width="15" height="14" rx="2"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  chart: '<path d="M4 4v16h16M8 15l3-4 4 2 5-6"/>',
  sliders: '<path d="M4 6h7m4 0h5M4 12h3m4 0h9M4 18h10m4 0h2"/><circle cx="13" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
  inbox: '<path d="M4 12 7 5h10l3 7v6a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18v-6Zm0 0h5l1 3h4l1-3h5"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>',
  link: '<path d="m10 13 4-4m-6 6-1 1a3.5 3.5 0 0 1-5-5l5-5a3.5 3.5 0 0 1 5 0m0 2 1-1a3.5 3.5 0 0 1 5 5l-5 5a3.5 3.5 0 0 1-5 0" transform="translate(2 1)"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};

export function icon(name) {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function visual(entry, frame, index) {
  if (entry.visual === 'orbit') {
    return '<div class="mock-orbit" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><b>✦</b></div>';
  }
  if (entry.visual === 'toggle') {
    return '<div class="mock-waves" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>';
  }
  if (entry.visual === 'chart') {
    const graphs = [[31, 38, 33, 55, 48, 60, 56, 73, 65, 85, 78, 94], [49, 35, 39, 47, 62, 56, 68, 52, 50, 67, 60, 82], [24, 44, 38, 69, 54, 51, 77, 68, 86, 80, 89, 94]];
    return `<div class="mock-data"><strong>${escapeHtml(frame.metric)}</strong><div class="mock-chart" aria-hidden="true">${graphs[index].map(height => `<i style="--bar:${height}%"></i>`).join('')}</div></div>`;
  }
  return `<div class="mock-photo mock-photo-${entry.visual}"><img src="./assets/${entry.visual}.webp" alt="" decoding="async"></div>`;
}

export function mockScreen(entry, index, interactive = false, choice = 0, toggles = { 0: true, 1: false }) {
  const frame = entry.frames[index];
  const options = frame.options.map((option, optionIndex) => {
    const toggle = entry.visual === 'toggle';
    const selected = toggle ? Boolean(toggles[optionIndex]) : choice === optionIndex;
    const label = `${escapeHtml(option)}<i>${selected && !toggle ? '✓' : ''}</i>`;
    const classes = `mock-option${selected ? ' chosen' : ''}${toggle ? ' mock-toggle' : ''}`;
    if (!interactive) return `<div class="${classes}">${label}</div>`;
    const state = toggle ? `role="switch" aria-checked="${selected}"` : `aria-pressed="${selected}"`;
    return `<button type="button" class="${classes}" data-choice="${optionIndex}" ${state}>${label}</button>`;
  }).join('');
  const endpoint = interactive
    ? `<button type="button" class="mock-cta" data-next>${escapeHtml(frame.action)} <span>↗</span></button>`
    : `<div class="mock-cta">${escapeHtml(frame.action)} <span>↗</span></div>`;
  return `<div class="mock theme-${entry.theme} mock-${entry.platform} visual-${entry.visual}" ${interactive ? 'lang="en"' : 'aria-hidden="true"'} data-frame="${index}">
    <div class="mock-top"><b>${entry.platform === 'web' ? '● ● ●' : '9:41'}</b><span>${entry.platform === 'web' ? entry.name.toLowerCase() + '.design' : '▮▮▮ ▰'}</span></div>
    <div class="mock-brand"><span>${entry.glyph}</span> ${entry.name}<i>•••</i></div>
    <div class="mock-main"><div class="mock-heading"><small>${String(index + 1).padStart(2, '0')} / ${String(entry.frames.length).padStart(2, '0')}</small><strong>${escapeHtml(frame.headline).replace(/\n/g, '<br>')}</strong><p>${escapeHtml(frame.caption)}</p></div>
      ${visual(entry, frame, index)}
      <div class="mock-options">${options}</div>
      ${endpoint}
    </div>
  </div>`;
}
