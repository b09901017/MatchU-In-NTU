---
name: backend-dev
description: Design and implement Firebase backend architecture for the MatchU dating platform. Use when users need database schema design, Firebase Authentication setup, Firestore Security Rules, Cloud Functions, or API integration. Specializes in NoSQL data modeling, real-time chat systems, user authentication, and scalable backend architecture for dating platforms.
---

# Backend Developer Skill

專為 MatchU (台大交友平台) 打造的後端開發技能。

## 技能說明

基於產品需求與前端架構,設計並實作 Firebase 後端服務,提供穩定、安全、可擴展的後端系統。

### 適用場景
- 設計 Firestore 資料庫結構
- 配置 Firebase Authentication
- 撰寫 Security Rules
- 開發 Cloud Functions
- 整合第三方 API

### 技術棧
- **Firebase Authentication**: 用戶認證
- **Firestore Database**: NoSQL 即時資料庫
- **Firebase Storage**: 檔案儲存
- **Cloud Functions**: 伺服器端邏輯
- **Firebase Hosting**: 網站部署

## 核心能力

### Firebase 架構設計
設計合理的 Firestore 資料庫結構,規劃 Authentication、Storage、Functions 的整體架構。

### API 設計
- 設計 RESTful API 端點
- 定義清晰的請求與響應格式
- 處理錯誤與異常情況
- 設計分頁與篩選機制

### 資料庫設計
- 設計 NoSQL 資料模型
- 優化查詢效能
- 設計索引策略
- 處理資料關聯與查詢

### 安全性設計
- 配置 Firestore Security Rules
- 實作用戶權限控制
- 防止常見安全漏洞
- 敏感資料加密

### 第三方整合
- 整合 Gemini API (AI 功能)
- 整合地圖服務
- 整合推送通知

## 執行流程

### 階段一: 需求分析與架構設計

**Step 1: 分析功能需求**

理解產品功能與數據流,識別需要的後端服務。

**Step 2: 架構規劃**

詢問確認 (若已明確則跳過):

```
Q1: 用戶認證方式?(Email/Google/Facebook/學校帳號)
Q2: 需要哪些核心資料表?(用戶、配對、活動、聊天)
Q3: 是否需要即時功能?(即時聊天、通知)
Q4: 預期用戶規模?(影響設計與成本)
```

完成後進入【階段二】。

### 階段二: 後端架構實作

#### 1. Firebase 專案初始化

```bash
# 安裝 Firebase CLI
npm install -g firebase-tools

# 登入 Firebase
firebase login

# 初始化專案
firebase init
# 選擇: Firestore, Authentication, Storage, Hosting
```

#### 2. Firestore 資料庫結構設計

標準資料表架構:

**用戶表 (users)**
```javascript
{
  "users": {
    "userId123": {
      "uid": "userId123",
      "email": "student@ntu.edu.tw",
      "displayName": "王小明",
      "studentId": "B12345678",
      "verified": true,
      "profile": {
        "avatar": "url",
        "age": 21,
        "gender": "male",
        "department": "電機工程學系",
        "bio": "簡介",
        "interests": ["籃球", "程式設計"],
        "mbti": "INTJ"
      },
      "settings": {
        "visibility": "public",
        "notifications": true
      },
      "stats": {
        "matchCount": 5,
        "meetCount": 3
      },
      "createdAt": "2025-10-01T10:00:00Z",
      "lastActiveAt": "2025-10-28T15:30:00Z"
    }
  }
}
```

**配對記錄表 (matches)**
```javascript
{
  "matches": {
    "matchId456": {
      "matchId": "matchId456",
      "users": ["userId123", "userId789"],
      "matchedAt": "2025-10-28T10:00:00Z",
      "matchType": "blind_box",
      "status": "matched",
      "chatRoomId": "chatId999",
      "metAt": null
    }
  }
}
```

**聊天室表 (chatRooms)**
```javascript
{
  "chatRooms": {
    "chatId999": {
      "chatId": "chatId999",
      "participants": ["userId123", "userId789"],
      "createdAt": "2025-10-28T10:05:00Z",
      "lastMessageAt": "2025-10-28T15:30:00Z",
      "unreadCount": {
        "userId123": 0,
        "userId789": 2
      }
    }
  }
}
```

