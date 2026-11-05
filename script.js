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

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '420');
    svg.setAttribute('viewBox', '0 0 1000 700');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('style', 'overflow: visible; background: var(--surface); border-radius: 8px;');

    // 經緯度正規化到 0-1000 SVG 座標
    // 東京地區經緯度範圍（包含富士山/河口湖、鎌倉、橫濱、成田）
    const MAP_BOUNDS = {
      minLng: 138.6,  // 西邊：河口湖附近
      maxLng: 140.5,  // 東邊：成田機場
      minLat: 35.2,   // 南邊：鎌倉/橫濱
      maxLat: 35.8    // 北邊：成田機場
    };

    function project(station) {
      // 經度 -> x (0-1000)，緯度 -> y (0-700，SVG y 向下所以用 maxLat - lat)
      const x = ((station.lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 1000;
      const y = ((MAP_BOUNDS.maxLat - station.lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 700;
      return { x, y };
    }

    // 背景矩形
    const bg = document.createElementNS(svgNS, 'rect');
    bg.setAttribute('width', '1000');
    bg.setAttribute('height', '700');
    bg.setAttribute('fill', 'var(--surface)');
    bg.setAttribute('rx', '16');
    svg.appendChild(bg);

    // 收集所有站點
    const allStations = [];
    itinerary.forEach(day => {
      day.stations.forEach(station => {
        const exists = allStations.find(s => s.name === station.name && s.day === station.day);
        if (!exists) allStations.push(station);
      });
    });

    // 繪製路線線條（每日）
    itinerary.forEach((day, dayIdx) => {
      const stations = day.stations.filter(s => s.type === 'transport' || s.type === 'location');
      for (let i = 0; i < stations.length - 1; i++) {
        const s1 = stations[i];
        const s2 = stations[i + 1];
        const p1 = project(s1);
        const p2 = project(s2);

        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', p1.x);
        line.setAttribute('y1', p1.y);
        line.setAttribute('x2', p2.x);
        line.setAttribute('y2', p2.y);
        line.setAttribute('stroke', dayIdx % 2 === 0 ? 'var(--accent)' : 'var(--secondary)');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('fill', 'none');
        line.setAttribute('class', 'transport-line');
        line.setAttribute('data-day', day.id);
        line.style.strokeDasharray = '20,10';
        line.style.animation = 'dashFlow 3s linear infinite';
        svg.appendChild(line);
      }
    });

    // 繪製站點標記
    allStations.forEach(station => {
      const p = project(station);
      const circle = document.createElementNS(svgNS, 'circle');
      const r = station.type === 'airport' || station.type === 'hotel' ? 7 : 5;
      circle.setAttribute('cx', p.x);
      circle.setAttribute('cy', p.y);
      circle.setAttribute('r', r);
      circle.setAttribute('fill', getStationColor(station.type));
      circle.setAttribute('class', 'station-marker');
      circle.setAttribute('data-station', station.name);
      circle.setAttribute('data-day', station.day);
      circle.setAttribute('tabindex', '0');
      circle.setAttribute('role', 'button');
      circle.setAttribute('aria-label', `${station.name} - 第 ${station.day} 天`);

      // 點擊站點切換當天
      circle.addEventListener('click', () => activateDay(station.day));
      circle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateDay(station.day);
        }
      });

      // 懸停放大
      if (!prefersReducedMotion) {
        circle.addEventListener('mouseenter', () => {
          circle.setAttribute('r', r + 4);
          circle.setAttribute('stroke', 'var(--accent)');
          circle.setAttribute('stroke-width', '3');
        });
        circle.addEventListener('mouseleave', () => {
          circle.setAttribute('r', r);
          circle.removeAttribute('stroke');
        });
      }

      svg.appendChild(circle);

      // 站點標籤（偏移避免蓋住圓點）
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', p.x + 8);
      text.setAttribute('y', p.y - 8);
      text.setAttribute('font-size', '11');
      text.setAttribute('fill', 'var(--muted)');
      text.setAttribute('class', 'station-label');
      text.textContent = station.name.length > 5 ? station.name.substring(0, 5) + '…' : station.name;
      svg.appendChild(text);
    });

    mapContainer.innerHTML = '';
    mapContainer.appendChild(svg);

    // 產生地圖圖例
    const typeColors = {
      airport: 'var(--danger)',
      hotel: 'var(--success)',
      transport: 'var(--accent)',
      location: 'var(--secondary)',
      shrine: 'var(--warning)',
      station: 'var(--muted)',
      shopping: 'var(--primary)',
      temple: 'var(--warning)',
      restaurant: 'var(--success)',
      food: 'var(--warning)'
    };

    const typeLabels = {
      airport: '機場',
      hotel: '住宿',
      transport: '交通',
      location: '景點',
      shrine: '神社',
      station: '車站',
      shopping: '購物',
      temple: '寺院',
      restaurant: '餐廳',
      food: '美食'
    };

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
  }

  function getStationColor(type) {
    const colors = {
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
    return colors[type] || '#d1495b';
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

    // 地圖路線高亮
    document.querySelectorAll('.transport-line').forEach(line => {
      if (parseInt(line.getAttribute('data-day')) === dayNum) {
        line.style.opacity = '1';
        line.style.strokeWidth = '4';
      } else {
        line.style.opacity = '0.3';
        line.style.strokeWidth = '2';
      }
    });

    // 地圖站點高亮
    document.querySelectorAll('.station-marker').forEach(marker => {
      if (parseInt(marker.getAttribute('data-day')) === dayNum) {
        marker.setAttribute('fill', 'var(--secondary)');
        marker.setAttribute('r', '8');
      } else {
        marker.removeAttribute('fill');
        marker.setAttribute('r', '5');
      }
    });

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