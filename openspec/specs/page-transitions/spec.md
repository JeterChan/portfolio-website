# page-transitions Specification

## Purpose
TBD - created by archiving change add-motion-and-uniform-covers. Update Purpose after archive.
## Requirements
### Requirement: 封面轉場至專案頁
在支援跨文件 View Transitions 的瀏覽器中，從首頁點擊專案卡片時，該封面 SHALL 平滑移動並放大成專案頁的封面主視覺；其他內容淡出淡入。

#### Scenario: 點擊卡片
- **WHEN** 訪客在 Chrome 點擊「Dinner Theater」卡片
- **THEN** 封面從卡片位置平滑過渡到專案頁頂端的主視覺

### Requirement: 返回首頁反向轉場
從專案頁返回首頁（瀏覽器返回或點擊導覽）時，封面 SHALL 反向過渡回首頁卡片位置。

#### Scenario: 瀏覽器返回
- **WHEN** 訪客在專案頁按瀏覽器返回
- **THEN** 封面縮回首頁對應卡片的位置

### Requirement: 其他換頁淡入淡出
首頁、專案頁、About 頁之間的其他換頁 SHALL 以短暫淡入淡出過渡。

#### Scenario: 前往 About
- **WHEN** 訪客點擊導覽的 About
- **THEN** 頁面以淡入淡出切換

### Requirement: 轉場不影響功能
換頁後頁面腳本（首頁畫廊、比例尺、圖面放大檢視）SHALL 正常運作，轉場 MUST NOT 延遲頁面可操作的時間超過 400ms。

#### Scenario: 轉場後開啟圖面
- **WHEN** 訪客經由轉場進入專案頁並點擊圖面
- **THEN** 放大檢視正常開啟

