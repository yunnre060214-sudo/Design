import { cases, notes, patterns, platforms } from './catalog.js';
import { escapeHtml, icon, mockScreen } from './screens.js';

const $ = selector => document.querySelector(selector);
const byId = new Map(cases.map(entry => [entry.id, entry]));
const patternById = new Map(patterns.map(pattern => [pattern.id, pattern]));
const storageKey = 'formroom.saved.v1';
const searchDialog = $('#search-dialog');
const searchInput = $('#search-input');
const detailDialog = $('#detail-dialog');

function readSaved() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return new Set(Array.isArray(stored) ? stored.filter(id => byId.has(id)) : []);
  } catch {
    return new Set();
  }
}

const state = {
  view: 'explore', platform: 'all', pattern: 'all', query: '', saved: readSaved(),
  detail: null, frame: 0, choices: {}, toggles: {}, searchIndex: 0, searchResults: [],
};
const views = {
  explore: ['探索', '探索界面', '从原创产品案例中，找到下一步的设计灵感。'],
  patterns: ['设计模式', '设计模式', '按设计问题浏览案例，比较同一类问题的不同解法。'],
  notes: ['研究笔记', '研究笔记', '把案例里的细节连起来，看一项设计决策怎样影响下一步。'],
  saved: ['我的收藏', '我的收藏', '收藏保存在当前浏览器，可以随时回来继续研究。'],
};

const searchTerms = entry => [
  entry.name, entry.title, entry.category, entry.summary, patternById.get(entry.pattern).name,
  entry.platform === 'mobile' ? '移动端 mobile app' : '网页端 web desktop',
  ...entry.frames.flatMap(frame => [frame.label, frame.headline, frame.caption]),
].join(' ').toLowerCase();

function matchQuery(entry, query) {
  return query.toLowerCase().trim().split(/\s+/).every(word => searchTerms(entry).includes(word));
}

function toast(message) {
  const node = detailDialog.open ? $('#detail-toast') : $('#toast');
  node.textContent = message;
  node.hidden = false;
  clearTimeout(node.toastTimer);
  node.toastTimer = setTimeout(() => { node.hidden = true; }, 2600);
}

function saveButton(entry, withText = false) {
  const saved = state.saved.has(entry.id);
  const label = saved ? '移除收藏' : '收藏案例';
  return `<button class="bookmark-button${withText ? ' bookmark-with-text' : ''}" type="button" data-save="${entry.id}" aria-label="${label} · ${entry.name}" aria-pressed="${saved}" title="${label}">${icon('bookmark')}${withText ? `<span>${saved ? '已收藏' : '收藏'}</span>` : ''}</button>`;
}

function updateSavedButtons() {
  document.querySelectorAll('.saved-count').forEach(node => {
    node.hidden = state.saved.size === 0;
    node.textContent = state.saved.size;
  });
  document.querySelectorAll('[data-save]').forEach(button => {
    const saved = state.saved.has(button.dataset.save);
    const label = saved ? '移除收藏' : '收藏案例';
    button.setAttribute('aria-pressed', saved);
    button.setAttribute('aria-label', `${label} · ${byId.get(button.dataset.save).name}`);
    button.title = label;
    const text = button.querySelector('span');
    if (text) text.textContent = saved ? '已收藏' : '收藏';
  });
}

function toggleSaved(id) {
  if (state.saved.has(id)) state.saved.delete(id);
  else state.saved.add(id);
  try {
    localStorage.setItem(storageKey, JSON.stringify([...state.saved]));
  } catch {
    toast('当前浏览器限制了存储，收藏仅保留在此页面。');
    if (state.view === 'saved') renderView();
    updateSavedButtons();
    return;
  }
  if (state.view === 'saved') renderView();
  updateSavedButtons();
  toast(state.saved.has(id) ? '已加入收藏' : '已移出收藏');
}