**聊天訊息表 (messages - subcollection)**
```javascript
{
  "chatRooms/chatId999/messages": {
    "msgId001": {
      "msgId": "msgId001",
      "senderId": "userId123",
      "content": "嗨!很高興認識你",
      "type": "text",
      "timestamp": "2025-10-28T10:10:00Z",
      "read": true
    }
  }
}
```

**活動表 (activities)**
```javascript
{
  "activities": {
    "activityId111": {
      "activityId": "activityId111",
      "title": "椰林下午茶聚會",
      "description": "在椰林大道喝下午茶",
      "organizerId": "userId123",
      "type": "official",
      "location": {
        "name": "台大椰林大道",
        "lat": 25.0170,
        "lng": 121.5400
      },
      "datetime": "2025-11-15T14:00:00Z",
      "duration": 120,
      "participants": ["userId123"],
      "maxParticipants": 12,
      "tags": ["聊天", "交友"],
      "status": "upcoming"
    }
  }
}
```

**興趣標籤表 (interests)**
```javascript
{
  "interests": {
    "interestId001": {
      "interestId": "interestId001",
      "name": "籃球",
      "category": "運動",
      "icon": "🏀",
      "userCount": 156
    }
  }
}
```

#### 3. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 用戶資料
    match /users/{userId} {
      allow read: if request.auth != null && 
                     resource.data.settings.visibility == 'public';
      allow write: if request.auth != null && 
                      request.auth.uid == userId;
    }
    
    // 配對記錄
    match /matches/{matchId} {
      allow read: if request.auth != null && 
                     request.auth.uid in resource.data.users;
      allow create: if false; // 透過 Cloud Function
    }
    
    // 聊天室
    match /chatRooms/{chatId} {
      allow read: if request.auth != null && 
                     request.auth.uid in resource.data.participants;
      
      match /messages/{msgId} {
        allow read: if request.auth != null && 
                       request.auth.uid in get(/databases/$(database)/documents/chatRooms/$(chatId)).data.participants;
        allow create: if request.auth != null && 
                         request.auth.uid in get(/databases/$(database)/documents/chatRooms/$(chatId)).data.participants;
      }
    }
    
    // 活動
    match /activities/{activityId} {
      allow read: if request.auth != null;
      allow update: if request.auth != null && 
                       request.auth.uid == resource.data.organizerId;
      allow create: if request.auth != null;
    }
  }
}
```

#### 4. Firebase Authentication 設定

```javascript
// firebase-auth.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "matchu-ntu.firebaseapp.com",
  projectId: "matchu-ntu",
  storageBucket: "matchu-ntu.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Email 註冊
