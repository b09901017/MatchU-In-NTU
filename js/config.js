/**
 * MatchU - 配置文件與假資料
 * 用於前端開發階段的數據模擬
 */

// ============================================
// 應用配置
// ============================================

const CONFIG = {
  APP_NAME: 'MatchU',
  VERSION: '1.0.0',
  DAILY_SWIPE_LIMIT: 5,
  MAX_INTERESTS: 10,
  MIN_INTERESTS: 3,
};

// ============================================
// 興趣標籤資料
// ============================================

const INTEREST_CATEGORIES = {
  art: {
    name: '🎨 藝術文化',
    tags: ['電影', '音樂', '攝影', '藝術', '閱讀', '展覽']
  },
  sports: {
    name: '⚽ 運動健身',
    tags: ['籃球', '羽球', '健身', '登山', '慢跑', '游泳', '瑜珈']
  },
  entertainment: {
    name: '🎮 休閒娛樂',
    tags: ['電玩', '桌遊', '唱歌', '旅遊', '美食', '咖啡', '調酒']
  },
  academic: {
    name: '📚 學術興趣',
    tags: ['科技', '程式', '商業', '心理', '設計', '語言', '歷史']
  },
  lifestyle: {
    name: '🌱 生活風格',
    tags: ['寵物', '料理', '植物', '手作', '時尚']
  }
};

// ============================================
// 學院與系所資料
// ============================================

const COLLEGES = [
  {
    name: '文學院',
    departments: ['中國文學系', '外國語文學系', '歷史學系', '哲學系', '圖書資訊學系', '日本語文學系']
  },
  {
    name: '理學院',
    departments: ['數學系', '物理學系', '化學系', '地質科學系', '心理學系', '地理環境資源學系']
  },
  {
    name: '社會科學院',
    departments: ['政治學系', '經濟學系', '社會學系', '社會工作學系']
  },
  {
    name: '醫學院',
    departments: ['醫學系', '牙醫學系', '藥學系', '醫學檢驗暨生物技術學系', '護理學系', '物理治療學系']
  },
  {
    name: '工學院',
    departments: ['土木工程學系', '機械工程學系', '化學工程學系', '工程科學及海洋工程學系', '材料科學與工程學系']
  },
  {
    name: '生農學院',
    departments: ['農藝學系', '生物環境系統工程學系', '農業化學系', '森林環境暨資源學系', '動物科學技術學系', '農業經濟學系', '園藝暨景觀學系', '生物產業傳播暨發展學系', '昆蟲學系', '植物病理與微生物學系']
  },
  {
    name: '管理學院',
    departments: ['工商管理學系', '會計學系', '財務金融學系', '國際企業學系', '資訊管理學系']
  },
  {
    name: '公共衛生學院',
    departments: ['公共衛生學系', '職業醫學與工業衛生研究所']
  },
  {
    name: '電機資訊學院',
    departments: ['電機工程學系', '資訊工程學系', '資訊網路與多媒體研究所', '光電工程學研究所', '電信工程學研究所', '電子工程學研究所']
  },
  {
    name: '法律學院',
    departments: ['法律學系']
  },
  {
    name: '生命科學院',
    departments: ['生命科學系', '生化科技學系', '生化科學研究所']
  }
];

const GRADES = ['大一', '大二', '大三', '大四', '碩一', '碩二', '博士班'];

// ============================================
// 假用戶資料
// ============================================

