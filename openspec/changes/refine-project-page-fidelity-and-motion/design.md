## Context

- 分支 `feat/motion-and-covers` 已完成 `add-motion-and-uniform-covers`，預覽網址經擁有者檢視後回報問題（見 proposal）。
- 圖片原尺寸（取自 PDF）偏小：封面 773–2229px；內文照片 470–1280px；點陣平面圖 937–2641px；整頁圖版渲染 4000px。
- 擁有者的決定（2026-09-29）：
  - 畫質標準：「不超過原圖尺寸」，也就是 CSS 顯示寬度 ≤ 原圖像素寬度。一般螢幕不放大；Retina 螢幕的清晰度與原 PDF 相同。
  - 專案頁動畫：進場淡入上浮、文字逐行浮現、資訊表格線描出、圖面放大鏡、閱讀進度比例尺。
  - 不採用：圖片框內視差、平滑慣性捲動、平面圖跑馬燈。
- 參考：micahhoang.com 的專案頁。觀察到元素進入畫面時約 0.8 秒淡入上浮（計時觸發，不跟捲動進度），以及標題與段落依序出現。

## Goals / Non-Goals

**Goals:**
- 專案頁任何圖片都不以大於原圖像素的尺寸顯示。
- 動畫明顯可察覺，但仍以作品為主；每個元素只動一次。
- 維持 Lighthouse 行動版 Performance ≥ 90、CLS < 0.1，以及減少動態、漸進增強原則。

**Non-Goals:**
- 不提升原圖解析度（例如 AI 放大、換原檔）。
- 不改首頁：以 1x 標準檢查，首頁卡片（540×360）已不超過任何封面的原尺寸。
- 不做平滑慣性捲動、框內視差、跑馬燈。

## Decisions

### D1. 畫質上限：以 CSS 限制顯示寬度 ≤ 原圖寬度
- 每個圖片元件在 style 輸出 `--natural-width: <原圖寬>px`，圖片 `max-width: min(100%, var(--natural-width))`。`Figure` 已有這個規則，延伸到 `Drawing` 與封面主視覺。
- 圖面白色圖紙框改為 `width: fit-content`，跟著圖面實際寬度，不留大片空白。
- `srcset` 最大寬度不超過原圖寬，不產生放大版本。
- 替代方案：用 JS 依 `devicePixelRatio` 計算。擁有者選擇 1x 標準，不需要。

### D2. 封面主視覺：取消 sticky 縮放，改為原尺寸封面 + 進場動畫
- 版面：封面依原圖比例顯示，寬度 `min(100%, 原圖寬)`，高度上限 75svh（超過時等比例縮小寬度），置於內容欄左側，專案標題與摘要在下方。
- 保留 `view-transition-name: cover-<slug>`，首頁卡片轉場到這張封面。
- 封面不做進場淡入（實作時調整）：原本以 `pagereveal` 偵測轉場抵達來略過淡入，實測不可靠，轉場目標會從透明開始；封面也是 LCP 元素，直接顯示對效能較好。標題與摘要仍逐行浮現。
- 理由：原本的縮放效果必須從滿版開始，而滿版一定會放大低解析原圖，和「畫質優先」衝突。
- 手機：同樣的規則，寬度 100% 但不超過原圖寬。

### D3. 進場動畫：IntersectionObserver 觸發 + CSS transition
- 在 `<html>` 加 `js-motion` class 時（有 JS 且未開啟減少動態），`.enter` 元素的初始狀態為 `opacity: 0; transform: translateY(32px)`。進入視窗 15% 時加上 `.is-in`，以 800ms `--ease-out` 過渡到完成狀態。
- 並排圖以 `--n` 設定 `transition-delay: calc(var(--n) * 120ms)`。
- 取代 `add-motion-and-uniform-covers` 的 `.reveal`／`.reveal-text`（scroll-driven），移除相關 CSS。
- 沒有 JS 或減少動態時不加 `js-motion`，內容直接顯示。載入時已在視窗內的元素也會立即觸發，沒有空白期。
- 替代方案：
  - 保留 scroll-driven：擁有者回饋不易察覺。
  - GSAP：功能過剩，JS 較重。

### D4. 文字逐行浮現
- 對 `[data-lines]` 元素（專案標題、摘要、內文段落），以 JS 將文字拆成字詞 `<span>`，依 `offsetTop` 分組算出行號，設定 `--line`。每個字詞 `transition-delay: calc(var(--line) * 90ms)`，由下方 12px 淡入。
- 只拆純文字節點，保留 `<strong>`、`<a>` 等內嵌元素。拆分在元素進入畫面前才執行，並在動畫完成後不再重算，避免視窗縮放時錯位。
- 無障礙：拆分不改變文字內容與順序，螢幕報讀器照常讀出。

### D5. 資訊表格線描出
- 格線改由偽元素繪製：橫線 `scaleX(0→1)`、直線 `scaleY(0→1)`，依格子順序錯開 60ms。格線完成後（約 500ms）內容淡入。
- 未觸發動畫時格線照常顯示，與目前樣式一致。

### D6. 圖面放大鏡 — 已由 `replace-loupe-with-animated-cursor` 取代
- 啟用條件：`(hover: hover) and (pointer: fine)`，且 `原圖寬 / 顯示寬 ≥ 1.5`。倍率 = `min(2.5, 原圖寬 / 顯示寬)`，確保放大鏡內不超過原圖解析度。整頁圖版（4000px）通常可啟用；原尺寸顯示的點陣平面圖不啟用，改顯示原本的「Enlarge」標籤。
- 圓形直徑 200px，以 `background-image` 顯示放大用的大圖（沿用 PhotoSwipe 的 `href`，第一次滑入時才載入），`background-position` 跟隨游標。
- 取代跟隨游標的「Enlarge」標籤。放大鏡邊框使用強調色，下方附小字「Click to enlarge」。
- 點擊仍開啟 PhotoSwipe 全螢幕檢視；鍵盤與觸控不受影響。

### D7. 閱讀進度比例尺
- 專案頁頂端固定一條 6px 高的比例尺：底為黑白相間刻度，上層強調色填滿條以 `scaleX` 表示進度。
- 以 CSS `animation-timeline: scroll(root)` 驅動，不支援時以 `scroll` 事件（requestAnimationFrame 節流）更新 `--progress`。
- `aria-hidden="true"`，純視覺輔助。

### D8. 與前一個變更的關係
- 更新 `add-motion-and-uniform-covers/specs/project-motion/spec.md`：移除「專案封面主視覺」的 sticky 縮放與「內容隨捲動揭露」兩項需求，改為指向本變更。design 與 tasks 加註。
- 兩個變更在同一分支，擁有者確認預覽後一起合併並依序歸檔。

## Risks / Trade-offs

- [封面變小，失去 Apple 式滿版氣勢] → 擁有者明確選擇畫質優先。進場動畫與換頁轉場仍保留動感。
- [文字拆字在長段落增加 DOM 節點] → 內文段落數量少（每個專案 1–4 段），可接受。只在進入畫面前拆。
- [放大鏡在部分圖面不出現，行為不一致] → 以「Enlarge」標籤補足，點擊行為一致。
- [IntersectionObserver 版本在 JS 失敗時隱藏內容] → 初始隱藏只在 `html.js-motion` 下生效，而這個 class 由同一支腳本在確定可執行時才加上。

## Migration Plan

- 在 `feat/motion-and-covers` 分支實作並推送，由新的 Vercel 預覽網址確認。
- 確認後合併 `main`；回滾方式與前一變更相同。

## Open Questions

（無）
