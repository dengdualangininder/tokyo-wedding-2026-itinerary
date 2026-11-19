/* ==========================================================================
   東京婚紗之旅 2026 — 單一資料來源 (Single Source of Truth)
   --------------------------------------------------------------------------
   這個檔案是「整個網站唯一的行程資料」。
   要改行程 / 改導覽，只需要改這裡，其他頁面會自動同步。
   不要在其他 HTML 或 JS 裡重複寫行程資料。
   ========================================================================== */

window.ITINERARY = [
  {
    "id": 1,
    "date": "12/02 (三)",
    "theme": "抵達・婚紗試穿",
    "weather": "晴 12-18°C",
    "stations": [
      {
        "name": "成田機場",
        "code": "NRT",
        "lat": 35.7646,
        "lng": 140.3864,
        "type": "airport",
        "arriveTime": "06:35",
        "departTime": "02:30",
        "transport": "國際航班 TPE → NRT (桃園 02:30 → 成田 06:35)",
        "detail": "早上6點35分抵達成田機場，入境後領取行李",
        "cost": "機票含機票總價",
        "day": 1
      },
      {
        "name": "日暮里站",
        "code": "Skyliner",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "transport",
        "arriveTime": "08:15",
        "departTime": "07:30",
        "transport": "Skyliner 快速電車",
        "detail": "從成田機場第 3 航廈搭乘 Skyliner 至日暮里站，約 36 分鐘，無需轉乘",
        "cost": "¥2,580 / 人",
        "day": 1
      },
      {
        "name": "和ごころ日暮里（放行李）",
        "code": "WagokoroDrop",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "hotel",
        "arriveTime": "08:30",
        "departTime": "08:50",
        "transport": "從日暮里站步行約 8 分鐘",
        "detail": "先將行李寄放在旅館，輕裝出發前往豪德寺買招福貓",
        "cost": "住宿已預訂",
        "day": 1
      },
      {
        "name": "豪德寺",
        "code": "Goutokuji",
        "lat": 35.6566,
        "lng": 139.6481,
        "type": "temple",
        "arriveTime": "09:30",
        "departTime": "10:20",
        "transport": "JR 山手線 日暮里→新宿，轉小田急小田原線 各站停車 新宿→豪德寺站（約 40 分鐘）",
        "detail": "招財貓發源地，招福殿、三重塔、井伊家墓所。寺務所 8:00-15:00 受理御守與御朱印，招福貓數量有限，建議優先前往購買",
        "cost": "免費（招福貓另計）",
        "day": 1
      },
      {
        "name": "新宿逛逛🛍️☕",
        "code": "ShinjukuWalk",
        "lat": 35.6896,
        "lng": 139.7006,
        "type": "shopping",
        "arriveTime": "10:40",
        "departTime": "12:50",
        "transport": "從豪德寺站搭乘小田急線 各站停車 回新宿站，步行至新宿三丁目/歌舞伎町",
        "detail": "新宿伊勢丹、小田急百貨、高島屋，新宿御苑外圍，年輕輕鬆街區。參考 Threads 美食地圖（@hck819 Part 1）：新宿地區甜點/咖啡廳，適合午茶與伴手禮",
        "cost": "自由消費",
        "day": 1
      },
      {
        "name": "人形町今半 壽喜燒午餐🥘",
        "code": "ImahanSukiyaki",
        "lat": 35.6896,
        "lng": 139.7006,
        "type": "restaurant",
        "arriveTime": "13:00",
        "departTime": "13:50",
        "transport": "從新宿站步行至新宿第一生命大樓",
        "detail": "人形町今半 新宿第一生命大樓店（百年壽喜燒老店，Google 地圖百名店）。【午餐限定】旬彩壽喜燒套餐：特上 80g ¥11,550 / 綜合拼盤 ¥13,310（12/30 前期間限定）。商業午餐，非吃到飽，建議提前訂位。",
        "cost": "約 ¥11,550-13,310 / 人",
        "day": 1
      },
      {
        "name": "セントレービル婚紗店（試婚紗）⚠️ 待確認",
        "code": "BridalTryOn",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "activity",
        "arriveTime": "14:00",
        "departTime": "16:00",
        "transport": "從新宿站搭乘 JR 山手線 至 日暮里站，步行至婚紗店",
        "detail": "下午試婚紗，預約婚紗店試穿。⚠️ セントレービル婚紗店尚無法於公開資料確認，請於出發前查證實際存在的婚紗店並預約試穿",
        "cost": "未確認",
        "day": 1
      },
      {
        "name": "秋葉原附近逛🎮（彈性）",
        "code": "Akihabara",
        "lat": 35.6995,
        "lng": 139.7716,
        "type": "shopping",
        "arriveTime": "16:30",
        "departTime": "18:30",
        "transport": "從日暮里站搭乘 JR 山手線 至 秋葉原站（約 15 分鐘）",
        "detail": "電氣街、動漫周邊、電玩店，夜晚霓虹燈景點，視體力與時間決定是否前往",
        "cost": "自由消費",
        "day": 1
      },
      {
        "name": "饗くろ喜 拉麵🍜",
        "code": "Akakuroki",
        "lat": 35.6995,
        "lng": 139.7716,
        "type": "restaurant",
        "arriveTime": "19:00",
        "departTime": "20:00",
        "transport": "從秋葉原站步行至拉麵店",
        "detail": "Threads 美食地圖（@hck819 Part 1）拉麵百名店。秋葉原車站附近，試完婚紗後直接前往，不需額外移動",
        "cost": "約 ¥1,000-1,500 / 人",
        "day": 1
      },
      {
        "name": "和ごころ日暮里",
        "code": "WagokoroNight",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "hotel",
        "arriveTime": "20:10",
        "departTime": "",
        "transport": "從秋葉原站搭乘 JR 山手線 至 日暮里站，步行返回旅館",
        "detail": "用餐完畢後返回旅館，準備就寢，為翌日 07:00 出發前往富士山婚紗攝影儲備體力",
        "cost": "免費（步行）",
        "day": 1
      }
    ],
    "nearby": [
      "<strong>谷中銀座商店街</strong> — 約 10:00-19:00（各店不同，週一部分店家休店）· 免費入場 · 懷舊昭和風情商店街，夕陽階梯打卡點",
      "<strong>根津神社</strong> — 境內全天可參拜（全年無休）· 境內免費；杜鵑花苑僅 4 月花祭期間開放 9:30-17:30，入苑費 ¥500-1,000（僅現金）· 千本鳥居與重要文化財社殿",
      "<strong>日暮里纖維街</strong> — 約 10:00-19:00（各店不同）· 免費 · 東京最大規模紡織品街，手工與縫紉愛好者聖地",
      "<strong>斎藤湯（錢湯）</strong> — 約 15:00-24:00（各店不同）· 約 ¥500 · 體驗東京懷舊錢湯文化",
      "<strong>谷根千散步</strong> — 全天可散步 · 免費 · 谷中·根津·千駄木老街，在地人最愛散步路線",
      "<strong>東京藝術大學</strong> — 全天可外觀 · 免費 · 藝術大學校園，建築與藝術氛圍",
      "<strong>守則寺</strong> — 約 9:00-16:00 · 免費 · 江戶六地藏尊之一，歷史悠久的寺院",
      "<strong>豪德寺</strong> — 境內 6:00-17:00，寺務所 8:00-15:00 · 免費（招福貓另計）· 招財貓發祥地，參拜並購買招財貓護身符 · 📍東京都世田谷區豪德寺2-24-7 · 📞03-3426-1437",
      "<strong>秋葉原電氣街🎮</strong> — 約 10:00-20:00（各店不同）· 免費入場 · 電氣街、動漫周邊、電玩店，夜晚霓虹燈景點 · 📍東京都千代田區外神田 · 📞最寄駅：JR 秋葉原駅／地鐵日比谷線 秋葉原駅"
    ]
  },
  {
    "id": 2,
    "date": "12/03 (四)",
    "theme": "富士山婚紗攝影",
    "weather": "晴 5-12°C",
    "stations": [
      {
        "name": "和ごころ日暮里",
        "code": "Wagokoro",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "hotel",
        "arriveTime": "07:00",
        "departTime": "07:00",
        "transport": "從旅館出發前往富士山",
        "detail": "清晨從旅館出發，前往富士山婚紗攝影場地，保暖衣物必備",
        "cost": "",
        "day": 2
      },
      {
        "name": "日暮里站",
        "code": "Nippori",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "transport",
        "arriveTime": "",
        "departTime": "07:15",
        "transport": "JR 山手線內環線",
        "detail": "日暮里 → 新宿，約 25 分鐘，無需轉乘",
        "cost": "¥210 / 人",
        "day": 2
      },
      {
        "name": "新宿站",
        "code": "Shinjuku",
        "lat": 35.6896,
        "lng": 139.7006,
        "type": "transport",
        "arriveTime": "",
        "departTime": "07:45",
        "transport": "JR 中央線 + 富士急行線",
        "detail": "新宿 → 大月 → 河口湖，約 1 小時 55 分鐘",
        "cost": "約 ¥2,250 / 人",
        "day": 2
      },
      {
        "name": "河口湖 / 精華湖",
        "code": "Kawaguchiko",
        "lat": 35.5149,
        "lng": 138.753,
        "type": "location",
        "arriveTime": "09:40",
        "departTime": "17:00",
        "transport": "電巴士 / 租車",
        "detail": "富士山婚紗攝影全天，河口湖或精華湖取景，富士山為背景拍攝婚紗照",
        "cost": "¥10,000-20,000 / 人（電巴士）",
        "day": 2
      },
      {
        "name": "和ごころ日暮里",
        "code": "WagokoroReturn",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "transport",
        "arriveTime": "20:00",
        "departTime": "20:10",
        "transport": "電巴士返回東京",
        "detail": "攝影結束後返回日暮里站，約 20:00 抵達",
        "cost": "包含在電巴士費用",
        "day": 2
      },
      {
        "name": "セントレービル婚紗店（拷貝資料）",
        "code": "BridalCopy",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "activity",
        "arriveTime": "20:10",
        "departTime": "21:00",
        "transport": "從日暮里站步行至婚紗店",
        "detail": "拍完婚紗後回婚紗店，用 USB 扣取攝影資料並確認檔案完整性，預約下階段試穿或後製進度",
        "cost": "未確認",
        "day": 2
      },
      {
        "name": "Kama Maru 居酒屋晚餐🍻",
        "code": "KamaMaru",
        "lat": 35.7272,
        "lng": 139.772,
        "type": "restaurant",
        "arriveTime": "21:10",
        "departTime": "22:30",
        "transport": "從婚紗店步行至日暮里站前餐廳（約 2 分鐘）",
        "detail": "拷完資料後在日暮里站前 Kama Maru 居酒屋吃晚餐，補充體力。日暮里站步行 2 分鐘，可於 KKday 線上預約座位，約 ¥3,000-3,999 / 人",
        "cost": "約 ¥3,000-3,999 / 人",
        "day": 2
      },
      {
        "name": "和ごころ日暮里",
        "code": "WagokoroNight",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "hotel",
        "arriveTime": "22:40",
        "departTime": "",
        "transport": "從餐廳步行返回旅館",
        "detail": "用餐完畢後返回旅館，準備就寢，為翌日東京市區遊做準備",
        "cost": "免費（步行）",
        "day": 2
      }
    ],
    "nearby": [
      "<strong>Kama Maru 居酒屋</strong> — 約 17:00-23:30 · 居酒屋 · 日暮里站步行 2 分鐘，可於 KKday 線上預約座位",
      "<strong>酒処 一合 西日暮里店</strong> — 約 15:00-23:30 · 居酒屋 · 日本酒、燒酎、雞尾酒，西日暮里站步行 1 分鐘",
      "<strong>酔助 日暮里店</strong> — 約 12:00-23:30（週六日）· 全席個室居酒屋 · 鮮魚與大眾料理，日暮里站南口步行 1 分鐘",
      "<strong>谷中銀座商店街</strong> — 約 10:00-19:00 · 免費入場 · 懷舊昭和風情商店街，夕陽階梯打卡點",
      "<strong>根津神社</strong> — 境內全天可參拜（全年無休）· 境內免費；杜鵑花苑僅 4 月花祭期間開放 9:30-17:30，入苑費 ¥500-1,000（僅現金）",
      "<strong>日暮里纖維街</strong> — 約 10:00-19:00 · 免費 · 東京最大規模紡織品街，手工與縫紉愛好者聖地",
      "<strong>斎藤湯（錢湯）</strong> — 約 15:00-24:00 · 約 ¥500 · 體驗東京懷舊錢湯文化",
      "<strong>谷根千散步</strong> — 全天可散步 · 免費 · 谷中·根津·千駄木老街，在地人最愛散步路線",
      "<strong>東京藝術大學</strong> — 全天可外觀 · 免費 · 藝術大學校園，建築與藝術氛圍",
      "<strong>守則寺</strong> — 約 9:00-16:00 · 免費 · 江戶六地藏尊之一，歷史悠久的寺院"
    ]
  },
  {
    "date": "12/04 (五)",
    "theme": "鎌倉・橫濱",
    "weather": "晴 10-15°C",
    "stations": [
      {
        "name": "日暮里 → 鎌倉",
        "code": "JR",
        "lat": 35.3176,
        "lng": 139.4596,
        "type": "transport",
        "arriveTime": "09:20",
        "departTime": "08:15",
        "transport": "JR 常磐線快速「上野東京ライン」直達鎌倉（或 山手線→品川→橫須賀線）",
        "detail": "從日暮里站搭乘 JR 常磐線快速「上野東京ライン」直達鎌倉站，約 1 小時（部份班次於大船站轉橫須賀線）；或 JR 山手線至品川轉橫須賀線，約 1 小時 15 分",
        "cost": "~¥1,000 / 人",
        "day": 3
      },
      {
        "name": "鶴岡八幡宮",
        "code": "Tsurugaoka",
        "lat": 35.3274,
        "lng": 139.5395,
        "type": "shrine",
        "arriveTime": "10:00",
        "departTime": "11:30",
        "transport": "從鎌倉站步行 10 分鐘",
        "detail": "鎌倉最重要的神社，參拜並祈求婚姻美滿，年輕情侶熱門拍照點",
        "cost": "免費",
        "day": 3
      },
      {
        "name": "小町通しらす丼午餐🍚",
        "code": "KomachiShirasu",
        "lat": 35.3189,
        "lng": 139.5355,
        "type": "restaurant",
        "arriveTime": "12:00",
        "departTime": "13:30",
        "transport": "步行",
        "detail": "鎌倉小町通美食街，品嚐江之島名物しらす丼（吻仔魚飯），推薦 Wasai Yakura Komachidori（約 ¥1,430 / 人），同時購買鎌倉名物伴手禮",
        "cost": "約 ¥1,430 / 人",
        "day": 3
      },
      {
        "name": "御成站",
        "code": "Onari",
        "lat": 35.3167,
        "lng": 139.543,
        "type": "transport",
        "arriveTime": "13:50",
        "departTime": "",
        "transport": "江之島電鐵 鎌倉→御成",
        "detail": "從鎌倉站搭乘江之島電鐵至御成站，約 2 分鐘（御成站為江之電車站，並非 JR 車站）",
        "cost": "¥200 / 人（江之電）",
        "day": 3
      },
      {
        "name": "港未來",
        "code": "MinatoMirai",
        "lat": 35.4565,
        "lng": 139.635,
        "type": "location",
        "arriveTime": "14:40",
        "departTime": "17:00",
        "transport": "江之島電鐵 御成→鎌倉，JR 橫須賀線 鎌倉→橫濱，みなとみらい線 橫濱→港未來",
        "detail": "從御成站搭乘江之島電鐵返回鎌倉站，轉乘 JR 橫須賀線至橫濱站，再轉乘 みなとみらい線至港未來站，欣賞海港夜景與橫濱摩天輪",
        "cost": "JR+江之電 ~¥800 / 人",
        "day": 3
      },
      {
        "name": "赤レンガ倉庫聖誕市集🎄",
        "code": "AkarengaXmas",
        "lat": 35.4437,
        "lng": 139.6398,
        "type": "location",
        "arriveTime": "17:10",
        "departTime": "18:20",
        "transport": "從港未來站步行約 10-15 分鐘",
        "detail": "橫濱赤レンガ倉庫 Christmas Market 2026，逛免費區「Christmas Village」寶可夢燈飾與聖誕市集外圍（主會場門票 ¥500 起）",
        "cost": "免費區免費；主會場 ¥500 起",
        "day": 3
      },
      {
        "name": "中華街",
        "code": "Chinatown",
        "lat": 35.4437,
        "lng": 139.644,
        "type": "restaurant",
        "arriveTime": "18:50",
        "departTime": "21:00",
        "transport": "步行 / みなとみらい線",
        "detail": "橫濱中華街晚餐（原 18:00 順延 50 分鐘），點選正宗廣東料理或上海小籠包",
        "cost": "¥5,000-8,000 / 人",
        "day": 3
      },
      {
        "name": "和ごころ日暮里",
        "code": "Wagokoro",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "hotel",
        "arriveTime": "22:00",
        "departTime": "",
        "transport": "JR 京濱東北線 / 山手線",
        "detail": "中華街 → 日暮里站 → 步行返回旅館",
        "cost": "~¥1,000 / 人（JR+地鐵）",
        "day": 3
      }
    ],
    "id": 3,
    "nearby": [
      "<strong>明月院</strong> — 9:00-16:00（6月 8:30開門）· 高校生以上 ¥500 · 繡球花寺，參道兩旁約2500株繡球花（北鎌倉，建議先訪）",
      "<strong>鶴岡八幡宮</strong> — 境內 6:00-20:00，社務所 9:00-16:30 · 免費 · 鎌倉最重要的神社，參拜並祈求婚姻美滿（鎌倉站東側） · 📍神奈川県鎌倉市雪ノ下2-1-31 · 📞0467-22-0315 · hachimangu.or.jp",
      "<strong>鎌倉大佛（高德院）</strong> — 8:00-17:00（10-3月 至 17:00、4-9月 至 17:30）· ¥300（大人）· 日本第二高青銅佛像，高11.3公尺國寶（長谷地區） · 📍神奈川県鎌倉市長谷4-2-28 · 📞0467-22-0815 · kotoku-in.jp",
      "<strong>長谷寺</strong> — 10–2 月 8:00–16:30（閉山 17:00）、3–9 月 8:00–17:00（閉山 17:30）· 拝観料 ¥400（大人）· 觀音像與由比濱海景，江之電長谷站步行 5 分鐘（長谷地區；12 月適用冬季時間） · 📍神奈川県鎌倉市長谷3-11-2 · 📞0467-22-6300 · hasedera.jp",
      "<strong>灌籃高手平交道（鎌倉高校前）</strong> — 全天可拍照 · 免費 · 因動漫爆紅的拍照打卡點（鎌倉高校前，西南端）",
      "<strong>江之島（えのしま）</strong> — 全天可散步 · 免費入場 · 江之島電鐵江之島站下車，相模灣海景、江之島神社、吻仔魚美食 · 📍神奈川県藤沢市江の島",
      "<strong>橫濱中華街</strong> — 約 11:00-21:00（各店不同）· 免費入場 · 日本最大唐人街，正宗廣東料理與上海小籠包",
      "<strong>港未來・橫濱摩天輪</strong> — 約 10:00-21:00 · 摩天輪 ¥900/人 · 橫濱海港夜景，海濱散步",
      "<strong>湘南單軌電車（大船站 ↔ 湘南江之島站）</strong> — 約 7:00-21:00 · 大人 ¥220／小人 ¥110 · 日本少見懸掛式單軌電車，車窗視野開闊，適合體驗不同交通工具 · Day 3 主程已使用：江之島 → 湘南江之島站 → 大船站，轉 JR 前往橫濱 · 📍神奈川県鎌倉市 · shonan-monorail.co.jp",
      "<strong>ESPRESSO D WORKS Yellow 七里濱店 🍳</strong> — 鎌倉超人氣蛋包飯店，七里濱海邊分店，有海景，相傳不用排隊 · 江之電「七里ヶ浜駅」步行約 5-10 分鐘，或「鎌倉高校前站」步行 · 📍神奈川県鎌倉市七里ガ浜東 · Tabelog 評分頁面：s.tabelog.com/en/kanagawa/A1404/A140402/14085569/",
      "<strong>七里ヶ浜海岸（七里濱海岸）🌊</strong> — 全天開放 · 免費入場 · 江之電「七里ヶ浜駅」步行約 2-3 分鐘，眺望江之島與相模灣，冬季晴天可見富士山 · 日本渚百選，適合短暫看海散步，不適合海水浴 · 📍神奈川県鎌倉市七里ガ浜東2-1 周邊"
    ]
  },
  {
    "id": 4,
    "date": "12/05 (六)",
    "theme": "東京市區深度遊",
    "weather": "晴 10-16°C",
    "stations": [
      {
        "name": "小網神社",
        "code": "Komainami",
        "lat": 35.6892,
        "lng": 139.7737,
        "type": "shrine",
        "arriveTime": "09:00",
        "departTime": "10:30",
        "transport": "JR 山手線 日暮里→上野，轉地鐵日比谷線 上野→人形町（約 20 分鐘）",
        "detail": "強運厄除、洗錢儀式（錢幣清洗祈福），社務所 09:00-17:00 受理御守與御朱印。建議早上先到，避開人潮。",
        "cost": "免費 / 洗錢儀式 ¥100",
        "day": 4
      },
      {
        "name": "人形町／日本橋下町散步",
        "code": "Ningyocho",
        "lat": 35.686,
        "lng": 139.776,
        "type": "location",
        "arriveTime": "10:40",
        "departTime": "11:40",
        "transport": "從小網神社步行",
        "detail": "甘酒橫丁、人形町からくり櫓（每正時 11:00-19:00 演出）、日本橋五街道起點，下町懷舊氛圍",
        "cost": "免費",
        "day": 4
      },
      {
        "name": "東京站",
        "code": "TokyoSta",
        "lat": 35.6812,
        "lng": 139.7671,
        "type": "station",
        "arriveTime": "12:00",
        "departTime": "13:20",
        "transport": "從人形町站搭乘 東京メトロ日比谷線至東京站，紅磚車站建築拍照，丸之內地下街",
        "detail": "東京車站紅磚站房與丸之內地下街，午間逛街與拍照留念",
        "cost": "地鐵 ¥200 / 人",
        "day": 4
      },
      {
        "name": "東京站·丸之內仲通🎄",
        "code": "MarunouchiXmas",
        "lat": 35.6758,
        "lng": 139.763,
        "type": "location",
        "arriveTime": "12:00",
        "departTime": "13:10",
        "transport": "從人形町站搭乘 東京メトロ日比谷線至東京站，丸之內南口出口步行約 5 分鐘",
        "detail": "1.2 公里的丸之內仲通，200 多棵樹全是香檳金燈飾，正對紅磚車站隨手拍都是大片。聖誕燈飾點亮至晚上。免費入場。",
        "cost": "免費入場",
        "day": 4
      },
      {
        "name": "叙々苑 銀座コリドー店",
        "code": "Jojoen",
        "lat": 35.6712,
        "lng": 139.762,
        "type": "restaurant",
        "arriveTime": "13:30",
        "departTime": "15:20",
        "transport": "地鐵銀座站 / 東銀座站",
        "detail": "午間燒肉套餐（週六請確認店內午餐供應），CP值高，避免晚餐高價時段",
        "cost": "午餐 約 ¥3,500-4,000 / 人",
        "day": 4
      },
      {
        "name": "東京鐵塔",
        "code": "TokyoTower",
        "lat": 35.6586,
        "lng": 139.7454,
        "type": "location",
        "arriveTime": "15:40",
        "departTime": "17:10",
        "transport": "從銀座站搭乘 地鐵日比谷線 至 神谷町站，步行約 5 分鐘",
        "detail": "東京象徵性地標觀景台，看日落→夜景轉換，欣賞都市全景，觀景台咖啡廳可坐下休息",
        "cost": "大觀景台 ¥1,500 / 人（2026 年官方票價）",
        "day": 4
      },
      {
        "name": "台場彩虹煙火🎆（彈性，雨天取消）",
        "code": "OdaibaFireworks",
        "lat": 35.6257,
        "lng": 139.772,
        "type": "food",
        "arriveTime": "17:50",
        "departTime": "19:10",
        "transport": "東京鐵塔 → 乘車前往台場（約 30-40 分鐘），視天氣與體力決定是否前往",
        "detail": "2026年12月5日（六）19:00 打上約 5 分鐘，約 1,300 發煙火，免費觀賞。雨天取消。如不順可跳過此站，直接前往銀座晚餐。",
        "cost": "免費觀賞",
        "day": 4
      },
      {
        "name": "銀座晚餐🍣🥩 鮨屋のうおきん 銀座店",
        "code": "GinzaDinner",
        "lat": 35.6712,
        "lng": 139.762,
        "type": "restaurant",
        "arriveTime": "20:00",
        "departTime": "21:30",
        "transport": "從台場或東京鐵塔搭乘 計程車/地鐵 至銀座（約 30-40 分鐘），推薦銀座牛排或壽司，預約餐廳",
        "detail": "銀座地區晚餐🍣🥩，推薦魚金（鮨屋のうおきん）銀座店壽司或銀座牛排，預約餐廳",
        "cost": "約 ¥8,000-15,000 / 人",
        "day": 4
      },
      {
        "name": "和ごころ日暮里",
        "code": "Wagokoro",
        "lat": 35.7265,
        "lng": 139.773,
        "type": "hotel",
        "arriveTime": "22:10",
        "departTime": "",
        "transport": "從銀座站搭乘 地鐵銀座線 / 日比谷線 → JR 山手線 日暮里站，步行返回旅館",
        "detail": "銀座 → 日暮里站 → 步行返回旅館，結束第 4 天行程，末班車緩衝充足",
        "cost": "~¥300 / 人（地鐵+JR）",
        "day": 4
      }
    ],
    "nearby": [
      "<strong>小網神社</strong> — 境內 24小時可參拜，社務所 9:00-17:00 · 免費（洗錢儀式 ¥100）· 祈求姻緣美滿，體驗洗錢儀式 · 📍東京都中央区日本橋小網町16-23 · 📞03-3668-1080 · koamijinja.or.jp",
      "<strong>東京站紅磚車站</strong> — 全天可外觀拍照 · 免費 · 丸之內地下街購物與紅磚建築",
      "<strong>叙々苑 銀座コリドー店</strong> — 午餐 11:30-15:00（每日供應；土日祝亦營業至 22:00）· 約 ¥3,000-6,700/人（午餐套餐；口碑常見 ¥3,500-4,000）· 地址：東京都中央区銀座7-2 銀座コリドー2F · 📞03-6215-8989 · jojoen.co.jp · 12/05 為週六，適用土日祝營業",
      "<strong>丸之內散步</strong> — 全天可散步 · 免費 · 東京站周邊商業大樓建築與購物",
      "<strong>銀座通</strong> — 全天可步行 · 免費 · Chanel 精品櫥窗，銀座六丁目交叉路口，夜景拍照",
      "<strong>東京鐵塔</strong> — 9:00-23:00（22:30 停止入場）· 大觀景台 ¥1,500 / 人（2026 年官方票價）· 東京象徵性地標，夜景拍照聖地",
      "<strong>銀座牛排・壽司晚餐</strong> — 約 17:00-23:00 · 約 ¥8,000-15,000/人 · 建議提前預約餐廳",
      "<strong>台場彩虹煙火🎆 お台場レインボー花火</strong> — 2026年12月5日（六）19:00～約5分鐘 · 免費觀賞 · 約1,300發煙火，雨天取消 · 📍東京都港區台場 · 最寄駅：ゆりかもめ「お台場海浜公園」駅・「台場」駅"
    ]
  },
  {
    "id": 5,
    "date": "12/06 (日)",
    "theme": "返程採買",
    "weather": "晴 8-14°C",
    "stations": [
      {
        "name": "日暮里 → 池袋",
        "code": "Yamanote",
        "lat": 35.7292,
        "lng": 139.7102,
        "type": "transport",
        "arriveTime": "10:30",
        "departTime": "10:10",
        "transport": "JR 山手線",
        "detail": "從日暮里站搭乘 JR 山手線至池袋站，約 20 分鐘",
        "cost": "~¥200 / 人",
        "day": 5
      },
      {
        "name": "池袋購物",
        "code": "Ikebukuro",
        "lat": 35.7292,
        "lng": 139.7102,
        "type": "shopping",
        "arriveTime": "11:00",
        "departTime": "15:30",
        "transport": "步行",
        "detail": "池袋西武、PARCO、Sunshine City 購物，Onitsuka Tiger、GoPro、Chanel 等",
        "cost": "自由消費",
        "day": 5
      },
      {
        "name": "巢鴨銅鑼燒",
        "code": "Sugamo",
        "lat": 35.7358,
        "lng": 139.7314,
        "type": "food",
        "arriveTime": "15:40",
        "departTime": "16:20",
        "transport": "JR 山手線 2 站（經大塚）",
        "detail": "巢鴨地藏通り商店街，品嚐銅鑼燒與傳統和菓子",
        "cost": "¥500-1,000 / 人",
        "day": 5
      },
      {
        "name": "日暮里 → 成田機場",
        "code": "SkylinerReturn",
        "lat": 35.7646,
        "lng": 140.3864,
        "type": "transport",
        "arriveTime": "18:15",
        "departTime": "16:40",
        "transport": "JR 山手線 巢鴨→日暮里（約 5 分鐘），轉乘 Skyliner 快速電車 日暮里→成田機場（約 36 分鐘）",
        "detail": "從巢鴨站搭乘 JR 山手線至日暮里站，轉乘 Skyliner 前往成田機場，約 18:15 抵達，留足國際線值機緩衝",
        "cost": "~¥3,000 / 人",
        "day": 5
      },
      {
        "name": "成田機場",
        "code": "NRT",
        "lat": 35.7646,
        "lng": 140.3864,
        "type": "airport",
        "arriveTime": "",
        "departTime": "19:55",
        "transport": "國際航班 → 桃園 (TPE)",
        "detail": "18:15 抵達成田機場，約 95 分鐘值機緩衝，19:55 起飛，23:10 抵達桃園機場",
        "cost": "機票含機票總價",
        "day": 5
      }
    ],
    "nearby": [
      "<strong>池袋陽光60瞭望台 TENBOU-PARK</strong> — 11:00-21:00（最後入場 20:30）· 平日大人 ¥700／土日祝 ¥900／最繁忙期 ¥1,200 · 東京市區全景觀景台",
      "<strong>池袋西武·PARCO·Sunshine City</strong> — 約 10:00-21:00 · 免費入場 · 購物與 Onitsuka Tiger、GoPro 旗艦店",
      "<strong>巢鴨地藏通商店街</strong> — 各店約 10:00-18:00 · 免費入場 · 「老奶奶的原宿」，約780公尺懷舊商店街",
      "<strong>高岩寺</strong> — 約 6:00-17:00 · 免費參拜 · 拔刺地藏與洗觀音，求身體健康",
      "<strong>六義園</strong> — 9:00-17:00 · ¥300（大人）· 日式回游式庭園，垂枝櫻與紅葉名所（12/29-1/1 休園，行程不受影響） · 📍東京都文京区本駒込6-16-3 · 📞03-3941-2222 · tokyo-park.or.jp/park/rikugien/",
      "<strong>護國寺</strong> — 約 6:00-17:00 · 免費參拜 · 池袋附近歷史悠久的寺院，春季賞櫻名所",
      "<strong>池袋西武百貨屋頂遊樂場</strong> — 約 10:00-21:00 · 約 ¥800-1,200 · 屋頂遊樂場，適合親子與拍照"
    ]
  }
];

/* 導覽列項目（桌機 top-nav 與手機 bottom-nav 共用同一份） */
window.NAV = [
  {
    "href": "index.html",
    "label": "首頁",
    "icon": "home"
  },
  {
    "href": "itinerary.html",
    "label": "行程",
    "icon": "list"
  },
  {
    "href": "map.html",
    "label": "地圖",
    "icon": "map"
  },
  {
    "href": "budget.html",
    "label": "預算",
    "icon": "budget"
  },
  {
    "href": "info.html",
    "label": "資訊",
    "icon": "info"
  }
];
