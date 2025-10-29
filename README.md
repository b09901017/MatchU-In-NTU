# MatchU - 台大專屬交友平台

> 線上配對,線下見面 - 打造最真實的校園交友體驗

## 📋 專案概述

**MatchU** 是一款專為台大學生設計的交友平台,透過盲盒抽卡機制、即時聊天、智能活動推薦等功能,幫助台大生突破既有社交圈,建立真實有意義的連結。

### 核心特色

- 🎓 **僅限台大生** - 台大信箱認證,確保安全與信任
- 🎴 **盲盒抽卡** - 每日限量配對,享受開盲盒的驚喜感
- 💬 **智能聊天** - 即時訊息、破冰遊戲、活動推薦
- 📅 **發起邀約** - 從線上聊天到線下見面,一鍵邀約
- 🎨 **精美設計** - 融入台大元素,沉浸式用戶體驗
- ✨ **流暢動畫** - GSAP 動畫庫,絲滑的互動效果

---

## 🚀 快速開始

### 方式一:使用 Live Server (推薦)

1. 安裝 VS Code 擴充功能 **Live Server**
2. 右鍵點擊 `index.html`
3. 選擇 **Open with Live Server**
4. 瀏覽器會自動開啟,開始體驗!

### 方式二:直接開啟 HTML 文件

1. 找到 `index.html` 文件
2. 雙擊直接用瀏覽器開啟
3. 開始體驗!

**提示**: 部分功能(如 localStorage)可能需要 Live Server 才能正常運作。

---

## 📁 專案結構

```
MatchU-In-NTU/
├── index.html                  # 首頁/登入頁
├── pages/                      # 所有子頁面
│   ├── swipe.html             # 盲盒抽卡頁面 ✨
│   ├── chat-list.html         # 聊天列表
│   ├── chat-room.html         # 聊天室(含活動推薦和發起邀約) ⭐⭐⭐
│   ├── profile.html           # 個人中心
│   ├── register.html          # 註冊流程頁面 ✨
│   ├── settings.html          # 設定頁面 ✨
│   └── activity-list.html     # 活動廣場頁面 ✨
├── css/                        # 樣式文件
│   ├── reset.css              # CSS Reset
│   ├── variables.css          # 設計系統變數
│   ├── global.css             # 全域樣式
│   └── components.css         # 組件樣式庫
├── js/                         # JavaScript 文件
│   ├── config.js              # 配置與假資料
│   └── utils.js               # 工具函數庫
├── PRD.md                      # 產品需求文檔
├── DESIGN_SPEC.md             # 設計規格文檔
├── CLAUDE.md                  # 專案指南
└── README.md                  # 本文件
```

---

## 🎯 已完成核心功能

### 1. 首頁 (index.html)

**視覺特色**:
- 椰林大道漸層背景
- 飄動的椰樹裝飾動畫
- 浮動愛心動畫
- GSAP 流暢進場動畫

**互動功能**:
- 開始使用 → 註冊流程(開發中)
- 已有帳號登入 → 直接進入盲盒抽卡頁面

---

### 2. 盲盒抽卡 (pages/swipe.html) ⭐

**核心玩法**:
- ✅ 每天 5 次抽卡機會
- ✅ 點擊翻牌查看用戶資料
- ✅ 滑動或點擊按鈕進行喜歡/跳過
- ✅ 雙向喜歡才配對成功

**視覺亮點**:
- **3D 翻卡動畫** - CSS3 transform 實現真實翻轉效果
- **配對成功動畫** - 全屏慶祝,愛心脈動,台大元素飄落
- **滑卡動畫** - 流暢的飛出動畫與愛心特效
- **共同興趣高亮** - 脈動動畫強調共同點

---

### 3. 聊天室 (pages/chat-room.html) ⭐⭐⭐

這是本專案最核心的頁面,實現了所有創新功能!

