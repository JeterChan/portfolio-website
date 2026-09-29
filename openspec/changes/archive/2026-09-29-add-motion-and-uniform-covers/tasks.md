## 1. 準備

- [x] 1.1 建立分支 `feat/motion-and-covers`
- [x] 1.2 在 `global.css` 建立動畫 token（時長、緩動曲線），全部包在 `prefers-reduced-motion: no-preference` 內

## 2. 封面統一框架

- [x] 2.1 content schema 新增選填 `coverPosition`（驗證為有效的 object-position 值）
- [x] 2.2 ProjectCard 改為 3:2 固定框、`object-fit: cover`，高度 `clamp(14rem, 40svh, 24rem)`；調整 `widths`／`sizes`
- [x] 2.3 手機版 3:2 滿寬
- [x] 2.4 截圖 5 張封面的裁切結果，請擁有者確認；依需要設定 `coverPosition`

## 3. 首頁開場

- [x] 3.1 首頁版面加入大字名字（inline SVG text，含 `role="img"`、`aria-label`）
- [x] 3.2 名字描線與填色動畫
- [x] 3.3 卡片依序滑入動畫（接在描線之後）
- [x] 3.4 `<head>` inline script：同一工作階段只播一次（sessionStorage），不閃爍
- [x] 3.5 驗證開場期間連結可立即點擊

## 4. 首頁畫廊動態

- [x] 4.1 畫廊橫向 scroll timeline，卡片圖片視差（±16px，圖片 1.08 倍；實作時由 ±24px 調整，避免露邊）
- [x] 4.2 卡片懸停：圖片放大、標題底線由左至右
- [x] 4.3 比例尺標記改用 scroll timeline，保留 JS 後備

## 5. 專案頁主視覺與揭露

- [x] 5.1 （已由 refine-project-page-fidelity-and-motion 取代）專案頁新增封面主視覺區塊（sticky，約 170svh；後備為 70svh 靜態）
- [x] 5.2 （已取代）主視覺捲動動畫：封面縮至約 74%、標題與摘要浮現，段落結束後隨頁面捲離（桌機限定，手機為 3:2 靜態）
- [x] 5.3 （已取代）圖片／圖面揭露動畫（clip-path 由上往下）
- [x] 5.4 （已取代）文字段落淡入上移；並排圖依序錯開
- [x] 5.5 首屏內容不播放揭露

## 6. 換頁轉場

- [x] 6.1 啟用跨文件 View Transitions（`@view-transition { navigation: auto; }`）
- [x] 6.2 首頁封面與專案主視覺共用 `view-transition-name: cover-<slug>`
- [x] 6.3 其他內容淡入淡出；調整時長
- [x] 6.4 驗證返回首頁的反向轉場，以及轉場後各頁腳本正常

## 7. 圖面互動

- [x] 7.1 圖面懸停框線描出動畫（僅 `hover: hover` 且 `pointer: fine`）
- [x] 7.2 跟隨游標的「Enlarge」標籤（僅桌機）
- [x] 7.3 調整 PhotoSwipe 開關過渡時長與緩動

## 8. 驗證

- [x] 8.1 減少動態模式：所有動畫停用，內容完整
- [x] 8.2 不支援捲動動畫的瀏覽器（模擬關閉）：版面完整可用（以減少動態模式驗證同一套靜態 CSS 路徑）
- [x] 8.3 Lighthouse 行動版：首頁與一個專案頁 Performance ≥ 90、CLS < 0.1
- [x] 8.4 鍵盤操作流程與手機版檢查
- [x] 8.5 推送分支，將 Vercel preview 網址交給擁有者確認
- [x] 8.6 擁有者確認後合併到 `main`，更新 `docs/progress`