function card(entry) {
  const platform = platforms.find(item => item.id === entry.platform);
  return `<article class="case-card">
    <div class="case-cover theme-${entry.theme}">
      <a href="#case/${entry.id}/1" class="card-cover-link" data-open="${entry.id}" aria-label="查看 ${entry.name} · ${entry.title}">
        <div class="cover-art"><div class="cover-screen cover-screen-first">${mockScreen(entry, 0)}</div><div class="cover-screen cover-screen-second">${mockScreen(entry, 1)}</div></div>
      </a>
      <span class="platform-label">${icon(platform.icon)}${platform.name}</span>
      ${saveButton(entry)}
    </div>
    <div class="card-meta">
      <div class="case-symbol theme-${entry.theme}" aria-hidden="true">${entry.glyph}</div>
      <div><h3><a href="#case/${entry.id}/1" data-open="${entry.id}">${entry.name}<span>${icon('arrow-up-right')}</span></a></h3><p>${entry.title}</p></div>
      <span class="case-tag">${patternById.get(entry.pattern).name}</span>
    </div>
  </article>`;
}

function emptyState(title, body, action, label) {
  return `<div class="empty-state">${icon('inbox')}<h3>${title}</h3><p>${body}</p><button type="button" class="outline-button" ${action}>${label} ${icon('arrow-right')}</button></div>`;
}

function filteredCases() {
  return cases.filter(entry => {
    const matchesView = state.view !== 'saved' || state.saved.has(entry.id);
    const matchesPlatform = state.platform === 'all' || entry.platform === state.platform;
    const matchesPattern = state.pattern === 'all' || entry.pattern === state.pattern;
    return matchesView && matchesPlatform && matchesPattern && matchQuery(entry, state.query);
  });
}

function renderFilters() {
  if (state.view === 'patterns') {
    $('#filters').innerHTML = `<div class="pattern-grid">${patterns.map(pattern => `
      <button class="pattern-tile" type="button" data-pattern="${pattern.id}" aria-pressed="${pattern.id === state.pattern}">
        <span class="pattern-icon">${icon(pattern.icon)}</span><span><strong>${pattern.name}</strong><small>${pattern.description}</small></span><span class="pattern-count">${cases.filter(entry => entry.pattern === pattern.id).length}</span>
      </button>`).join('')}</div>`;
    return;
  }
  $('#filters').innerHTML = `<div class="filter-bar">
    <div class="platform-filters" role="group" aria-label="筛选平台">${platforms.map(platform =>
      `<button type="button" data-platform="${platform.id}" aria-pressed="${platform.id === state.platform}">${icon(platform.icon)}${platform.name}</button>`).join('')}</div>
    <label class="select-wrap">${icon('sliders')}<span class="sr-only">筛选设计模式</span><select id="pattern-select"><option value="all">所有设计模式</option>${patterns.map(pattern => `<option value="${pattern.id}"${state.pattern === pattern.id ? ' selected' : ''}>${pattern.name}</option>`).join('')}</select></label>
  </div>`;
}

function renderResults() {
  const entries = filteredCases();
  const count = $('#result-count');
  count.textContent = state.query ? `“${state.query}” · ${entries.length} 个案例` : `${entries.length} 个案例`;
  $('#clear-query').hidden = !state.query;
  $('#shuffle').disabled = entries.length === 0;
  if (entries.length) {
    $('#results').innerHTML = `<div class="case-grid">${entries.map(card).join('')}</div>`;
  } else if (state.view === 'saved' && state.saved.size === 0) {
    $('#results').innerHTML = emptyState('收藏夹还是空的', '点击案例右上角的书签，即可把它留在这里。', 'data-explore', '浏览案例');
  } else {
    $('#results').innerHTML = emptyState('没有符合条件的案例', '试试其他关键词，或重置当前筛选。', 'data-reset', '重置筛选');
  }
}

