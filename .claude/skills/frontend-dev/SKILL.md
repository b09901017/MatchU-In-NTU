---
name: frontend-dev
description: Implement UI/UX designs into production-ready HTML/CSS/JavaScript code for the MatchU dating platform. Use when users need to build web pages, create interactive components, implement animations, or convert design specs into working frontend code. Uses vanilla JavaScript with GSAP/Anime.js for animations, Fake Data for prototyping, and follows responsive design principles.
---

# Frontend Developer Skill

專為 MatchU (台大交友平台) 打造的前端開發技能。

## 技能說明

將設計規格文檔 (DESIGN_SPEC) 轉化為高品質、可維護的前端代碼,實現美觀流暢的用戶介面。

### 適用場景
- 基於設計規格實作完整頁面
- 開發可重用的 UI 組件
- 實現複雜的動畫效果
- 優化現有前端代碼

### 技術棧
- **HTML5**: 語義化網頁結構
- **CSS3**: 現代化樣式與動畫 (Flexbox, Grid, CSS Variables)
- **JavaScript (ES6+)**: 互動邏輯實現
- **動畫庫**: GSAP / Anime.js
- **開發策略**: 先用 Fake Data 完成 UI,後續串接真實 API

## 核心能力

### 設計還原
準確實現設計規格,達到像素級還原,確保視覺一致性。

### HTML 開發
- 撰寫語義化、結構清晰的 HTML
- 遵循 HTML5 標準與最佳實踐
- 確保無障礙性 (ARIA 標籤)

### CSS 實作
- 使用現代 CSS3 技術 (Flexbox、Grid、CSS Variables)
- 實現響應式佈局 (Mobile First)
- 撰寫模組化、可維護的樣式
- 實現流暢的動畫效果

### JavaScript 編碼
- 實現互動邏輯與狀態管理
- 處理用戶輸入與表單驗證
- 撰寫乾淨、可讀的代碼
- 使用 Fake Data 模擬功能

### 組件化思維
抽象可重用的 UI 組件,封裝邏輯,降低耦合度。

### 性能最佳化
- 優化圖片載入 (WebP、Lazy Loading)
- 減少重排與重繪
- 代碼壓縮與打包

## 執行流程

### 階段一: 設計規格解析與技術規劃

**Step 1: 分析設計規格**

讀取 DESIGN_SPEC.md 並理解設計要求,識別技術實現難點。

**Step 2: 技術方案規劃**

詢問確認 (若已明確則跳過):

```
Q1: 需要實現的頁面優先級?
Q2: 是否使用特定 JavaScript 庫?(如 GSAP)
Q3: 地圖功能使用 Leaflet.js 還是 Google Maps?
Q4: 本次是否包含 RWD 響應式?
```

完成後進入【階段二】。

### 階段二: 前端代碼開發

基於設計規格產出完整的前端代碼。

#### 標準專案結構

```
project/
├── index.html              # 主頁面
├── pages/                  # 其他頁面
│   ├── login.html
│   ├── profile.html
│   └── ...
├── css/
│   ├── reset.css           # CSS Reset
│   ├── variables.css       # CSS 變數
│   ├── global.css          # 全域樣式
│   ├── components.css      # 組件樣式
│   └── pages/              # 各頁面樣式
│       └── home.css
├── js/
│   ├── config.js           # 配置與 Fake Data
│   ├── utils.js            # 工具函數
│   ├── components.js       # UI 組件
│   ├── animations.js       # 動畫效果
│   └── pages/              # 各頁面邏輯
│       └── home.js
└── assets/
    ├── images/             # 圖片資源
    └── icons/              # 圖標
```

#### HTML 編寫規範

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="MatchU - 台大專屬交友平台">
    <title>MatchU - 首頁</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/components.css">
</head>
<body>
    <header class="header">
        <!-- 導航欄 -->
    </header>

    <main class="main-content">
        <!-- 主要內容 -->
    </main>

    <footer class="footer">
        <!-- 頁尾 -->
    </footer>

    <!-- JavaScript -->
    <script src="js/config.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/pages/home.js"></script>
</body>
</html>
```

**要點**:
- 使用語義化標籤
- 添加 aria-label 屬性
- 圖片提供 alt
- 表單元素提供 label

#### CSS 編寫規範

**1. CSS Variables (variables.css)**

```css
:root {
    /* 色彩系統 */
    --color-primary: #003060;
    --color-secondary: #FF6B6B;
    --color-bg: #F5F5F5;
    --color-text-primary: #333333;
    
    /* 字體系統 */
    --font-family-base: 'Noto Sans TC', sans-serif;
    --font-size-base: 16px;
    
    /* 間距系統 */
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    
    /* 圓角 */
    --radius-sm: 8px;
    --radius-md: 12px;
    
    /* 動畫 */
    --transition-base: 200ms;
}
```

**2. 全域樣式 (global.css)**

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    background-color: var(--color-bg);
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}
```

**3. 組件樣式 (components.css)**

```css
/* 按鈕 */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 var(--spacing-lg);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-base) ease;
}

.btn-primary {
    background-color: var(--color-primary);
    color: white;
}

.btn-primary:hover {
    background-color: #00254d;
    transform: translateY(-2px);
}
```