#### 📱 即時聊天
- ✅ 文字訊息即時發送
- ✅ 訊息氣泡設計(發送者/接收者)
- ✅ 輸入框自動調整高度
- ✅ 打字中動畫效果

#### 🎯 智能活動推薦 ⭐ (創新功能!)

**自動推薦機制**:
- 基於對話內容分析關鍵字(咖啡、電影、讀書等)
- 智能匹配雙方共同興趣
- 自動插入推薦卡片到聊天流中

**8 種活動類型**:
1. ☕ 一起喝咖啡 → 舟山路咖啡廳
2. 🎬 一起看電影 → 台大附近戲院
3. 📚 一起讀書 → 總圖書館
4. 🍜 一起吃飯 → 公館商圈
5. ⛰️ 一起爬山 → 象山、虎山
6. 🏀 一起運動 → 綜合體育館
7. 🎨 一起看展覽 → 北美館、故宮
8. 🎮 一起玩桌遊 → 公館桌遊店

**推薦卡片設計**:
- 特殊虛線邊框,醒目不突兀
- 顯示活動名稱與建議地點
- 點擊可快速填入發起邀約表單

#### 📅 發起邀約 ⭐ (創新功能!)

**完整流程**:
1. 點擊「+」按鈕打開功能選單
2. 選擇「發起邀約」
3. 填寫邀約資訊:
   - 活動類型(下拉選單)
   - 時間(日期時間選擇器)
   - 地點(智能建議,可自訂)
   - 備註(可選)
4. 發送後以特殊卡片樣式顯示在聊天室
5. 對方可選擇「接受」或「拒絕」
6. 狀態即時更新(✅ 已接受 / ❌ 已拒絕)

**設計亮點**:
- 活動類型選擇後自動顯示地點建議
- 預設時間為明天下午 2 點
- 邀約卡片使用紅橘色邊框,醒目顯眼
- 接受後自動發送確認訊息

#### 🎮 破冰遊戲
- ✅ 100+ 真心話問題庫
- ✅ 隨機產生問題
- ✅ 系統訊息樣式顯示

#### 🎨 其他功能
- ✅ 貼圖發送
- ✅ 更多功能選單(+按鈕)

---

### 4. 聊天列表 (pages/chat-list.html)

**功能**:
- ✅ 顯示所有配對對象
- ✅ 最新訊息預覽
- ✅ 未讀訊息數量角標
- ✅ 在線狀態指示(綠點)
- ✅ 點擊進入對應聊天室

---

### 5. 個人中心 (pages/profile.html)

**功能**:
- ✅ 個人資料展示(頭像、姓名、系所)
- ✅ 統計數據(配對數、聊天數、活動數)
- ✅ 功能選單:
  - 我的照片
  - 興趣標籤
  - 我的徽章
  - 幫助與回饋
  - 關於 MatchU
- ✅ 登出功能(含確認對話框)

---

### 6. 註冊流程 (pages/register.html) ⭐

**5 步驟完整註冊體驗**:

**Step 1: Email 驗證**
- ✅ 台大信箱格式驗證(@ntu.edu.tw)
- ✅ 發送驗證碼功能
- ✅ 60 秒倒數計時

**Step 2: 驗證碼輸入**
- ✅ 4 位數驗證碼
- ✅ 自動跳轉到下一個輸入框
- ✅ 完成後自動驗證

**Step 3: 基本資料**
- ✅ 姓名、性別選擇
- ✅ 生日選擇器
- ✅ 學院與系所下拉選單(完整台大學院資料)
- ✅ 年級選擇

**Step 4: 照片上傳**
- ✅ 6 張照片上傳網格
- ✅ 個人簡介輸入(200 字限制,即時字數統計)

**Step 5: 興趣標籤**
- ✅ 按類別分組(音樂、運動、學習、美食、旅遊、娛樂、藝術、生活)
- ✅ 3-10 個興趣選擇限制
- ✅ 即時計數顯示

