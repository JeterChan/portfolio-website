## Why

網站已上線，但首頁封面在高解析螢幕上會糊：PDF 內嵌的渲染圖只有 773–2229px 寬，首頁卡片卻需要約 1800px 才夠清楚。另外，擁有者希望網站更生動，參考 Apple iPhone 產品頁「隨捲動播放的動畫」，強度設定為「中等」：有記憶點，但仍以作品為主。

## What Changes

- **首頁封面統一尺寸**：所有封面改為相同比例、相同大小的框，圖片以裁切填滿（`object-fit: cover`），框的大小限制在「最小的封面放大後仍可接受」的範圍內。
- **首頁開場**：擁有者名字以描線方式出現，接著作品卡片依序滑入；同一次瀏覽只播放一次。
- **首頁畫廊動態**：卡片隨橫向捲動有輕微視差；滑過卡片時圖片微幅放大；比例尺指示器平滑移動。
- **專案頁新增封面主視覺**：頁首加入全寬封面，捲動時隨進度縮小並淡出、標題浮現（Apple 式捲動驅動）。
- **專案頁捲動動畫**：圖片、圖面、文字進入畫面時依捲動進度揭露（像描圖紙被掀開），並排圖依序出現。
- **換頁轉場**：從首頁點進專案時，封面平滑放大、移動成專案頁的主視覺；返回時反向。
- **圖面互動**：滑過圖面時顯示放大提示游標，開啟和關閉放大檢視有過渡動畫。
- 所有動畫在使用者開啟「減少動態」時完全停用；不支援的瀏覽器維持目前的靜態版面。

## Capabilities

### New Capabilities
- `motion-foundation`: 全站動畫原則：減少動態、漸進增強與後備、效能與版面穩定、不阻擋操作。
- `cover-presentation`: 首頁封面統一框架與解析度上限。
- `home-motion`: 首頁開場（名字描線、卡片依序進場）與畫廊互動動態。
- `project-motion`: 專案頁封面主視覺的捲動驅動動畫、內容揭露、圖面互動。
- `page-transitions`: 首頁與專案頁之間的換頁轉場。

### Modified Capabilities
（無。前一個變更 `create-architecture-portfolio-site` 尚未歸檔，其規格尚未進入 `openspec/specs/`；本變更的需求以新增能力描述，與既有行為相容。）

## Impact

- 修改：`src/pages/index.astro`、`src/components/ProjectCard.astro`、`src/pages/projects/[slug].astro`、`src/components/blocks/*`、`src/layouts/Base.astro`、`src/styles/global.css`。
- 新增：動畫用的 CSS 與少量 JS（開場、後備偵測）。
- 不新增大型動畫函式庫；以 CSS 捲動驅動動畫與 View Transitions API 為主。
- 效能：需維持 Lighthouse 行動版 Performance ≥ 90、CLS < 0.1。
