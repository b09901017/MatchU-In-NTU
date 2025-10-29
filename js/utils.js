/**
 * MatchU - 工具函數庫
 * 提供各種實用的輔助函數
 */

const Utils = {
  /**
   * 從陣列中隨機選取一個元素
   */
  randomPick(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  /**
   * 從陣列中隨機選取多個不重複元素
   */
  randomPickMultiple(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  /**
   * 格式化日期
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  },

  /**
   * 格式化時間
   */
  formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },

  /**
   * 計算相對時間 (例如: 2小時前, 3天前)
   */
  getRelativeTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return '剛剛';
    if (diffMins < 60) return `${diffMins}分鐘前`;
    if (diffHours < 24) return `${diffHours}小時前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return this.formatDate(dateString);
  },

  /**
   * 防抖函數
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * 節流函數
   */
  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * 深度克隆對象
   */
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * 顯示 Toast 通知
   */
  showToast(message, type = 'info', duration = 3000) {
    // 移除已存在的 toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // 創建新 toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // 自動移除
    setTimeout(() => {
      toast.style.animation = 'toastOut 300ms ease-in-out';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * 顯示載入畫面
   */
  showLoading(message = '載入中...') {
    // 移除已存在的 loading
    this.hideLoading();

    const loadingHtml = `
      <div class="loading-overlay">
        <div class="loading-spinner"></div>
        <div class="loading-text">${message}</div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loadingHtml);
  },

  /**
   * 隱藏載入畫面
   */
  hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
      loading.style.opacity = '0';
      setTimeout(() => loading.remove(), 200);
    }
  },

  /**
   * 顯示確認對話框
   */
  showConfirm(message, onConfirm, onCancel) {
    const modalHtml = `
      <div class="modal-overlay" id="confirmModal">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">確認</h3>
          </div>
          <div class="modal-body">
            <p>${message}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="cancelBtn">取消</button>
            <button class="btn btn-primary" id="confirmBtn">確認</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('confirmModal');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    confirmBtn.addEventListener('click', () => {
      modal.remove();
      if (onConfirm) onConfirm();
    });

    cancelBtn.addEventListener('click', () => {
      modal.remove();
      if (onCancel) onCancel();
    });

    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        if (onCancel) onCancel();
      }
    });
  },

  /**
   * 驗證台大信箱
   */
  isValidNTUEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@ntu\.edu\.tw$/;
    return regex.test(email);
  },

  /**
   * 驗證密碼強度 (至少8位,包含英文和數字)
   */
  isValidPassword(password) {
    if (password.length < 8) return false;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
  },

  /**
   * 計算兩個用戶的共同興趣
   */
  getCommonInterests(user1Interests, user2Interests) {
    return user1Interests.filter(interest => user2Interests.includes(interest));
  },

  /**
   * 模擬 API 請求延遲
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * 生成唯一 ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * 截斷文字並添加省略號
   */
  truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  },

  /**
   * 檢查是否為移動設備
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * 平滑滾動到元素
   */
  scrollToElement(element, offset = 0) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  },

  /**
   * 複製文字到剪貼簿
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showToast('已複製到剪貼簿', 'success');
      return true;
    } catch (err) {
      console.error('複製失敗:', err);
      return false;
    }
  },

  /**
   * 震動反饋 (需要設備支持)
   */
  vibrate(duration = 10) {
    if ('vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  },

  /**
   * 根據對話內容推薦活動
   */
  suggestActivities(messages) {
    if (!ACTIVITY_SUGGESTIONS) return [];

    // 將所有訊息內容合併
    const allText = messages.map(m => m.content).join(' ');

    // 找出匹配的活動建議
    const matches = ACTIVITY_SUGGESTIONS.filter(activity => {
      return activity.keywords.some(keyword => allText.includes(keyword));
    });

    // 去重並返回前3個
    const unique = [...new Map(matches.map(item => [item.title, item])).values()];
    return unique.slice(0, 3);
  },

  /**
   * 檢測文字中的台大地標關鍵字
   */
  detectNTULandmarks(text) {
    const landmarks = [
      { name: '椰林大道', emoji: '🌴' },
      { name: '總圖', emoji: '📚' },
      { name: '傅鐘', emoji: '🔔' },
      { name: '醉月湖', emoji: '🌊' },
      { name: '小福', emoji: '🍜' },
      { name: '活大', emoji: '🏛️' },
      { name: '舟山路', emoji: '☕' }
    ];

    return landmarks.filter(landmark => text.includes(landmark.name));
  },

  /**
   * 格式化數字 (例如: 1000 -> 1k)
   */
  formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  },

  /**
   * 計算年齡
   */
  calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  },

  /**
   * 打亂陣列順序
   */
  shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  /**
   * 初始化頁面淡入動畫
   */
  initPageTransition() {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 300ms ease-in-out';
      document.body.style.opacity = '1';
    }, 10);
  },

  /**
   * 頁面跳轉(帶淡出效果)
   */
  navigateTo(url) {
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }
};

// 導出供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}
