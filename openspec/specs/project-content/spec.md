# project-content Specification

## Purpose
TBD - created by archiving change create-architecture-portfolio-site. Update Purpose after archive.
## Requirements
### Requirement: 專案以資料夾定義
系統 SHALL 將 `content/projects/` 下每個含 `index.<lang>.md` 的子資料夾視為一個專案，該資料夾內的圖片為該專案素材。

#### Scenario: 新增專案資料夾
- **WHEN** 擁有者新增 `content/projects/04-library/index.en.md` 與圖片並重新建置
- **THEN** 網站首頁與專案頁出現該專案，無需修改任何程式碼

#### Scenario: 草稿不發佈
- **WHEN** 專案 frontmatter 設定 `draft: true`
- **THEN** 該專案不出現在首頁、不產生專案頁

### Requirement: 專案排序與網址
系統 SHALL 依資料夾名稱數字前綴（或 frontmatter `order` 覆寫）排序專案，並以去除數字前綴的資料夾名稱作為網址 slug。

#### Scenario: 依前綴排序
- **WHEN** 存在 `01-museum` 與 `02-housing` 兩個資料夾
- **THEN** 首頁先顯示 museum，再顯示 housing

#### Scenario: 重新排序不改網址
- **WHEN** 擁有者將 `02-housing` 改名為 `01-housing`
- **THEN** 專案網址仍為 `/projects/housing`

### Requirement: frontmatter 驗證
系統 MUST 在建置時驗證專案 frontmatter；必填欄位為 `title`、`year`、`cover`，選填欄位為 `studio`、`location`、`type`、`summary`、`collaborators`、`instructor`、`draft`、`order`。

#### Scenario: 缺少必填欄位
- **WHEN** 專案 `index.en.md` 缺少 `title`
- **THEN** 建置失敗，錯誤訊息指出檔案路徑與缺少的欄位

#### Scenario: 封面圖不存在
- **WHEN** `cover` 指向資料夾內不存在的檔案
- **THEN** 建置失敗，錯誤訊息指出檔名

### Requirement: 區塊語法
系統 SHALL 支援在專案 markdown 中以 directive 語法描述版面區塊：`full`、`text-left`、`text-right`、`drawing`、`row`；directive 以外的一般段落 SHALL 呈現為文字區塊。圖片路徑 SHALL 相對於專案資料夾解析。

#### Scenario: 使用全版圖區塊
- **WHEN** markdown 含 `::full{src="01-aerial.jpg" alt="Aerial view"}`
- **THEN** 專案頁在該位置呈現全版寬度的 `01-aerial.jpg`

#### Scenario: 並排圖列
- **WHEN** markdown 含 `::row{src="04.jpg, 05.jpg, 06.jpg"}`
- **THEN** 專案頁呈現三張並排圖片

#### Scenario: 引用不存在的圖片
- **WHEN** 任一區塊的 `src` 指向不存在的檔案
- **THEN** 建置失敗，錯誤訊息指出專案檔案、行號與缺少的檔名

#### Scenario: 未知區塊名稱
- **WHEN** markdown 含 `::fullwidth{...}` 等未定義區塊
- **THEN** 建置失敗，錯誤訊息列出可用區塊名稱

#### Scenario: row 張數超出範圍
- **WHEN** `row` 區塊少於 2 張或多於 4 張圖
- **THEN** 建置失敗並說明允許範圍為 2–4 張

### Requirement: 語系檔名慣例
系統 SHALL 從內容檔名 `index.<lang>.md` 解析語系；現階段僅發佈 `en`，其他語系檔案存在時 MUST NOT 影響英文頁面。

#### Scenario: 僅有英文檔
- **WHEN** 專案資料夾只有 `index.en.md`
- **THEN** 產生英文專案頁

#### Scenario: 提前放入其他語系檔
- **WHEN** 專案資料夾同時有 `index.en.md` 與 `index.zh.md`
- **THEN** 英文頁面內容與網址不受影響

### Requirement: 專案範本
系統 SHALL 提供 `content/_template/` 範本資料夾，示範所有欄位與區塊寫法，且範本 MUST NOT 被發佈。

#### Scenario: 範本不出現在網站
- **WHEN** 建置網站
- **THEN** 首頁與任何路由都不包含 `_template` 內容

