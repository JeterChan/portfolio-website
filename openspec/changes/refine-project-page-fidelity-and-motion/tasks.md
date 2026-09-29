## 1. 畫質上限

- [x] 1.1 `Drawing` 加入 `--natural-width` 上限，圖紙白框改為 `fit-content`
- [x] 1.2 檢查 `Figure`、`Row`、`TextImage` 的 srcset 最大寬度不超過原圖寬（並補上原圖寬本身，修正小圖只給 480／800px 版本的問題）
- [x] 1.3 專案頁封面改為原比例、不超過原寬、高度上限 75svh；移除 sticky 縮放主視覺，保留 `view-transition-name`
- [x] 1.4 驗證：在 1440px 視窗逐頁檢查所有圖片的顯示寬 ≤ 原圖寬

## 2. 進場動畫

- [x] 2.1 移除 `.reveal`／`.reveal-text` 的 scroll-driven CSS
- [x] 2.2 新增進場腳本（IntersectionObserver）與 `html.js-motion`、`.enter`、`.is-in` 樣式
- [x] 2.3 套用到內文圖片、圖面、文字區塊；並排圖以 `--n` 錯開（封面不淡入，見 design D2）
- [x] 2.4 驗證載入時已在畫面內的元素立即播放、停用 JS 時內容可見

## 3. 文字逐行浮現

- [x] 3.1 實作 `[data-lines]` 拆字與行號計算（保留內嵌元素）
- [x] 3.2 套用到專案標題、摘要、內文段落與圖文區塊文字
- [x] 3.3 驗證螢幕報讀文字完整、視窗縮放後不錯位

## 4. 資訊表格線描出

- [x] 4.1 格線改由偽元素繪製，外觀與現況一致
- [x] 4.2 進場時格線依序描出、內容淡入

## 5. 圖面放大鏡

- [x] 5.1 放大鏡元件：啟用條件（精確指標、倍率 ≥ 1.5）、倍率上限 2.5
- [x] 5.2 大圖延遲載入、跟隨游標、點擊開啟 PhotoSwipe
- [x] 5.3 不啟用放大鏡的圖面保留「Enlarge」標籤

## 6. 閱讀進度比例尺

- [x] 6.1 專案頁頂端固定比例尺進度條（scroll timeline + 腳本後備）
- [x] 6.2 確認不擋導覽點擊、`aria-hidden`

## 7. 同步前一個變更

- [x] 7.1 更新 `add-motion-and-uniform-covers` 的 project-motion spec、design、tasks，標註被本變更取代的需求

## 8. 驗證與交付

- [x] 8.1 減少動態模式：無動畫、內容完整
- [x] 8.2 Lighthouse 行動版：首頁與兩個專案頁 Performance ≥ 90、CLS < 0.1
- [x] 8.3 鍵盤流程與手機版檢查
- [ ] 8.4 推送分支，提供新的 Vercel 預覽網址給擁有者確認
- [ ] 8.5 更新 `docs/progress`