**設計亮點**:
- 進度條顯示當前步驟
- 流暢的步驟切換動畫
- 完成後跳轉到盲盒抽卡頁面

---

### 7. 設定頁面 (pages/settings.html) ⭐

**完整的設定管理介面**:

**帳號設定**:
- ✅ 更改電子郵件(需密碼確認)
- ✅ 更改密碼(需輸入舊密碼)

**隱私設定**:
- ✅ 顯示個人檔案 Toggle
- ✅ 顯示上線狀態 Toggle
- ✅ 已讀回條 Toggle

**通知設定**:
- ✅ 配對通知 Toggle
- ✅ 訊息通知 Toggle
- ✅ 活動邀約通知 Toggle

**配對偏好**:
- ✅ 性別偏好選擇(全部/男性/女性)
- ✅ 年齡範圍滑桿(18-50 歲)
- ✅ 活動距離範圍滑桿(1-20 公里)

**其他功能**:
- ✅ 封鎖名單
- ✅ 幫助與支援
- ✅ 服務條款
- ✅ 隱私政策
- ✅ 關於 MatchU(版本資訊)
- ✅ 刪除帳號(含二次確認)

**設計亮點**:
- 設定自動儲存到 LocalStorage
- 精美的 Toggle 開關動畫
- 範圍滑桿即時數值顯示
- Modal 彈窗的平滑動畫

---

### 8. 活動廣場 (pages/activity-list.html) ⭐

**完整的活動探索與發起功能**:

**活動列表**:
- ✅ 顯示所有進行中的活動
- ✅ 活動卡片包含:
  - 活動類型與標題
  - 時間、地點、人數
  - 主辦人資訊
  - 參與者頭像
  - 活動狀態(招募中/已額滿/已結束)
- ✅ 點擊卡片查看詳細資訊

**活動統計**:
- ✅ 進行中活動數
- ✅ 我參加的活動數
- ✅ 總參與人數

**篩選功能**:
- ✅ 8 種活動類型篩選:
  - ☕ 喝咖啡
  - 🎬 看電影
  - 📚 一起讀書
  - 🍽️ 吃美食
  - ⚽ 運動
  - 🎨 看展覽
  - 🎮 打遊戲
  - 🌳 散步

**發起新活動**:
- ✅ 活動類型選擇(8 種,卡片式選擇器)
- ✅ 活動標題輸入
- ✅ 時間選擇器(datetime-local)
- ✅ 地點輸入
- ✅ 人數限制調整(2-20 人)
- ✅ 活動說明(可選)

**活動詳情頁**:
- ✅ 全屏活動詳情展示
- ✅ 完整的活動資訊
- ✅ 主辦人與參與者列表
- ✅ 參加活動按鈕(含確認對話框)
- ✅ 分享功能(開發中)

**設計亮點**:
- 浮動的「+」按鈕發起新活動
- 活動卡片 hover 效果
- 進場動畫(stagger 錯開效果)
- 空狀態友善提示

---

## 🎨 設計系統

完整的設計系統定義在 `css/variables.css`:

### 色彩規範

```css
/* 主色調 */
--primary-blue: #003060;          /* 台大藍 */
--accent-coral: #FF6B6B;          /* 活潑紅橘 */

/* 中性色 */
--text-primary: #1A1A1A;
--bg-primary: #FFFFFF;
--bg-secondary: #F8F9FA;
```

### 字體系統
- H1: 32px / Bold(頁面主標題)
- H2: 24px / Bold(區塊標題)
- Body: 16px / Regular(正文內容)

### 動畫時長
- Fast: 100ms(按鈕點擊)
- Base: 200ms(標準過渡)
- Slow: 300ms(頁面切換)

---

## 💾 假資料配置

所有功能使用假資料模擬,定義在 `js/config.js`:

### FAKE_USERS
- 6 位模擬用戶
- 包含完整個人資料
- 照片來自 Unsplash 和 Pravatar

