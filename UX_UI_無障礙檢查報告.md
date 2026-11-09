# 東京婚紗之旅 2026 — UX/UI 與無障礙設計檢查報告 (S2/5)

**檢查範圍**：`/home/ubuntu/tokyo-wedding-2026-itinerary/`
**檢查檔案**：`index.html`、`day1~day5.html`、`style.css`、`script.js`、`transport-guide.md`
**行程**：2026/12/02–12/06（5 天），住宿和ごころ日暮里
**檢查日期**：2026-11-06
**標準參照**：WCAG 2.1 AA（對比度正文 4.5:1 / 大字 3:1；觸控目標 ≥44×44px；鍵盤可操作；響應式；列印樣式）

---

## 1. 響應式設計（行動裝置瀏覽體驗）

### ✅ 已做好的項目
- 所有頁面皆有 `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">`
- `body` 使用 `env(safe-area-inset-*)` 做內邊距，符合刘海/瀏海裝置安全區
- 640px 斷點：時間軸縮小為 52×52px、間距 1rem；`station-item` 改為直向堆疊；`hero h1` 縮至 1.7rem；容器內邊距 12px；卡片內邊距減為 1.25rem
- 480px 斷點：主題切換按鈕位置與尺寸調整
- `station-item`、`nearby-list` 在手機上直向排列，閱讀順序合理
- 地圖開啟 `touchZoom: true`（可捏縮）、`scrollWheelZoom: false`（避免捲輪劫持）

### ❌ 需要修復的問題
| 問題 | 說明 | 位置 |
|------|------|------|
| 表格無橫向滾動容器 | `schedule-table` 最多 6 欄（路線／交通工具／班次／車程／費用／備註），在 390px 寬螢幕會被壓縮或溢出，內容難以閱讀 | `index.html` 與 各 day.html 交通詳情表 |
| 地圖高度固定 | `#map-container` 固定 380–420px，在手機上佔過多版面，推向內容下方 | 各 day.html 內聯樣式 |
| `body { overflow-x: hidden }` | 掩飾溢出而非從根本修正，可能隱藏真實佈局問題 | `style.css` line 64 |

### ⚠️ 建議改進項目
- 增加 320–375px 斷點（iPhone SE 等小螢幕）：目前 5 個時間軸點 × 52px + 4 個間距 ≈ 324px，幾乎佔滿 375px 螢幕，靠右會貼邊
- `day-link` 與 `back-btn` 上下內距僅 4–6px，點擊目標高度不足 44px，建議加大內距或改為整列可點擊
- 考慮在地圖區塊加入「展開地圖」按鈕，預設以較小高度顯示

---

## 2. 深色模式（Dark Mode）

### ✅ 已做好的項目
- `:root` 完整定義深色變數（`bg #121212`、`fg #e0e0e0`、`surface #1e1e1e`、`border #333333`、`muted #999999` 等）
- `prefers-color-scheme: dark` 自動跟隨系統；`data-theme="dark"` 手動切換並以 `localStorage` 記憶
- 主題切換按鈕有 `aria-label="切換亮/暗主題"`，太陽/月亮圖示隨主題切換顯示
- `.map-legend` 在深色模式下背景改為 `rgba(30,30,30,0.95)`
- Leaflet 容器在深色模式下背景設為 `#1e1e1e`
- 內聯樣式（footer、`#map-container`、Leaflet popup）皆改用 CSS 變數而非硬編碼顏色

### ❌ 需要修復的問題
| 問題 | 對比度 | 位置 |
|------|--------|------|
| `.tag` / `.day-badge` 白字 on 深色主色 `#ff6b8b` | 2.72:1（需 ≥4.5:1，小字） | `style.css` 深色變數 + `index.html`/day.html 徽章 |
|（同問題在光模式）白字 on `#d1495b` | 4.36:1（小字未達 4.5:1） | `.tag`、`day-badge` |

### ⚠️ 建議改進項目
- 主題切換按鈕缺少 `aria-pressed="true/false"`，螢幕朗讀器無法得知目前主題
- `<svg>` 圖示未加 `aria-hidden="true"`，可能被朗讀器嘗試解讀
- 缺少 `<meta name="color-scheme" content="light dark">`，讓瀏覽器原生表單與捲軸跟隨深色模式

---

## 3. 鍵盤導航

### ✅ 已做好的項目
- `.timeline-point` 設 `role="button"`、`tabindex="0"`，並監聽 `Enter` 與 `Space` 鍵啟動
- `aria-selected="true/false"` 動態更新，螢幕朗讀器可得知目前選中的天數
- `*:focus-visible` 設 2px 粗 `var(--accent)` 外框，聚焦狀態清楚可見
- 原生 `<button>` 與 `<a>` 天生可鍵盤聚焦，Tab 順序合理

