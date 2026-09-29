---
# 複製整個 _template 資料夾到 content/projects/，改名為「數字-英文名稱」，例如 04-city-library
# 資料夾開頭的數字決定首頁順序；網址會去掉數字，例如 /projects/city-library

# ── 必填 ──
title: Project Title
year: 2025
cover: ./cover.jpg            # 首頁封面，圖片放在同一個資料夾

# ── 選填（不需要的整行刪掉即可）──
coverAlt: Short description of the cover image
summary: One sentence that says what the project is.
studio: Design Studio V
location: City, Country
type: Cultural
instructor: Prof. Name
collaborators: [Name One, Name Two]
# order: 1                    # 想覆寫資料夾排序時才用
# draft: true                 # 設為 true 就不會出現在網站上
---

<!-- 以下為版面區塊。一般段落直接寫文字即可。 -->

<!-- 全版大圖 -->
::full{src="01-aerial.jpg" alt="What the image shows" caption="Caption under the image"}

A normal paragraph. Write text here without any special syntax.

<!-- 文字在左、圖在右（text-right 則相反）。三個冒號開頭，最後一行只寫 ::: -->
:::text-left{src="02-model.jpg" alt="Physical model" caption="Massing model, 1:500"}
Text that sits beside the image.
:::

<!-- 圖面：點擊可放大看細線。建議用高解析 PNG -->
::drawing{src="03-plan.png" caption="Ground floor plan 1:200"}

<!-- 2–4 張並排，檔名用逗號分開 -->
::row{src="04.jpg, 05.jpg, 06.jpg" alt="Detail one, Detail two, Detail three" caption="Detail models, 1:20"}