const FAKE_USERS = [
  {
    id: 1,
    name: '佳佳',
    age: 22,
    gender: 'female',
    college: '電機資訊學院',
    department: '電機工程學系',
    grade: '大三',
    avatar: 'https://i.pravatar.cc/300?img=1',
    photos: [
      'https://i.pravatar.cc/400?img=1',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
    ],
    bio: '喜歡在椰林散步的電機系學生,熱愛攝影與咖啡~',
    interests: ['電影', '音樂', '咖啡', '攝影', '程式'],
    isOnline: true,
    lastSeen: null
  },
  {
    id: 2,
    name: '小明',
    age: 23,
    gender: 'male',
    college: '管理學院',
    department: '工商管理學系',
    grade: '大四',
    avatar: 'https://i.pravatar.cc/300?img=12',
    photos: [
      'https://i.pravatar.cc/400?img=12',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
    ],
    bio: '熱愛運動與旅遊,喜歡嘗試新事物!',
    interests: ['籃球', '旅遊', '美食', '電影', '登山'],
    isOnline: false,
    lastSeen: '2小時前'
  },
  {
    id: 3,
    name: '小華',
    age: 21,
    gender: 'female',
    college: '文學院',
    department: '外國語文學系',
    grade: '大二',
    avatar: 'https://i.pravatar.cc/300?img=5',
    photos: [
      'https://i.pravatar.cc/400?img=5',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'
    ],
    bio: '愛閱讀、愛藝術,夢想環遊世界~',
    interests: ['閱讀', '藝術', '旅遊', '語言', '展覽'],
    isOnline: true,
    lastSeen: null
  },
  {
    id: 4,
    name: '阿傑',
    age: 24,
    gender: 'male',
    college: '理學院',
    department: '心理學系',
    grade: '碩一',
    avatar: 'https://i.pravatar.cc/300?img=13',
    photos: [
      'https://i.pravatar.cc/400?img=13',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400'
    ],
    bio: '心理系研究生,喜歡觀察人,也喜歡被觀察XD',
    interests: ['心理', '咖啡', '音樂', '電影', '閱讀'],
    isOnline: false,
    lastSeen: '1天前'
  },
  {
    id: 5,
    name: '小薇',
    age: 20,
    gender: 'female',
    college: '生命科學院',
    department: '生命科學系',
    grade: '大一',
    avatar: 'https://i.pravatar.cc/300?img=9',
    photos: [
      'https://i.pravatar.cc/400?img=9',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
    ],
    bio: '喜歡植物和小動物,夢想開一間咖啡廳!',
    interests: ['植物', '寵物', '咖啡', '料理', '手作'],
    isOnline: true,
    lastSeen: null
  },
  {
    id: 6,
    name: '大衛',
    age: 22,
    gender: 'male',
    college: '工學院',
    department: '土木工程學系',
    grade: '大三',
    avatar: 'https://i.pravatar.cc/300?img=14',
    photos: [
      'https://i.pravatar.cc/400?img=14',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
    ],
    bio: '工學院的健身狂熱者,也很會煮飯喔!',
    interests: ['健身', '料理', '籃球', '科技', '設計'],
    isOnline: true,
    lastSeen: null
  }
];

// ============================================
// 聊天訊息資料
// ============================================

const FAKE_MESSAGES = {
  1: [
    { id: 1, senderId: 1, content: 'Hi! 很高興認識你~', timestamp: '14:20', isRead: true },
    { id: 2, senderId: 'me', content: '我也是!看到你也喜歡咖啡,有沒有推薦的咖啡廳?', timestamp: '14:22', isRead: true },
    { id: 3, senderId: 1, content: '我最近很喜歡舟山路那間!他們的拿鐵很棒', timestamp: '14:25', isRead: true },
    { id: 4, senderId: 'me', content: '真的嗎!我也常去那間!下次要不要一起去?', timestamp: '14:27', isRead: false }
  ],
  2: [
    { id: 1, senderId: 2, content: '嗨~看到你喜歡登山!', timestamp: '昨天 18:30', isRead: true },
    { id: 2, senderId: 'me', content: '對啊!你也喜歡爬山嗎?', timestamp: '昨天 18:35', isRead: true },
    { id: 3, senderId: 2, content: '超愛的!週末想去象山,要一起嗎?', timestamp: '昨天 18:40', isRead: true }
  ],
  3: [
    { id: 1, senderId: 3, content: '你好呀!', timestamp: '3天前', isRead: true },
    { id: 2, senderId: 'me', content: '哈哈哈', timestamp: '3天前', isRead: true }
  ]
};

// ============================================
// 活動資料
// ============================================

const FAKE_ACTIVITIES = [
  {
    id: 1,
    title: '椰林大道野餐日',
    type: '聯誼活動',
    date: '2025-11-05',
    time: '14:00',
    location: '椰林大道',
    lat: 25.0173,
    lng: 121.5397,
    capacity: 20,
    currentParticipants: 12,
    fee: 100,
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600',
    description: '在美麗的椰林大道享受午後時光,認識新朋友!'
  },
  {
    id: 2,
    title: '總圖讀書會',
    type: '學習交流',
    date: '2025-11-08',
    time: '19:00',
    location: '總圖書館',
    lat: 25.0154,
    lng: 121.5405,
    capacity: 15,
    currentParticipants: 8,
    fee: 0,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
    description: '一起讀書,互相鼓勵,期末不孤單!'
  },
  {
    id: 3,
    title: '台大夜遊',
    type: '校園探索',
    date: '2025-11-10',
    time: '20:00',
    location: '校門口集合',
    lat: 25.0145,
    lng: 121.5398,
    capacity: 25,
    currentParticipants: 18,
    fee: 50,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600',
    description: '夜晚的台大別有一番風味,一起探索校園秘境!'
  },
  {
    id: 4,
    title: '舟山路咖啡聚',
    type: '休閒交流',
    date: '2025-11-12',
    time: '15:00',
    location: '舟山路咖啡廳',
    lat: 25.0162,
    lng: 121.5355,
    capacity: 10,
    currentParticipants: 6,
    fee: 150,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600',
    description: '輕鬆的下午茶時光,聊聊天認識新朋友~'
  }
];

// ============================================
// 活動推薦選項(用於聊天室)
// ============================================

