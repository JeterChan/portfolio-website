## Context

- 新版 PDF：78 頁 A4 直式，Illustrator 輸出，683 張嵌入圖。跨頁版面是左右兩頁各放半張圖（同一張嵌入圖出現在相鄰兩頁，例如 6–7、14–15、28–29、32–33、36–37、66–67、74–75）。
- 既有專案（02–05）的說明文字與上一版相同；主要渲染圖仍是低解析（例如青年旅館封面 773px、劇場 1194px），但新增了新的渲染與圖版頁。
- 新專案 01 的圖檔解析度高（跨頁圖 4257px、配置圖 4462px）；06 的夜景與施工照片為 2481–3513px。
- 擁有者決定（2026-09-30）：
  - 01 的中文說明保留中文。
  - 公開新 email 與 LinkedIn，不公開 Issuu、電話、生日、照片。
  - 年份由擁有者提供。
  - 先給預覽網址，確認後才上線。

## Goals / Non-Goals

**Goals:**
- 網站內容與新版 PDF 一致，包括專案順序、新專案、新頁面。
- 中文內容在英文網站中語意正確、排版可讀，動畫照常運作。
- 維持 `image-fidelity`：所有圖片不超過原圖寬度。

**Non-Goals:**
- 不做多語系切換或 `/zh/` 路由。01 仍是英文網站中的一個中文內容專案。
- 不翻譯中文內容。
- 不提升低解析原圖。

## Decisions

### D1. 重建全部專案內容
- 以新版 PDF 重新擷取 7 個專案，取代現有 5 個專案資料夾。
- 資料夾依新版編號命名，slug 維持英文，既有網址不變：
  - `01-small-town-old-lanes`
  - `02-hybrid-youth-hostel`
  - `03-dinner-theater`
  - `04-digital-fabrication-center`
  - `05-hydrological-exhibition-center`
  - `06-bamboo-forest-iron-cenozoic`
  - `07-models-and-sketches`
- 擷取方式沿用上一次：
  - 照片與渲染：抽出原始嵌入圖，CMYK 轉 sRGB。
  - 點陣圖面：抽出原圖存 PNG。
  - 以向量為主的圖版：整頁或整個跨頁以 400dpi 輸出，裁白邊，縮至最寬 4000px，存 JPEG。
- 跨頁判斷：相鄰兩頁出現相同嵌入圖即視為跨頁，合併成一張圖版輸出。

### D2. 專案內容語言
- frontmatter 新增選填 `lang`（BCP 47，例如 `zh-Hant`）。未填時沿用頁面語言 `en`。
- 專案頁的標題區塊與內文容器輸出 `lang` 屬性。`<html lang="en">` 不變，網址與路由不變。
- 首頁卡片的專案名稱也輸出 `lang`。01 的標題為「小城故巷多 Small Town, Old Lanes」，中英並列。
- 字型：Archivo 沒有中文字，`:lang(zh)` 時字型堆疊加上系統中文字型（PingFang TC、Noto Sans TC、Microsoft JhengHei），行高調為 1.8，並關閉寬體軸。不另外載入網路中文字型，以免增加數 MB 下載量。

### D3. 中文逐行浮現
- 目前以空白切詞，中文段落會被當成單一詞，逐行效果失效，且整段變成 inline-block 影響換行。
- 改用 `Intl.Segmenter`，依元素的 `lang` 以 `granularity: 'word'` 切分。它支援中英混排，也處理標點。瀏覽器不支援時退回逐字切分 CJK 字元，其餘仍以空白切詞。
- 行號計算方式不變（依 `offsetTop` 分組）。

### D4. CV 與聯絡方式
- 依新版 CV 改寫 `content/profile/index.en.md`：學歷、實習（含專案與工作內容）、獎項、工作坊與經歷、技能、語言。
- `email: hungyungfan2@gmail.com`，`links: LinkedIn`。

### D5. PDF 下載
- 以 ghostscript 壓縮新版 PDF，取代 `public/portfolio.pdf`，目標約 20MB。實作時 200dpi 為 30.9MB，改用 150dpi（約 20.2MB），抽查密集圖面仍清晰。
- 擷取時發現新版 PDF 的照片為 Adobe CMYK JPEG，`pdfimages -all` 取出的原始資料色彩反轉，改用 `pdfimages -png` 由 poppler 轉成 sRGB。
- 新版原檔 `作品集.pdf` 在 repo 根目錄，已被 `/*.pdf` 忽略。

## Risks / Trade-offs

- [重建內容會替換所有圖檔，repo 變大] → 圖版限制在 4000px JPEG，並刪除舊圖檔。
- [中文系統字型在不同作業系統外觀不同] → 可接受；避免數 MB 的網路字型拖慢載入。
- [01 只有中文，英文讀者看不懂] → 擁有者明確選擇保留中文；標題中英並列，圖面本身可讀。
- [年份尚未提供] → 先以 `TBC` 建置預覽，擁有者提供後更新再上線。

## Migration Plan

在分支 `feat/portfolio-2026-edition` 開發 → 推送取得 Vercel 預覽網址 → 擁有者確認內容與年份 → 合併 `main` 上線 → 歸檔。

## Open Questions

- 各專案年份（擁有者提供）。