export async function signUpWithEmail(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, email, password
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Email 登入
export async function signInWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, email, password
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Google 登入
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

#### 5. Firestore 操作範例

```javascript
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';

const db = getFirestore();

// 創建用戶資料
export async function createUserProfile(userId, profileData) {
  try {
    await setDoc(doc(db, 'users', userId), {
      uid: userId,
      ...profileData,
      createdAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 獲取用戶資料
export async function getUserProfile(userId) {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: '用戶不存在' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 盲盒配對 - 隨機抽取用戶
export async function drawBlindBoxUser(currentUserId, filterTags = []) {
  try {
    const usersRef = collection(db, 'users');
    let q = query(
      usersRef,
      where('verified', '==', true),
      where('uid', '!=', currentUserId)
    );
    
    if (filterTags.length > 0) {
      q = query(
        q, 
        where('profile.interests', 'array-contains-any', filterTags)
      );
    }
    
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    
    if (users.length > 0) {
      const randomUser = users[
        Math.floor(Math.random() * users.length)
      ];
      return { success: true, user: randomUser };
    } else {
      return { success: false, error: '沒有符合條件的用戶' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 創建配對記錄
export async function createMatch(userId1, userId2, matchType = 'blind_box') {
  try {
    const matchId = `match_${Date.now()}`;
    const chatId = `chat_${Date.now()}`;
    
    await setDoc(doc(db, 'matches', matchId), {
      matchId,
      users: [userId1, userId2],
      matchedAt: new Date().toISOString(),
      matchType,
      status: 'matched',
      chatRoomId: chatId
    });
    
    await setDoc(doc(db, 'chatRooms', chatId), {
      chatId,
      participants: [userId1, userId2],
      createdAt: new Date().toISOString(),
      unreadCount: {
        [userId1]: 0,
        [userId2]: 0
      }
    });
    
    return { success: true, matchId, chatId };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

#### 6. Firebase Storage 配置

```javascript
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

const storage = getStorage();

// 上傳頭像
export async function uploadAvatar(userId, file) {
  try {
    const storageRef = ref(
      storage, 
      `avatars/${userId}/${Date.now()}_${file.name}`
    );
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { success: true, url: downloadURL };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

#### 7. Cloud Functions (可選)

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// 配對成功後發送通知
exports.sendMatchNotification = functions.firestore
  .document('matches/{matchId}')
  .onCreate(async (snap, context) => {
    const matchData = snap.data();
    const [user1Id, user2Id] = matchData.users;
    
    // 發送推送通知
    console.log(`配對成功: ${user1Id} <-> ${user2Id}`);
  });

// 驗證台大學生身份
exports.verifyNTUStudent = functions.https.onCall(
  async (data, context) => {
    const { studentId, email } = data;
    
    if (!email.endsWith('@ntu.edu.tw')) {
      throw new functions.https.HttpsError(
        'invalid-argument', 
        '請使用台大 Email'
      );
    }
    
    const uid = context.auth.uid;
    await admin.firestore()
      .collection('users')
      .doc(uid)
      .update({
        verified: true,
        studentId: studentId
      });
    
    return { success: true, message: '驗證成功' };
  }
);
```

### 階段三: 文檔交付

完成後端開發後告知用戶:

```
✅ Firebase 後端架構已完成!

📂 已產出內容:
- Firestore 資料庫結構
- Security Rules 安全規則
- Authentication 認證配置
- 資料庫操作 API
- Storage 檔案上傳功能

📄 文檔已儲存至: BACKEND_API.md

🔧 Firebase 設定步驟:
1. 在 Firebase Console 建立專案
2. 啟用 Authentication、Firestore、Storage
3. 複製 Firebase Config 到前端
4. 部署 Security Rules

💡 前端整合:
1. 安裝: npm install firebase
2. 初始化 Firebase
3. 替換 Fake Data 為真實 API
4. 測試認證與資料操作

📌 下一步:
- 測試各項 API
- 調整 Security Rules
- 整合 Gemini API (AI 功能)
- 設定 Firebase Hosting

需要協助前端整合嗎?
```

## 注意事項

### 資料安全
Security Rules 是核心,務必嚴格設定。

### 成本控制
注意 Firestore 讀寫次數與 Storage 用量。

### 索引優化
為常用查詢建立複合索引。

### 錯誤處理
API 需完善的錯誤處理與回傳。

### 隱私保護
敏感資料加密,不儲存明文密碼。

### 擴展性
資料結構設計需考慮未來擴展。

### 測試完整
上線前充分測試各種情境。

## 資料庫設計原則

### NoSQL 特性
- 非關聯式資料庫
- 文檔導向存儲
- 支援巢狀結構
- 查詢需要建立索引

### 反正規化
適度反正規化以優化讀取效能。

### 子集合使用
聊天訊息使用子集合,避免單一文檔過大。

### 資料冗餘
適度冗餘以減少查詢次數 (如在配對記錄中存儲用戶基本資料)。

## Security Rules 設計要點

### 最小權限原則
只給予必要的權限。

### 驗證用戶身份
確保只有已登入用戶可操作。

### 檢查資料擁有權
確保用戶只能修改自己的資料。

### 驗證資料格式
使用 Rules 驗證資料欄位與類型。

## API 設計規範

### 統一回傳格式
```javascript
{
  success: true/false,
  data: {...} / null,
  error: "錯誤訊息" / null
}
```

### 錯誤處理
清晰的錯誤訊息,方便前端處理。

### 參數驗證
在函數入口驗證參數。

## 輸出規範

### 文檔格式
產出 BACKEND_API.md,包含:
- 資料庫結構說明
- API 使用範例
- Security Rules
- 配置步驟

### 代碼組織
- 按功能模組化
- 清晰的註解
- 錯誤處理完整
