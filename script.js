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
          lng: 140.3864,
          type: 'airport',
          arriveTime: '06:35',
          departTime: '02:30',
          transport: '國際航班 TPE → NRT (桃園 02:30 → 成田 06:35)',
          detail: '早上6點35分抵達成田機場，入境後領取行李',
          cost: '機票含機票總價',
          day: 1
        },
        {
          name: '日暮里站',
          code: 'Skyliner',
          lat: 35.7265,
          lng: 139.7730,
          type: 'transport',
          arriveTime: '08:15',
          departTime: '07:30',
          transport: 'Skyliner 快速電車',
          detail: '從成田機場第 3 航廈搭乘 Skyliner 至日暮里站，約 36 分鐘，無需轉乘',
          cost: '¥2,580 / 人',
          day: 1
        },
        {
          name: 'セントレービル婚紗店',
          code: 'Bridal',
          lat: 35.7265,
          lng: 139.7730,
          type: 'activity',
          arriveTime: '09:00',
          departTime: '08:30',
          transport: '從日暮里站步行/搭車前往婚紗店',
          detail: '⚠️ セントレービル婚紗店尚無法於公開資料確認，請於出發前查證實際存在的婚紗店並預約試穿',
          cost: '未確認',
          day: 1
        },
        {
          name: '和ごころ日暮里',
          code: 'Wagokoro',
          lat: 35.7265,
          lng: 139.7730,
          type: 'hotel',
          arriveTime: '12:30',
          departTime: '14:00',
          transport: '從婚紗店返回旅館',
          detail: '試穿結束後返回和ごころ日暮里旅館，辦理入住並休息，整理行李並稍微小憩',
          cost: '住宿已預訂',
          day: 1
        },
        {
          name: '谷中銀座商店街',
          code: 'YanakaGinza',
          lat: 35.7334,
          lng: 139.7697,
          type: 'shopping',
          arriveTime: '15:00',
          departTime: '16:30',
          transport: '從和ごころ日暮里步行',
          detail: '從旅館步行約 10-15 分鐘前往谷中銀座商店街，逛逛懷舊昭和風情商店街，適合婚紗試穿後輕鬆散步',
          cost: '自由消費',
          day: 1
        },
        {
          name: '和ごころ日暮里',
          code: 'WagokoroReturn',
          lat: 35.7265,
          lng: 139.7730,
          type: 'hotel',
          arriveTime: '17:00',
          departTime: '18:30',
          transport: '從谷中銀座步行返回',
          detail: '返回旅館休息，為晚餐與翌日富士山婚紗攝影儲備體力',
          cost: '免費',
          day: 1
        },
        {
          name: '日暮里晚餐',
          code: 'Dinner',
          lat: 35.7265,
          lng: 139.7730,
          type: 'restaurant',
          arriveTime: '19:00',
          departTime: '20:30',
          transport: '從和ごころ日暮里步行',
          detail: '第一天在日本的晚餐，建議輕鬆用餐，不要吃太飽，避免影響睡眠',
          cost: '約 ¥1,500-2,500/人',
          day: 1
        },
        {
          name: '和ごころ日暮里',
          code: 'WagokoroNight',
          lat: 35.7265,
          lng: 139.7730,
          type: 'hotel',
          arriveTime: '21:00',
          departTime: '',
          transport: '從晚餐步行返回',
          detail: '用餐完畢後返回旅館，準備就寢，為翌日 07:00 出發前往富士山婚紗攝影儲備體力',
          cost: '免費',
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
          departTime: '07:00',
          transport: '從旅館出發前往富士山',
          detail: '清晨從旅館出發，前往富士山婚紗攝影場地，保暖衣物必備',
          cost: '',
          day: 2
        },
        {
          name: '日暮里站',
          code: 'Nippori',
          lat: 35.7265,
          lng: 139.7730,
          type: 'transport',
          arriveTime: '',
          departTime: '07:15',
          transport: 'JR 山手線內環線',
          detail: '日暮里 → 新宿，約 25 分鐘，無需轉乘',
          cost: '¥210 / 人',
          day: 2
        },
        {
          name: '新宿站',
          code: 'Shinjuku',
          lat: 35.6896,
          lng: 139.7006,
          type: 'transport',
          arriveTime: '',
          departTime: '07:45',
          transport: 'JR 中央線 + 富士急行線',
          detail: '新宿 → 大月 → 河口湖，約 1 小時 55 分鐘',
          cost: '約 ¥2,250 / 人',
          day: 2
        },
        {
          name: '河口湖 / 精華湖',
          code: 'Kawaguchiko',
          lat: 35.5149,
          lng: 138.7530,
          type: 'location',
          arriveTime: '09:40',
          departTime: '17:00',
          transport: '電巴士 / 租車',
          detail: '富士山婚紗攝影全天，河口湖或精華湖取景，富士山為背景拍攝婚紗照',
          cost: '¥10,000-20,000 / 人（電巴士）',
          day: 2
        },
        { name: '和ごころ日暮里',
          code: 'WagokoroReturn',
          lat: 35.7265,
          lng: 139.7730,
          type: 'transport',
          arriveTime: '20:00',
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
      theme: '鎌倉・橫濱',
      weather: '晴 10-15°C',
      stations: [
        {
          name: '日暮里 → 鎌倉',
          code: 'JR',
          lat: 35.3176,
          lng: 139.4596,
          type: 'transport',
          arriveTime: '09:20',
          departTime: '08:15',
          transport: 'JR 常磐線快速「上野東京ライン」直達鎌倉（或 山手線→品川→橫須賀線）',
          detail: '從日暮里站搭乘 JR 常磐線快速「上野東京ライン」直達鎌倉站，約 1 小時（部份班次於大船站轉橫須賀線）；或 JR 山手線至品川轉橫須賀線，約 1 小時 15 分',
          cost: '~¥1,000 / 人',
          day: 3
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
          day: 3
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
          day: 3
        },
        {
          name: '御成站',
          code: 'Onari',
          lat: 35.3167,
          lng: 139.5430,
          type: 'transport',
          arriveTime: '13:50',
          departTime: '',
          transport: '江之島電鐵 鎌倉→御成',
          detail: '從鎌倉站搭乘江之島電鐵至御成站，約 2 分鐘（御成站為江之電車站，並非 JR 車站）',
          cost: '¥200 / 人（江之電）',
          day: 3
        },
        {
          name: '港未來',
          code: 'MinatoMirai',
          lat: 35.4565,
          lng: 139.6350,
          type: 'location',
          arriveTime: '14:40',
          departTime: '17:00',
          transport: '江之島電鐵 御成→鎌倉，JR 橫須賀線 鎌倉→橫濱，みなとみらい線 橫濱→港未來',
          detail: '從御成站搭乘江之島電鐵返回鎌倉站，轉乘 JR 橫須賀線至橫濱站，再轉乘 みなとみらい線至港未來站，欣賞海港夜景與橫濱摩天輪',
          cost: 'JR+江之電 ~¥800 / 人',
          day: 3
        },
        {
          name: '中華街',
          code: 'Chinatown',
          lat: 35.4437,
          lng: 139.6440,
          type: 'restaurant',
          arriveTime: '18:00',
          departTime: '21:00',
          transport: '步行 / みなとみらい線',
          detail: '橫濱中華街晚餐 17:30，點選正宗廣東料理或上海小籠包',
          cost: '¥5,000-8,000 / 人',
          day: 3
        },
        {
          name: '和ごころ日暮里',
          code: 'Wagokoro',
          lat: 35.7265,
          lng: 139.7730,
          type: 'hotel',
          arriveTime: '22:00',
          departTime: '',
          transport: 'JR 京濱東北線 / 山手線',
          detail: '中華街 → 日暮里站 → 步行返回旅館',
          cost: '~¥1,000 / 人（JR+地鐵）',
          day: 3
        }
      ]
    },
    {
      id: 4,
      date: '12/05 (六)',
      theme: '東京市區深度遊',
      weather: '晴 10-16°C',
      stations: [
        {
          name: '豪德寺',
          code: 'Gotokuji',
          lat: 35.6566,
          lng: 139.6481,
          type: 'temple',
          arriveTime: '09:00',
          departTime: '10:00',
          transport: 'JR 山手線→小田急小田原線 各站停車',
          detail: 'JR 山手線 日暮里→新宿，轉小田急線各站停車至豪德寺站（快速/急行不停靠豪德寺）',
          cost: '~¥400 / 人',
          day: 4
        },
        {
          name: '小網神社',
          code: 'Komainami',
          lat: 35.6892,
          lng: 139.7737,
          type: 'shrine',
          arriveTime: '10:30',
          departTime: '11:30',
          transport: '小田急線→JR 山手線→步行（人形町 日比谷線／淺草線）',
          detail: '從豪德寺站搭乘小田急線各站停車至新宿站，轉乘 JR 山手線至有樂町站，步行約 15–20 分鐘至小網神社',
          cost: '免費 / 洗錢儀式 ¥100',
          day: 4
        },
        {
          name: '東京站',
          code: 'TokyoSta',
          lat: 35.6812,
          lng: 139.7671,
          type: 'station',
          arriveTime: '12:00',
          departTime: '13:30',
          transport: '地鐵日比谷線 / 步行',
          detail: '從人形町站搭乘 東京メトロ日比谷線至東京站，紅磚車站建築拍照，丸之內地下街',
          cost: '地鐵 ¥200 / 人',
          day: 4
        },
        {
          name: '叙々苑 銀座コリドー店',
          code: 'Jojoen',
          lat: 35.6712,
          lng: 139.7620,
          type: 'restaurant',
          arriveTime: '13:30',
          departTime: '15:30',
          transport: '地鐵銀座站 / 東銀座站',
          detail: '午間燒肉套餐（週六請確認店內午餐供應），CP值高，避免晚餐高價時段',
          cost: '午餐 約 ¥3,500-4,000 / 人',
          day: 4
        },
        {
          name: '丸之內步行',
          code: 'Marunouchi',
          lat: 35.6758,
          lng: 139.7630,
          type: 'location',
          arriveTime: '15:30',
          departTime: '15:30',
          transport: '步行',
          detail: '東京站周邊丸之內地區散步',
          cost: '免費',
          day: 4
        },
        {
          name: '銀座通',
          code: 'GinzaDori',
          lat: 35.6712,
          lng: 139.7620,
          type: 'shopping',
          arriveTime: '17:00',
          departTime: '17:00',
          transport: '地鐵銀座線',
          detail: '銀座通步行，精品櫥窗拍照',
          cost: '地鐵 ¥170 / 人',
          day: 4
        },
        {
          name: '東京鐵塔',
          code: 'TokyoTower',
          lat: 35.6586,
          lng: 139.7454,
          type: 'location',
          arriveTime: '18:30',
          departTime: '20:00',
          transport: '地鐵日比谷線 神谷町站',
          detail: '東京象徵性地標觀景台，夜景拍照，欣賞都市全景',
          cost: '大觀景台 ¥1,500 / 人（2026 年官方票價）',
          day: 4
        },
        {
          name: '銀座晚餐',
          code: 'GinzaDinner',
          lat: 35.6712,
          lng: 139.7620,
          type: 'restaurant',
          arriveTime: '20:00',
          departTime: '20:00',
          transport: '地鐵 / 步行',
          detail: '銀座地區晚餐，推薦銀座牛排或壽司',
          cost: '約 ¥8,000-15,000 / 人',
          day: 4
        },
        {
          name: '和ごころ日暮里',
          code: 'Wagokoro',
          lat: 35.7265,
          lng: 139.7730,
          type: 'hotel',
          arriveTime: '22:45',
          departTime: '',
          transport: '地鐵銀座線 / 日比谷線 → JR 山手線',
          detail: '銀座 → 日暮里站 → 步行返回旅館',
          cost: '~¥300 / 人（地鐵+JR）',
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
          departTime: '10:10',
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
          departTime: '15:30',
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
          arriveTime: '15:40',
          departTime: '17:00',
          transport: 'JR 山手線 2 站（經大塚）',
          detail: '巢鴨地藏通り商店街，品嚐銅鑼燒與傳統和菓子',
          cost: '¥500-1,000 / 人',
          day: 5
        },
        {
          name: '巢鴨 → 池袋',
          code: 'SugamoReturn',
          lat: 35.7292,
          lng: 139.7102,
          type: 'transport',
          arriveTime: '17:05',
          departTime: '17:00',
          transport: 'JR 山手線 2 站（返回，經大塚）',
          detail: '從巢鴨站搭乘 JR 山手線返回池袋站，2 站經大塚，約 5 分鐘',
          cost: '~¥170 / 人',
          day: 5
        },
        {
          name: '池袋 → 成田機場',
          code: 'Skyliner',
          lat: 35.7646,
          lng: 140.3864,
          type: 'transport',
          arriveTime: '18:50',
          departTime: '17:10',
          transport: 'JR 山手線 + Skyliner',
          detail: '17:10 從池袋站出發，搭乘 JR 至日暮里，轉乘 Skyliner 前往成田機場，19:55 飛往桃園（23:10 抵達）',
          cost: '~¥3,000 / 人',
          day: 5
        },
        {
          name: '成田機場',
          code: 'NRT',
          lat: 35.7646,
          lng: 140.3864,
          type: 'airport',
          arriveTime: '',
          departTime: '19:55',
          transport: '國際航班 → 桃園 (TPE)',
          detail: '19:55 從成田機場起飛，23:10 抵達桃園機場',
          cost: '機票含機票總價',
          day: 5
        }
      ]
    }
  ];

  // ============================================================
  // 資料結構規範（AX / DX）與驗證
  // 每個 station 必須包含：name, code, lat, lng, type, transport, detail, day
  // 可選：arriveTime, departTime, cost
  // ============================================================
  const STATION_TYPES = [
    'airport', 'hotel', 'transport', 'location', 'shrine',
    'station', 'shopping', 'temple', 'restaurant', 'food'
  ];

  function validateItinerary(data) {
    const errors = [];
    const warnings = [];

    if (!Array.isArray(data)) {
      errors.push('itinerary 必須是陣列');
      return { errors, warnings };
    }

    data.forEach((day, dayIdx) => {
      const dayNum = dayIdx + 1;

      if (!day.id || typeof day.id !== 'number') {
        errors.push(`Day ${dayNum}: 缺少 id 欄位`);
      }
      if (!day.date) {
        errors.push(`Day ${dayNum}: 缺少 date 欄位`);
      }
      if (!day.theme) {
        errors.push(`Day ${dayNum}: 缺少 theme 欄位`);
      }
      if (!day.weather) {
        warnings.push(`Day ${dayNum}: 建議補充 weather 欄位`);
      }

      if (!Array.isArray(day.stations)) {
        errors.push(`Day ${dayNum}: stations 必須是陣列`);
        return;
      }

      day.stations.forEach((station, stationIdx) => {
        const stationLabel = `Day ${dayNum} 站點 ${stationIdx + 1}`;

        if (!station.name) {
          errors.push(`${stationLabel}: 缺少 name 欄位`);
        }
        if (!station.code) {
          warnings.push(`${stationLabel}: 建議補充 code 欄位`);
        }
        if (typeof station.lat !== 'number' || typeof station.lng !== 'number') {
          errors.push(`${stationLabel}: lat/lng 必須是數字`);
        }
        if (!STATION_TYPES.includes(station.type)) {
          warnings.push(`${stationLabel}: type "${station.type}" 不在規範內 ${STATION_TYPES.join(', ')}`);
        }
        if (!station.transport) {
          warnings.push(`${stationLabel}: 建議補充 transport 欄位`);
        }
        if (!station.detail) {
          warnings.push(`${stationLabel}: 建議補充 detail 欄位`);
        }
        if (!station.day) {
          station.day = day.id;
        }
      });
    });

    return { errors, warnings };
  }

  // 執行驗證（開發時可見，生產環境靜默）
  const validation = validateItinerary(itinerary);
  if (validation.errors.length > 0) {
    console.error('[Itinerary 驗證失敗]', validation.errors);
  }
  if (validation.warnings.length > 0) {
    console.warn('[Itinerary 警告]', validation.warnings);
  }

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
          html += `\n            <tr data-day="${day.id}">
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

    // 自動將所有 schedule-table 包入 .table-wrap，支援行動裝置橫向滾動
    document.querySelectorAll('table.schedule-table').forEach(table => {
      if (!table.parentElement.classList.contains('table-wrap')) {
        const wrap = document.createElement('div');
        wrap.className = 'table-wrap';
        table.parentNode.insertBefore(wrap, table);
        wrap.appendChild(table);
      }
    });
  }

  // ============================================================
  // 當天切換邏輯
  // ============================================================
  function activateDay(dayNum) {
    // 派發狀態機變更事件（AX / DX：讓外部監聽器可響應日程切換）
    const event = new CustomEvent('daychange', {
      detail: { dayNum, day: itinerary.find(d => d.id === dayNum) },
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);

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

    function updateToggle(isDark) {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.querySelector('.sun').style.display = 'none';
        toggle.querySelector('.moon').style.display = 'inline';
        toggle.setAttribute('aria-pressed', 'true');
        toggle.setAttribute('aria-label', '切換至淺色主題');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        toggle.querySelector('.sun').style.display = 'inline';
        toggle.querySelector('.moon').style.display = 'none';
        toggle.setAttribute('aria-pressed', 'false');
        toggle.setAttribute('aria-label', '切換至深色主題');
        localStorage.setItem('theme', 'light');
      }
    }

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }

    toggle.addEventListener('click', function() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      updateToggle(!isDark);
    });

    // 鍵盤 Enter/Space 支援
    toggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        updateToggle(!isDark);
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
    document.documentElement.classList.remove('no-js');

    const modules = [
      { name: 'Timeline', fn: initTimeline },
      { name: 'Map', fn: initMap },
      { name: 'DayCards', fn: initDayCards },
      { name: 'TransportTable', fn: initTransportTable },
      { name: 'ThemeToggle', fn: initThemeToggle },
      { name: 'Animations', fn: initAnimations }
    ];

    modules.forEach(({ name, fn }) => {
      try {
        fn();
      } catch (err) {
        console.error(`[Itinerary] 初始化失敗：${name}`, err);
      }
    });

    activateDay(1); // 預設顯示第 1 天
  }

  init();
});