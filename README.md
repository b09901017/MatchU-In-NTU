# MatchU - 台大專屬交友平台

> 一款專為台大學生設計的線上配對、線下見面交友平台

## 📖 專案簡介

MatchU (Match University) 是一個專為國立台灣大學學生打造的交友平台,旨在幫助學生突破既有交友圈,透過興趣配對、盲盒抽卡等有趣的方式認識新朋友,並透過實體活動促進線下見面,建立真實的友誼。

### 核心特色

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
│   ├── activities.html          # 活動列表
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
