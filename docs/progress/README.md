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
| `add-motion-and-uniform-covers` | 實作完成，等待擁有者在預覽網址確認 | 29/32 | 封面統一尺寸、首頁開場、捲動動畫、換頁轉場、圖面互動 |

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

待完成：
- 2.4 擁有者確認 5 張封面裁切
- 8.5／8.6 在 Vercel 預覽網址確認後合併到 `main`

## 下一步

1. 擁有者開啟 Vercel 預覽網址檢查動畫與封面裁切。
2. 確認後合併 `feat/motion-and-covers` 到 `main`（自動上線）。
