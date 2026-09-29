## Why

求職時事務所會先看 PDF 作品集，有興趣才點網站，停留約 1–3 分鐘。需要一個載入快、版面具辨識度、能展現建築敘事與圖面細節的個人作品集網站，作為 PDF 之外的專業門面。擁有者不寫程式，因此內容必須能以「資料夾 + 文字檔」維護，不依賴後台或資料庫。

## What Changes

- 新建 Astro 靜態網站，無後端、無資料庫、無 CMS。
- 內容以資料夾管理：每個專案一個資料夾（`content/projects/<slug>/`），含 `index.en.md` 與圖片；檔案即內容來源。
- 專案頁排版以少量「區塊語法」在 markdown 中描述（全版圖、左右圖文、可放大圖面、並排圖列）。
- 首頁：橫向捲動畫廊（滾輪／觸控板／鍵盤可操作，手機改為直向堆疊）。
- 專案頁：敘事式直向捲動，圖面（平立剖）可放大檢視細線。
- About 頁：簡介、CV、聯絡方式、PDF 作品集下載。
- 建置時自動最佳化圖片（多尺寸、現代格式、lazy load）。
- 現階段僅英文，但內容檔名與路由預留多語系（`index.<lang>.md`、未來 `/zh/` 前綴，英文網址不變）。
- 原始素材為擁有者的 PDF 作品集（尚未放入 repo）；先以佔位內容完成框架與版型，PDF 到位後再填入真實內容。
- 部署至 Vercel，使用免費 `*.vercel.app` 子網域。

## Capabilities

### New Capabilities
- `project-content`: 專案內容模型 — 資料夾結構、frontmatter 欄位、區塊語法、排序規則、語系檔名慣例與內容驗證。
- `home-gallery`: 首頁橫向畫廊 — 專案封面排列、橫向捲動互動、鍵盤與觸控支援、手機直向版。
- `project-page`: 專案敘事頁 — 各區塊呈現、圖面放大檢視、專案資訊、上一個／下一個專案導覽。
- `profile-page`: About / CV / Contact 頁與 PDF 作品集下載。
- `site-foundation`: 全站基礎 — 版面與導覽、預留 i18n 的路由、圖片最佳化、效能與無障礙基準、SEO metadata、Vercel 部署。

### Modified Capabilities
（無 — 全新專案）

## Impact

- 新增專案：Astro、TypeScript、Astro content collections、`astro:assets` 圖片處理（sharp）。
- 新增圖面放大元件相依（輕量 zoom/lightbox 函式庫或自製）。
- 部署：Vercel 專案與 GitHub repository（需擁有者授權帳號）。
- 無既有程式碼受影響。
