# 開發進度

最後更新：2026-09-29

正式網站：https://hung-yung-fan.vercel.app
原始碼：https://github.com/JeterChan/portfolio-website（推送到 `main` 會自動部署）

## 開發流程

1. 先釐清需求：開發前先確認需要的資訊。
2. 寫 OpenSpec：每個變更都在 `openspec/changes/<名稱>/` 建立 proposal、design、specs、tasks。
3. 實作並驗證。
4. 更新這份進度紀錄。

## 變更總覽

| 變更 | 狀態 | 進度 | 說明 |
|---|---|---|---|
| `create-architecture-portfolio-site` | 已上線，收尾中 | 見下方 | 網站本體、內容、部署 |
| `add-motion-and-uniform-covers` | 已上線、已歸檔 | 32/32 | 封面統一尺寸、首頁開場、捲動動畫、換頁轉場、圖面互動 |
| `refine-project-page-fidelity-and-motion` | 已上線、已歸檔 | 24/24 | 專案頁畫質上限、進場動畫、逐行文字、格線描出、放大鏡、閱讀進度 |
| `replace-loupe-with-animated-cursor` | 已上線、已歸檔 | 13/13 | 圖面放大鏡改為動畫游標（圓圈放大附 +） |

## create-architecture-portfolio-site

已完成：
- 網站框架（Astro 7 靜態網站）、內容資料夾與區塊語法、錯誤提示
- 首頁橫向畫廊與比例尺捲動指示、專案敘事頁、圖面放大檢視、About 頁
- 視覺方向 A「描圖紙」（2026-09-29 從三版中選定）
- 從 PDF 拆出 5 個專案與 CV，佔位內容已移除
- PDF 作品集壓縮為 8.1MB 並提供下載
- 部署至 Vercel，正式網址可正常瀏覽（首頁、專案頁、About、404、sitemap、PDF 下載已確認）

未完成：
- 用真實內容重跑效能與無障礙驗證（Lighthouse）
- 確認 Vercel 的 preview 部署，以及建置失敗時正式網站維持上一版
- 歸檔這個 OpenSpec 變更

## 待決定事項

- 前 4 個專案的年份目前顯示 `TBC`（To Be Confirmed，待確認），因為 PDF 沒有標示各專案年份。
- Fabrication Center 的寬景封面（3:1）裁切位置：實作後截圖確認。

## add-motion-and-uniform-covers

需求（2026-09-29 擁有者確認）：
- 封面：首頁整齊為主，所有封面相同大小（3:2 框，裁切填滿，縮小顯示以降低放大倍率）
- 動畫強度：中等；參考 Apple iPhone 產品頁的捲動動畫
- 範圍：首頁開場（名字描線、卡片依序進場）與畫廊、專案頁捲動、換頁轉場、圖面互動

OpenSpec：`openspec/changes/add-motion-and-uniform-covers/`（proposal、design、5 份 specs、tasks）

實作（分支 `feat/motion-and-covers`，2026-09-29）：
- 完成：封面 3:2 統一框（桌機 540×360）、名字描線開場與卡片進場（每次瀏覽一次）、畫廊視差與懸停、比例尺捲動同步、專案頁封面主視覺（桌機 sticky 縮放，手機 3:2 靜態）、內容揭露、換頁轉場、圖面懸停框線與 Enlarge 標籤
- 實作時的調整：視差改為 ±16px／1.08 倍（避免露邊）；主視覺縮小比例改為 74%（標題不重疊）；手機不使用 sticky 主視覺（寬景封面裁成直式會糊）；「模型與素描」封面裁掉原圖頂端黑邊
- 驗證：減少動態模式全部停用；手機無橫向捲動；Lighthouse 行動版首頁 99、Dinner Theater 100、Hydrological 97，CLS ≤ 0.004；開場期間可點擊；鍵盤可開關圖面檢視器
- 已知限制：Firefox 目前沒有捲動動畫與換頁轉場，顯示靜態版面

預覽網址：https://hung-yung-r675q2t69-jeterchans-projects.vercel.app（commit `dc53ea2`）