function renderView() {
  const [crumb, title, intro] = views[state.view];
  $('#crumb-current').textContent = crumb;
  $('#section-title').textContent = title;
  $('#section-intro').textContent = intro;
  $('#hero').hidden = state.view !== 'explore' || Boolean(state.query);
  document.querySelectorAll('[data-view]').forEach(link => {
    if (link.dataset.view === state.view) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  $('#shuffle').hidden = state.view === 'notes';
  $('#result-toolbar').hidden = state.view === 'notes';
  if (state.view === 'notes') {
    $('#filters').innerHTML = '';
    $('#results').innerHTML = `<div class="notes-list">${notes.map(note => `<details class="note">
      <summary><span><small>${note.meta}</small><strong>${note.title}</strong><span>${note.lead}</span></span><span class="note-chevron">${icon('chevron-right')}</span></summary>
      <div class="note-body"><p>${note.body}</p><div class="note-links">${note.cases.map(id => `<a href="#case/${id}/1" data-open="${id}">${byId.get(id).name}${icon('arrow-up-right')}</a>`).join('')}</div></div>
    </details>`).join('')}</div>`;
  } else {
    renderFilters();
    renderResults();
  }
  updateSavedButtons();
}

function navigate(view, query = '') {
  const changed = state.view !== view || state.query !== query;
  state.view = view;
  state.query = query;
  state.platform = 'all';
  state.pattern = 'all';
  if (changed || location.hash !== `#${view}`) history.pushState(null, '', `#${view}`);
  renderView();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

let detailReturnFocus;
function renderDetail(focusTarget) {
  const entry = state.detail;
  const frame = entry.frames[state.frame];
  const pattern = patternById.get(entry.pattern);
  $('#detail-content').innerHTML = `<div class="detail-header">
    <div class="case-symbol theme-${entry.theme}" aria-hidden="true">${entry.glyph}</div>
    <div><h2 id="detail-title">${entry.name}</h2><p>${entry.category} / ${pattern.name}</p></div>
    <div class="detail-actions">${saveButton(entry, true)}
      <button type="button" class="icon-button" data-share aria-label="复制当前分屏链接" title="复制当前分屏链接">${icon('link')}</button>
      <button type="button" class="icon-button" data-close-detail aria-label="关闭案例" autofocus>${icon('x')}</button>
    </div>
  </div>
  <div class="detail-body">
    <div class="detail-stage theme-${entry.theme}"><div class="device-preview">${mockScreen(entry, state.frame, true, state.choices[state.frame], state.toggles[state.frame])}</div></div>
    <div class="detail-side">
      <h3>${entry.title}</h3><p class="detail-summary">${entry.summary}</p>
      <div class="detail-steps" role="group" aria-label="逐屏浏览">${entry.frames.map((item, index) =>
        `<button type="button" data-step="${index}" aria-pressed="${index === state.frame}"><span>${String(index + 1).padStart(2, '0')}</span>${item.label}${icon('chevron-right')}</button>`).join('')}</div>
      <div class="frame-insight"><h4>这一屏如何设计</h4><p>${frame.insight}</p></div>
      <div class="detail-control">
        <button type="button" class="icon-button" data-prev aria-label="上一屏"${state.frame === 0 ? ' disabled' : ''}>${icon('arrow-left')}</button>
        <span aria-live="polite">第 ${state.frame + 1} / ${entry.frames.length} 屏</span>
        <button type="button" class="icon-button" data-next aria-label="下一屏"${state.frame === entry.frames.length - 1 ? ' disabled' : ''}>${icon('arrow-right')}</button>
      </div>
    </div>
  </div>`;
  if (focusTarget) {
    const target = $(focusTarget);
    if (target && !target.disabled) target.focus({ preventScroll: true });
    else $('[data-step][aria-pressed="true"]').focus({ preventScroll: true });
  }
}

function openDetail(id, frame = 0, updateHistory = true, trigger = document.activeElement) {
  const entry = byId.get(id);
  if (!entry) return;
  if (!detailDialog.open) detailReturnFocus = trigger;
  if (state.detail?.id !== id) {
    state.choices = {};
    state.toggles = {};
  }
  state.detail = entry;
  state.frame = Math.min(Math.max(frame, 0), entry.frames.length - 1);
  if (updateHistory) history.pushState({ formroomDetail: true }, '', `#case/${id}/${state.frame + 1}`);
  renderDetail();
  if (!detailDialog.open) detailDialog.showModal();
}

function dismissDetail() {
  if (!detailDialog.open) return;
  $('#detail-toast').hidden = true;
  detailDialog.close();
  state.detail = null;
  if (history.state?.formroomDetail) history.back();
  else history.replaceState(null, '', `#${state.view}`);
  if (detailReturnFocus?.isConnected && !searchDialog.open) detailReturnFocus.focus({ preventScroll: true });
}

function moveFrame(index, focusTarget = '[data-step][aria-pressed="true"]') {
  if (index < 0 || index >= state.detail.frames.length || index === state.frame) return;
  state.frame = index;
  history.replaceState(history.state, '', `#case/${state.detail.id}/${index + 1}`);
  renderDetail(focusTarget);
}

function selectMockOption(button) {
  const option = Number(button.dataset.choice);
  if (button.getAttribute('role') === 'switch') {
    const toggles = state.toggles[state.frame] ?? { 0: true, 1: false };
    toggles[option] = !toggles[option];
    state.toggles[state.frame] = toggles;
    button.setAttribute('aria-checked', String(toggles[option]));
    button.classList.toggle('chosen', toggles[option]);
    return;
  }
  state.choices[state.frame] = option;
  detailDialog.querySelectorAll('[data-choice]').forEach(choice => {
    const selected = Number(choice.dataset.choice) === option;
    choice.setAttribute('aria-pressed', String(selected));
    choice.classList.toggle('chosen', selected);
    choice.querySelector('i').textContent = selected ? '✓' : '';
  });
}

function renderSearch() {
  const query = searchInput.value.trim();
  state.searchResults = query ? cases.filter(entry => matchQuery(entry, query)).slice(0, 8) : cases.slice(0, 5);
  state.searchIndex = Math.min(state.searchIndex, Math.max(0, state.searchResults.length - 1));
  $('#search-content').innerHTML = state.searchResults.length
    ? `<div class="search-label">${query ? '匹配的案例' : '从精选案例开始'}</div>
       ${state.searchResults.map(entry => `<button type="button" data-search-result="${entry.id}">
         <span class="case-symbol theme-${entry.theme}" aria-hidden="true">${entry.glyph}</span>
         <span><strong>${entry.name}</strong><small>${entry.title}</small></span>${icon('arrow-right')}
       </button>`).join('')}${query ? `<button type="button" class="search-all" data-search-all>查看全部匹配案例 ${icon('arrow-right')}</button>` : ''}`
    : '<p class="search-empty">没有匹配案例。可以试试「新手引导」「移动端」或产品名称。</p>';
  highlightSearch();
}

function highlightSearch() {
  document.querySelectorAll('[data-search-result]').forEach((button, index) => {
    button.classList.toggle('highlighted', index === state.searchIndex);
  });
}

function showSearch() {
  if (searchDialog.open || detailDialog.open) return;
  state.searchIndex = 0;
  searchInput.value = state.query;
  renderSearch();
  searchDialog.showModal();
  searchInput.focus();
}

function chooseSearch(id) {
  searchDialog.close();
  openDetail(id);
}

function readRoute() {
  const hash = location.hash.slice(1);
  const match = /^case\/([a-z]+)(?:\/(\d+))?$/.exec(hash);
  if (match && byId.has(match[1])) {
    openDetail(match[1], Number(match[2] || 1) - 1, false);
    return;
  }
  if (detailDialog.open) {
    $('#detail-toast').hidden = true;
    detailDialog.close();
    state.detail = null;
    if (detailReturnFocus?.isConnected) detailReturnFocus.focus({ preventScroll: true });
  }
  if (Object.hasOwn(views, hash) && state.view !== hash) {
    state.view = hash;
    state.query = '';
    state.platform = 'all';
    state.pattern = 'all';
    renderView();
  }
  if (!hash && state.view !== 'explore') {
    state.view = 'explore';
    state.query = '';
    state.platform = 'all';
    state.pattern = 'all';
    renderView();
  }
}

document.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon); });
$('#hero-art').innerHTML = `<div class="art-grid"></div>
  <span class="art-cross cross-top">+</span><span class="art-cross cross-bottom">+</span>
  <div class="hero-screen hero-screen-roomtone">${mockScreen(byId.get('roomtone'), 0)}</div>
  <div class="hero-screen hero-screen-offbeat">${mockScreen(byId.get('offbeat'), 0)}</div>
  <div class="hero-screen hero-screen-stillpoint">${mockScreen(byId.get('stillpoint'), 0)}</div>`;

