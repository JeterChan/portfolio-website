# 建築作品集網站

Astro 靜態網站。所有內容都在 `content/` 資料夾，不需要寫程式。

## 新增一個專案

1. 複製 `content/_template/` 到 `content/projects/`，改名為「數字-英文名稱」，例如 `04-city-library`。
   - 開頭數字決定首頁順序。
   - 網址會去掉數字：`/projects/city-library`。之後改數字重新排序，網址不變。
2. 把圖片放進這個資料夾（JPG / PNG / WebP 都可以）。
3. 編輯 `index.en.md`：上方 `---` 之間是專案資料，下方是內文與版面。
4. 請 Claude「幫我檢查並部署」，或自己執行 `npm run build` 確認沒有錯誤。

不想公開某個專案：在資料中加 `draft: true`。

## 版面區塊速查

一般段落直接寫文字。需要圖片時用下面的區塊，每個區塊獨立一行：

| 效果 | 寫法 |
|---|---|
| 全版大圖 | `::full{src="01.jpg" alt="圖片內容" caption="圖說"}` |
| 可放大的圖面 | `::drawing{src="plan.png" caption="Ground floor plan 1:200"}` |
| 2–4 張並排 | `::row{src="a.jpg, b.jpg, c.jpg" caption="圖說"}` |
| 文字在左、圖在右 | 見下方 |
| 文字在右、圖在左 | 同下方，把 `text-left` 換成 `text-right` |

```md
:::text-left{src="model.jpg" alt="Physical model" caption="Massing model, 1:500"}
這裡的文字會排在圖片旁邊。
:::
```

- `src` 是同一個專案資料夾裡的檔名，大小寫要一致。
- `alt` 是給看不到圖片的人的描述；沒寫的話會用 `caption` 或專案名稱。
- 寫錯時建置會停止，並告訴你哪個檔案、第幾行、怎麼修。

## 個人資料與 PDF

- About 頁內容：`content/profile/index.en.md`。
- PDF 作品集：放到 `public/portfolio.pdf`（建議 20MB 以下），網站會自動出現下載連結；刪掉檔案連結就消失。

## 圖片建議

- 照片長邊約 2400–4000px 即可，網站會自動產生各種尺寸。
- 圖面用 PNG，長邊可到 4000–6000px，放大時才看得清楚細線。
- 單一檔案盡量在 20MB 以下。

## 常用指令

```bash
npm install        # 第一次使用
npm run dev        # 本機預覽 http://localhost:4321
npm run build      # 建置並檢查內容
```

## 部署

推送到 GitHub 的 `main` 分支後，Vercel 會自動建置並更新網站。建置失敗時，線上網站維持上一版。

## 範例內容

`content/projects/01-…`、`02-…`、`03-…` 是佔位範例，用 `scripts/make-placeholders.mjs` 產生。放入真實作品後刪除這三個資料夾。

## 多語系（未來）

在專案資料夾加 `index.zh.md`，並在 `astro.config.mjs` 的 `locales` 加入 `zh`、新增對應頁面即可；英文網址不會改變。
