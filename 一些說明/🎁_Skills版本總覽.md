# 🎁 MatchU Skills 配置總覽

## ✅ 已完成!你現在擁有什麼?

我已經將原本的 **Commands 系統**升級為更智能的 **Skills 系統**!

### 🆕 Skills 系統 (新版 - 推薦使用)

```
.claude/
└── skills/                              # Skills 目錄
    ├── product-manager/
    │   └── SKILL.md                     # 🎯 產品經理 Skill
    ├── designer/
    │   └── SKILL.md                     # 🎨 UI/UX 設計師 Skill
    ├── frontend-dev/
    │   └── SKILL.md                     # 💻 前端開發 Skill
    └── backend-dev/
        └── SKILL.md                     # ⚙️ 後端開發 Skill
```

### 📚 說明文檔

- `CLAUDE.md` - 主配置文件 (已更新為 Skills 版本)
- `README.md` - 專案完整說明
- `Skills使用指南.md` - Skills 使用教學
- `配置設計說明.md` - 設計理念說明

### 📁 舊版 Commands (保留供參考)

```
.claude/
└── commands/                            # 舊版 Commands (可選擇保留或刪除)
    ├── product-manager.md
    ├── designer.md
    ├── frontend-dev.md
    ├── backend-dev.md
    └── quickstart.md
```

---

## 🎯 Skills vs Commands 對比

| 特性 | Commands (舊) | Skills (新) ⭐ |
|------|--------------|---------------|
| **呼叫方式** | `/product-manager` | 自動觸發 |
| **使用體驗** | 需要記住指令 | 自然對話 |
| **智能程度** | 被動等待 | 主動識別 |
| **檔案位置** | `.claude/commands/` | `.claude/skills/` |
| **檔案格式** | `xxx.md` | `xxx/SKILL.md` |
| **頭部格式** | 無 | YAML frontmatter |

---

## 🚀 推薦使用方式

### 選項 1: 僅使用 Skills (推薦)

```
MatchU/
├── .claude/
│   └── skills/              # ✅ 只需要這個
│       ├── product-manager/
│       ├── designer/
│       ├── frontend-dev/
│       └── backend-dev/
├── CLAUDE.md
└── README.md
```

**優點**:
- ✅ 最新的 Claude Code 功能
- ✅ 自動觸發,更智能
- ✅ 無需記住指令
- ✅ 更自然的對話體驗

### 選項 2: Skills + Commands 並存

保留兩者,可以同時使用:

```
MatchU/
├── .claude/
│   ├── skills/              # 新版
│   └── commands/            # 舊版備用
├── CLAUDE.md
└── README.md
```

**使用場景**:
- Skills: 日常開發 (自動觸發)
- Commands: 需要明確指定時 (`/product-manager`)

---

## 💡 使用範例

### 使用 Skills (自動觸發)

```
你: 我想開發盲盒抽卡功能
→ Claude 自動觸發 product-manager skill

你: 請設計盲盒頁面
→ Claude 自動觸發 designer skill

你: 請實作前端代碼
→ Claude 自動觸發 frontend-dev skill

你: 請設計資料庫
→ Claude 自動觸發 backend-dev skill
```

### 使用 Commands (手動呼叫)

```
你: /product-manager 開發盲盒功能
→ 手動觸發 product-manager command

你: /designer 設計盲盒頁面
→ 手動觸發 designer command
```

---

## 📦 安裝步驟

### Step 1: 選擇使用方式

**推薦**: 僅使用 Skills

### Step 2: 放置文件

將 `.claude/skills/` 目錄放在專案根目錄:

```bash
MatchU/
├── .claude/
│   └── skills/
└── CLAUDE.md
```

### Step 3: 啟動 Claude Code

```bash
cd MatchU
claude
```

### Step 4: 開始使用

```
我想開發 MatchU 的首頁功能
```

Claude 會自動使用合適的 Skill! 🎉

---

## 🎨 4 個 Skills 介紹

### 🎯 Product Manager Skill

**功能**: 需求分析 → PRD 撰寫  
**觸發詞**: 「我想開發」、「需求分析」  
**輸出**: `PRD.md`

---

### 🎨 Designer Skill

**功能**: 介面設計 → 設計規格  
**觸發詞**: 「設計頁面」、「UI/UX」  
**輸出**: `DESIGN_SPEC.md`

**特色**:
- 🏛️ 內建台大視覺元素
- 🎨 完整設計系統
- 📱 響應式設計指引

---

### 💻 Frontend Dev Skill

**功能**: 前端實作 → 完整代碼  
**觸發詞**: 「實作」、「寫代碼」  
**輸出**: HTML/CSS/JS 代碼

**特色**:
- 📝 使用 Fake Data
- 💬 完整註解
- 🎬 動畫效果

---

### ⚙️ Backend Dev Skill

**功能**: 後端架構 → Firebase 配置  
**觸發詞**: 「資料庫」、「Firebase」  
**輸出**: 後端配置與代碼

**特色**:
- 🗄️ Firestore 資料庫設計
- 🔒 Security Rules
- 🔑 Authentication 配置

---

## 📖 建議閱讀順序

1. **本文件** (你正在看的) ← 現在
2. **Skills使用指南.md** ← 詳細教學
3. **開始使用 Claude Code** ← 實際開發
4. **配置設計說明.md** ← 深入理解 (可選)

---

## 🗑️ 要不要刪除舊的 Commands?

### 建議: 可以刪除

如果你決定只使用 Skills,可以刪除 `.claude/commands/` 目錄:

```bash
rm -rf .claude/commands
```

### 或: 保留備用

如果想保留兩者:
- Skills: 日常使用 (自動)
- Commands: 特殊場景 (手動)

---

## ⚡ 快速開始

```bash
# 1. 進入專案
cd MatchU

# 2. 啟動 Claude Code
claude

# 3. 開始開發
> 我想開發 MatchU 的首頁功能
```

就是這麼簡單! 🚀

---

## 🎉 總結

### Skills 的優勢

✅ **自動化** - 無需手動輸入指令  
✅ **智能化** - 根據對話自動選擇  
✅ **自然化** - 就像跟真人對話  
✅ **專業化** - 每個 Skill 職責明確  

### 與 Commands 的差異

| 情境 | Commands | Skills |
|------|----------|--------|
| 開發新功能 | `/product-manager 開發XXX` | 「我想開發XXX」 |
| 設計介面 | `/designer 設計XXX` | 「請設計XXX」 |
| 實作代碼 | `/frontend-dev 實作XXX` | 「請實作XXX」 |

---

**MatchU Team - 讓開發更簡單、更智能!** 🎯
