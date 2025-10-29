# MatchU - 台大專屬交友平台

> 一款專為台大學生設計的線上配對、線下見面交友平台

## 專案概述

**專案名稱**: MatchU (Match University)  
**核心定位**: 專為台大學生設計的實體交友平台  
**目標用戶**: 國立台灣大學在校生(大學部+研究所)

### 核心價值主張
- 突破既有交友圈,降低社交門檻
- 從線上配對到線下見面的完整體驗
- 融入台大校園文化元素,增強歸屬感
- 透過 AI 輔助提升社交技巧

## 技術架構

### 前端技術
- **HTML5, CSS3, JavaScript** - 現代化網頁開發
- **GSAP / Anime.js** - 流暢動畫效果
- **Leaflet.js** - 地圖功能

### 後端技術
- **Firebase Authentication** - 用戶認證
- **Firestore Database** - 即時資料庫
- **Firebase Storage** - 圖片存儲
- **Cloud Functions** - 伺服器端邏輯

### 設計風格
- **色調**: 台大藍(#003060) + 活潑紅橘(#FF6B6B)
- **視覺元素**: 台大地標手繪風格
- **動畫風格**: 輕鬆流暢的沉浸式體驗

## 開發工作流程

本專案使用 **Skills** 系統進行模組化開發,每個 Skill 負責開發流程的特定階段:

```
用戶需求
  ↓
產品經理 Skill (PRD.md)
  ↓
設計師 Skill (DESIGN_SPEC.md)
  ↓
前端開發 Skill (完整代碼 + Fake Data)
  ↓
後端開發 Skill (Firebase 整合)
  ↓
完成功能
```

## 可用 Skills

### 🎯 product-manager
**用途**: 需求分析與 PRD 撰寫  
**輸出**: `PRD.md` (產品需求文檔)  
**使用時機**: 
- 開發新功能前
- 需要釐清需求時
- 評估功能優先級時

**觸發方式**:
Claude 會在以下情況自動使用此 skill:
- 用戶詢問「我想開發XXX功能」
- 用戶需要「需求分析」
- 用戶要求「撰寫 PRD」

---

### 🎨 designer
**用途**: UI/UX 設計與規格撰寫  
**輸出**: `DESIGN_SPEC.md` (設計規格文檔)  
**使用時機**:
- 有了 PRD 後需要設計介面
- 需要視覺設計系統
- 優化現有介面

**觸發方式**:
Claude 會在以下情況自動使用此 skill:
- 用戶詢問「請設計XXX頁面」
- 用戶需要「介面設計」
- 用戶提到「UI/UX」

**設計特色**:
- 內建台大視覺元素 (椰林大道、大笨鳥、總圖、傅鐘、校門口)
- 完整的設計系統規範
- 響應式設計指引

---

### 💻 frontend-dev
**用途**: HTML/CSS/JS 實作  
**輸出**: 完整的前端代碼  
**使用時機**:
- 有了設計稿後需要實作
- 開發新頁面或組件
- 實現動畫效果

**觸發方式**:
Claude 會在以下情況自動使用此 skill:
- 用戶詢問「請實作XXX功能」
- 用戶需要「寫代碼」
- 用戶提到「前端開發」

**開發特色**:
- 使用 Fake Data 模擬功能
- 完整的代碼註解
- 響應式設計實作
- Git 提交規範

---

### ⚙️ backend-dev
**用途**: Firebase 架構與 API 設計  
**輸出**: 後端配置與代碼  
**使用時機**:
- 前端完成後要串接真實數據
- 設計資料庫結構
- 實作用戶認證

**觸發方式**:
Claude 會在以下情況自動使用此 skill:
- 用戶詢問「設計資料庫」
- 用戶需要「Firebase 配置」
- 用戶提到「後端開發」

**功能特色**:
- 完整的 Firestore 資料庫設計
- Security Rules 安全規則
- Authentication 認證配置
- API 操作範例

---

## 使用範例

### 範例 1: 開發盲盒抽卡功能

**Step 1**: 產品需求分析
```
我想開發盲盒抽卡功能:
- 每天可以抽5次
- 可以根據興趣標籤篩選
- 抽到用戶後可以選擇喜歡或跳過
- 要有炫酷的翻卡動畫
```
→ Claude 自動使用 **product-manager skill** 產出 PRD.md

**Step 2**: 介面設計
```
請基於剛剛的 PRD 設計盲盒抽卡頁面,要有台大元素
```
→ Claude 自動使用 **designer skill** 產出 DESIGN_SPEC.md

**Step 3**: 前端實作
```
請實作盲盒抽卡功能,包含 3D 翻卡動畫
```
→ Claude 自動使用 **frontend-dev skill** 產出完整代碼

**Step 4**: 後端整合
```
請設計盲盒抽卡的 Firebase 資料庫結構
```
→ Claude 自動使用 **backend-dev skill** 產出後端架構

---

### 範例 2: 開發聊天室

```
我想開發即時聊天功能,包含文字訊息和破冰小遊戲
```
→ Claude 依序使用各個 skills 完成開發

---

## 專案特色功能

### 核心功能
1. **興趣配對系統** - 基於標籤的用戶匹配
2. **盲盒抽卡機制** - 每日限量抽卡
3. **即時聊天室** - 含破冰小遊戲
4. **活動推薦地圖** - 顯示台大周邊地點
5. **AI 聊天分析** (後期) - 提供社交建議

### 設計亮點
- **台大元素融入**: 椰林大道、傅鐘等地標
- **手繪風格插圖**: 溫暖友善的視覺風格
- **流暢動畫**: 絲滑的過場效果

## 開發規範

### Git 提交規範
- `feat: 新增功能`
- `fix: 修復問題`
- `style: 樣式調整`
- `docs: 文檔更新`
- `refactor: 代碼重構`

### 文件命名規範
- 產品文件: `PRD.md`, `DESIGN_SPEC.md`
- 代碼文件: `index.html`, `styles.css`, `app.js`

### 開發注意事項
- 所有功能需考慮 RWD 響應式設計
- 圖片使用 WebP 格式優化載入
- 代碼需包含清晰註解
- 每個功能完成後需更新 README.md

## 當前開發重點

**階段 1**: 視覺呈現優先 (當前)
- ✅ 優先完成前端界面設計與互動
- ✅ 使用 Fake Data 模擬功能
- ✅ 實作地圖與動畫效果

**階段 2**: 後端整合 (下一步)
- ⏳ Firebase 整合
- ⏳ 真實數據串接

**階段 3**: AI 功能 (未來)
- ⏳ Gemini API 整合
- ⏳ 聊天分析功能

## Skills 使用提示

### 自動觸發
Claude 會根據你的問題自動選擇合適的 skill,無需手動指定。

### 連續使用
你可以在一個對話中連續觸發多個 skills:
```
用戶: 我想開發首頁功能
→ Claude 使用 product-manager skill

用戶: 請設計首頁介面
→ Claude 使用 designer skill

用戶: 請實作首頁代碼
→ Claude 使用 frontend-dev skill
```

### 迭代優化
完成後可以繼續調整:
```
用戶: 顏色太暗了,可以明亮一點嗎?
→ Claude 再次使用 designer skill 優化設計
```

## 文件輸出位置

Skills 會自動產出以下文件:

```
project/
├── PRD.md                          # 產品需求文檔
├── DESIGN_SPEC.md                  # 設計規格文檔
├── BACKEND_API.md                  # 後端 API 文檔
├── index.html                      # 前端代碼
├── css/
├── js/
└── assets/
```

## 快速開始

### 1. 安裝 Skills

將 `.claude/skills/` 目錄放置在專案根目錄:

```
MatchU/
├── .claude/
│   └── skills/
│       ├── product-manager/
│       ├── designer/
│       ├── frontend-dev/
│       └── backend-dev/
└── CLAUDE.md
```

### 2. 啟動 Claude Code

```bash
cd MatchU
claude
```

### 3. 開始開發

```
> 我想開發 MatchU 的首頁功能
```

Claude 會自動使用合適的 skills 協助你完成開發!

---

## 團隊成員

- **張肇云** - 產品經理 / 心理學系
- **梁祈里** - 前端工程師 / 電機工程學系
- **許庭瑜** - 市場分析 / 經濟學系
- **鄧旭辰** - 技術顧問 / 電機工程學系

---

## 聯絡我們

- Email: contact@matchu.tw
- Instagram: @matchu_ntu
- Facebook: MatchU 台大交友平台

---

**讓我們一起打造台大最棒的交友平台! 🚀**
