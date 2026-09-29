## Context

- 網站已部署於 https://hung-yung-fan.vercel.app（Astro 7 靜態網站，視覺方向 A「描圖紙」）。
- 首頁卡片目前以固定高度 `calc(100svh - 17rem)`（約 60vh）顯示封面，寬度隨原圖比例變化。
- 封面原圖尺寸（取自 PDF）：

| 專案 | 原圖 | 比例 |
|---|---|---|
| Youth Hostel | 773×538 | 1.44 |
| Dinner Theater | 1194×515 | 2.32 |
| Fabrication Center | 1655×535 | 3.09 |
| Hydrological Center | 2229×1253 | 1.78 |
| Models & Sketches | 1280×720 | 1.78 |

- 擁有者的決定（2026-09-29）：
  - 封面：首頁整齊為主，所有封面大小相同。
  - 動畫強度：中等。
  - 範圍：首頁開場與畫廊、專案頁捲動、換頁轉場、圖面與細節互動。
  - 參考：Apple iPhone 產品頁的捲動動畫。
  - 首頁開場：名字描線出現，接著卡片依序滑入。

## Goals / Non-Goals

**Goals:**
- 封面在 2 倍解析度螢幕上放大倍率不超過約 1.5 倍。
- 動畫與捲動同步，捲動停止時動畫也停止（Apple 式），而不是一次播完的計時動畫。
- 零版面位移，Lighthouse 行動版 Performance ≥ 90、CLS < 0.1。
- 動畫不擋操作：不劫持捲動、不延遲點擊、開場期間也能直接操作。

**Non-Goals:**
- 不引入 WebGL／3D、影片背景、捲動劫持（scroll-jacking）。
- 不做滑鼠跟隨的全站自訂游標，只在圖面上顯示提示。
- 不為不支援的瀏覽器模擬捲動驅動動畫。
- 不處理封面原圖本身的解析度，例如 AI 放大或換原檔。

## Decisions

### D1. 封面統一為 3:2 框，高度上限 24rem
- 卡片框固定 3:2，高度 `clamp(14rem, 40svh, 24rem)`，最寬 36rem（576px）。圖片以 `object-fit: cover` 裁切填滿。
- 計算：在 2 倍螢幕上，框需要 1152×768 裝置像素。最差的 Hostel 是寬度受限（773→1152，約 1.49 倍），Dinner、Fabrication 是高度受限（515／535→768，約 1.45–1.49 倍）；Hydrological 不需放大。一般 1 倍螢幕則都不需放大。
- 新增選填 frontmatter `coverPosition`（例如 `center`、`left`、`30% 50%`），讓寬景封面（Fabrication 3.09:1）決定裁切保留哪一段。
- 首頁空出的垂直空間放大字級名字（也就是開場描線的名字），版面自上而下為：導覽、名字、畫廊、比例尺。
- 替代方案：
  - 4:3 框：寬景封面裁掉太多。
  - 16:9 框：Hostel 上下被裁太多。
  - 維持各自比例：違反「整齊」的決定。

### D2. 捲動驅動動畫：CSS Scroll-driven Animations
- 使用 `animation-timeline: view()`／`scroll()` 與 `animation-range`，動畫進度直接綁定捲動位置。瀏覽器原生合成、不需 JS、不阻塞主執行緒。
- 以 `@supports (animation-timeline: view())` 包住。不支援的瀏覽器（撰寫時主要是 Firefox 的預設設定）顯示目前的靜態版面，內容完整可見。
- 只動 `transform`、`opacity`、`clip-path`，不動版面屬性，確保 CLS 為 0。
- 替代方案：
  - GSAP ScrollTrigger：功能最完整，但增加約 40KB JS，且在主執行緒計算。
  - IntersectionObserver：只能觸發、不能與捲動進度同步，達不到 Apple 式效果。

### D3. 專案頁封面主視覺（sticky 捲動段落）
- 專案頁頂端新增主視覺區塊，高度約 170svh，內含 `position: sticky` 的全寬封面。
- 隨捲動進度：封面從滿版縮至約 74%，邊緣留出紙色；標題與摘要從下方浮現；段落結束後主視覺隨頁面自然捲離，接到專案資訊與內文。
- 動畫範圍用具名 view timeline（`view-timeline: --hero`），讓子元素共用同一段捲動進度。
- 減少動態或不支援時：主視覺為一般高度（約 70svh）的靜態封面，不 sticky。
- 手機（< 768px）一律使用 3:2 靜態封面：實測寬景封面裁成直式滿版會大幅放大而模糊（2026-09-29 實作時調整）。
- 實作時將縮小比例由 82% 調為 74%，讓標題有足夠空間不與封面重疊。