### ❌ 需要修復的問題
- 無（未發現阻斷鍵盤導航的嚴重缺失）

### ⚠️ 建議改進項目
- 增加「跳過至主要內容」（Skip to content）連結，避免鍵盤使用者每頁都要 Tab 經過主題切換與標題區
- `activateDay()` 中 `card.scrollIntoView({behavior:'smooth'})` 未尊重 `prefers-reduced-motion`（CSS 已處理 `html`，JS 未處理）
- Leaflet 地圖標記與彈窗非鍵盤可操作（資料已重複於 HTML 站點列表，影響較小，可降優先）

---

## 4. 列印友善（@media print）

### ✅ 已做好的項目
- 無（未發現列印友善設計）

### ❌ 需要修復的問題
| 問題 | 說明 |
|------|------|
| 完全沒有 `@media print` | `style.css` 全檔 664 行不含任何列印媒體查詢 |
| 列印會包含主題切換按鈕 | `.theme-toggle` 是純互動元件，列印無意義 |
| 深色背景會被列印 | 深色模式下 `bg`/`surface` 會消耗墨盒且難讀 |
| Leaflet 地圖列印常為空白/灰框 | 地圖為即時圖磚，列印效果不可靠 |
| 動畫與卡片入場樣式 | 列印時不需要 fade-in 動畫 |

### ⚠️ 建議改進項目
補上 `@media print`：隱藏 `.theme-toggle`、`.map-wrapper`；背景改白、文字改黑；字體單位改為 `pt`；表格避免分頁斷行；移除動畫與陰影。

---

## 5. 語言一致性（繁體中文）

### ✅ 已做好的項目
- 所有頁面 `lang="zh-TW"`，字元編碼 `UTF-8`
- 程式掃描未偵測到簡體字（常見簡體字如 发/练/单/体/开/产/長/線/間/個/們等皆未出現）
- 日文專有名保留原文（セントレービル、和ごころ、京成 Skyliner、Suica/Pasmo），英文專有名詞正確（JR Pass、Leaflet、OpenStreetMap）

### ⚠️ 建議改進項目
- 用詞微小不一：`index.html` 與 `day4.html` 出現「招財貓／招福貓」兩種寫法；`day5.html` 行程寫「池袋→巢鴨 1 站」但 `transport-guide.md` 指出實際為 2 站（池袋→大塚→巢鴨）；`day4` 交通詳情與詳細行程的順序略有出入，建議對齊

---

## 6. ARIA 標籤與無障礙名稱

### ✅ 已做好的項目
- `.theme-toggle`：`aria-label="切換亮/暗主題"`
- `.timeline-point`：`aria-label="前往 ${date} - ${theme}"`，並動態設 `aria-selected`
- `<th>` 標題行已使用（雖欠缺 `scope`）
- 全站無 ``（圖示皆為 Emoji），故無 `alt` 需求；亦無表單，無表單標籤缺失

### ⚠️ 建議改進項目
| 問題 | 建議 |
|------|------|
| `<th>` 缺少 `scope="col"` | 補上，讓表頭與資料欄位關聯更明確 |
| `<svg>` 無 `aria-hidden="true"` | 加上，避免螢幕朗讀器嘗試解讀裝飾圖示 |
| `.back-btn` / `.day-link` 含 `←` / `→` 符號 | 補 `aria-label`（如「返回總覽」、「查看第 1 天詳情」） |
| Leaflet marker popup 無 ARIA | 地圖非鍵盤可及；資料已重複於 HTML，可標記地圖為裝飾性或提供文字替代方案 |

---

## 7. 色彩對比度（經 Python 計算，WCAG 2.1 AA）

### ❌ 不達標（需優先修復）
| 項目 | 前景 on 背景 | 對比度 | 要求 | 狀態 |
|------|-------------|--------|------|------|
| `.station-transport` | `#3498db` on `#f8f8f8` | 2.97:1 | ≥4.5:1 (小字) | ❌ 光模式失敗 |
| `.station-cost` | `#27ae60` on `#f8f8f8` | 2.71:1 | ≥4.5:1 (小字) | ❌ 光模式失敗 |
| `.tag` / `.day-badge` 白字 | `#fff` on `#d1495b` | 4.36:1 | ≥4.5:1 (小字) | ❌ 光模式未達 |
| `.day-card.active .day-badge` 白字 | `#fff` on `#3498db` | 3.15:1 | ≥4.5:1 (小字) | ❌ 光模式未達 |
| 連結文字 | `#d1495b` on `#fff` | 4.36:1 | ≥4.5:1 (正文大小) | ❌ 光模式未達 |
| `.tag` / `.day-badge` 白字（深色） | `#fff` on `#ff6b8b` | 2.72:1 | ≥4.5:1 (小字) | ❌ 暗色模式失敗 |

