## Context

- 目前（`refine-project-page-fidelity-and-motion`）：原圖解析度足夠的圖面顯示 200px 圓形放大鏡；其他圖面顯示跟隨游標的藍色「Enlarge」方塊標籤。
- 擁有者決定（2026-09-29）：
  - 游標樣式：「圈圈放大附 +」。
  - 範圍：只在圖面上。
  - 放大鏡：完全移除。

## Goals / Non-Goals

**Goals:**
- 一眼看出「這張圖可以放大」，而且動態自然、不干擾看圖。
- 所有圖面行為一致，不再依解析度而有兩種提示。

**Non-Goals:**
- 不做全站自訂游標。
- 不改變點擊行為：仍開啟 PhotoSwipe 全螢幕檢視。

## Decisions

### D1. 外觀
- 直徑 72px 的空心圓：1.5px 強調色邊框，內部填淡強調色（約 8% 不透明度），圓心是 14px 的「+」（兩條 1.5px 線）。
- 圓圈下方 8px 處顯示小字「Enlarge」（強調色、0.75rem），與圓圈一起移動。
- `aria-hidden="true"`，`pointer-events: none`。可及性由連結原有的 `aria-label`（「Enlarge drawing: …」）提供。

### D2. 動畫
- 進場：從 `scale(0.15)`（像小圓點）放大到 `scale(1)`，同時淡入，時長 350ms，`--ease-out`。「+」與「Enlarge」延遲 120ms 淡入。
- 跟隨：以 requestAnimationFrame 做線性插值（每幀靠近目標 20%），產生輕微延遲的跟隨感；距離小於 0.1px 時停止迴圈，不持續耗用資源。
- 按下（`pointerdown`）：縮到 `scale(0.85)`；放開恢復。
- 出場：縮回 `scale(0.15)` 並淡出，250ms。
- 位置用 `translate3d`，縮放放在內層元素，兩者分開，避免互相覆蓋。

### D3. 啟用條件
- `(hover: hover) and (pointer: fine)` 才建立游標元素；圖面連結在此條件下設定 `cursor: none`（目前已有）。
- 觸控裝置：不建立，點擊直接開啟檢視。
- 鍵盤：焦點進入圖面時沿用藍色框線描出作為可見焦點，不顯示游標。

### D4. 減少動態
- 游標仍顯示（它是功能提示），但位置直接跟隨、不插值，進出場與按下不做縮放過渡，只切換顯示。

### D5. 移除項目
- 刪除放大鏡元素、`.loupe`／`.loupe-label` 樣式、倍率計算與大圖預先載入。
- 刪除 `.cursor-label` 與 `project.clickToEnlarge` 字串；保留 `project.enlargeCursor`（「Enlarge」）給新游標使用。

### D6. 與前兩個變更的關係
- `refine-project-page-fidelity-and-motion`：`drawing-loupe` 需求標註為已取代；design D6 與 tasks 5.x 加註。
- `add-motion-and-uniform-covers`：「圖面懸停提示」的 Enlarge 標籤描述改為指向本變更。

## Risks / Trade-offs

- [自訂游標在少數瀏覽器或擴充功能下可能與系統游標同時出現] → 只在圖面範圍內隱藏系統游標，範圍小、影響有限。
- [延遲跟隨讓定位感變差] → 插值係數 0.2，約 3–4 幀就追上，實際延遲很短；點擊判定仍以真實滑鼠位置為準。
- [失去放大鏡的細節預覽] → 擁有者明確選擇移除；點擊仍可在全螢幕檢視放大細看。

## Migration Plan

在 `feat/motion-and-covers` 分支實作並推送，以新的 Vercel 預覽網址確認後，與前兩個變更一起合併上線。

## Open Questions

（無）