const ACTIVITY_SUGGESTIONS = [
  {
    emoji: '☕',
    title: '一起喝咖啡',
    keywords: ['咖啡', '飲料', '聊天'],
    locations: ['舟山路咖啡廳', '小福咖啡', '鹿鳴堂咖啡']
  },
  {
    emoji: '🎬',
    title: '一起看電影',
    keywords: ['電影', '看', '片'],
    locations: ['台大附近戲院', '信義威秀', '西門町']
  },
  {
    emoji: '📚',
    title: '一起讀書',
    keywords: ['讀書', '圖書館', '學習', '考試'],
    locations: ['總圖書館', '社科圖', '法律圖']
  },
  {
    emoji: '🍜',
    title: '一起吃飯',
    keywords: ['吃', '美食', '餐廳', '午餐', '晚餐'],
    locations: ['公館商圈', '小福樓', '活大餐廳']
  },
  {
    emoji: '⛰️',
    title: '一起爬山',
    keywords: ['登山', '爬山', '運動', '戶外'],
    locations: ['象山', '虎山', '貓空']
  },
  {
    emoji: '🏀',
    title: '一起運動',
    keywords: ['籃球', '羽球', '運動', '健身'],
    locations: ['綜合體育館', '小體館', '操場']
  },
  {
    emoji: '🎨',
    title: '一起看展覽',
    keywords: ['展覽', '藝術', '博物館', '美術館'],
    locations: ['北美館', '故宮', '華山文創']
  },
  {
    emoji: '🎮',
    title: '一起玩桌遊',
    keywords: ['桌遊', '電玩', '遊戲'],
    locations: ['公館桌遊店', '師大桌遊', '線上遊戲']
  }
];

// ============================================
// 破冰問題庫
// ============================================

const ICEBREAKER_QUESTIONS = [
  '在台大最喜歡的地方是哪裡?',
  '如果有一天完全自由的假期,你會做什麼?',
  '你是早起人還是夜貓子?',
  '最近看的一本書或電影是什麼?',
  '你的夢想是什麼?',
  '如果能學會任何技能,你想學什麼?',
  '你最喜歡的台大美食是?',
  '週末通常都做些什麼?',
  '你最欣賞別人什麼特質?',
  '如果能去任何地方旅行,你會選哪裡?',
  '你認為大學最重要的是什麼?',
  '最近讓你開心的事情是什麼?',
  '你會用三個詞形容自己嗎?',
  '最想和誰共進晚餐(古今中外)?',
  '你的人生座右銘是什麼?',
  '如果能回到過去,你想改變什麼?',
  '你最驕傲的成就是什麼?',
  '什麼樣的音樂最能代表你?',
  '你覺得台大最美的季節是?',
  '如果能擁有超能力,你想要什麼?'
];

// ============================================
// 當前用戶資料 (模擬登入用戶)
// ============================================

const CURRENT_USER = {
  id: 'me',
  name: '我',
  age: 22,
  gender: 'male',
  college: '電機資訊學院',
  department: '資訊工程學系',
  grade: '大三',
  avatar: 'https://i.pravatar.cc/300?img=33',
  photos: [
    'https://i.pravatar.cc/400?img=33',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
  ],
  bio: '喜歡寫程式和攝影的資工人',
  interests: ['程式', '攝影', '電影', '咖啡', '音樂'],
  dailySwipesRemaining: 5,
  matches: [1, 2, 3]  // 已配對用戶的 ID
};

// ============================================
// LocalStorage 輔助函數
// ============================================

const Storage = {
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('儲存失敗:', e);
    }
  },

  load(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('讀取失敗:', e);
      return null;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('刪除失敗:', e);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('清空失敗:', e);
    }
  }
};

// 初始化時載入或創建用戶資料
function initializeUserData() {
  let userData = Storage.load('currentUser');
  if (!userData) {
    userData = { ...CURRENT_USER };
    Storage.save('currentUser', userData);
  } else {
    // 確保舊版本的用戶資料也有必要的屬性
    if (!userData.matches) {
      userData.matches = [];
    }
    if (!userData.interests) {
      userData.interests = [];
    }
    if (!userData.photos) {
      userData.photos = [];
    }
    if (!userData.avatar) {
      userData.avatar = CURRENT_USER.avatar;
    }
    if (!userData.bio) {
      userData.bio = CURRENT_USER.bio;
    }
    if (!userData.dailySwipesRemaining) {
      userData.dailySwipesRemaining = CONFIG.DAILY_SWIPE_LIMIT;
    }
    // 更新 localStorage
    Storage.save('currentUser', userData);
  }
  return userData;
}

// 導出供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    INTEREST_CATEGORIES,
    COLLEGES,
    GRADES,
    FAKE_USERS,
    FAKE_MESSAGES,
    FAKE_ACTIVITIES,
    ACTIVITY_SUGGESTIONS,
    ICEBREAKER_QUESTIONS,
    CURRENT_USER,
    Storage,
    initializeUserData
  };
}
