# project-page Specification

## Purpose
TBD - created by archiving change create-architecture-portfolio-site. Update Purpose after archive.
## Requirements
### Requirement: 專案資訊標頭
專案頁 SHALL 在開頭顯示專案名稱、年份，以及 frontmatter 中有提供的課程、地點、類型、指導老師、合作者與摘要。

#### Scenario: 完整資訊
- **WHEN** 訪客開啟 frontmatter 欄位齊全的專案頁
- **THEN** 標頭顯示所有已填欄位

#### Scenario: 選填欄位缺漏
- **WHEN** 專案未填 `instructor`
- **THEN** 標頭不顯示該欄位，也不留空白標籤

### Requirement: 敘事區塊呈現
專案頁 SHALL 依 markdown 順序直向呈現各區塊：`full` 為全版寬圖、`text-left`/`text-right` 為文字與圖片左右並列、`row` 為 2–4 張並排圖、一般段落為可閱讀寬度的文字。

#### Scenario: 左右圖文
- **WHEN** 區塊為 `text-left`
- **THEN** 桌機版文字在左、圖片在右

#### Scenario: 手機版圖文
- **WHEN** 視窗寬度小於 768px
- **THEN** 圖文區塊與並排圖列改為單欄直向排列

### Requirement: 圖面放大檢視
`drawing` 區塊 SHALL 顯示圖面與圖說，點擊後開啟全螢幕檢視器，支援滾輪／雙指縮放、拖曳平移、鍵盤與 ESC 關閉，並於放大時載入高解析版本。

#### Scenario: 放大圖面
- **WHEN** 訪客點擊平面圖
- **THEN** 開啟全螢幕檢視器，可縮放至足以辨識細線的解析度

#### Scenario: 關閉檢視器
- **WHEN** 訪客按下 ESC 或點擊關閉按鈕
- **THEN** 檢視器關閉並回到原捲動位置

#### Scenario: 無圖面的專案
- **WHEN** 專案頁沒有任何 `drawing` 區塊
- **THEN** 頁面不載入檢視器的 JavaScript

### Requirement: 圖片替代文字
所有內容圖片 SHALL 輸出 `alt` 屬性；區塊未提供 `alt` 時 SHALL 使用圖說或專案名稱作為後備。

#### Scenario: 未提供 alt
- **WHEN** `full` 區塊未寫 `alt`
- **THEN** 圖片 `alt` 為專案名稱

### Requirement: 專案間導覽
專案頁結尾 SHALL 提供前往上一個與下一個專案的連結（依首頁排序），以及返回首頁的連結。

#### Scenario: 中間專案
- **WHEN** 訪客位於排序第 2 的專案頁結尾
- **THEN** 顯示前往第 1 與第 3 個專案的連結

#### Scenario: 最後一個專案
- **WHEN** 訪客位於最後一個專案頁
- **THEN** 「下一個」連結指向第一個專案

