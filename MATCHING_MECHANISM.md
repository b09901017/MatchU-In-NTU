# MatchU 配對機制說明

## 當前實作（v1.0）

### 基本邏輯
```javascript
// 30% 機率配對成功
if (Math.random() < 0.3) {
  showMatchModal(user);  // 配對成功
} else {
  showNextCard();  // 繼續滑卡
}
```

### 特點
- 🎲 **純隨機機制**
- 📊 **30% 固定配對率**
- 💖 **單向配對** (不需要對方也喜歡你)
- ⚡ **即時反饋**

### 優點
- 簡單易懂
- 保證用戶有配對體驗
- 適合前端原型展示

### 缺點
- 不真實 (現實中需要雙向喜歡)
- 無法測試完整配對流程
- 缺乏社交互動感

---

## 進階選項

### 選項 A: 智能配對機制 🧠
```javascript
// 根據共同興趣計算配對機率
const commonInterests = Utils.getCommonInterests(
  currentUser.interests,
  user.interests
);
const matchProbability = 0.2 + (commonInterests.length * 0.15); // 20%-80%

if (Math.random() < matchProbability) {
  showMatchModal(user);
}
```

**特點**:
- 📊 共同興趣越多，配對機率越高
- 🎯 基礎機率 20%，每個共同興趣 +15%
- 🌟 更符合真實交友邏輯

---

### 選項 B: 雙向配對機制 💑
```javascript
// 模擬對方也在使用 App
function handleLike() {
  // 你喜歡對方
  const user = users[currentUserIndex];

  // 模擬對方是否也喜歡你 (50% 機率)
  const theyLikeYouBack = Math.random() < 0.5;

  if (theyLikeYouBack) {
    showMatchModal(user);  // 雙向喜歡，配對成功！
  } else {
    Utils.showToast('已送出喜歡', 'info');
    // 等待對方回應（實際上不會配對）
  }
}
```

**特點**:
- 💑 需要雙向喜歡才配對
- ⏳ 更真實的等待感
- 🎲 模擬對方回應

---

### 選項 C: 累積式配對 📈
```javascript
// 記錄所有你喜歡的人
const likedUsers = [];

function handleLike() {
  const user = users[currentUserIndex];
  likedUsers.push(user.id);

  // 每喜歡 3 個人，保證配對一次
  if (likedUsers.length % 3 === 0) {
    showMatchModal(user);
  } else {
    Utils.showToast('已送出喜歡', 'info');
  }
}
```

**特點**:
- 📊 保證回報率
- 🎁 每 3 次喜歡必定配對 1 次
- 💪 鼓勵用戶持續使用

---

### 選項 D: 時段機制 ⏰
```javascript
function getMatchProbability() {
  const hour = new Date().getHours();

  // 熱門時段 (12:00-14:00, 18:00-22:00) 配對率更高
  if ((hour >= 12 && hour < 14) || (hour >= 18 && hour < 22)) {
    return 0.5;  // 50% 配對率
  }
  return 0.2;  // 20% 配對率
}

function handleLike() {
  const probability = getMatchProbability();
  if (Math.random() < probability) {
    showMatchModal(user);
  }
}
```

**特點**:
- ⏰ 模擬真實活躍時段
- 📈 午餐和晚上配對率更高
- 🎯 鼓勵特定時段使用

---

## 推薦方案

### 🌟 階段 1 (當前): 隨機機制
適合快速原型展示和測試 UI/UX

### 🌟 階段 2 (近期): 智能配對 (選項 A)
- 加入共同興趣權重
- 提升真實感
- 易於實作

### 🌟 階段 3 (未來): 雙向配對 (選項 B)
- 整合 Firebase 後端
- 真實的雙向配對
- 完整社交體驗

---

## 如何修改

### 修改配對機率
在 `js/pages/swipe.js` 第 194 行：
```javascript
// 將 0.3 改為 0.5 即可提高到 50% 配對率
if (Math.random() < 0.3) {  // ← 修改這裡
  showMatchModal(user);
}
```

### 套用智能配對
將 `handleLike()` 函數改為：
```javascript
function handleLike() {
  if (!currentCard) return;
  const user = users[currentUserIndex];

  gsap.to(currentCard, {
    duration: 0.4,
    x: window.innerWidth,
    rotation: 15,
    opacity: 0,
    ease: 'power2.in',
    onComplete: () => {
      swipesRemaining--;
      currentUserIndex++;

      // 智能配對：根據共同興趣
      const commonInterests = Utils.getCommonInterests(
        currentUser.interests,
        user.interests
      );
      const matchProbability = 0.2 + (commonInterests.length * 0.15);

      if (Math.random() < matchProbability) {
        showMatchModal(user);
      } else {
        showNextCard();
      }
    }
  });

  showHeartAnimation();
}
```

---

## 資料結構

### 未來可擴展的資料結構
```javascript
// 用戶配對狀態
const userMatchData = {
  liked: [],      // 我喜歡的人
  likedBy: [],    // 喜歡我的人
  matches: [],    // 配對成功的人
  passed: []      // 跳過的人
};

// 配對記錄
const matchRecord = {
  userId: 1,
  matchedAt: '2024-01-15T10:30:00',
  commonInterests: ['電影', '咖啡'],
  compatibility: 0.75  // 相容度
};
```
