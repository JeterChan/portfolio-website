# reading-progress Specification

## Purpose
TBD - created by archiving change refine-project-page-fidelity-and-motion. Update Purpose after archive.
## Requirements
### Requirement: 閱讀進度比例尺
專案頁 SHALL 在畫面頂端固定顯示比例尺樣式的進度條，填滿比例對應頁面捲動進度。

#### Scenario: 捲動到一半
- **WHEN** 訪客捲動到專案頁一半
- **THEN** 進度條填滿約一半

#### Scenario: 頁面頂端
- **WHEN** 訪客位於專案頁頂端
- **THEN** 進度條為空

### Requirement: 進度條為純視覺輔助
進度條 SHALL 標示 `aria-hidden="true"`，MUST NOT 擋住導覽或內容的點擊。

#### Scenario: 點擊導覽
- **WHEN** 訪客點擊位於進度條下方的導覽連結
- **THEN** 正常導向

### Requirement: 相容性與減少動態
不支援捲動驅動動畫的瀏覽器 SHALL 以腳本更新進度；開啟減少動態時進度條 SHALL 仍顯示進度，但不使用過渡動畫。

#### Scenario: 不支援 scroll timeline
- **WHEN** 瀏覽器不支援 `animation-timeline`
- **THEN** 進度條仍隨捲動更新

