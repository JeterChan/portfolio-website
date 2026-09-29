## ADDED Requirements

### Requirement: 全站導覽
每個頁面 SHALL 顯示擁有者名稱（連回首頁）與導覽連結（Work、About），在手機上 MUST 保持可用。

#### Scenario: 由專案頁回首頁
- **WHEN** 訪客在專案頁點擊擁有者名稱
- **THEN** 返回首頁

### Requirement: 預留多語系的路由
英文 SHALL 為預設語系且網址無語系前綴（例如 `/projects/<slug>`、`/about`）；介面字串 SHALL 集中於語系字典，頁面 `<html lang>` SHALL 依語系輸出。未來新增語系時，英文網址 MUST 維持不變。

#### Scenario: 英文網址
- **WHEN** 建置網站
- **THEN** 專案頁網址為 `/projects/<slug>`，不含 `/en/`

#### Scenario: html lang
- **WHEN** 訪客開啟任一英文頁面
- **THEN** `<html lang="en">`

### Requirement: 圖片最佳化
所有內容圖片 SHALL 在建置時輸出現代格式（AVIF/WebP）與多寬度 `srcset`，並帶有 `width`/`height` 以避免版面位移。

#### Scenario: 響應式圖片
- **WHEN** 訪客以手機開啟專案頁
- **THEN** 瀏覽器下載與螢幕寬度相符的較小圖片，而非原圖

### Requirement: 效能基準
首頁與專案頁在 Lighthouse 行動版測試中 SHALL 達到 Performance ≥ 90、CLS < 0.1。

#### Scenario: Lighthouse 驗證
- **WHEN** 對 production 首頁執行 Lighthouse 行動版測試
- **THEN** Performance ≥ 90 且 CLS < 0.1

### Requirement: 無障礙基準
網站 SHALL 可完全以鍵盤操作、具可見聚焦樣式、文字對比符合 WCAG AA，並提供「跳至主要內容」連結。

#### Scenario: 鍵盤瀏覽
- **WHEN** 訪客僅以鍵盤從首頁進入專案並開啟圖面檢視器
- **THEN** 所有步驟皆可完成，且目前聚焦元素清楚可見

### Requirement: SEO 與分享資訊
每個頁面 SHALL 輸出 `<title>`、meta description 與 Open Graph 標籤；專案頁 SHALL 以封面圖作為 `og:image`。網站 SHALL 產生 `sitemap.xml`。

#### Scenario: 分享專案連結
- **WHEN** 專案頁連結被貼到通訊軟體
- **THEN** 預覽顯示專案名稱、摘要與封面圖

### Requirement: 404 頁
不存在的網址 SHALL 顯示自訂 404 頁並提供返回首頁連結。

#### Scenario: 錯誤網址
- **WHEN** 訪客開啟 `/projects/not-exist`
- **THEN** 顯示 404 頁與返回首頁連結

### Requirement: Vercel 部署
網站 SHALL 以靜態輸出部署於 Vercel 免費 `*.vercel.app` 子網域；推送至 `main` 分支 SHALL 自動部署 production，其他分支 SHALL 產生 preview 部署。

#### Scenario: 推送更新
- **WHEN** 擁有者（或 Claude）將新專案推送到 `main`
- **THEN** Vercel 自動建置並更新 production 網站

#### Scenario: 建置失敗不影響線上
- **WHEN** 推送的內容導致建置失敗
- **THEN** production 維持前一個成功版本
