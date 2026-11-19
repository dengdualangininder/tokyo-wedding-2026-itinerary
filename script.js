/* ==========================================================================
   東京婚紗之旅 2026 — 共用渲染邏輯（唯一邏輯檔）
   --------------------------------------------------------------------------
   資料一律來自 data.js 的 window.ITINERARY / window.NAV。
   每個頁面都是「薄殼」：只放一個容器節點，內容由這裡渲染。
   想改行程 → 只改 data.js；想改導覽 → 只改 data.js 的 window.NAV。
   ========================================================================== */

(function () {
  'use strict';

  var IT = window.ITINERARY || [];
  var NAV = window.NAV || [];

  var TYPE_LABELS = {
    airport: '機場', hotel: '住宿', transport: '交通', location: '景點',
    shrine: '神社', station: '車站', shopping: '購物', temple: '寺院',
    restaurant: '餐廳', food: '美食', activity: '活動'
  };
  var TYPE_COLORS = {
    airport: '#b55444', hotel: '#5a725c', transport: '#b55444',
    location: '#3498db', shrine: '#b58344', station: '#8a7d73',
    shopping: '#2c3e50', temple: '#b58344', restaurant: '#2ecc71',
    food: '#f1c40f', activity: '#8a7d73'
  };

  var ICONS = {
    home: '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    map: '<polygon fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="3 6 12 2 21 6 12 23 3 6"/>',
    budget: '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    info: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
  };

  function esc(t) {
    if (t === null || t === undefined) return '';
    return String(t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  function svg(name) { return '<svg viewBox="0 0 24 24">' + (ICONS[name] || ICONS.info) + '</svg>'; }
  function findDay(id) { return IT.find(function (d) { return d.id === id; }); }
  function currentFile() { var p = location.pathname.split('/').pop(); return p || 'index.html'; }
  function stationTime(s) { return s.arriveTime || s.departTime || '--:--'; }
  function stationTimeWord(s) { return s.arriveTime ? '抵達' : (s.departTime ? '出發' : '—'); }

  function detectToday() {
    var t = new Date();
    var key = (t.getMonth() + 1) + '/' + t.getDate();
    var map = { '12/2': 1, '12/3': 2, '12/4': 3, '12/5': 4, '12/6': 5 };
    return map[key];
  }

  // ---- 共用：單一旅程站點卡片（首頁 / 每日頁）----
  function stationItemHTML(s) {
    var color = TYPE_COLORS[s.type] || '#8a7d73';
    var cost = (s.cost && String(s.cost).trim()) ? '<div class="station-cost">💰 ' + esc(s.cost) + '</div>' : '';
    return '' +
      '<div class="station-item">' +
        '<div class="station-time">' + esc(stationTime(s)) + '</div>' +
        '<div class="station-info">' +
          '<div class="station-name">' + esc(s.name) + '</div>' +
          '<div class="station-transport" style="color:' + color + '">' + esc(TYPE_LABELS[s.type] || '站點') + ' · ' + esc(s.transport) + '</div>' +
          '<div class="station-detail">' + esc(s.detail) + '</div>' +
          cost +
        '</div>' +
      '</div>';
  }

  // ---- 導覽（桌機 + 手機共用一份 NAV）----
  function navActive(href) {
    var f = currentFile();
    if (href === 'itinerary.html') return f === 'itinerary.html' || /^day[1-5]\.html$/.test(f);
    if (href === 'info.html') return f === 'info.html' || f === 'tax-refund.html';
    return f === href;
  }
  function renderNav() {
    var root = document.getElementById('nav-root');
    if (!root) return;
    var top = '<nav class="top-nav" aria-label="主要導覽">';
    var bot = '<nav class="bottom-nav" aria-label="主要導覽">';
    NAV.forEach(function (item) {
      var active = navActive(item.href) ? ' active' : '';
      top += '<a href="' + item.href + '" class="top-nav__link' + active + '">' + esc(item.label) + '</a>';
      bot += '<a href="' + item.href + '" class="nav-item' + active + '" aria-label="' + esc(item.label) + '">' +
             svg(item.icon) + '<span class="label">' + esc(item.label) + '</span></a>';
    });
    top += '</nav>';
    bot += '</nav>';
    root.innerHTML = top + bot;
  }

  // ---- 首頁 ----
  function renderHome() {
    var root = document.getElementById('home-root');
    if (!root) return;
    var todayNum = detectToday();
    var html = '';

    html += '<header class="hero hero--compact">' +
              '<span class="tag tag--small">東京婚紗之旅 2026</span>' +
              '<h1>五日行程總覽</h1>' +
              '<p class="hero--sub">' + esc(IT.map(function (d) { return d.date + ' ' + d.theme; }).join(' → ')) + '</p>' +
            '</header>';

    // 每日快速入口
    html += '<section class="card"><h3 class="section-title">🗓️ 快速前往每日行程</h3><div class="day-quicknav">';
    IT.forEach(function (d) {
      html += '<a class="chip" href="day' + d.id + '.html">' +
                '<strong>Day ' + d.id + '</strong>' +
                '<span>' + esc(d.date) + '</span>' +
                '<span class="chip__theme">' + esc(d.theme) + '</span>' +
              '</a>';
    });
    html += '</div></section>';

    // 今日行程
    html += '<section class="card card--today" aria-label="今日行程"><h3 class="section-title">📅 今日行程</h3>';
    if (todayNum) {
      var t = findDay(todayNum);
      html += '<div class="today-day-badge">今天是第 ' + todayNum + ' 天</div><div class="today-stations">';
      t.stations.forEach(function (s) {
        var color = TYPE_COLORS[s.type] || '#8a7d73';
        html += '<div class="today-station">' +
                  '<div class="today-time">' + esc(stationTime(s)) + '</div>' +
                  '<div class="today-info"><div class="today-name">' + esc(s.name) + '</div>' +
                  '<div class="today-type" style="background:' + color + '20;color:' + color + '">' + esc(TYPE_LABELS[s.type] || '站點') + '</div>' +
                  (s.cost ? '<div class="today-cost">💰 ' + esc(s.cost) + '</div>' : '') +
                  '</div></div>';
      });
      html += '</div>';
    } else {
      html += '<p style="text-align:center;color:var(--color-text-muted);padding:var(--space-4) 0;">行程期間為 12/02–12/06，今日無行程安排。</p>';
    }
    html += '</section>';

    // 五日詳情
    html += '<section class="card card--all-days" aria-label="五日行程詳情"><h3 class="section-title">🗺️ 五日行程詳情</h3>';
    IT.forEach(function (d) {
      var isToday = todayNum === d.id;
      html += '<div class="day-section" id="day-' + d.id + '">';
      html += '<div class="day-header">' +
                '<span class="day-badge' + (isToday ? ' today-badge' : '') + '">Day ' + d.id + (isToday ? ' · 今天' : '') + '</span>' +
                '<span class="day-date">' + esc(d.date) + '</span>' +
                '<h2 class="day-title">' + esc(d.theme) + '</h2>' +
                '<p class="day-weather">🌤️ ' + esc(d.weather || '') + '</p>' +
              '</div>';
      html += '<div class="day-stations">' + d.stations.map(stationItemHTML).join('') + '</div>';
      html += '<a class="btn btn-outline" style="margin-top:var(--space-3);" href="day' + d.id + '.html">查看 Day ' + d.id + ' 完整頁面（地圖・交通・附近景點）→</a>';
      html += '</div>';
    });
    html += '</section>';

    // 預算摘要
    html += '<section class="card" aria-label="預算摘要"><h3 class="section-title">💰 預算摘要（雙人，本地）</h3><div class="budget-grid">' +
              budgetItem('本地交通', '約 ¥30,000–45,000', 'Skyliner、JR、地鐵、江之電、湘南單軌') +
              budgetItem('餐飲（5 天）', '約 ¥30,000–50,000', '含叙々苑、中華街、銀座晚餐') +
              budgetItem('門票與活動', '約 ¥5,000–10,000', '東京鐵塔、陽光60、鎌倉大佛') +
              budgetItem('建議票券', 'Suica / Pasmo', '比 JR Pass 更彈性划算') +
            '</div></section>';

    root.innerHTML = html;
  }
  function budgetItem(label, value, note) {
    return '<div class="budget-item"><div class="budget-label">' + esc(label) + '</div>' +
           '<div class="budget-value">' + esc(value) + '</div>' +
           '<div class="budget-note">' + esc(note) + '</div></div>';
  }

  // ---- 行程頁（互動時間軸）----
  function renderItinerary() {
    var root = document.getElementById('itinerary-root');
    if (!root) return;
    root.innerHTML =
      '<header class="hero hero--compact">' +
        '<span class="tag tag--small">五日行程總覽</span>' +
        '<h1>行程時間軸</h1>' +
        '<p class="hero--sub">點選任一天查看該日詳細行程，或切換至地圖查看景點位置。</p>' +
      '</header>' +
      '<section class="card card--date-nav" aria-label="五日行程日期導覽">' +
        '<div class="date-nav-header"><h2 class="date-nav-title">📅 五日行程日期導覽</h2><span class="date-nav-hint">橫向滑動查看更多天數</span></div>' +
        '<div class="date-scroll"><div class="date-scroll-track" id="date-track"></div></div>' +
      '</section>' +
      '<section class="card card--itinerary" aria-label="當日行程詳情">' +
        '<div class="day-header" id="it-day-header"></div>' +
        '<div class="station-list" id="it-station-list"></div>' +
      '</section>' +
      '<section class="card card--transport" aria-label="當日交通資訊">' +
        '<h2 class="section-title">🚂 今日交通資訊</h2>' +
        '<div class="transport-list" id="it-transport"></div>' +
      '</section>';

    var track = document.getElementById('date-track');
    var header = document.getElementById('it-day-header');
    var list = document.getElementById('it-station-list');
    var transport = document.getElementById('it-transport');

    track.innerHTML = IT.map(function (d, i) {
      return '<button class="date-card' + (i === 0 ? ' active' : '') + '" type="button" role="option" aria-selected="' + (i === 0) + '" data-day="' + d.id + '">' +
               '<div class="date-card-day">Day ' + d.id + '</div>' +
               '<div class="date-card-date">' + esc(d.date) + '</div>' +
               '<div class="date-card-theme">' + esc(d.theme) + '</div>' +
               '<div class="date-card-count">' + d.stations.length + ' 個站點</div>' +
             '</button>';
    }).join('');

    function renderDayDetail(id) {
      var d = findDay(id);
      if (!d) return;
      Array.prototype.forEach.call(track.querySelectorAll('.date-card'), function (c) {
        var on = parseInt(c.getAttribute('data-day'), 10) === id;
        c.classList.toggle('active', on);
        c.setAttribute('aria-selected', on);
      });
      header.innerHTML =
        '<div class="day-meta"><span class="day-badge">Day ' + d.id + '</span><span class="day-date">' + esc(d.date) + '</span></div>' +
        '<h1 class="day-title">' + esc(d.theme) + '</h1>' +
        '<p class="day-summary">' + d.stations.length + ' 個行程站點 · ' + esc(d.weather || '') + '</p>';
      list.innerHTML = d.stations.map(function (s, idx) {
        var color = TYPE_COLORS[s.type] || '#8a7d73';
        var hasCost = s.cost && String(s.cost).trim();
        var detail = '';
        if (s.transport) detail += '<div class="detail-row"><span class="detail-label">🚇 交通方式</span><span class="detail-value">' + esc(s.transport) + '</span></div>';
        if (hasCost) detail += '<div class="detail-row detail-row--cost"><span class="detail-label">💰 預估費用</span><span class="detail-value cost-value">' + esc(s.cost) + '</span></div>';
        if (s.detail) detail += '<div class="detail-row"><span class="detail-label">📝 詳細說明</span><span class="detail-value detail-value--text">' + esc(s.detail) + '</span></div>';
        return '<div class="station-card">' +
          '<button class="station-toggle" type="button" aria-expanded="false">' +
            '<div class="station-row">' +
              '<div class="station-time"><span class="station-time-val">' + esc(stationTime(s)) + '</span><span class="station-time-label">' + stationTimeWord(s) + '</span></div>' +
              '<div class="station-main"><span class="station-type-pill" style="background:' + color + '20;color:' + color + '">' + esc(TYPE_LABELS[s.type] || '站點') + '</span><h3 class="station-name">' + esc(s.name) + '</h3></div>' +
              '<svg class="station-chevron" viewBox="0 0 24 24" width="18" height="18"><polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</div>' +
            '<div class="station-detail-panel" hidden>' + detail + '</div>' +
          '</button></div>';
      }).join('');

      // 展開/收合
      Array.prototype.forEach.call(list.querySelectorAll('.station-toggle'), function (btn) {
        btn.addEventListener('click', function () {
          var panel = btn.querySelector('.station-detail-panel');
          var chev = btn.querySelector('.station-chevron');
          var open = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', String(!open));
          panel.hidden = open;
          if (chev) chev.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
        });
      });

      // 交通卡片
      var seen = {};
      var tHTML = '';
      d.stations.forEach(function (s) {
        if (s.type === 'transport' && !seen[s.name]) {
          seen[s.name] = true;
          tHTML += '<div class="transport-card">' +
                     '<div class="transport-from-to"><span class="transport-time">' + esc(stationTime(s)) + '</span><span class="transport-name">' + esc(s.name) + '</span></div>' +
                     '<div class="transport-detail">' + esc(s.transport) + '</div>' +
                     (s.cost ? '<div class="transport-cost">💰 ' + esc(s.cost) + '</div>' : '') +
                   '</div>';
        }
      });
      transport.innerHTML = tHTML || '<p class="empty-msg">今日無交通移動安排</p>';
    }

    Array.prototype.forEach.call(track.querySelectorAll('.date-card'), function (card) {
      card.addEventListener('click', function () { renderDayDetail(parseInt(card.getAttribute('data-day'), 10)); });
    });
    renderDayDetail(IT[0] ? IT[0].id : 1);
  }

  // ---- 每日頁 ----
  function renderDay() {
    var root = document.getElementById('day-root');
    if (!root) return;
    var id = parseInt(root.getAttribute('data-day'), 10);
    var d = findDay(id);
    if (!d) { root.innerHTML = '<p style="text-align:center;padding:var(--space-8) 0;">找不到此行程。</p>'; return; }
    var idx = IT.indexOf(d);
    var prev = IT[idx - 1];
    var next = IT[idx + 1];
    var route = d.stations.map(function (s) { return s.name; }).join(' → ');

    var html = '';
    html += '<a href="index.html" class="btn btn-outline" style="margin-bottom:var(--space-4);display:inline-flex;align-items:center;gap:var(--space-2);"><span style="font-size:var(--text-xs);">← 回總覽</span></a>';
    html += '<header class="hero"><span class="tag">' + esc(d.date) + ' · Day ' + d.id + '</span><h1>' + esc(d.theme) + '</h1><p>' + esc(route) + '</p></header>';

    html += '<section class="card" aria-label="當天詳細行程"><h3>📋 當天詳細行程</h3><div class="day-stations">' + d.stations.map(stationItemHTML).join('') + '</div></section>';

    // 交通表
    html += '<section class="card" aria-label="當天交通詳情"><h3>🚂 當天交通詳情</h3><div class="table-wrap"><table class="schedule-table"><thead><tr><th>站點</th><th>交通方式</th><th>時間</th><th>費用（雙人/人）</th></tr></thead><tbody>';
    d.stations.forEach(function (s) {
      if (s.type === 'transport') {
        html += '<tr><td>' + esc(s.name) + '</td><td>' + esc(s.transport) + '</td><td>' + esc(stationTime(s)) + '</td><td>' + esc(s.cost || '-') + '</td></tr>';
      }
    });
    html += '</tbody></table></div></section>';

    // 地圖
    html += '<section class="card" aria-label="當天路線圖"><h3>🗺️ 當天路線圖</h3><p style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-3);">👆 手指可縮放、拖動地圖；點擊站點查看細節</p><div class="map-wrapper"><div id="map-container"></div></div></section>';

    // 附近景點
    if (d.nearby && d.nearby.length) {
      html += '<section class="card" aria-label="附近熱門景點"><h3>📍 附近熱門景點</h3><ul class="nearby-list">' +
              d.nearby.map(function (item) { return '<li>' + item + '</li>'; }).join('') +
              '</ul></section>';
    }

    // 上一天 / 下一天
    html += '<nav class="day-pager" aria-label="行程切換">';
    html += prev ? '<a class="day-pager__link day-pager__link--prev" href="day' + prev.id + '.html"><span>← Day ' + prev.id + '</span><strong>' + esc(prev.theme) + '</strong></a>' : '<span></span>';
    html += next ? '<a class="day-pager__link day-pager__link--next" href="day' + next.id + '.html"><span>Day ' + next.id + ' →</span><strong>' + esc(next.theme) + '</strong></a>' : '<span></span>';
    html += '</nav>';

    root.innerHTML = html;
    drawDayMap(d);
  }

  // ---- 地圖頁（全 5 天）----
  function renderMapPage() {
    var root = document.getElementById('map-root');
    if (!root) return;
    root.innerHTML =
      '<header class="hero"><span class="tag">行程地圖</span><h1>景點位置</h1><p>點選地圖標記查看該站點資訊。</p></header>' +
      '<section class="card" aria-label="地圖"><h3>🗺️ 全部行程地圖</h3>' +
        '<div class="map-wrapper"><div id="map-container"></div><div class="map-legend" id="map-legend"></div></div>' +
        '<p style="margin-top:var(--space-3);font-size:var(--text-xs);color:var(--color-text-muted);">地圖資料來自 OpenStreetMap。</p>' +
      '</section>';
    drawFullMap();
  }

  // ---- Leaflet 繪圖 ----
  function drawDayMap(d) {
    var L = window.L;
    var el = document.getElementById('map-container');
    if (!el) return;
    if (!L) { el.innerHTML = '<p style="padding:var(--space-4);text-align:center;color:var(--color-text-muted);">地圖載入失敗（無法連線 Leaflet）。</p>'; return; }
    var map = L.map(el, { center: [35.68, 139.7], zoom: 10, touchZoom: true, scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors', maxZoom: 18 }).addTo(map);
    var latlngs = [];
    d.stations.forEach(function (s) {
      if (typeof s.lat !== 'number' || typeof s.lng !== 'number') return;
      var ll = [s.lat, s.lng];
      latlngs.push(ll);
      L.circleMarker(ll, { radius: 7, fillColor: TYPE_COLORS[s.type] || '#b55444', color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.9 })
        .bindPopup(popupHTML(s)).addTo(map);
    });
    if (latlngs.length > 1) {
      L.polyline(latlngs, { color: '#b55444', weight: 3, opacity: 0.6, dashArray: '6,6' }).addTo(map);
      map.fitBounds(latlngs, { padding: [50, 50] });
    }
  }

  function drawFullMap() {
    var L = window.L;
    var el = document.getElementById('map-container');
    var legend = document.getElementById('map-legend');
    if (!el) return;
    if (!L) { el.innerHTML = '<p style="padding:var(--space-4);text-align:center;color:var(--color-text-muted);">地圖載入失敗（無法連線 Leaflet）。</p>'; return; }
    var map = L.map(el, { center: [35.68, 139.7], zoom: 8, touchZoom: true, scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors', maxZoom: 18 }).addTo(map);
    var colors = ['#b55444', '#3498db', '#5a725c', '#b58344', '#8a7d73'];
    IT.forEach(function (d, i) {
      var latlngs = [];
      d.stations.forEach(function (s) {
        if (typeof s.lat !== 'number' || typeof s.lng !== 'number') return;
        var ll = [s.lat, s.lng];
        latlngs.push(ll);
        L.circleMarker(ll, { radius: 7, fillColor: TYPE_COLORS[s.type] || '#b55444', color: '#fff', weight: 2, opacity: 1, fillOpacity: 0.9 })
          .bindPopup('<b>Day ' + d.id + '</b><br>' + popupHTML(s)).addTo(map);
      });
      if (latlngs.length > 1) L.polyline(latlngs, { color: colors[i % colors.length], weight: 3, opacity: 0.7, dashArray: '8,8' }).addTo(map);
    });
    if (legend) {
      var lh = '<div class="legend-title">圖例</div>';
      Object.keys(TYPE_LABELS).forEach(function (type) {
        lh += '<div class="legend-item"><span class="legend-dot" style="background:' + (TYPE_COLORS[type] || '#888') + '"></span><span class="legend-text">' + esc(TYPE_LABELS[type]) + '</span></div>';
      });
      legend.innerHTML = lh;
    }
  }

  function popupHTML(s) {
    var color = TYPE_COLORS[s.type] || '#b55444';
    return '<div style="min-width:190px;">' +
      '<div style="font-weight:600;color:var(--color-text-primary);margin-bottom:4px;">' + esc(s.name) + '</div>' +
      '<div style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:4px;">' + esc(stationTime(s)) + ' · ' + esc(s.transport) + '</div>' +
      '<div style="font-size:var(--text-sm);color:var(--color-text-secondary);line-height:1.4;">' + esc(s.detail) + '</div>' +
      (s.cost ? '<div style="font-size:var(--text-sm);font-weight:600;color:var(--color-success);margin-top:4px;">💰 ' + esc(s.cost) + '</div>' : '') +
      '</div>';
  }

  // ---- 主題切換 ----
  function initTheme() {
    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    var sun = toggle.querySelector('.sun');
    var moon = toggle.querySelector('.moon');
    function apply(isDark) {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (sun) sun.style.display = 'none';
        if (moon) moon.style.display = 'inline';
        toggle.setAttribute('aria-label', '切換至淺色主題');
        try { localStorage.setItem('theme', 'dark'); } catch (e) {}
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (sun) sun.style.display = 'inline';
        if (moon) moon.style.display = 'none';
        toggle.setAttribute('aria-label', '切換至深色主題');
        try { localStorage.setItem('theme', 'light'); } catch (e) {}
      }
    }
    var saved;
    try { saved = localStorage.getItem('theme'); } catch (e) { saved = null; }
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(saved === 'dark' || (!saved && prefersDark));
    toggle.addEventListener('click', function () {
      apply(!(document.documentElement.getAttribute('data-theme') === 'dark'));
    });
  }

  // ---- 啟動 ----
  function init() {
    document.documentElement.classList.remove('no-js');
    renderNav();
    initTheme();
    try {
      if (document.getElementById('home-root')) renderHome();
      if (document.getElementById('itinerary-root')) renderItinerary();
      if (document.getElementById('day-root')) renderDay();
      if (document.getElementById('map-root')) renderMapPage();
    } catch (err) {
      console.error('[Tokyo Wedding] 渲染失敗', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