### ✅ 達標
- body 文字：17.40:1（光）/ 14.19:1（暗）
- `.muted` 對 `surface`：5.41:1（光）/ 5.85:1（暗）
- `.muted` 對 `bg`：5.74:1（光）/ 6.58:1（暗）
- `.station-success` 對 `surface`（暗色）：7.93:1
- 主色 `#ff6b8b` 對深色背景：6.89:1（大色塊，達 3:1）

> 結論：光模式下次要文字（transport/cost）與連結對比度不足；深色模式下主色做背景時白字對比度不足。建議將 `.station-transport` 改為深色、`#d1495b` 連結改為更深的紅（如 `#b33a4c`），徽章白字可改為更深的主色或加深背景。

---

## 8. 行動裝置觸控體驗

### ✅ 已做好的項目
- `.timeline-point` 手機版 52×52px、桌面版 64×64px，皆 ≥ WCAG 建議的 44×44px 觸控目標
- `station-item` 內距 0.75px，點擊區塊足夠
- 地圖 `touchZoom: true`，且未設 `user-scalable=no`（頁面可縮放）
- `viewport-fit=cover` 與安全區內距，符合刘海裝置

### ⚠️ 建議改進項目
- `.theme-toggle` 手機版（480px 媒體查詢）上下內距僅 6px，目標高度可能 < 44px
- `.day-link` 與 `.back-btn` 上下內距 4–6px，點擊目標偏小，建議加大內距

---

## 9. 其他發現（健壯性與可用性）

### ❌ 嚴重
- **`.day-card` 預設 `opacity: 0`，完全依賴 JavaScript 的 `IntersectionObserver` 才會顯現。** 若 `script.js` 載入失敗（例如 Leaflet CDN 中斷，`init()` 在 `initMap()` 即拋錯中斷，`initDayCards()` 永不執行）或使用者停用 JavaScript，所有日程卡片將永遠不可见。這是可用性重大缺失，建議在 CSS 中移除預設 `opacity:0`，或加入 `<noscript>` 兜底。

### ⚠️ 建議
- `prefers-reduced-motion`：CSS 已涵蓋，但 JS 中的 hero 入場動畫與 `scrollIntoView(smooth)` 未尊重此設定
- `script.js` 在 `index.html` 會靜默跳過缺少的元素（`#timeline-container` 等不存在），降級處理得宜

---

## 修復優先級建議

| 優先級 | 項目 | 對應檔案 |
|--------|------|----------|
| **P0 立即修復** | 色彩對比度不足（station-transport/cost、連結、徽章白字） | `style.css` |
| **P0 立即修復** | `.day-card` 依賴 JS 才可見，載入失敗則內容消失 | `script.js`、`style.css` |
| **P0 立即修復** | 行動裝置表格無橫向滾動 | `style.css`（新增 `.table-wrap { overflow-x: auto }`） |
| **P1 短期** | 補上 `@media print` | `style.css` |
| **P1 短期** | 鍵盤：「跳過至主要內容」連結、`theme-toggle` 加 `aria-pressed`、`<th>` 加 `scope` | 各 `.html` |
| **P2 建議** | 320–375px 小螢幕斷點；地圖高度響應式；`day-link`/`back-btn` 觸控目標加大 | `style.css` |
| **P2 建議** | 用詞統一（招財貓/招福貓、池袋→巢鴨站數） | 各 `.html`、`transport-guide.md` |
| **P2 建議** | JS 動畫尊重 `prefers-reduced-motion` | `script.js` |

---

## 總結

本專案 UX/UI 基礎良好：響應式斷點、深色模式變數、鍵盤導航（時間軸點可 Tab/Enter 操作）與 `lang="zh-TW"` 繁體中文皆已到位。主要缺陷集中在 **色彩對比度（WCAG AA 未達）**、**表格在手機上無橫向滾動**、以及 **`.day-card` 過度依賴 JavaScript 才可顯示**（載入失敗即內容消失）。列印樣式與 ARIA 細節（`scope`、`aria-pressed`、`aria-hidden`）則屬可在下一版本補強的改進項目。

詳細報告已寫入：`/home/ubuntu/tokyo-wedding-2026-itinerary/UX_UI_無障礙檢查報告.md`