document.addEventListener('click', async event => {
  const target = event.target.closest('a, button');
  if (!target) return;
  const data = target.dataset;
  if (target.tagName === 'A' && (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)) return;
  if (data.view) {
    event.preventDefault();
    navigate(data.view);
  } else if ('jump' in data || 'top' in data || 'about' in data) {
    event.preventDefault();
    const destination = document.querySelector(target.getAttribute('href'));
    destination.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  } else if (data.open) {
    event.preventDefault();
    openDetail(data.open, 0, true, target);
  } else if (data.save) {
    toggleSaved(data.save);
  } else if (data.platform) {
    state.platform = data.platform;
    document.querySelectorAll('[data-platform]').forEach(button => button.setAttribute('aria-pressed', String(button === target)));
    renderResults();
  } else if (data.pattern) {
    state.pattern = state.pattern === data.pattern ? 'all' : data.pattern;
    document.querySelectorAll('[data-pattern]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pattern === state.pattern)));
    renderResults();
  } else if ('search' in data) {
    showSearch();
  } else if ('closeSearch' in data) {
    searchDialog.close();
  } else if (data.searchResult) {
    chooseSearch(data.searchResult);
  } else if ('searchAll' in data) {
    searchDialog.close();
    navigate('explore', searchInput.value.trim());
  } else if ('closeDetail' in data) {
    dismissDetail();
  } else if ('step' in data) {
    moveFrame(Number(data.step));
  } else if ('prev' in data) {
    moveFrame(state.frame - 1, '[data-prev]');
  } else if ('next' in data) {
    if (state.frame === state.detail.frames.length - 1) {
      toast('已完成此案例的预览');
    } else {
      moveFrame(state.frame + 1, target.classList.contains('mock-cta') ? '.mock-cta' : '.detail-control [data-next]');
    }
  } else if ('choice' in data) {
    selectMockOption(target);
  } else if ('share' in data) {
    try {
      await navigator.clipboard.writeText(location.href);
      toast('已复制当前分屏链接');
    } catch {
      toast('可从浏览器地址栏复制当前分屏链接');
    }
  } else if ('explore' in data) {
    navigate('explore');
  } else if ('reset' in data) {
    state.platform = 'all';
    state.pattern = 'all';
    state.query = '';
    renderView();
  } else if (target.id === 'shuffle') {
    const entries = filteredCases();
    if (entries.length) openDetail(entries[Math.floor(Math.random() * entries.length)].id);
  } else if (target.id === 'clear-query') {
    state.query = '';
    renderView();
  }
});

$('#filters').addEventListener('change', event => {
  if (event.target.id !== 'pattern-select') return;
  state.pattern = event.target.value;
  renderResults();
});
searchInput.addEventListener('input', () => {
  state.searchIndex = 0;
  renderSearch();
});
searchDialog.addEventListener('keydown', event => {
  if (['ArrowUp', 'ArrowDown'].includes(event.key) && state.searchResults.length) {
    event.preventDefault();
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    state.searchIndex = (state.searchIndex + delta + state.searchResults.length) % state.searchResults.length;
    highlightSearch();
  } else if (event.key === 'Enter' && event.target === searchInput) {
    event.preventDefault();
    if (state.searchResults[state.searchIndex]) chooseSearch(state.searchResults[state.searchIndex].id);
  }
});
searchDialog.addEventListener('click', event => {
  if (event.target === searchDialog) searchDialog.close();
});
detailDialog.addEventListener('click', event => {
  if (event.target === detailDialog) dismissDetail();
});
detailDialog.addEventListener('cancel', event => {
  event.preventDefault();
  dismissDetail();
});
detailDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') moveFrame(state.frame - 1);
  if (event.key === 'ArrowRight') moveFrame(state.frame + 1);
});
document.addEventListener('keydown', event => {
  const edit = event.target.closest('input, textarea, select, [contenteditable]');
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' || !edit && event.key === '/') {
    if (detailDialog.open || searchDialog.open) return;
    event.preventDefault();
    showSearch();
  }
});
window.addEventListener('popstate', readRoute);
window.addEventListener('hashchange', readRoute);
window.addEventListener('storage', event => {
  if (event.key !== storageKey && event.key !== null) return;
  state.saved = readSaved();
  if (state.view === 'saved') renderView();
  updateSavedButtons();
});

renderView();
readRoute();
