# profile-page Specification

## Purpose
TBD - created by archiving change create-architecture-portfolio-site. Update Purpose after archive.
## Requirements
### Requirement: About 頁內容
網站 SHALL 提供 `/about` 頁，內容來自 `content/profile/index.en.md`，包含簡介、學歷、經歷、技能（軟體）、獲獎／展覽等 CV 段落。

#### Scenario: 編輯簡介
- **WHEN** 擁有者修改 `content/profile/index.en.md` 並重新建置
- **THEN** `/about` 顯示更新後內容

### Requirement: 聯絡方式
About 頁 SHALL 顯示 frontmatter 中提供的 email 與外部連結（例如 LinkedIn、Instagram）；email SHALL 為 `mailto:` 連結。

#### Scenario: 點擊 email
- **WHEN** 訪客點擊 email
- **THEN** 開啟訪客的郵件程式並帶入收件人

### Requirement: PDF 作品集下載
當 `public/portfolio.pdf` 存在時，About 頁與全站導覽 SHALL 提供下載連結並顯示檔案大小；檔案不存在時 MUST NOT 顯示下載連結。

#### Scenario: PDF 存在
- **WHEN** `public/portfolio.pdf` 存在
- **THEN** 顯示「Download Portfolio (PDF, 12 MB)」形式的連結，點擊可下載

#### Scenario: PDF 不存在
- **WHEN** `public/portfolio.pdf` 不存在
- **THEN** 網站不顯示任何 PDF 下載連結，建置不失敗