待完成：
- 2.4 擁有者確認 5 張封面裁切
- 8.6 在預覽網址確認後合併到 `main`

## refine-project-page-fidelity-and-motion

預覽回饋（2026-09-29）：
- 專案頁封面滿版會放大低解析原圖，畫質下降 → 以畫質為優先
- 專案頁動畫不明顯，只感覺到圖面藍框
- 參考 micahhoang.com（經 wallofportfolios.in 嵌入）的進場動畫

擁有者決定：
- 畫質標準：圖片顯示寬度不超過原圖寬度（1x）
- 新增：進場淡入上浮、文字逐行浮現、資訊表格線描出、圖面放大鏡、閱讀進度比例尺
- 不採用：圖片框內視差、平滑慣性捲動、平面圖跑馬燈

OpenSpec：`openspec/changes/refine-project-page-fidelity-and-motion/`（proposal、design、4 份 specs、tasks 共 24 項）。會取代前一變更的「sticky 縮放主視覺」與「隨捲動揭露」。

實作（分支 `feat/motion-and-covers`，commit `764ca98`，2026-09-29）：
- 畫質：專案頁 5 個專案共 47 張圖逐一檢查，顯示寬度都不超過原圖寬度。另修正小圖 srcset 只提供 480／800px 版本（也會造成放大）的問題
- 封面：原比例、不超過原尺寸、高度上限 75svh；移除滿版 sticky 縮放；首頁轉場保留
- 動畫：進場淡入上浮（取代捲動揭露）、標題／摘要／段落逐行浮現、資訊表格線描出、圖面放大鏡（倍率 ≤ 2.5 且不超過原圖解析度；解析度不足的圖面顯示 Enlarge）、頂端閱讀進度比例尺
- 實作時的調整：封面不做淡入（轉場目標與主要內容，直接顯示）；進度條刻度改為淡灰
- 驗證：減少動態與停用 JS 時內容完整；轉場抵達時封面可見；鍵盤可開關圖面；手機無橫向捲動；Lighthouse 行動版首頁 99、Dinner Theater 98、Hydrological 100，CLS 0

預覽網址：https://hung-yung-ntaukhnrg-jeterchans-projects.vercel.app

## replace-loupe-with-animated-cursor

擁有者決定（2026-09-29）：放大鏡改成動畫游標；樣式「圈圈放大附 +」；只在圖面上；放大鏡完全移除。

OpenSpec：`openspec/changes/replace-loupe-with-animated-cursor/`（proposal、design、1 份 spec、tasks 共 13 項）。

實作（分支 `feat/motion-and-covers`，commit `a1c2586`）：
- 圖面上：系統游標隱藏，小圓點放大成 72px 藍色空心圓，圓心「+」、下方「Enlarge」；帶輕微延遲跟隨；按下微縮；滑出縮回淡出
- 移除放大鏡與藍色 Enlarge 方塊；所有圖面使用相同游標
- 驗證：游標位置與滑鼠一致、離開圖面即消失、點擊開啟全螢幕檢視時收起；觸控裝置不建立游標；減少動態時直接跟隨；Lighthouse 專案頁 Performance 100、CLS 0

預覽網址：https://hung-yung-crnqhrsr8-jeterchans-projects.vercel.app

## 上線紀錄

- 2026-09-29：擁有者確認預覽後，`feat/motion-and-covers` 合併到 `main`（commit `4409b64`），Vercel 正式部署完成。已確認正式網站首頁封面 540×360、專案頁封面不超過原尺寸、動畫游標與閱讀進度比例尺皆生效、PDF 下載正常。
- 三個變更已歸檔到 `openspec/changes/archive/`，規格併入 `openspec/specs/`（`drawing-loupe` 已被 `drawing-cursor` 取代，未保留在主規格中）。

## 下一步

1. `create-architecture-portfolio-site` 收尾：用真實內容重跑 Lighthouse、確認建置失敗時正式網站維持上一版，完成後歸檔。
2. 前 4 個專案年份仍為 `TBC`，待擁有者提供。
