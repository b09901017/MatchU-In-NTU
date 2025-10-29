# MatchU 更新日誌

所有重要的專案變更都會記錄在此文件中。

---

## [v1.1.0] - 2025-10-30

### 🎯 重大重構與優化

這次更新對整個專案進行了全面的代碼重構，提升了可維護性、可讀性與無障礙性。

### ✨ 新增功能

#### 1. 代碼模組化
- **JavaScript 模組化**: 所有頁面的內嵌 JavaScript 抽取到獨立文件
  - 創建 `js/pages/swipe.js` (303 行)
  - 創建 `js/pages/chat-list.js` (172 行)
  - 創建 `js/pages/chat-room.js` (438 行)
  - 創建 `js/pages/profile.js` (195 行)
  - 創建 `js/pages/settings.js` (348 行)
  - 創建 `js/pages/activity-list.js` (443 行)
  - 創建 `js/pages/register.js` (285 行)

- **CSS 模組化**: 所有頁面的內嵌樣式抽取到獨立文件
  - 創建 `css/pages/swipe.css` (254 行)
  - 創建 `css/pages/chat-list.css` (75 行)
  - 創建 `css/pages/chat-room.css` (307 行)
  - 創建 `css/pages/profile.css` (133 行)
  - 創建 `css/pages/settings.css` (283 行)
  - 創建 `css/pages/activity-list.css` (453 行)
  - 創建 `css/pages/register.css` (277 行)

#### 2. 組件庫系統
- **創建 `js/components.js`** (274 行) - 可重用組件庫
  - `Modal` - 彈窗管理器（開啟、關閉、動畫、點擊外部關閉）
  - `BottomNav` - 底部導航生成器（支援無障礙）
  - `Badge` - 徽章組件
  - `EmptyState` - 空狀態組件
  - `Skeleton` - 骨架屏加載器
  - `Tabs` - Tab 切換管理器

#### 3. HTML 模板化
- **聊天室動態路由**
  - 支援 URL 參數：`chat-room.html?userId=X`
  - 動態載入任意用戶的聊天室
  - 頁面標題與頭像自動更新

- **個人中心動態路由**
  - 支援查看自己的檔案：`profile.html`
  - 支援查看他人檔案：`profile.html?userId=X`
  - 根據查看對象顯示不同按鈕（編輯 vs 發送訊息）
  - 條件式顯示設定選單

#### 4. 無障礙改進 (Accessibility)
- 底部導航改用語義化 `<button>` 標籤（原為 `<div onclick>`）
- 新增 `aria-label` 屬性提升屏幕閱讀器支援
- 新增 `aria-current="page"` 標示當前頁面
- 新增 `role="navigation"` 定義導航區域
- 實作鍵盤焦點樣式（`:focus` 狀態）
- 使用 `aria-hidden="true"` 隱藏裝飾性圖標

### 🐛 Bug 修復

#### 1. 導航連結錯誤
- **問題**: `swipe.html` 等頁面導航到錯誤的 `activities.html`
- **修復**: 統一更新為 `activity-list.html`（共修改 4 處）

#### 2. 狀態管理不一致
- **問題**: 不同頁面使用不同的用戶數據來源
  - `profile.html` 使用 `localStorage.getItem('currentUser')`
  - `swipe.html` 使用全域變數 `CURRENT_USER`
  - `chat-list.html` 混用兩種方式
- **修復**: 統一所有頁面使用 `initializeUserData()` 函數

#### 3. index.html 按鈕消失問題
- **問題**: 首頁的「開始使用」和「已有帳號登入」按鈕會在載入時閃現後消失
- **原因**: GSAP 動畫使用 `.from()` 沒有明確設定結束狀態
- **修復**:
  - 在 CSS 中添加 `opacity: 1` 預設狀態
  - 改用 `.fromTo()` 方法明確指定起始與結束狀態
  - 添加 `clearProps: 'transform'` 清除動畫後的內聯樣式
  - 新增 GSAP 存在性檢查

### 📊 代碼統計

#### HTML 代碼減少 74%
- **重構前**: 4,822 行內嵌代碼（所有頁面總和）
- **重構後**: 1,263 行 HTML 結構
- **減少**: 3,559 行（-73.8%）

