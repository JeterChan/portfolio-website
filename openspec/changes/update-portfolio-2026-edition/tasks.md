## 1. 準備

- [x] 1.1 建立分支 `feat/portfolio-2026-edition`
- [x] 1.2 擷取新版 PDF：嵌入圖、跨頁偵測、圖版 400dpi 輸出；製作各專案素材清單

## 2. 程式調整

- [x] 2.1 content schema 新增選填 `lang`；專案頁與首頁卡片輸出 `lang` 屬性
- [x] 2.2 `:lang(zh)` 字型堆疊與行距
- [x] 2.3 逐行拆字改用 `Intl.Segmenter`（含 CJK 逐字後備）

## 3. 專案內容

- [x] 3.1 01 小城故巷多（中文說明、`lang: zh-Hant`）
- [x] 3.2 02 Hybrid International Youth Hostel
- [x] 3.3 03 Dinner Theater
- [x] 3.4 04 Digital Building Fabrication Center
- [x] 3.5 05 Hydrological Exhibition Center
- [x] 3.6 06 構竹浮雲 Bamboo Forest Iron Cenozoic Exhibition
- [x] 3.7 07 Handmade Models / Sketchings
- [x] 3.8 移除舊專案資料夾與圖檔；確認既有網址不變
- [ ] 3.9 填入擁有者提供的年份（擁有者表示後續提供，暫時維持原樣：01–06 為 TBC、07 為 2021–2023）

## 4. CV 與 PDF

- [x] 4.1 依新版 CV 更新 profile（新 email、LinkedIn；不含電話、生日、照片、Issuu）
- [x] 4.2 壓縮新版 PDF 取代 `public/portfolio.pdf`（200dpi 為 30.9MB，改用 150dpi，約 20MB）

## 5. 驗證與交付

- [x] 5.1 build／check 通過；逐頁檢查圖片不超過原圖寬度
- [x] 5.2 中文專案：`lang` 屬性、字型、逐行浮現與換行
- [x] 5.3 Lighthouse 行動版首頁與兩個專案頁 Performance ≥ 90、CLS < 0.1
- [x] 5.4 推送分支，提供 Vercel 預覽網址
- [ ] 5.5 擁有者確認後合併 `main` 上線、歸檔，更新 `docs/progress`
