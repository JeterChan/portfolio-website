## ADDED Requirements

### Requirement: 專案內容語言
專案 frontmatter SHALL 支援選填欄位 `lang`（BCP 47 語言標籤，例如 `zh-Hant`）。設定時，專案頁的標題、摘要與內文，以及首頁卡片上的專案名稱 SHALL 帶有對應的 `lang` 屬性；頁面語言、網址與路由 MUST NOT 改變。

#### Scenario: 中文內容專案
- **WHEN** 專案設定 `lang: zh-Hant`
- **THEN** 專案頁內文容器帶有 `lang="zh-Hant"`，`<html lang>` 仍為 `en`，網址仍為 `/projects/<slug>`

#### Scenario: 未設定
- **WHEN** 專案未設定 `lang`
- **THEN** 內容沿用頁面語言，不輸出額外的 `lang` 屬性

#### Scenario: 中文排版
- **WHEN** 訪客開啟中文內容專案
- **THEN** 中文以系統中文字型與較寬的行距顯示，不使用寬體字軸