#### JavaScript 編寫規範

**1. 配置文件 (config.js)**

```javascript
const CONFIG = {
  APP_NAME: 'MatchU',
  VERSION: '1.0.0'
};

// Fake Data
const FAKE_USERS = [
  {
    id: 1,
    name: '王小明',
    age: 21,
    department: '電機工程學系',
    interests: ['籃球', '程式設計'],
    avatar: 'assets/images/avatar-1.jpg'
  }
];
```

**2. 工具函數 (utils.js)**

```javascript
const Utils = {
  randomPick(array) {
    return array[Math.floor(Math.random() * array.length)];
  },
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  
  showToast(message, type = 'info') {
    // Toast 實現
  }
};
```

**3. 頁面邏輯 (pages/home.js)**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initHomePage();
});

function initHomePage() {
  renderRecommendedUsers();
  setupEventListeners();
  initAnimations();
}

function renderRecommendedUsers() {
  const container = document.querySelector('.user-cards');
  const users = FAKE_USERS.slice(0, 4);
  
  users.forEach(user => {
    const card = createUserCard(user);
    container.appendChild(card);
  });
}

function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <img src="${user.avatar}" alt="${user.name}">
    <h3>${user.name}, ${user.age}</h3>
    <p>${user.department}</p>
  `;
  return card;
}
```

### 階段三: 代碼整合與測試

完成開發後:

1. **整合測試**: 檢查所有頁面是否正常運作
2. **跨瀏覽器測試**: Chrome, Firefox, Safari, Edge
3. **響應式測試**: 測試不同裝置尺寸
4. **性能檢測**: Lighthouse 分析
5. **代碼審查**: 檢查風格一致性

### 階段四: Git 版本管理

```bash
# 提交代碼
git add .
git commit -m "feat: 實作首頁 UI 與用戶卡片組件"
git push origin main
```

**提交訊息規範**:
- feat: 新增功能
- fix: 修復問題
- style: 樣式調整
- refactor: 代碼重構

### 階段五: 文檔交付

完成開發後,告知用戶:

```
✅ 前端代碼開發完成!

📂 已產出文件:
- index.html (主頁面)
- CSS 樣式文件
- JavaScript 邏輯文件
- Fake Data 配置

🚀 測試方式:
1. 使用 Live Server 啟動
2. 開啟 index.html
3. 測試各項功能

📌 下一步:
- 繼續開發其他頁面
- 或使用 backend-dev 技能整合後端

💡 提示:
- 目前使用 Fake Data
- Firebase 整合將在後端階段完成

是否需要協助 Git 操作?
```

## 注意事項

### 代碼品質
- 保持代碼乾淨、可讀、可維護
- 適當的註解說明
- 遵循命名規範

### 性能優先
- 注重載入速度與運行效率
- 優化圖片資源
- 減少不必要的 DOM 操作

### 響應式設計
- 確保各種裝置良好體驗
- Mobile First 開發策略
- 測試主流裝置尺寸

### 無障礙性
- 考慮螢幕閱讀器
- 支援鍵盤操作
- 適當的 ARIA 標籤

### 台大元素
- 適度融入台大視覺元素
- 增強品牌識別度
- 保持設計平衡

### 預留接口
為後續 Firebase 整合預留清晰的數據接口。

## 開發檢查清單

代碼提交前確認:

- [ ] HTML 結構語義化
- [ ] CSS 符合設計規格
- [ ] JavaScript 功能正常
- [ ] 響應式適配完整
- [ ] 跨瀏覽器兼容
- [ ] 代碼有適當註解
- [ ] 無 console 錯誤
- [ ] 性能表現良好
- [ ] Git 提交訊息清晰

## 動畫實現指南

### 使用 GSAP

```javascript
// 卡片進場動畫
gsap.from('.user-card', {
  duration: 0.5,
  y: 20,
  opacity: 0,
  stagger: 0.1,
  ease: 'power2.out'
});
```

### 使用 CSS

```css
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
}
```

## 常見組件範例

### 使用者卡片
- 頭像
- 姓名、年齡
- 科系
- 興趣標籤
- 喜歡按鈕

### 導航列
- Logo
- 選單項目
- 用戶頭像
- 通知圖標

### 載入動畫
使用大笨鳥圖示作為 Loading 動畫。

## Fake Data 使用原則

### 資料完整性
確保假資料包含所有必要欄位。

### 真實性
假資料應盡量接近真實情境。

### 多樣性
提供足夠多樣的測試資料。

### 易於替換
設計清晰的接口,方便後續替換為真實 API。

## 輸出規範

### 代碼格式
- 使用 2 空格縮排
- 一致的命名風格
- 清晰的代碼結構

### 文件組織
- 按功能模組化
- 檔案命名清晰
- 目錄結構合理

### 註解規範
```javascript
/**
 * 創建用戶卡片
 * @param {Object} user - 用戶資料
 * @returns {HTMLElement} 卡片元素
 */
function createUserCard(user) {
  // ...
}
```