### FAKE_MESSAGES
- 預設聊天訊息
- 用於聊天列表和聊天室展示

### ACTIVITY_SUGGESTIONS
- 8 種活動推薦類型
- 每種包含關鍵字和地點建議

### ICEBREAKER_QUESTIONS
- 20 個破冰問題
- 涵蓋興趣、價值觀、校園生活

---

## 🛠️ 技術棧

### 前端技術
- **HTML5** - 語義化結構
- **CSS3** - 現代樣式(Flexbox, Grid, CSS Variables)
- **Vanilla JavaScript** - 純 JS,無框架依賴
- **GSAP 3.12** - 專業動畫庫

### 設計資源
- **Google Fonts** - Noto Sans TC 字體
- **Unsplash** - 高品質圖片
- **Pravatar** - 頭像生成

---

## 🎬 核心動畫效果

### 1. 首頁進場動畫
```javascript
// Logo 從上方淡入
// 標語從下方滑入
// 按鈕依序彈出
// 浮動愛心持續動畫
```

### 2. 3D 翻卡動畫
```javascript
// CSS3 perspective 製造 3D 效果
// Y 軸旋轉 180 度,600ms 流暢過渡
// 中途切換正反面內容
```

### 3. 配對成功動畫
```javascript
// 完整動畫序列(使用 GSAP Timeline):
// 1. 背景淡入
// 2. Match! 文字彈跳
// 3. 雙方頭像滑入
// 4. 愛心脈動
// 5. 訊息文字淡入
// 6. 按鈕依序彈出
// 7. 背景飄落台大元素
```

### 4. 滑卡動畫
```javascript
// 向左/右飛出 + 旋轉效果
// 喜歡時愛心飛出特效
```

### 5. 聊天訊息動畫
```javascript
// 訊息從下方滑入 + 淡入效果
// 打字中動畫(三點跳動)
```

---

## 🧩 可重用組件庫

完整組件定義在 `css/components.css`:

### 按鈕組件
```html
<button class="btn btn-primary">主要按鈕</button>
<button class="btn btn-secondary">次要按鈕</button>
<button class="btn btn-coral">活潑按鈕</button>
<button class="btn-icon">圖標按鈕</button>
```

### 卡片組件
```html
<div class="card">
  <div class="card-body">卡片內容</div>
</div>
```

### 標籤組件
```html
<span class="tag">普通標籤</span>
<span class="tag selected">選中標籤</span>
<span class="tag highlight">高亮標籤(脈動動畫)</span>
```

### 通知徽章
```html
<div class="badge-wrapper">
  <span>🔔</span>
  <span class="badge badge-absolute">3</span>
</div>
```

---

## 🚧 待開發功能

### 高優先級
- [x] 完整註冊流程頁面 ✅
- [x] 設定頁面(隱私、通知設定) ✅
- [x] 活動列表頁面 ✅
- [ ] 活動地圖頁面(Leaflet.js)

### 中優先級
- [ ] 圖片上傳功能(真實上傳到 Firebase Storage)
- [ ] 個人檔案編輯頁面
- [ ] 興趣標籤編輯頁面
- [ ] 照片管理頁面

### 低優先級 / 未來規劃
- [ ] Firebase 後端整合
- [ ] 推播通知
- [ ] AI 聊天分析(Gemini API)
- [ ] 語音訊息
- [ ] 視訊通話

---

## 📖 相關文檔

### PRD.md
產品需求文檔,包含:
- ✅ 需求背景與目標用戶分析
- ✅ 完整功能需求規格
- ✅ 用戶流程圖
- ✅ 資料結構設計
- ✅ 技術架構規劃

### DESIGN_SPEC.md
設計規格文檔,包含:
- ✅ 完整視覺設計系統
- ✅ 所有頁面詳細設計
- ✅ 動畫與互動規範
- ✅ 響應式設計規範
- ✅ 組件設計庫

