## Why

擁有者檢視 `refine-project-page-fidelity-and-motion` 的預覽後，希望把圖面上的圓形放大鏡改成「有動畫的鼠標」：以動態的游標提示可以放大，而不是在游標處直接顯示放大內容。

## What Changes

- **移除圖面放大鏡**，以及只在低解析圖面出現的「Enlarge」方塊標籤。
- **新增圖面動畫游標**（只在圖面上）：
  - 滑入圖面時，系統游標隱藏，一個小圓點平滑擴大成空心圓圈，圓心出現「+」，下方出現「Enlarge」。
  - 圓圈以帶有輕微延遲的方式跟隨滑鼠。
  - 按下時圓圈微縮，點擊仍開啟全螢幕放大檢視。
  - 滑出時圓圈縮回並淡出，恢復系統游標。
- 圖面的藍色框線描出效果保留。
- 只在支援懸停的精確指標裝置上啟用；觸控裝置與鍵盤操作不受影響。減少動態時游標照常顯示，但不做縮放與延遲跟隨。

## Capabilities

### New Capabilities
- `drawing-cursor`: 圖面上的動畫游標：外觀、進出場、跟隨、按下狀態、啟用條件與減少動態行為。

### Modified Capabilities
（無已歸檔的規格。本變更取代未歸檔變更 `refine-project-page-fidelity-and-motion` 的 `drawing-loupe`，以及 `add-motion-and-uniform-covers` 中「圖面懸停提示」的 Enlarge 標籤部分。實作時同步在這兩個變更中標註。）

## Impact

- 修改：`src/components/blocks/Drawing.astro`（移除放大鏡與標籤、加入動畫游標）、`src/i18n/en.ts`（移除 `project.clickToEnlarge`）。
- 在同一分支 `feat/motion-and-covers` 開發，與前兩個變更一起確認上線。
