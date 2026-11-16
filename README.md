# Karlos Ma

個人音樂、影像與藝術創作網站。沿用 Next.js 16 App Router、TypeScript 與 Tailwind CSS 4；提供英文（預設）、繁體中文、簡體中文的單屏入口首頁，以及 Music、Events、About、Contact 獨立頁面。

## 本機預覽與檢查

- `npm run dev`：開發預覽，開啟 <http://localhost:3000> 。已有開發伺服器時不必重複啟動。
- `npm run build`：正式靜態建置與 TypeScript 檢查，輸出到 out，並複製根目錄 CNAME。
- `npm run lint`：ESLint 檢查。
- `npm run start`：先完成建置，再預覽 out 靜態檔案（預設 3000；可傳入 `-- --listen 3002`）。不使用 SPA fallback，內頁重新整理可直接載入。

## 路由與雙語架構

- `/` 使用靜態入口導向 `/en/`，保留 query 與 hash，不判斷 IP 或瀏覽器語言；停用 JavaScript 時仍有 meta refresh 與英文首頁連結。
- `/zh`：繁體中文，伺服器輸出 `html lang="zh-Hant"`。
- `/en`：英文，伺服器輸出 `html lang="en"`。
- `/zh-cn`：簡體中文，伺服器輸出 `html lang="zh-Hans"`。
- 兩版共用 [首頁元件](src/components/home-page.tsx)，而非複製兩份頁面。
- [語言根版面](src/app/[locale]/layout.tsx) 載入共用導覽、頁尾與樣式。
- [首頁路由](src/app/[locale]/page.tsx) 與 [音樂](src/app/[locale]/music/page.tsx)、[關於](src/app/[locale]/about/page.tsx)、[聯絡](src/app/[locale]/contact/page.tsx) 路由使用 [共用 metadata](src/i18n/metadata.ts)，為每頁產生獨立的 title、description、canonical、hreflang 與 Open Graph metadata。
- [語言切換](src/components/language-switcher.tsx) 只替換路徑第一段，保留其餘路徑、query 與 hash，並完整載入文件以確保 `html lang` 更新。無 JavaScript 時仍可使用基本的語言首頁連結。
- 未支援的語言回傳 404。

三種語言均有 music、events、about、contact 獨立頁面，例如 `/en/music`、`/zh/events`、`/zh-cn/contact`。內容沿用現有資料與照片，由 [內容頁元件](src/components/content-pages.tsx) 共用渲染；未確認的作品、活動、介紹與聯絡方式仍清楚標為待補。其他 section 回傳 404。各頁 hreflang 包含三語對應及英文 x-default。

首頁僅顯示「Welcome to Karlos Ma’s World of Music.」或對應中文歡迎語、垂直導覽、中央 Icarus 羽翼、右上三語切換及版權。英文導覽顯示為 MUSIC／EVENTS／ABOUT／CONTACT。歡迎語在字典 `nav.welcomeIntro`、`welcomeSuffix`、`welcomeSubject` 和無障礙用 `welcomeTitle` 修改。版面使用 `min-height: 100svh`，不強制固定高度或隱藏溢出；一般桌面與手機尺寸可在一屏顯示，矮屏或放大文字時自然捲動。

## 修改文字與品牌設定

- 三語介面、歡迎語、介紹、無障礙文字、圖片 alt 與 SEO 文字：編輯 [語言字典](src/i18n/dictionaries.ts) 中的 `en`、`zh`（繁中）、`hans`（簡中，路由鍵為 `zh-cn`）。三種語言受到相同欄位型別檢查，新增欄位時需同步翻譯。
- 品牌名稱、正式網址、圖片來源、社群連結與共用版權年份：編輯 [網站設定](src/data/site.ts)。年份於建置時自動取得，跨年後重新建置即可更新。
- 作品的中英文名稱與資料：編輯 [作品資料](src/data/works.ts)，不放進介面字典。
- 聯絡方式尚未提供時維持 `null`，畫面只顯示不可點擊的「即將提供／Coming soon」。email 填純地址，其他平台填完整 HTTPS URL；元件會自動產生對應連結。