### CLAUDE.md
專案開發指南,包含:
- ✅ 專案概述
- ✅ 技術架構
- ✅ Skills 使用說明
- ✅ 開發規範

---

## 💡 設計亮點

### 1. 沉浸式體驗
- 所有頁面都有精心設計的進場動畫
- 微互動細節豐富(按鈕點擊反饋、卡片 hover 效果)
- 流暢的頁面過場

### 2. 台大元素融入
- 椰林大道背景
- 台大藍配色方案
- 校園地標作為圖標和裝飾

### 3. 創新功能
- **智能活動推薦**: 基於對話內容自動推薦活動
- **一鍵發起邀約**: 從聊天到約會的完整閉環
- **破冰遊戲**: 降低社交門檻

### 4. 細節打磨
- 共同興趣高亮並有脈動動畫
- 配對成功有台大元素飄落特效
- 輸入框自動調整高度
- 打字中動畫
- 在線狀態即時顯示

---

## 🔮 未來規劃

### Phase 1: 完善 MVP (2-4 週)
- 完成註冊流程
- 完成設定頁面
- 增加活動列表與地圖

### Phase 2: 後端整合 (1-2 月)
- Firebase Authentication
- Firestore Database
- Firebase Storage
- Cloud Functions

### Phase 3: AI 增強 (2-3 月)
- Google Gemini API
- 聊天內容分析
- 智能配對推薦

---

## 🙏 致謝

- **設計靈感**: Tinder, Bumble, Coffee Meets Bagel
- **圖片來源**: Unsplash, Pravatar
- **動畫庫**: GSAP
- **字體**: Google Fonts (Noto Sans TC)
- **開發工具**: Claude Code, VS Code

---

## 📞 聯絡我們

如有任何問題或建議,歡迎聯繫:

- Email: contact@matchu.tw
- Instagram: @matchu_ntu
- Facebook: MatchU 台大交友平台

---

**讓我們一起打造台大最棒的交友平台! 🚀**

---

最後更新: 2025-10-30
版本: v1.1.0
開發狀態: 代碼重構完成 - 模組化、組件化、無障礙優化 ✅

## 📋 核心特色

- 🎓 **台大專屬**: 僅限台大學生使用,增強信任感
- 🎁 **盲盒配對**: 每日限量抽卡,增加驚喜感
- 💬 **興趣匹配**: 基於共同興趣的智能推薦
- 🗓️ **實體活動**: 定期舉辦官方交友活動
- 🤖 **AI 助手**: 提供聊天建議與社交技巧(後期功能)
- 🏛️ **台大元素**: 融入椰林大道、傅鐘等台大地標設計

---

## 🛠️ 技術架構

### 前端技術
- **HTML5** - 語義化網頁結構
- **CSS3** - 現代化樣式與動畫
- **JavaScript (ES6+)** - 互動邏輯實現
- **GSAP / Anime.js** - 流暢動畫效果
- **Leaflet.js** - 地圖功能(或 Google Maps API)

### 後端技術
- **Firebase Authentication** - 用戶認證
- **Firestore Database** - NoSQL 資料庫
- **Firebase Storage** - 圖片與檔案儲存
- **Cloud Functions** - 伺服器端邏輯(可選)
- **Firebase Hosting** - 網站部署

### 未來整合
- **Gemini API** - AI 聊天分析功能

---

## 📂 專案結構

