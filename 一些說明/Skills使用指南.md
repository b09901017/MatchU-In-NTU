# MatchU Skills 使用指南

## 📦 什麼是 Skills?

Skills 是 Claude Code 的新功能,讓 Claude 能夠自動學習專業知識和工作流程。相比之前的 commands 系統,Skills 更智能、更自動化!

### Skills vs Commands 的差異

| 特性 | Commands (舊) | Skills (新) |
|------|--------------|-------------|
| 呼叫方式 | 需要手動 `/command-name` | 自動觸發,無需指令 |
| 檔案格式 | `.md` 放在 `.claude/commands/` | `SKILL.md` 放在 `.claude/skills/` |
| 頭部格式 | 無特定格式 | YAML frontmatter (name + description) |
| 智能程度 | 被動等待呼叫 | 主動根據對話內容觸發 |

---

## 🚀 安裝步驟

### Step 1: 下載 Skills

你已獲得以下 4 個 Skills:

```
.claude/
└── skills/
    ├── product-manager/
    │   └── SKILL.md
    ├── designer/
    │   └── SKILL.md
    ├── frontend-dev/
    │   └── SKILL.md
    └── backend-dev/
        └── SKILL.md
```

### Step 2: 放置到專案目錄

將整個 `.claude` 目錄放在你的專案根目錄:

```
MatchU/                          # 你的專案目錄
├── .claude/                     # Skills 目錄 (新增這個)
│   └── skills/
│       ├── product-manager/
│       ├── designer/
│       ├── frontend-dev/
│       └── backend-dev/
├── CLAUDE.md                    # 主配置文件
└── README.md
```

### Step 3: 啟動 Claude Code

```bash
cd MatchU
claude
```

Claude Code 會自動載入所有 Skills!

---

## 💡 使用方式

### 🎯 自動觸發 (推薦)

Skills 最大的優勢是**自動觸發**。你只需要自然地描述需求,Claude 會自動選擇合適的 Skill!

#### 範例 1: 開發新功能

```
你: 我想開發盲盒抽卡功能
```

Claude 會自動:
1. 讀取 product-manager skill 的 description
2. 發現這個問題符合「需求分析」情境
3. 自動觸發 product-manager skill
4. 開始進行需求挖掘與 PRD 撰寫

#### 範例 2: 設計介面

```
你: 請設計登入頁面,要有台大元素
```

Claude 會自動:
1. 識別這是「設計」相關問題
2. 自動觸發 designer skill
3. 開始設計介面並產出 DESIGN_SPEC.md

#### 範例 3: 實作代碼

```
你: 請實作用戶卡片組件,要有 hover 動畫
```

Claude 會自動:
1. 識別這是「前端開發」問題
2. 自動觸發 frontend-dev skill
3. 開始撰寫 HTML/CSS/JS 代碼

---

## 🎨 4 個 Skills 詳解

### 🎯 Product Manager Skill

**自動觸發關鍵詞**:
- 「我想開發...」
- 「需求分析」
- 「撰寫 PRD」
- 「這個功能應該...」

**輸出**: `PRD.md` (產品需求文檔)

**範例對話**:
```
你: 我想開發興趣配對功能

Claude: [自動觸發 product-manager skill]
好的!我來協助你分析興趣配對功能的需求...
```

---

### 🎨 Designer Skill

**自動觸發關鍵詞**:
- 「設計...頁面」
- 「介面設計」
- 「UI/UX」
- 「視覺風格」

**輸出**: `DESIGN_SPEC.md` (設計規格文檔)

---

### 💻 Frontend Dev Skill

**自動觸發關鍵詞**:
- 「實作...」
- 「寫代碼」
- 「前端開發」

**輸出**: 完整的前端代碼

---

### ⚙️ Backend Dev Skill

**自動觸發關鍵詞**:
- 「資料庫設計」
- 「Firebase」
- 「後端開發」

**輸出**: Firebase 配置與代碼

---

## 🔄 完整開發流程範例

```
你: 我想開發盲盒抽卡功能
→ [product-manager skill] PRD.md

你: 請設計盲盒頁面
→ [designer skill] DESIGN_SPEC.md

你: 請實作前端
→ [frontend-dev skill] 完整代碼

你: 請設計資料庫
→ [backend-dev skill] Firebase 配置
```

---

## 🎉 開始使用

```bash
cd MatchU
claude
```

然後輸入:
```
我想開發 MatchU 的首頁功能
```

Claude 會自動引導你完成整個開發流程! 🚀