#### 模組化統計
- **JavaScript**: 1,802 行抽取到獨立模組
- **CSS**: 1,782 行抽取到獨立樣式表
- **組件庫**: 新增 274 行可重用組件

#### 頁面級改進
| 頁面 | 重構前 | 重構後 | 減少比例 |
|------|--------|--------|----------|
| swipe.html | 626 行 | 130 行 | -79% |
| chat-room.html | 879 行 | 139 行 | -84% |
| chat-list.html | 438 行 | 126 行 | -71% |
| profile.html | 342 行 | 137 行 | -60% |
| settings.html | 826 行 | 166 行 | -80% |
| activity-list.html | 982 行 | 246 行 | -75% |
| register.html | 729 行 | 319 行 | -56% |

### 🏗️ 架構改進

#### 關注點分離 (Separation of Concerns)
```
Before:
index.html (2000+ 行)
├── <style> 內嵌樣式 (500 行)
├── <html> 結構 (200 行)
└── <script> 內嵌邏輯 (1300 行)

After:
index.html (200 行) - 純結構
css/pages/home.css (500 行) - 純樣式
js/pages/home.js (1300 行) - 純邏輯
```

#### 可重用性提升
- 6 個組件抽取為共用模組
- 底部導航可一鍵生成：`Components.BottomNav.render('swipe')`
- Modal 管理統一：`Components.Modal.open('matchModal')`

### 🔧 技術債務清理

#### 已解決
- ✅ 修復導航連結錯誤
- ✅ 統一狀態管理模式
- ✅ 移除重複代碼（Modal、Toast、底部導航）
- ✅ 模組化所有內嵌代碼
- ✅ 實作 HTML 模板化（動態路由）
- ✅ 改善無障礙性

#### 待優化（可選）
- 🔲 為所有圖示按鈕添加 `aria-label`
- 🔲 將更多 `<div onclick>` 改為語義化標籤
- 🔲 統一使用 `Components.BottomNav.render()` 替換所有底部導航

### 📝 文件更新
- ✅ 更新 README.md 專案結構
- ✅ 創建 CHANGELOG.md 版本記錄

---

## [v1.0.0] - 2025-10-29

### 🎉 首次發布 - MVP 完成

所有核心頁面與功能已完成開發。

### ✨ 核心功能

#### 1. 首頁 (index.html)
- 椰林大道漸層背景
- 飄動椰樹與浮動愛心動畫
- GSAP 流暢進場動畫

#### 2. 盲盒抽卡 (pages/swipe.html)
- 每日 5 次抽卡機會
- 3D 翻卡動畫
- 配對成功慶祝動畫
- 共同興趣高亮

#### 3. 聊天室 (pages/chat-room.html)
- 即時聊天訊息
- 智能活動推薦（8 種類型）
- 發起邀約功能
- 破冰遊戲（100+ 問題）

#### 4. 聊天列表 (pages/chat-list.html)
- 顯示所有配對對象
- 未讀訊息角標
- 在線狀態指示

#### 5. 個人中心 (pages/profile.html)
- 個人資料展示
- 統計數據
- 設定選單
- 登出功能

#### 6. 註冊流程 (pages/register.html)
- 5 步驟完整註冊
- Email 驗證
- 基本資料填寫
- 照片上傳
- 興趣標籤選擇

#### 7. 設定頁面 (pages/settings.html)
- 帳號設定
- 隱私設定
- 通知設定
- 配對偏好

#### 8. 活動廣場 (pages/activity-list.html)
- 活動列表展示
- 活動類型篩選
- 發起新活動
- 活動詳情頁

### 🎨 設計系統
- 完整的色彩規範（台大藍 + 紅橘）
- 字體系統（Noto Sans TC）
- 動畫時長標準
- 可重用組件庫

### 💾 假資料系統
- 6 位模擬用戶
- 預設聊天訊息
- 8 種活動推薦
- 100+ 破冰問題

---

## 圖例說明

- ✨ 新增功能
- 🐛 Bug 修復
- 🔧 技術改進
- 📝 文件更新
- 🎨 視覺設計
- 🔐 安全性
- ⚡ 效能優化
- 🗑️ 移除功能