```
MatchU/
├── CLAUDE.md                    # Claude Code 主配置文件
├── .claude/
│   └── commands/                # Agent 指令檔
│       ├── product-manager.md   # 產品經理 Agent
│       ├── designer.md          # UI/UX 設計師 Agent
│       ├── frontend-dev.md      # 前端開發 Agent
│       ├── backend-dev.md       # 後端開發 Agent
│       └── quickstart.md        # 快速啟動指南
│
├── docs/                        # 專案文檔
│   ├── PRD.md                   # 產品需求文檔
│   ├── DESIGN_SPEC.md           # 設計規格文檔
│   └── BACKEND_API.md           # 後端 API 文檔
│
├── index.html                   # 首頁
├── pages/                       # 其他頁面
│   ├── login.html               # 登入頁
│   ├── signup.html              # 註冊頁
│   ├── profile.html             # 個人資料頁
│   ├── match.html               # 配對頁面
│   ├── chat.html                # 聊天室
│   ├── activity-list.html       # 活動列表
│   └── settings.html            # 設定頁
│
├── css/
│   ├── reset.css                # CSS Reset
│   ├── variables.css            # CSS 變數
│   ├── global.css               # 全域樣式
│   ├── components.css           # 組件樣式
│   └── pages/                   # 各頁面樣式
│       ├── home.css
│       ├── login.css
│       └── ...
│
├── js/
│   ├── config.js                # 配置與假資料
│   ├── firebase-config.js       # Firebase 配置
│   ├── firebase-auth.js         # Firebase 認證
│   ├── firebase-db.js           # Firestore 操作
│   ├── firebase-storage.js      # Storage 操作
│   ├── utils.js                 # 工具函數
│   ├── components.js            # UI 組件
│   ├── animations.js            # 動畫效果
│   └── pages/                   # 各頁面邏輯
│       ├── home.js
│       ├── match.js
│       └── ...
│
├── assets/
│   ├── images/                  # 圖片資源
│   │   ├── ntu-palm.svg         # 椰林大道
│   │   ├── ntu-bird.svg         # 大笨鳥
│   │   ├── ntu-library.svg      # 總圖
│   │   ├── ntu-bell.svg         # 傅鐘
│   │   └── ntu-gate.svg         # 校門口
│   └── icons/                   # 圖標庫
│
├── firebase.json                # Firebase 配置
├── .firebaserc                  # Firebase 專案設定
├── firestore.rules              # Firestore 安全規則
├── storage.rules                # Storage 安全規則
├── .gitignore                   # Git 忽略文件
└── README.md                    # 本文件
```

---

## 🚀 快速開始

### 前置需求

- Node.js (v16+)
- npm 或 yarn
- Firebase CLI
- Git

### 安裝步驟

#### 1. Clone 專案

```bash
git clone https://github.com/your-username/MatchU.git
cd MatchU
```

#### 2. 安裝依賴

```bash
npm install
```

#### 3. Firebase 設定

```bash
# 安裝 Firebase CLI
npm install -g firebase-tools

# 登入 Firebase
firebase login

# 初始化 Firebase
firebase init
# 選擇: Firestore, Authentication, Storage, Hosting
```

#### 4. 配置 Firebase

將 Firebase 配置填入 `js/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

#### 5. 本地開發

使用 Live Server 或任何本地伺服器:

```bash
# 方法 1: 使用 VS Code Live Server 擴展

# 方法 2: 使用 Python
python -m http.server 8000

# 方法 3: 使用 Firebase
firebase serve
```

開啟瀏覽器訪問 `http://localhost:8000`

---

## 🎯 使用 Claude Code 開發

本專案配備了完整的 Claude Code Agent 系統,可以協助你快速開發各項功能。

### Agent 團隊

1. **產品經理 Agent** - 負責需求分析與 PRD 撰寫
2. **UI/UX 設計師 Agent** - 負責介面設計與規格文檔
3. **前端開發 Agent** - 負責 HTML/CSS/JS 實作
4. **後端開發 Agent** - 負責 Firebase 架構設計

### 開發流程

```bash
# 1. 啟動產品需求分析
claude
> /product-manager 我想開發【首頁功能】

# 2. 進行介面設計
> /designer 請基於 PRD 設計首頁

# 3. 實作前端代碼
> /frontend-dev 請實作首頁,包含用戶卡片和盲盒動畫

# 4. 建構後端架構
> /backend-dev 請設計首頁所需的 Firebase 資料結構
```

