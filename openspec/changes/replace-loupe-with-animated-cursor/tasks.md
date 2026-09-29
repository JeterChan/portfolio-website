## 1. 移除放大鏡

- [x] 1.1 從 `Drawing.astro` 移除放大鏡元素、樣式、倍率計算與大圖預載
- [x] 1.2 移除 `.cursor-label` 與 `project.clickToEnlarge` 字串

## 2. 動畫游標

- [x] 2.1 建立游標元素（圓圈、「+」、「Enlarge」），`aria-hidden`、`pointer-events: none`
- [x] 2.2 進場／出場縮放與淡入淡出
- [x] 2.3 requestAnimationFrame 插值跟隨，靜止時停止迴圈
- [x] 2.4 按下微縮、點擊開啟全螢幕檢視時游標收起
- [x] 2.5 只在 `(hover: hover) and (pointer: fine)` 建立；減少動態時直接跟隨、無過渡

## 3. 同步前一個變更

- [x] 3.1 在 `refine-project-page-fidelity-and-motion` 與 `add-motion-and-uniform-covers` 標註被取代的需求

## 4. 驗證與交付

- [x] 4.1 高解析與低解析圖面都顯示相同游標、沒有放大鏡；文字與卡片上為系統游標
- [x] 4.2 觸控模擬、鍵盤開關圖面、減少動態
- [x] 4.3 Lighthouse 行動版專案頁 Performance ≥ 90、CLS < 0.1
- [x] 4.4 推送分支，提供新的 Vercel 預覽網址
- [x] 4.5 更新 `docs/progress`