### D4. 內容揭露：描圖紙掀開
- 圖片與圖面：`clip-path: inset(0 0 100% 0)` 到 `inset(0)`，加上輕微 `translateY`，範圍 `entry 0%` 到 `entry 70%`，像一張紙由上往下被揭開。
- 文字段落：淡入加 16px 上移。
- 並排圖（row）：每張依序錯開 8% 的捲動範圍。
- 已在視窗內的首屏內容不播放揭露，直接顯示，避免首屏閃爍。

### D5. 首頁開場：名字描線 + 卡片依序進場
- 名字以 inline SVG `<text>` 呈現（Archivo 寬體），`stroke-dasharray`／`stroke-dashoffset` 描線約 1.2 秒，接著填色淡入。
- 卡片在描線 0.6 秒後依序由右往左滑入（translateX 40px、opacity），每張間隔 90ms。
- 同一次瀏覽（sessionStorage）只播一次，之後返回首頁直接顯示完成狀態。判斷在 `<head>` 的 inline script 中進行，避免閃爍。
- 開場期間所有連結立即可點，動畫不阻擋操作。
- 無障礙：SVG 帶 `role="img"` 與 `aria-label`，同時保留隱藏的 `<h1>` 文字。

### D6. 首頁畫廊動態
- 視差：卡片內圖片以畫廊的橫向 scroll timeline（`view(inline)`）做 ±16px 的 translateX，框本身不動。圖片放大 1.08 倍以免露邊（實作時由 ±24px／1.06 倍調整，原設定會露出框邊）。
- 滑過：圖片放大至 1.1 倍（300ms），標題底線由左至右畫出。
- 比例尺標記改用 scroll timeline 驅動，取代目前的 JS 計算。舊的 JS 保留作為後備。

### D7. 換頁轉場：跨文件 View Transitions
- 在 CSS 加 `@view-transition { navigation: auto; }`，首頁封面與專案頁主視覺使用同一個 `view-transition-name: cover-<slug>`，點擊時封面平滑放大、移動到專案頁頂端，返回時反向。
- 其他內容用 350ms 淡入淡出。
- 不支援的瀏覽器照常換頁，無轉場。
- 不使用 Astro `<ClientRouter />`：它會把網站變成單頁應用，PhotoSwipe 與首頁腳本需要改寫生命週期，風險較高。

### D8. 圖面互動
- 滑過圖面時，框線以藍鉛筆色由四角描出（clip-path 動畫），並出現跟隨游標的小標籤「Enlarge」。只在支援 hover 的精確指標裝置上啟用。
- 放大檢視沿用 PhotoSwipe 的 zoom 開關動畫，調整時長為 350ms 與緩動曲線，與全站一致。

### D9. 全站動畫設定集中管理
- 動畫時長、緩動曲線放在 CSS 變數（`--ease-out`、`--dur-short` 等），全部包在 `@media (prefers-reduced-motion: no-preference)` 內。
- 減少動態時：所有動畫、轉場、視差、開場都不執行，內容直接呈現。

## Risks / Trade-offs

- [封面裁切切掉重要部分，特別是 3:1 的 Fabrication] → 提供 `coverPosition`，實作後逐張截圖給擁有者確認。
- [Firefox 等瀏覽器沒有捲動動畫與轉場] → 漸進增強，版面與內容完整。這些瀏覽器使用比例不高，求職審閱者多用 Chrome 或 Safari。
- [sticky 主視覺拉長專案頁，審閱者要多捲一段] → 主視覺段落限制在約 170svh，且捲動期間標題已出現，資訊不延遲。
- [描線開場讓部分人覺得慢] → 每次瀏覽只播一次，約 1.8 秒內完成，且不阻擋操作。
- [動畫增加 CSS 與 JS 體積] → 以 CSS 為主，JS 只用於開場判斷與圖面游標標籤（< 3KB），驗收時重跑 Lighthouse。
- [視差與縮放可能引起暈眩] → 位移幅度保持小，並完全尊重減少動態設定。

## Migration Plan

- 在分支上開發，推送後由 Vercel 產生 preview 網址給擁有者檢視，確認後再合併到 `main`。
- 回滾：Vercel 將前一版部署 promote 回 production。

## Open Questions

- Fabrication Center 的寬景封面裁切位置：實作後截圖確認。
