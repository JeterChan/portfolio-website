## Context

- 全新空專案，無既有程式碼。
- 擁有者：建築系畢業生，用途為求職；不寫程式，之後透過「放檔案 + 請 Claude 部署」更新內容。
- 素材來源：擁有者的 PDF 作品集（之後放入 repo 根目錄），原始高解析圖檔是否存在未知。
- 語言：現階段英文單語，未來加入其他語言（例如中文）。
- 部署：Vercel 免費方案，`*.vercel.app` 子網域。

## Goals / Non-Goals

**Goals:**
- 擁有者只需編輯 `content/` 內的資料夾與 markdown 即可新增／修改專案。
- 首頁橫向畫廊、專案頁敘事捲動，版面具辨識度但操作不讓人暈。
- 圖面（平立剖）可放大檢視細線。
- 首頁在一般 4G 連線下快速呈現（目標 LCP < 2.5s），JavaScript 極少。
- 多語系可在不改網址、不重構內容的情況下加入。

**Non-Goals:**
- CMS／後台、帳號、搜尋、留言。
- 3D 模型檢視器。
- 現階段的多語系內容與語言切換 UI。
- 自訂網域（之後可在 Vercel 綁定，不影響架構）。
- 自動把 PDF 轉成完整網站（PDF 拆解為一次性、人工挑選的流程）。

## Decisions

### D1. 框架：Astro 7（靜態輸出）
- 內容導向、預設零 JS、內建 content collections 與 `astro:assets` 圖片最佳化，完全符合「資料夾即內容」。
- 替代方案：Next.js（對純靜態內容站過重）、Eleventy（圖片與型別驗證需自行組裝）、Cargo 等現成平台（已排除：版面自由度不足）。

### D2. 內容結構：repo 根目錄 `content/projects/<NN-slug>/`
```
content/
  projects/
    01-riverside-museum/
      index.en.md
      cover.jpg
      01-aerial.jpg
      02-model.jpg
      03-plan.png
  profile/
    index.en.md        # About / CV / Contact
public/
  portfolio.pdf        # 可下載的 PDF 作品集
```
- 以 Astro content layer 的 `glob` loader 讀取 `content/projects/**/index.*.md`。
- 資料夾前綴數字 `NN-` 僅用於排序顯示；網址 slug 去除前綴（`/projects/riverside-museum`），重新排序不會改變網址。
- frontmatter 以 zod schema 驗證，錯誤時建置失敗並指出檔案與欄位。
- frontmatter 欄位：`title`、`year`、`studio`（課程，例如 Design Studio V）、`location`、`type`（文化／住宅…）、`cover`、`summary`、`collaborators`（選填）、`instructor`（選填）、`draft`（選填，true 則不發佈）、`order`（選填，覆寫資料夾排序）。

### D3. 區塊語法：自寫行式解析器（取代原訂 remark-directive）
實作時發現 Astro 7 預設 markdown 引擎改為 Sätteri（非 remark），remark plugin 屬過時路徑。改為在專案頁讀取 `entry.body`，由 `src/lib/blocks.ts` 以行為單位解析 directive 語法，文字段落以 `satteri` 的 `markdownToHtml` 轉 HTML，圖片再交給 Astro 元件（`<Picture>`）渲染：
```md
::full{src="01-aerial.jpg" alt="Aerial view"}

:::text-left{src="02-model.jpg" alt="Physical model"}
The project begins with the river edge...
:::

::drawing{src="03-plan.png" caption="Ground Floor Plan 1:200"}

::row{src="04.jpg, 05.jpg, 06.jpg" caption="Process models"}
```
- 區塊：`full`、`text-left`、`text-right`、`drawing`、`row`（2–4 張）。
- `src` 相對於專案資料夾，透過 `import.meta.glob` 取得圖片 metadata；找不到檔案、未知區塊、`row` 張數不符、container 未關閉 → 建置失敗，錯誤訊息含檔案路徑與原始檔行號（中文）。
- 好處：不依賴 markdown 引擎的 plugin API、驗證與錯誤訊息完全可控、版面元件為一般 Astro 元件。
- 替代方案：Sätteri mdast plugin（API 新、文件少）、MDX 元件（語法錯誤訊息對非工程師不友善）、frontmatter YAML 區塊陣列（縮排易錯）。

### D4. 首頁橫向畫廊：原生橫向 overflow + 克制的滾輪轉換
- 版面為 CSS 橫向 flex/overflow 容器，原生捲動（觸控板橫滑、Shift+滾輪、觸控）天然可用。
- 僅在「垂直滾輪且 deltaY 主導」時將滾輪轉為橫向捲動；觸控板橫向手勢不攔截；到達兩端時放行。
- 方向鍵左右、Tab 聚焦卡片時自動捲入視野。
- 不使用平滑捲動函式庫；尊重 `prefers-reduced-motion`。
- 視窗寬度 < 768px：改為直向堆疊（純 CSS），不做任何滾輪轉換。

