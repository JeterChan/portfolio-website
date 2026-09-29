# home-gallery Specification

## Purpose
TBD - created by archiving change create-architecture-portfolio-site. Update Purpose after archive.
## Requirements
### Requirement: 首頁呈現專案橫向畫廊
首頁 SHALL 以橫向排列呈現所有已發佈專案的封面，每張卡片顯示封面圖、專案名稱與年份，點擊進入該專案頁。

#### Scenario: 顯示專案卡片
- **WHEN** 訪客在桌機開啟首頁
- **THEN** 依排序橫向顯示各專案封面、名稱與年份

#### Scenario: 進入專案
- **WHEN** 訪客點擊某專案卡片
- **THEN** 導向 `/projects/<slug>`

### Requirement: 橫向捲動操作
桌機版畫廊 SHALL 支援觸控板橫向手勢、垂直滑鼠滾輪、方向鍵左右與 Tab 聚焦進行橫向捲動；垂直滾輪僅在其位移以垂直方向為主時轉為橫向，且捲到兩端時 SHALL 放行頁面原生捲動。

#### Scenario: 垂直滾輪橫向移動
- **WHEN** 訪客在畫廊上以滑鼠滾輪向下捲
- **THEN** 畫廊向右捲動

#### Scenario: 觸控板橫向手勢
- **WHEN** 訪客在觸控板上左右滑動
- **THEN** 畫廊以原生方式橫向捲動，不被額外攔截

#### Scenario: 鍵盤操作
- **WHEN** 訪客以 Tab 聚焦到畫面外的專案卡片
- **THEN** 畫廊捲動使該卡片完整可見，且有明顯的聚焦樣式

#### Scenario: 到達末端
- **WHEN** 畫廊已捲到最右端且訪客繼續向下滾動
- **THEN** 不再攔截滾輪事件

### Requirement: 減少動態偏好
當訪客設定 `prefers-reduced-motion: reduce` 時，畫廊 MUST NOT 使用平滑捲動動畫。

#### Scenario: 減少動態
- **WHEN** 訪客系統開啟減少動態
- **THEN** 畫廊捲動與聚焦捲入均為立即跳轉，無動畫

### Requirement: 手機版直向堆疊
視窗寬度小於 768px 時，畫廊 SHALL 改為直向堆疊，且 MUST NOT 攔截任何滾輪或觸控事件。

#### Scenario: 手機瀏覽
- **WHEN** 訪客以 375px 寬的手機開啟首頁
- **THEN** 專案卡片直向排列，以一般頁面捲動瀏覽，無橫向捲軸

### Requirement: 首屏載入效能
首頁首屏封面 SHALL 優先載入，其餘封面 SHALL 延遲載入。

#### Scenario: 首屏圖片
- **WHEN** 首頁載入
- **THEN** 第一張封面以高優先權載入，畫面外封面在接近視窗時才載入