### 詳細使用方式

請查看 `.claude/commands/quickstart.md` 了解更多範例。

---

## 📱 核心功能

### 已完成功能 ✅
- [ ] 用戶註冊與登入(Email + Google)
- [ ] 個人資料設定(興趣標籤選擇)
- [ ] 首頁推薦用戶展示
- [ ] 盲盒抽卡配對
- [ ] 即時聊天室
- [ ] 活動列表與報名
- [ ] 地圖顯示校園地點

### 開發中功能 🚧
- [ ] AI 聊天分析與建議
- [ ] 推送通知
- [ ] 用戶評價系統
- [ ] 社群動態牆

### 規劃中功能 📋
- [ ] 視訊通話功能
- [ ] 周邊商品商城
- [ ] 積分獎勵系統

---

## 🎨 設計系統

### 色彩規範

- **台大藍**: `#003060` (主色調)
- **活潑紅橘**: `#FF6B6B` (強調色)
- **淺灰背景**: `#F5F5F5`
- **深灰文字**: `#333333`
- **淺灰文字**: `#999999`

### 字體系統

- **中文**: Noto Sans TC, Microsoft JhengHei
- **英數**: Inter, Helvetica Neue

### 台大視覺元素

- 椰林大道 - 登入頁背景
- 大笨鳥 - 載入動畫
- 總圖 - 知識分享
- 校門口 - 首頁迎賓
- 傅鐘 - 時間相關功能

---

## 🗃️ 資料庫結構

### 主要資料表

- **users** - 用戶基本資料
- **matches** - 配對記錄
- **chatRooms** - 聊天室
- **messages** - 聊天訊息(子集合)
- **activities** - 活動資訊
- **interests** - 興趣標籤
- **blindBoxDraws** - 盲盒抽卡記錄

詳細結構請參考 `docs/BACKEND_API.md`

---

## 🔐 安全性

- ✅ Firestore Security Rules 嚴格設定
- ✅ 用戶資料僅限本人與授權對象存取
- ✅ 敏感資料加密儲存
- ✅ HTTPS 加密傳輸
- ✅ CORS 跨域請求控制

---

## 📊 效能優化

- 圖片使用 WebP 格式
- Lazy Loading 延遲載入
- CSS/JS 代碼壓縮
- Firebase 查詢優化與索引
- CDN 靜態資源加速

---

## 🧪 測試

### 單元測試
```bash
npm run test
```

### E2E 測試
```bash
npm run test:e2e
```

---

## 🚢 部署

### Firebase Hosting

```bash
# 構建生產版本
npm run build

# 部署到 Firebase
firebase deploy

# 僅部署 Hosting
firebase deploy --only hosting
```

### 自訂網域

在 Firebase Console 設定自訂網域:
- matchu.tw
- www.matchu.tw

---

## 👥 團隊成員

- **張肇云** - 產品經理 / 心理學系
- **梁祈里** - 前端工程師 / 電機工程學系
- **許庭瑜** - 市場分析 / 經濟學系
- **鄧旭辰** - 技術顧問 / 電機工程學系

---

## 📄 授權

本專案採用 MIT 授權條款

---

## 🙏 致謝

- 台大創創學程 - 提供創業資源與指導
- Firebase - 提供穩定的後端服務
- Anthropic Claude - 協助開發流程

---

## 📞 聯絡我們

- Email: contact@matchu.tw
- Instagram: @matchu_ntu
- Facebook: MatchU 台大交友平台

---

## 📝 更新日誌

### v1.0.0 (2025-11-01)
- 🎉 首次發布
- ✅ 完成核心配對功能
- ✅ 上線前端介面
- ✅ Firebase 後端整合

---

**讓我們一起打造台大最棒的交友平台! 🚀**
