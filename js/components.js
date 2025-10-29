/**
 * MatchU - UI 組件庫
 * 提供可重用的 UI 組件和交互邏輯
 */

const Components = {
  /**
   * Modal (彈窗) 管理器
   */
  Modal: {
    /**
     * 開啟 Modal
     * @param {string} modalId - Modal 的 ID
     * @param {Function} onOpen - 開啟後的回調函數 (可選)
     */
    open(modalId, onOpen) {
      const modal = document.getElementById(modalId);
      if (!modal) {
        console.error(`Modal with id "${modalId}" not found`);
        return;
      }

      modal.classList.add('show');
      this.animate(modalId);

      // 執行回調
      if (typeof onOpen === 'function') {
        onOpen(modal);
      }

      // 震動反饋
      Utils.vibrate(10);
    },

    /**
     * 關閉 Modal
     * @param {string} modalId - Modal 的 ID
     * @param {Function} onClose - 關閉後的回調函數 (可選)
     */
    close(modalId, onClose) {
      const modal = document.getElementById(modalId);
      if (!modal) {
        console.error(`Modal with id "${modalId}" not found`);
        return;
      }

      const content = modal.querySelector('.modal-content');
      if (content && typeof gsap !== 'undefined') {
        // 使用 GSAP 動畫關閉
        gsap.to(content, {
          duration: 0.2,
          scale: 0.9,
          opacity: 0,
          ease: 'power2.in',
          onComplete: () => {
            modal.classList.remove('show');
            if (typeof onClose === 'function') {
              onClose(modal);
            }
          }
        });
      } else {
        // 沒有 GSAP,直接關閉
        modal.classList.remove('show');
        if (typeof onClose === 'function') {
          onClose(modal);
        }
      }
    },

    /**
     * Modal 開啟動畫
     * @param {string} modalId - Modal 的 ID
     */
    animate(modalId) {
      if (typeof gsap === 'undefined') return;

      const modal = document.getElementById(modalId);
      if (!modal) return;

      const content = modal.querySelector('.modal-content');
      if (!content) return;

      gsap.from(content, {
        duration: 0.3,
        scale: 0.9,
        opacity: 0,
        ease: 'back.out(1.7)'
      });
    },

    /**
     * 自動設置 Modal 背景點擊關閉
     * @param {string} modalId - Modal 的 ID
     */
    setupClickOutsideClose(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.close(modalId);
        }
      });
    },

    /**
     * 自動設置所有 Modal 的背景點擊關閉
     */
    setupAllClickOutsideClose() {
      document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.close(modal.id);
          }
        });
      });
    }
  },

  /**
   * 底部導航管理器
   */
  BottomNav: {
    /**
     * 生成底部導航 HTML (無障礙優化版本)
     * @param {string} activePage - 當前激活的頁面 ('swipe', 'chat', 'activity', 'profile')
     * @returns {string} HTML 字符串
     */
    render(activePage) {
      const navItems = [
        { id: 'swipe', icon: '🎴', label: '盲盒', href: 'swipe.html' },
        { id: 'chat', icon: '💬', label: '聊天', href: 'chat-list.html' },
        { id: 'activity', icon: '🎉', label: '活動', href: 'activity-list.html' },
        { id: 'profile', icon: '👤', label: '我的', href: 'profile.html' }
      ];

      return `
        <nav class="bottom-nav" role="navigation" aria-label="主要導航">
          ${navItems.map(item => `
            <button
              class="nav-item ${activePage === item.id ? 'active' : ''}"
              onclick="window.location.href='${item.href}'"
              aria-label="${item.label}"
              ${activePage === item.id ? 'aria-current="page"' : ''}
            >
              <span class="nav-icon" aria-hidden="true">${item.icon}</span>
              <span>${item.label}</span>
            </button>
          `).join('')}
        </nav>
      `;
    },

    /**
     * 插入底部導航到頁面
     * @param {string} activePage - 當前激活的頁面
     * @param {string} containerId - 容器 ID (可選,默認插入到 body 末尾)
     */
    insert(activePage, containerId = null) {
      const html = this.render(activePage);
      if (containerId) {
        const container = document.getElementById(containerId);
        if (container) {
          container.insertAdjacentHTML('beforeend', html);
        }
      } else {
        document.body.insertAdjacentHTML('beforeend', html);
      }
    }
  },

  /**
   * 徽章組件
   */
  Badge: {
    /**
     * 創建徽章元素
     * @param {number|string} count - 顯示的數字或文字
     * @param {boolean} isAbsolute - 是否為絕對定位 (默認 false)
     * @returns {string} HTML 字符串
     */
    create(count, isAbsolute = false) {
      if (!count || count === 0) return '';
      const className = isAbsolute ? 'badge badge-absolute' : 'badge';
      return `<span class="${className}">${count}</span>`;
    }
  },

  /**
   * 空狀態組件
   */
  EmptyState: {
    /**
     * 創建空狀態元素
     * @param {Object} options - 配置選項
     * @param {string} options.icon - 圖示 emoji
     * @param {string} options.title - 標題
     * @param {string} options.description - 描述文字
     * @param {string} options.buttonText - 按鈕文字 (可選)
     * @param {string} options.buttonAction - 按鈕動作 (可選)
     * @returns {string} HTML 字符串
     */
    create(options) {
      const { icon, title, description, buttonText, buttonAction } = options;

      return `
        <div class="empty-state">
          <div class="empty-icon">${icon}</div>
          <h2 class="empty-title">${title}</h2>
          <p class="empty-text">${description}</p>
          ${buttonText ? `
            <button class="btn btn-primary" onclick="${buttonAction}">
              ${buttonText}
            </button>
          ` : ''}
        </div>
      `;
    }
  },

  /**
   * 載入骨架屏
   */
  Skeleton: {
    /**
     * 創建骨架屏元素
     * @param {string} type - 類型 ('card', 'list', 'text')
     * @param {number} count - 數量 (默認 1)
     * @returns {string} HTML 字符串
     */
    create(type = 'card', count = 1) {
      const skeletons = {
        card: '<div class="skeleton skeleton-card"></div>',
        list: '<div class="skeleton skeleton-list"></div>',
        text: '<div class="skeleton skeleton-text"></div>'
      };

      const html = skeletons[type] || skeletons.card;
      return Array(count).fill(html).join('');
    }
  },

  /**
   * Tab 切換組件
   */
  Tabs: {
    /**
     * 初始化 Tab 切換
     * @param {string} containerId - Tab 容器 ID
     * @param {Function} onChange - 切換時的回調函數
     */
    init(containerId, onChange) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const tabs = container.querySelectorAll('[data-tab]');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // 移除所有 active
          tabs.forEach(t => t.classList.remove('active'));

          // 添加當前 active
          tab.classList.add('active');

          // 執行回調
          if (typeof onChange === 'function') {
            onChange(tab.dataset.tab, tab);
          }
        });
      });
    }
  }
};

// 導出供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Components;
}
