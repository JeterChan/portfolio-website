## ADDED Requirements

### Requirement: 封面統一框架
首頁所有專案封面 SHALL 以相同的 3:2 比例與相同尺寸顯示，圖片以裁切方式填滿框（不變形、不留白）。

#### Scenario: 不同比例的封面
- **WHEN** 首頁同時有 1.44:1 與 3.09:1 的封面
- **THEN** 兩張卡片的框大小相同，圖片裁切填滿

### Requirement: 封面放大倍率上限
封面框在桌機 SHALL 不超過 36rem 寬、24rem 高，使目前最小的封面在 2 倍解析度螢幕上的放大倍率不超過約 1.5 倍。

#### Scenario: 高解析螢幕
- **WHEN** 訪客以 2 倍解析度螢幕在 1440×900 視窗開啟首頁
- **THEN** 每張封面框的 CSS 尺寸不超過 576×384

### Requirement: 可調整裁切位置
專案 frontmatter SHALL 支援選填欄位 `coverPosition`（CSS `object-position` 值），用來決定封面裁切保留的區域；未填時置中。

#### Scenario: 指定裁切位置
- **WHEN** 專案設定 `coverPosition: left`
- **THEN** 首頁該封面保留圖片左側

#### Scenario: 無效值
- **WHEN** `coverPosition` 不是有效的位置值
- **THEN** 建置失敗並指出檔案與欄位

### Requirement: 手機版封面
視窗寬度小於 768px 時，封面 SHALL 以相同的 3:2 比例、滿寬顯示。

#### Scenario: 手機瀏覽
- **WHEN** 訪客以 375px 寬開啟首頁
- **THEN** 所有封面等寬、等高，直向排列