目前介紹均明確標為待補；請確認內容後再公開正式個人經歷。

## 替換首頁主視覺與個人影像

1. 目前首頁循環播放 [Icarus 影片](public/video/Icarusmov.mov)，[Icarus 羽翼](public/Icarus.jpg) 用於載入封面及播放失敗回退。About 使用 [個人照片](public/karlos.jpg)。
2. 在 [網站設定](src/data/site.ts) 修改 `hero.video`（影片）及 `hero.src`（封面）；URL 不包含 public，例如 `/video/Icarusmov.mov`。
3. 同時修改 [語言字典](src/i18n/dictionaries.ts) 的 `hero.visualAlt`，分別描述正式圖片。首頁不再顯示標語、CTA 或作品資訊。
4. 個人影像同理：設定 `about.src`，將 `about.isPlaceholder` 改為 `false`，同步更新雙語 `about.imageAlt`。
5. 主視覺使用 `object-fit: contain` 保留完整羽翼。調整 [全域樣式](src/app/globals.css) 的 `.entrance-artwork` 可改變圖片大小；桌面最大 500px，手機依可用視口縮小，不做全螢幕背景或裁切。

圖片使用 Next Image。建議優先使用本機 WebP、AVIF 或 JPEG；使用外部圖片時，需額外明確設定 Next Image 的允許來源。本輪沒有外部圖片服務或第三方素材。

## 加入作品封面與音樂連結

在 [作品資料](src/data/works.ts) 找到對應位置並填入：

- `title.zh`、`title.en`、`title["zh-cn"]`：三語正式作品名稱。
- `year`：真正的作品年份，未確認前保持 `null`。
- `cover`：由 `null` 改為包含 `src` 與 `alt` 的物件；`src` 指向本機封面，`alt.zh`、`alt.en`、`alt["zh-cn"]` 分別填寫圖片描述。
- `musicUrl`：填入已確認的正式播放頁 URL。保持 `null` 時不會顯示假的播放按鈕。
- `isPlaceholder`：正式資料確認後改為 `false`，移除「作品資料待補」提示。
- `study`：保留舊版資料欄位，目前的簡潔作品列表不使用它。

正式播放連結只導向平台，不會自動播放或載入串流播放器。

## 調整紅色、字體與動效

在 [全域樣式](src/app/globals.css) 的 `:root` 調整：

- `--brand-red`：品牌深紅，預設 `#A6192E`，用於少量圖形與裝飾。
- `--accent`：較明亮且可讀的互動、focus 與細字強調色，請勿直接換成低對比深紅。
- `--background`、`--foreground`、`--muted`、`--line`：背景、暖白、次要文字與分隔線。

品牌色不改動圖片本身的色彩；原 [佔位 SVG](public/images/hero-study.svg) 已不在頁面使用。

英文使用開源 Inter Tight 可變字體（`@fontsource-variable/inter-tight`，OFL 授權），隨網站本地託管，不向第三方字型服務發送訪客請求。歡迎語採用 650–750 字重，導覽為 600，內頁標題為 700。參考網站的 ABC Favorit 並未複製或使用。繁中使用 PingFang TC／Noto Sans TC／Microsoft JhengHei，簡中使用 PingFang SC／Noto Sans SC／Microsoft YaHei，字距與行高分開調整。中文實際字型依裝置而異。

