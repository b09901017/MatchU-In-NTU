/**
 * MatchU - Chat List Page (聊天列表頁面)
 * 顯示所有配對成功的聊天對象
 */

let currentUser = null; // 當前登入用戶

/**
 * 載入聊天列表
 */
function loadChatList() {
  // 載入當前用戶資料
  currentUser = initializeUserData();

  const chatList = document.getElementById('chatList');
  const matches = currentUser.matches;

  // 如果沒有配對對象,顯示空狀態
  if (matches.length === 0) {
    chatList.innerHTML = `
      <div class="empty-chat">
        <div style="font-size: 64px; margin-bottom: var(--space-md);">💬</div>
        <h2>還沒有配對對象</h2>
        <p style="color: var(--text-secondary); margin: var(--space-md) 0;">
          去盲盒抽卡認識新朋友吧!
        </p>
        <button class="btn btn-primary" onclick="window.location.href='swipe.html'">
          前往抽卡
        </button>
      </div>
    `;
    return;
  }

  // 渲染聊天列表
  matches.forEach((userId, index) => {
    const user = FAKE_USERS.find(u => u.id === userId);
    const messages = FAKE_MESSAGES[userId] || [];
    const lastMessage = messages[messages.length - 1];
    const unreadCount = messages.filter(m => m.senderId === userId && !m.isRead).length;

    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';
    chatItem.onclick = () => window.location.href = `chat-room.html?userId=${userId}`;

    chatItem.innerHTML = `
      <div class="chat-avatar-wrapper">
        <img src="${user.avatar}" alt="${user.name}" class="avatar">
        ${user.isOnline ? '<div class="avatar-status"></div>' : ''}
        ${unreadCount > 0 ? `<span class="badge badge-absolute">${unreadCount}</span>` : ''}
      </div>
      <div class="chat-info">
        <div class="chat-header">
          <div class="chat-name">${user.name}</div>
          <div class="chat-time">${lastMessage ? lastMessage.timestamp : '剛剛'}</div>
        </div>
        <div class="chat-preview ${unreadCount > 0 ? 'unread' : ''}">
          ${lastMessage ? lastMessage.content : '開始聊天吧!'}
        </div>
      </div>
    `;

    chatList.appendChild(chatItem);

    // 進場動畫
    gsap.from(chatItem, {
      duration: 0.4,
      y: 20,
      opacity: 0,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  });
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
  loadChatList();
});