### D5. 圖面放大：PhotoSwipe v5
- 支援滾輪／雙指縮放、平移、鍵盤、ESC 關閉，體積小、無相依。
- 放大時載入高解析版本（原圖或 ≥ 3000px 寬），頁面內只載入適當尺寸。
- 只在有 `drawing` 區塊的頁面載入其 JS（Astro 只在使用該元件的頁面打包 script；PhotoSwipe 核心再以動態 import 延遲載入）。
- 替代方案：OpenSeadragon deep zoom（僅在圖面超過約 8000px 才值得，需切 tile，列為未來選項）。

### D6. 圖片最佳化：`astro:assets`
- 所有內容圖片經 `<Picture>` 輸出 AVIF/WebP + 多寬度 `srcset`，自動 `width/height` 避免版面位移。
- 首頁首屏封面 eager + `fetchpriority="high"`，其餘 lazy。
- `drawing` 區塊保留高品質（或無損）大圖供放大使用。

### D7. i18n 預留
- 內容檔名 `index.<lang>.md`，語系由檔名解析；現階段只有 `en`。
- Astro i18n：`defaultLocale: "en"`、`locales: ["en"]`、`prefixDefaultLocale: false` → 英文網址無前綴；未來加入 `zh` 時為 `/zh/...`，英文網址不變。
- 介面字串（導覽、按鈕、標籤）集中於 `src/i18n/en.ts`，元件不寫死文字。
- `<html lang>` 依語系輸出。

### D8. PDF 素材拆解：一次性、Claude 協助的人工流程
- 使用 poppler（`pdfimages` 抽原始嵌入圖、`pdftoppm` 整頁高解析輸出）＋ 文字擷取，產出暫存資料夾供挑選。
- 由 Claude 依 PDF 內容建立各專案資料夾與 `index.en.md` 初稿，擁有者確認文字與圖序。
- 在 PDF 到位前，以 `scripts/make-placeholders.mjs`（sharp）產生的 3 個佔位專案（佔位圖＋ lorem 文字）完成全部版型並可部署。

### D9. 部署：Vercel + GitHub
- 靜態輸出，無需 adapter；Vercel 以 Git 整合，推送 `main` 即部署 production，其他分支產生 preview。
- 專案名稱決定子網域（例如 `<name>-portfolio.vercel.app`）。

### D10. 視覺方向（A 描圖紙，2026-09-29 由擁有者從三版中選定）
- 比較過的方案：B 白模（純白、細 grotesk、小字級）、C 紙板與切割墊（紙板底、Newsreader 襯線、切割墊綠）。
- 題材語彙取自圖紙：冷灰描圖紙底、墨黑、石墨灰、藍鉛筆色僅用於聚焦與互動；Archivo 可變字體（寬體用於標題）。
- 首頁唯一強調元素：比例尺式捲動指示器（一格一個專案，可點擊跳轉）。
- 專案頁標頭以圖框標題欄（title block）格線呈現專案資訊。

## Risks / Trade-offs

- [PDF 抽出的圖畫質被壓縮，圖面放大後模糊] → 優先使用原始圖檔；若無，`pdfimages` 取嵌入原圖而非整頁截圖，並在 Open Questions 追蹤。
- [大量高解析圖讓 git repo 與建置變慢] → 放入前將來源圖限制在約 4000px 長邊（圖面可例外）；Vercel build cache 保留圖片最佳化結果；單檔超過 20MB 時提示。
- [滾輪轉橫向讓部分使用者不適] → 只轉換垂直滾輪、兩端放行、支援 reduced-motion、手機完全不轉換。
- [擁有者編輯 directive 語法打錯] → 建置時驗證並輸出白話錯誤（檔案、行號、建議寫法）；提供 `content/_template/` 範本資料夾複製使用。
- [Vercel Hobby 方案限非商業用途] → 個人作品集屬允許範圍；若未來接案商業化再評估。
- [PDF 作品集檔案過大影響下載] → 建議壓縮至 < 20MB；About 頁顯示檔案大小。

## Migration Plan

全新網站，無遷移。部署順序：本機建置通過 → 推送 GitHub → 連接 Vercel → production 網址驗證。回滾：Vercel dashboard 一鍵 promote 前一版部署。

## Open Questions

- 是否有原始高解析圖檔（InDesign links、原始圖面）？影響圖面放大品質。
- 專案數量與 PDF 大小（PDF 放入後確認）。
- GitHub 帳號與 Vercel 帳號由擁有者建立並授權。
- 網站名稱／子網域名稱。
