## ADDED Requirements

### Requirement: 專案封面主視覺
專案頁頂端 SHALL 顯示該專案封面作為主視覺，並作為首頁卡片換頁轉場的目標。封面的尺寸與進場方式依 `refine-project-page-fidelity-and-motion` 的 `image-fidelity` 與 `project-entrance-motion` 規格（2026-09-29 預覽回饋後取代原本的 sticky 縮放設計）。

#### Scenario: 顯示封面
- **WHEN** 訪客開啟任一專案頁
- **THEN** 頁首顯示該專案封面、專案名稱與摘要

### Requirement: 圖面懸停提示
在支援懸停的精確指標裝置上，滑鼠移到圖面時 SHALL 以強調色描出圖面框線，並顯示跟隨游標的「Enlarge」提示標籤（提示樣式已由 `replace-loupe-with-animated-cursor` 的 `drawing-cursor` 取代：所有圖面改為動畫圓圈游標）；觸控裝置 MUST NOT 顯示此提示。

#### Scenario: 滑鼠移到圖面
- **WHEN** 桌機訪客將滑鼠移到平面圖上
- **THEN** 框線描出，游標旁出現「Enlarge」

#### Scenario: 觸控裝置
- **WHEN** 手機訪客點擊圖面
- **THEN** 直接開啟放大檢視，不顯示提示標籤

### Requirement: 放大檢視過渡
圖面放大檢視 SHALL 以從原位置放大的方式開啟，關閉時縮回原位置，過渡時長與全站動畫一致。

#### Scenario: 開啟與關閉
- **WHEN** 訪客點擊圖面後再關閉
- **THEN** 檢視器從圖面位置放大開啟，關閉時縮回
