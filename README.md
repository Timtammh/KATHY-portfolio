# Kathy Cheung — Portfolio

一頁式 HTML / CSS / JavaScript Portfolio，無需 npm 或 build。
直接用瀏覽器開啟 `dist/index.html`。

## 檔案

- `dist/index.html`：選單、主標題、影片、作品、Gallery、聯絡資料。
- `dist/styles.css`：按區域分段；頂部是色彩、字體設定，底部是手機版。
- `dist/script.js`：影片預覽及作品詳情視窗。
- `dist/assets/`：放正式作品圖片及影片。

## 換影片

將影片放入 `dist/assets/showreel.mp4`，再把 HTML 的 `<source>` 改成：

```html
<source src="assets/showreel.mp4" type="video/mp4">
```

建議 H.264 MP4。手機展示框使用直向裁切，適合 9:16 影片。
若需要顯示完整橫向影片，將 `.phone video` 的 `object-fit: cover` 改為 `contain`。
可在 `<video>` 加 `poster="assets/cover.jpg"` 設定封面。
目前主影片使用 assets 內的 Model_showcase video .mp4。
本機影片預覽只在當前瀏覽器生效，不會上傳或永久保存。

## 換作品

三個作品及浮動卡是 CSS 製作的概念展示，並非真實客戶項目。
在 HTML 的 Selected work 區域修改標題、分類及預覽圖。
在 JS 的 `projects` 物件修改彈出視窗內容。
正式內容準備好後，刪除對應 Concept 提示，按需要更新作品描述。

## 聯絡

聯絡按鈕連至 `mailto:kittycst1218@gmail.com`，會開啟訪客的 email 應用程式。

## 圖片／影片瀑布流

原本 About 區域已改為 `#gallery`，展示 assets 內 17 個素材。
桌面 4 欄、平板 3 欄、手機 2 欄，保留素材原比例。
點擊圖片可開啟大圖；影片使用原生播放控制，同一時間只播放一段。

- `dist/assets/`：保留你提供的原檔。
- `dist/assets/web/`：網頁用圖片、MP4 轉檔及影片封面。
- `dist/assets/media-manifest.json`：素材清單，方便對照原始名稱；頁面不依賴 fetch。
- 新增／排序作品：直接編輯 `index.html` 的 Gallery 區域，每個 `<figure>` 是一個素材。

所有圖片／影片來源都是本地 assets，不依賴外部影片服務。
