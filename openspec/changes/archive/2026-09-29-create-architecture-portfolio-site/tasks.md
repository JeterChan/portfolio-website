## 1. 專案初始化

- [x] 1.1 建立 Astro 專案（TypeScript strict、靜態輸出），初始化 git 與 `.gitignore`
- [x] 1.2 設定 Astro i18n（`defaultLocale: "en"`、`locales: ["en"]`、`prefixDefaultLocale: false`）
- [x] 1.3 建立 `src/i18n/en.ts` 介面字串字典與取用 helper
- [x] 1.4 安裝 `satteri`、`photoswipe`、`@astrojs/sitemap`、Archivo 字體，確認 `npm run build` 通過

## 2. 內容模型

- [x] 2.1 以 content layer `glob` loader 定義 `projects` collection（`content/projects/**/index.*.md`），排除 `_template`
- [x] 2.2 撰寫 frontmatter zod schema（必填 `title`/`year`/`cover`，其餘選填、`draft`、`order`），`cover` 以 `image()` 驗證
- [x] 2.3 實作語系解析（由檔名取 `lang`）與 slug 產生（去除 `NN-` 前綴）
- [x] 2.4 實作排序（`order` 優先，否則資料夾前綴）與 `draft` 過濾的共用查詢函式
- [x] 2.5 定義 `profile` collection（`content/profile/index.en.md`：name、email、links、CV 段落）
- [x] 2.6 建立 `content/_template/` 範本（示範全部欄位與五種區塊，附註解說明）

## 3. 區塊語法

- [x] 3.1 撰寫區塊解析器（`src/lib/blocks.ts`）：將 `full`/`text-left`/`text-right`/`drawing`/`row` 轉為對應元件資料
- [x] 3.2 圖片路徑相對專案資料夾解析，並接上 `astro:assets` 最佳化
- [x] 3.3 建置期驗證：未知區塊、缺圖、`row` 張數不在 2–4 → 以白話錯誤（檔案、行號、建議）中止建置
- [x] 3.4 `alt` 後備規則（alt → caption → 專案名稱）
- [x] 3.5 以會失敗的範例檔手動驗證每種錯誤訊息內容

## 4. 佔位內容

- [x] 4.1 產生 3 個佔位專案（佔位圖含一張高解析圖面、lorem 文字），涵蓋全部區塊類型
- [x] 4.2 建立佔位 `content/profile/index.en.md`

## 5. 全站版面

- [x] 5.1 Base layout：`<html lang>`、meta/OG、skip link、導覽（名稱、Work、About）
- [x] 5.2 視覺方向：製作 2–3 版字體／色彩／留白 mockup 讓擁有者選擇，定案後建立 CSS design tokens
- [x] 5.3 全域聚焦樣式與 AA 對比檢查
- [x] 5.4 自訂 404 頁

## 6. 首頁橫向畫廊

- [x] 6.1 專案卡片元件（封面 `<Picture>`、名稱、年份、連結），首張 eager + `fetchpriority="high"`
- [x] 6.2 桌機橫向 overflow 版面；< 768px 直向堆疊（純 CSS）
- [x] 6.3 滾輪轉換腳本：僅 deltaY 主導時轉橫向、兩端放行、手機不啟用、尊重 reduced-motion
- [x] 6.4 鍵盤：方向鍵捲動、Tab 聚焦時 `scrollIntoView`
- [x] 6.5 以觸控板、滑鼠、鍵盤、手機寬度實測

## 7. 專案頁

- [x] 7.1 動態路由 `/projects/[slug]`，專案資訊標頭（僅顯示已填欄位）
- [x] 7.2 區塊元件：Full、TextImage（左/右）、Row、Drawing、文字段落；手機單欄
- [x] 7.3 Drawing 整合 PhotoSwipe：動態 import、高解析大圖、ESC/鍵盤、關閉回原位置
- [x] 7.4 上一個／下一個（循環）與返回首頁導覽
- [x] 7.5 專案 OG 使用封面圖

## 8. About 頁

- [x] 8.1 `/about` 頁：簡介、CV 段落、email（mailto）、外部連結
- [x] 8.2 PDF 下載：建置時偵測 `public/portfolio.pdf`，存在才顯示連結與檔案大小（About 與導覽）

## 9. 品質驗證

- [x] 9.1 產生 sitemap，檢查所有頁面 title/description/OG
- [x] 9.2 本機 Lighthouse 行動版：首頁與一個專案頁 Performance ≥ 90、CLS < 0.1
- [x] 9.3 鍵盤全流程測試（首頁 → 專案 → 圖面檢視器 → 關閉 → 下一個專案）
- [x] 9.4 放入 `index.zh.md` 測試檔，確認英文頁不受影響後移除

## 10. 部署

- [x] 10.1 擁有者建立 GitHub 與 Vercel 帳號；建立 GitHub repository 並推送
- [x] 10.2 Vercel 匯入 repository（Astro preset），設定專案名稱決定 `*.vercel.app` 子網域
- [x] 10.3 驗證 production 網址、preview 分支部署、建置失敗時 production 不變（2026-09-29：以暫時分支推送錯誤內容，Vercel 建置失敗，production 維持 `36cdcd1`，測試後刪除分支）
- [x] 10.4 撰寫 `README.md`（中文）：如何新增專案、區塊語法速查、如何請 Claude 部署

## 11. 真實內容（PDF 到位後）

- [x] 11.1 確認 PDF 與原始圖檔：用 `pdfimages`/`pdftoppm`/文字擷取拆出素材到暫存資料夾
- [x] 11.2 依 PDF 建立各專案資料夾與 `index.en.md` 初稿，擁有者確認文字與圖序
- [x] 11.3 壓縮 PDF 作品集（< 20MB）放入 `public/portfolio.pdf`
- [x] 11.4 移除佔位內容、填入真實 profile，重跑第 9 節驗證後部署（Lighthouse 行動版首頁 99、專案頁 98–100、CLS 0；sitemap／meta、鍵盤、語系隔離皆通過）
