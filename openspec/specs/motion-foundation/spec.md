# motion-foundation Specification

## Purpose
TBD - created by archiving change add-motion-and-uniform-covers. Update Purpose after archive.
## Requirements
### Requirement: 尊重減少動態設定
當訪客系統設定 `prefers-reduced-motion: reduce` 時，網站 MUST NOT 播放任何開場、捲動、視差、轉場或懸停位移動畫，所有內容 SHALL 直接以完成狀態呈現。

#### Scenario: 減少動態下瀏覽首頁
- **WHEN** 開啟減少動態的訪客進入首頁
- **THEN** 名字與卡片立即完整顯示，沒有描線或滑入動畫

#### Scenario: 減少動態下瀏覽專案頁
- **WHEN** 開啟減少動態的訪客捲動專案頁
- **THEN** 圖片與文字不做揭露動畫，封面主視覺不 sticky 也不縮放

### Requirement: 漸進增強
不支援捲動驅動動畫或 View Transitions 的瀏覽器 SHALL 顯示完整、可用的靜態版面，內容 MUST NOT 因動畫未執行而隱藏。

#### Scenario: 不支援捲動驅動動畫
- **WHEN** 瀏覽器不支援 `animation-timeline`
- **THEN** 專案頁所有圖片與文字皆可見，版面與動畫前一致

#### Scenario: 不支援 View Transitions
- **WHEN** 瀏覽器不支援跨文件 View Transitions 且訪客點擊專案卡片
- **THEN** 正常換頁，無錯誤

### Requirement: 動畫不影響版面穩定與效能
動畫 SHALL 只改變 `transform`、`opacity`、`clip-path`，不得造成版面位移；加入動畫後首頁與專案頁的 Lighthouse 行動版 SHALL 維持 Performance ≥ 90、CLS < 0.1。

#### Scenario: Lighthouse 驗證
- **WHEN** 對加入動畫後的首頁與一個專案頁執行 Lighthouse 行動版
- **THEN** Performance ≥ 90 且 CLS < 0.1

### Requirement: 動畫不阻擋操作
動畫期間所有連結與按鈕 SHALL 可立即操作，網站 MUST NOT 攔截或改變頁面的垂直捲動速度（首頁畫廊既有的滾輪轉橫向行為除外）。

#### Scenario: 開場期間點擊
- **WHEN** 首頁開場動畫進行中，訪客點擊一張卡片
- **THEN** 立即導向該專案頁

