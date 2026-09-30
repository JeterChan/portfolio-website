## Why

擁有者提供新版作品集 `作品集.pdf`（78 頁，2026-09-30），要把網站內容更新成這一版並部署。新版新增兩個專案、更新模型作品與 CV，既有專案也多了新的渲染圖與圖版。

## What Changes

- **專案內容全部改用新版 PDF**，依新版順序與編號：
  1. 小城故巷多 Small Town, Old Lanes（新增，說明為中文）
  2. Hybrid International Youth Hostel（新增室內／室外渲染等頁）
  3. Dinner Theater（新增室內渲染等頁）
  4. Digital Building Fabrication Center
  5. Hydrological Exhibition Center
  6. 構竹浮雲 Bamboo Forest Iron Cenozoic Exhibition（新增，團隊作品）
  7. Handmade Models / Sketchings（新增 Composition in Red, Blue, and Yellow）
- 既有專案的網址不變（網址由資料夾名稱去掉編號而來）。
- **中文內容支援**：專案可標示內容語言，讓中文說明在英文網站中被正確標記（`lang`）並以適合的字型與行距顯示；逐行浮現動畫支援沒有空格的中文。
- **CV 更新**：學歷（NTUST、ENSA Paris-Est Erasmus+）、實習（Lipsky+Rollet、Bio-Architecture Formosana）、獎項、工作坊、技能、語言。聯絡方式改為新 email 並新增 LinkedIn；電話、生日、照片、Issuu 不公開。
- **PDF 下載**更新為新版作品集的壓縮版。
- 專案年份依擁有者提供的資料填寫。

## Capabilities

### New Capabilities
（無）

### Modified Capabilities
- `project-content`: 新增「專案內容語言」需求（frontmatter 選填 `lang`）。
- `project-entrance-motion`: 新增「中文逐行浮現」需求（沒有空格的文字也能逐行出現）。

## Impact

- 內容：`content/projects/` 全部重建（7 個資料夾）、`content/profile/index.en.md`、`public/portfolio.pdf`。
- 程式：`src/content.config.ts`（`lang` 欄位）、`src/pages/projects/[slug].astro`（輸出 `lang` 與逐行拆字改用 `Intl.Segmenter`）、`src/styles/global.css`（中文字型與行距）。
- 新版 PDF 原檔（115MB）不進 git。