主視覺影片預設靜音（muted、volume=0），自動循環及行動裝置行內播放。首頁右下角有聲音圖示（20px 圖示，44px 圓形點擊區域，近黑底與灰白邊框），點擊後以 12% 音量開啟影片原聲，再次點擊靜音。離開首頁、點擊其他頁面連結或瀏覽器切頁時自動靜音；返回首頁（含瀏覽器上一頁快取）亦預設靜音，不保存聲音偏好。無暫停按鈕。僅首頁縮窄桌面側欄及間距，使影片區域左移；影片使用 contain 完整顯示羽翼和尾部，不再裁切。整體保留縮小 10%；手機亦縮小 10%。載入失敗時回退封面並隱藏聲音按鈕。`prefers-reduced-motion` 會暫停影片及停用 transition。不攔截捲動、不替換游標。

## GitHub Pages 部署

- 專案為 Next.js 16 App Router；建置指令為 `npm run build`，靜態輸出資料夾為 out，無需 Next.js 伺服器。
- [Next 設定](next.config.ts) 啟用靜態匯出及尾斜線，圖片直接使用本機靜態資源。PPR / Cache Components 與此版本靜態匯出不相容，因此不啟用。
- [部署工作流程](.github/workflows/deploy.yml) 在推送到 main 時執行，亦可手動觸發：Node.js 22 → `npm ci` → lint → build → 官方 Pages artifact 與部署 Actions。並行群組為 github-pages，避免同時部署。
- 部署到自訂根域名 <https://karlosma.com>，不設定倉庫名稱 basePath。15 個語言頁面均輸出目錄式 HTML，保留原本語言切換。首次使用 GitHub 的倉庫子路徑預覽時，必須先完成自訂域名設定才會正確載入根路徑資源。
- 根目錄 [CNAME](CNAME) 內容為 karlosma.com，postbuild 將其複製到產物並產生 .nojekyll。Actions 部署仍須在 GitHub 設定 Custom domain，不能只依靠 CNAME 檔案。
- 工作流程只使用 GitHub 自動簽發的權限，不需要手動加入 API key、token 或密碼。

### 首次建立與設定倉庫

目標帳號為 **karlosma0416**，新倉庫名稱使用 **karlos-music-world**，描述為 **Karlos's Music World**。已為網站初始化獨立的本地 main 倉庫，origin 設為 `https://github.com/karlosma0416/karlos-music-world.git`；遠端倉庫仍需登入 GitHub 後建立。本地原先繼承使用者主目錄中的另一個專案倉庫，該主目錄倉庫與其遠端未被修改或推送。

1. 在 GitHub 建立目標倉庫，把此專案內容（包含部署工作流程和 npm lockfile，不含 node_modules、.next、out 或任何機密）推送至 main。
2. 在倉庫 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
3. **Custom domain** 填入 **karlosma.com** 並儲存。建議先在帳號 Pages 設定驗證網域，再設定 DNS，以降低域名被占用的風險。
4. 設定下方 DNS，等待驗證與 GitHub TLS 憑證簽發後，勾選 **Enforce HTTPS**；可能需要等候最多 24 小時。
5. 確認 Actions 的 Deploy to GitHub Pages 成功，檢查根首頁跳轉、各語言內頁重新整理、封面、影片及語言切換。

### 域名註冊商 DNS

| 類型 | 主機記錄 | 目標 |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | karlosma0416.github.io |

可選 IPv6：為 @ 分別加入四筆 AAAA，值為 `2606:50c0:8000::153`、`2606:50c0:8001::153`、`2606:50c0:8002::153`、`2606:50c0:8003::153`。TTL 使用自動或 3600 秒。

移除與 @ / www 衝突的舊網站 A、AAAA、CNAME 或停放記錄，但保留郵件用 MX / TXT；不要建立萬用字元 DNS。www 的 CNAME 不包含 https 或倉庫名稱。若使用 DNS 代理，先設為僅 DNS，等待 GitHub 驗證及 HTTPS 成功。

官方說明：[自訂域名與 DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)、[Pages Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

此設定不代表遠端已部署成功；仍需已登入且具管理權限的 GitHub 工作階段才能建立倉庫、啟用 Pages、自訂域名與 HTTPS。DNS 由域名供應商後台設定。
