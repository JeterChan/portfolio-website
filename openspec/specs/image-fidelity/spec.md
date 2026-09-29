# image-fidelity Specification

## Purpose
TBD - created by archiving change refine-project-page-fidelity-and-motion. Update Purpose after archive.
## Requirements
### Requirement: 圖片不以超過原圖的尺寸顯示
專案頁的所有圖片（封面、內文圖片、並排圖、圖面）顯示寬度 MUST NOT 超過原圖的像素寬度；容器較寬時，圖片以原尺寸顯示而不放大。

#### Scenario: 小尺寸封面
- **WHEN** 訪客在 1440px 寬視窗開啟封面原圖為 773px 寬的專案
- **THEN** 封面顯示寬度不超過 773px

#### Scenario: 小尺寸平面圖
- **WHEN** 專案頁有一張 937px 寬的平面圖，所在欄位寬 1300px
- **THEN** 平面圖以不超過 937px 的寬度顯示，圖紙白框跟著縮小

#### Scenario: 大尺寸圖版
- **WHEN** 圖版原圖為 4000px 寬
- **THEN** 圖版填滿欄位寬度

### Requirement: 不產生放大版本的圖檔
網站建置時 MUST NOT 產生寬度大於原圖的圖片版本。

#### Scenario: 響應式圖片
- **WHEN** 建置 773px 寬的封面
- **THEN** 輸出的 srcset 中最大寬度為 773px

### Requirement: 封面依原比例顯示
專案頁封面 SHALL 依原圖比例完整顯示（不裁切），高度不超過視窗高度的 75%；超過時等比例縮小。

#### Scenario: 寬景封面
- **WHEN** 開啟封面比例為 3:1 的專案
- **THEN** 封面完整顯示，不被裁切

#### Scenario: 首頁轉場
- **WHEN** 訪客從首頁點擊卡片進入專案
- **THEN** 封面由卡片位置轉場到專案頁封面位置

