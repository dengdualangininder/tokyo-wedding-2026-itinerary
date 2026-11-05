// Tokyo Wedding 2026 - Interactive Itinerary Script
// 根據使用者選擇：方案 A（經典 SVG 路線圖）+ 流動線條動畫 + 四個資訊欄位（時間、交通工具、景點說明、費用票券）

document.addEventListener('DOMContentLoaded', function() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // 資料：每日行程（包含幾點、交通工具、詳細說明、費用）
  // ============================================================
  const itinerary = [
    {
      id: 1,
      date: '12/02 (三)',
      theme: '抵達・婚紗試穿',
      weather: '晴 12-18°C',
      stations: [
        {
          name: '成田機場',
          code: 'NRT',
          lat: 35.7646,
          lng: 140.3264,
          type: 'airport',
          arriveTime: '14:30',
          departTime: '',
          transport: '國際航班 TPE → NRT',
          detail: '從台灣桃園機場飛抵東京成田機場，入境後領取行李',
          cost: '機票含機票總價',
          day: 1
        },
        {
          name: '成田 → 日暮里',
          code: 'Skyliner',
          lat: 35.7265,
          lng: 139.7730,
          type: 'transport',
          arriveTime: '16:10',
          departTime: '15:30',
          transport: 'Skyliner 快速電車',
          detail: '從成田機場第 3 航廈搭乘 Skyliner 至日暮里站，約 36 分鐘，無需轉乘',
          cost: '¥2,580 / 人',
          day: 1
        },
        {
          name: '和ごころ日暮里',
          code: 'Wagokoro',
          lat: 35.7265,
          lng: 139.7730,
          type: 'hotel',
          arriveTime: '16:40',
          departTime: '',
          transport: '從日暮里站步行 8 分鐘',
          detail: '入住和ごころ日暮里旅館，辦理入住手續並休息，為翌日婚紗試穿儲備體力',
          cost: '住宿已預訂',
          day: 1
        },
        {
          name: '婚紗店試穿',
          code: 'Bridal',
          lat: 35.7265,
          lng: 139.7730,
          type: 'activity',
          arriveTime: '19:30',
          departTime: '19:00',
          transport: '從旅館前往婚紗店',
          detail: '19:30 與婚紗店預約試穿，確認婚紗與西裝款式（店名需確認）',
          cost: '預約中',
          day: 1
        }
      ]
    },
    {
      id: 2,
      date: '12/03 (四)',
      theme: '富士山婚紗攝影',
      weather: '晴 5-12°C',
      stations: [
        {
          name: '和ごころ日暮里',
          code: 'Wagokoro',
          lat: 35.7265,
          lng: 139.7730,
          type: 'hotel',
          arriveTime: '07:00',
          departTime: '07:30',
          transport: '從旅館出發前往富士山',
          detail: '清晨從旅館出發，前往富士山婚紗攝影場地，保暖衣物必備',
          cost: '',
          day: 2
        },
        {
          name: '河口湖 / 精華湖',
          code: 'Kawaguchiko',
          lat: 35.5149,
          lng: 138.7530,
          type: 'location',
          arriveTime: '09:30',
          departTime: '16:30',
          transport: '電巴士 / 租車',
          detail: '富士山婚紗攝影全天，河口湖或精華湖取景，富士山為背景拍攝婚紗照',
          cost: '¥10,000-20,000 / 人（電巴士）',
          day: 2
        },
        {
          name: '返回日暮里',
          code: 'Return',
          lat: 35.7265,
          lng: 139.7730,
          type: 'transport',
          arriveTime: '19:00',
          departTime: '17:00',
          transport: '電巴士返回東京',
          detail: '攝影結束後返回日暮里旅館，晚餐補充體力',
          cost: '包含在電巴士費用',
          day: 2
        }
      ]
    },
    {
      id: 3,
      date: '12/04 (五)',
      theme: '東京市區深度遊',
      weather: '晴 10-16°C',
      stations: [
        {
          name: '小網神社',
          code: 'Okunitama',
          lat: 35.6923,
          lng: 139.7644,
          type: 'shrine',
          arriveTime: '10:00',
          departTime: '11:30',
          transport: '地鐵銀座線',
          detail: '參拜小網神社，祈求姻緣美滿，體驗洗錢儀式（錢幣清洗祈福）',
          cost: '免費 / 洗錢儀式 ¥100',
          day: 3
        },
        {
          name: '東京站',
          code: 'TokyoSta',
          lat: 35.6812,
          lng: 139.7671,
          type: 'station',
          arriveTime: '12:00',
          departTime: '13:30',
          transport: '地鐵 / 步行',
          detail: '東京站紅磚車站建築拍照，丸之內地下街購物與午餐',
          cost: '地鐵 ¥200 / 人',
          day: 3
        },
        {
          name: '銀座',
          code: 'Ginza',
          lat: 35.6712,
          lng: 139.7274,
          type: 'shopping',
          arriveTime: '14:00',
          departTime: '16:00',
          transport: '地鐵銀座線',
          detail: '銀座通步行，觀看 Chanel 精品櫥窗，銀座六丁目交叉路口拍照',
          cost: '地鐵 ¥170 / 人',
          day: 3
        },
        {
          name: '豪德寺',
          code: 'Gotokuji',
          lat: 35.7162,
          lng: 139.7128,
          type: 'temple',
          arriveTime: '16:30',
          departTime: '17:30',
          transport: '小田急線',
          detail: '豪德寺招財貓發祥地，參拜並購買招財貓護身符',
          cost: '免費',
          day: 3
        },
        {
          name: '人形町今半',
          code: 'Imahan',
          lat: 35.6895,
          lng: 139.7822,
          type: 'restaurant',
          arriveTime: '18:00',
          departTime: '20:00',
          transport: '地鐵日比谷線',
          detail: '壽喜燒晚餐 17:30，TableCheck 已預約，人形町今半本店',
          cost: '¥15,000-20,000 / 人',
          day: 3
        }
      ]
    },
    {
      id: 4,
      date: '12/05 (六)',
      theme: '鎌倉・橫濱',
      weather: '晴 10-15°C',
      stations: [
        {
          name: '日暮里 → 鎌倉',
          code: 'JR',
          lat: 35.3176,
          lng: 139.4596,
          type: 'transport',
          arriveTime: '09:30',
          departTime: '08:00',
          transport: 'JR 常磐線 + 橫須賀線',
          detail: '從日暮里站搭乘 JR 至鎌倉站，約 1.5 小時，轉乘 1 次',
          cost: '~¥1,000 / 人',
          day: 4
        },
        {
          name: '鶴岡八幡宮',
          code: 'Tsurugaoka',
          lat: 35.3274,
          lng: 139.5395,
          type: 'shrine',
          arriveTime: '10:00',
          departTime: '11:30',
          transport: '從鎌倉站步行 10 分鐘',
          detail: '鎌倉最重要的神社，參拜並祈求婚姻美滿，年輕情侶熱門拍照點',
          cost: '免費',
          day: 4
        },
        {
          name: '小町通',
          code: 'Komachi',
          lat: 35.3189,
          lng: 139.5355,
          type: 'shopping',
          arriveTime: '12:00',
          departTime: '13:30',
          transport: '步行',
          detail: '鎌倉小町通美食街，嘗試鎌倉名物（如：吉次餅、晒煎餅），購買伴手禮',
          cost: '自由消費',
          day: 4
        },
        {
          name: '港未來',
          code: 'MinatoMirai',
          lat: 35.4565,
          lng: 139.6350,
          type: 'location',
          arriveTime: '15:00',
          departTime: '17:00',
          transport: '江之電 + JR 至橫濱',
          detail: '橫濱港未來地區，欣賞海港夜景，橫濱摩天輪拍照',
          cost: 'JR+江之電 ~¥800 / 人',
          day: 4
        },
        {
          name: '中華街',
          code: 'Chinatown',
          lat: 35.4437,
          lng: 139.6440,
          type: 'restaurant',
          arriveTime: '18:00',
          departTime: '20:00',
          transport: '步行',
          detail: '橫濱中華街晚餐 17:30，點選正宗廣東料理或上海小籠包',
          cost: '¥5,000-8,000 / 人',
          day: 4
        }
      ]
    },
    {
      id: 5,
      date: '12/06 (日)',
      theme: '返程採買',
      weather: '晴 8-14°C',
      stations: [
        {
          name: '日暮里 → 池袋',
          code: 'Yamanote',
          lat: 35.7292,
          lng: 139.7102,
          type: 'transport',
          arriveTime: '10:30',
          departTime: '10:00',
          transport: 'JR 山手線',
          detail: '從日暮里站搭乘 JR 山手線至池袋站，約 20 分鐘',
          cost: '~¥200 / 人',
          day: 5
        },
        {
          name: '池袋購物',
          code: 'Ikebukuro',
          lat: 35.7292,
          lng: 139.7102,
          type: 'shopping',
          arriveTime: '11:00',
          departTime: '15:00',
          transport: '步行',
          detail: '池袋西武、PARCO、Sunshine City 購物，Onitsuka Tiger、GoPro、Chanel 等',
          cost: '自由消費',
          day: 5
        },
        {
          name: '巢鴨銅鑼燒',
          code: 'Sugamo',
          lat: 35.7358,
          lng: 139.7314,
          type: 'food',
          arriveTime: '15:30',
          departTime: '16:30',
          transport: 'JR 山手線 1 站',
          detail: '巢鴨地藏通り商店街，品嚐銅鑼燒與傳統和菓子',
          cost: '¥500-1,000 / 人',
          day: 5
        },
        {
          name: '池袋 → 成田機場',
          code: 'Skyliner',
          lat: 35.7646,
          lng: 140.3264,
          type: 'transport',
          arriveTime: '19:00',
          departTime: '17:30',
          transport: 'JR 山手線 + Skyliner',
          detail: '從池袋站搭乘 JR 至日暮里，轉乘 Skyliner 前往成田機場返國',
          cost: '~¥3,000 / 人',
          day: 5
        }
      ]
    }
  ];

  // ============================================================
  // 初始化：產生時間軸、地圖、日程卡片、交通表
  // ============================================================
  function initTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    let html = '<div class="timeline-points">';
    itinerary.forEach((day, i) => {
      const isActive = i === 0 ? 'active' : '';
      html += `
        <div class="timeline-point ${isActive}"
             role="button"
             tabindex="0"
             aria-label="前往 ${day.date} - ${day.theme}"
             data-day="${day.id}">
          <div class="point-number">${i + 1}</div>
          <div class="point-label">${day.date}</div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;

    // 綁定點擊事件
    document.querySelectorAll('.timeline-point').forEach((point, i) => {
      point.addEventListener('click', () => activateDay(i + 1));
      point.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateDay(i + 1);
        }
      });
    });
  }

  function initMap() {
    const mapContainer = document.getElementById('map-container');
    const legendContainer = document.getElementById('map-legend');
    if (!mapContainer || !legendContainer) return;

    // 初始化 Leaflet 地圖（中心點約在東京附近）
    const map = L.map('map-container', {
      center: [35.68, 139.70],
      zoom: 8,
      zoomControl: true,
      touchZoom: true,
      scrollWheelZoom: false
    });

    // 加入 OpenStreetMap 圖磚（免費，無需 API Key）
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 13
    }).addTo(map);

    // 存放每日路線圖層與標記
    const dayLayers = {};
    const markers = {};

    // 地圖圖例顏色
    const typeColors = {
      airport: '#e74c3c',
      hotel: '#27ae60',
      transport: '#d1495b',
      location: '#3498db',
      shrine: '#f39c12',
      station: '#95a5a6',
      shopping: '#2c3e50',
      temple: '#f39c12',
      restaurant: '#2ecc71',
      food: '#f1c40f'
    };

    const typeLabels = {
      airport: '機場', hotel: '住宿', transport: '交通', location: '景點',
      shrine: '神社', station: '車站', shopping: '購物', temple: '寺院',
      restaurant: '餐廳', food: '美食'
    };

    // 建立每日路線與標記
    itinerary.forEach((day, dayIdx) => {
      const lineColor = dayIdx % 2 === 0 ? '#d1495b' : '#3498db';
      const latlngs = [];
      const dayMarkers = [];

      day.stations.forEach(station => {
        const latlng = [station.lat, station.lng];
        latlngs.push(latlng);

        // 建立標記
        const markerColor = typeColors[station.type] || '#d1495b';
        const marker = L.circleMarker(latlng, {
          radius: 8,
          fillColor: markerColor,
          color: '#ffffff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        });

        // Popup 內容（包含四個資訊欄位）
        const popupContent = `
          <div style="min-width: 200px;">
            <h4 style="margin:0 0 6px 0; color: var(--accent); font-size: 0.95rem;">
              ${station.name}
            </h4>
            <div style="font-size: 0.8rem; color: var(--muted); margin-bottom: 4px;">
              ${station.arriveTime || station.departTime || '--:--'}
              ${station.transport ? '<br>' + station.transport : ''}
            </div>
            <div style="font-size: 0.8rem; color: var(--fg); margin-bottom: 4px;">
              ${station.detail}
            </div>
            ${station.cost ? `<div style="font-size: 0.8rem; color: var(--success); font-weight: 600;">💰 ${station.cost}</div>` : ''}
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => activateDay(station.day));
        marker.addTo(map);
        dayMarkers.push(marker);
        markers[station.name + station.day] = marker;
      });

      // 建立路線線條
      if (latlngs.length > 1) {
        const polyline = L.polyline(latlngs, {
          color: lineColor,
          weight: 3,
          opacity: 0.8,
          dashArray: '8, 8'
        }).addTo(map);
        dayLayers[day.id] = { polyline, markers: dayMarkers };
      } else {
        dayLayers[day.id] = { polyline: null, markers: dayMarkers };
      }
    });

    // 顯示指定天數的地圖圖層
    window.showDayOnMap = function(dayNum) {
      Object.entries(dayLayers).forEach(([dayId, layer]) => {
        const isActive = parseInt(dayId) === dayNum;
        if (layer.polyline) {
          isActive ? layer.polyline.addTo(map) : map.removeLayer(layer.polyline);
          layer.polyline.setStyle(isActive ? { opacity: 0.8 } : { opacity: 0.2 });
        }
        layer.markers.forEach(m => {
          isActive ? m.setStyle({ radius: 8, opacity: 1 }) : m.setStyle({ radius: 5, opacity: 0.4 });
        });
      });

      // 地圖中心移到當天第一個站點
      const firstDay = itinerary.find(d => d.id === dayNum);
      if (firstDay && firstDay.stations[0]) {
        map.setView([firstDay.stations[0].lat, firstDay.stations[0].lng], 10, { animate: true, duration: 1 });
      }
    };

    // 地圖圖例
    let legendHtml = '<div class="legend-title">圖例</div>';
    Object.entries(typeColors).forEach(([type, color]) => {
      legendHtml += `
        <div class="legend-item">
          <span class="legend-dot" style="background: ${color}"></span>
          <span class="legend-text">${typeLabels[type]}</span>
        </div>
      `;
    });
    legendContainer.innerHTML = legendHtml;

    // 初始顯示第 1 天
    setTimeout(() => window.showDayOnMap(1), 100);
  }

  function initDayCards() {
    const container = document.getElementById('day-grid');
    if (!container) return;

    let html = '';
    itinerary.forEach((day, i) => {
      const isActive = i === 0 ? 'active' : '';
      html += `
        <div class="day-card ${isActive} delay-${i + 1}" data-day="${day.id}" id="day-card-${day.id}">
          <div class="day-header">
            <span class="day-badge">${day.date}</span>
            <h3>${day.theme}</h3>
            <span class="weather-badge">🌤️ ${day.weather}</span>
          </div>
          <div class="day-stations">
            ${day.stations.map(station => `
              <div class="station-item" data-station="${station.name}">
                <div class="station-time">${station.arriveTime || station.departTime || '--:--'}</div>
                <div class="station-info">
                  <div class="station-name">${station.name}</div>
                  <div class="station-transport">${station.transport}</div>
                  <div class="station-detail">${station.detail}</div>
                  ${station.cost ? `<div class="station-cost">💰 ${station.cost}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  function initTransportTable() {
    const tbody = document.getElementById('transport-table-body');
    if (!tbody) return;

    let html = '';
    const seen = new Set();
    itinerary.forEach(day => {
      day.stations.forEach(station => {
        if (station.type === 'transport' && !seen.has(station.name)) {
          seen.add(station.name);
          html += `
            <tr data-day="${day.id}">
              <td>${day.date}</td>
              <td>${station.name}</td>
              <td>${station.transport}</td>
              <td>${station.cost || '-'}</td>
            </tr>
          `;
        }
      });
    });
    tbody.innerHTML = html;
  }

  // ============================================================
  // 當天切換邏輯
  // ============================================================
  function activateDay(dayNum) {
    // 時間軸點擊
    document.querySelectorAll('.timeline-point').forEach((p, i) => {
      if (i + 1 === dayNum) {
        p.classList.add('active');
        p.setAttribute('aria-selected', 'true');
      } else {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      }
    });

    // 日程卡片切換
    document.querySelectorAll('.day-card').forEach(card => {
      if (parseInt(card.getAttribute('data-day')) === dayNum) {
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        card.classList.remove('active');
      }
    });

    // 地圖路線與站點高亮（Leaflet）
    if (typeof window.showDayOnMap === 'function') {
      window.showDayOnMap(dayNum);
    }

    // 交通表切換
    document.querySelectorAll('#transport-table-body tr').forEach(row => {
      if (parseInt(row.getAttribute('data-day')) === dayNum) {
        row.style.display = '';
        row.style.animation = 'fadeIn 0.3s ease';
      } else {
        row.style.display = 'none';
      }
    });
  }

  // ============================================================
  // 主題切換
  // ============================================================
  function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggle.querySelector('.sun').style.display = 'none';
      toggle.querySelector('.moon').style.display = 'inline';
    }

    toggle.addEventListener('click', function() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        toggle.querySelector('.sun').style.display = 'inline';
        toggle.querySelector('.moon').style.display = 'none';
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.querySelector('.sun').style.display = 'none';
        toggle.querySelector('.moon').style.display = 'inline';
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // ============================================================
  // 入場動畫
  // ============================================================
  function initAnimations() {
    const hero = document.querySelector('.hero');
    if (hero && !prefersReducedMotion) {
      hero.style.opacity = '0';
      hero.style.transform = 'translateY(20px)';
      setTimeout(() => {
        hero.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      }, 100);
    }

    // 觀察器觸發卡片動畫
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.day-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  }

  // ============================================================
  // 啟動所有模組
  // ============================================================
  function init() {
    initTimeline();
    initMap();
    initDayCards();
    initTransportTable();
    initThemeToggle();
    initAnimations();
    activateDay(1); // 預設顯示第 1 天
  }

  init();
});