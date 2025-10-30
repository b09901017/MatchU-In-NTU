/**
 * MatchU - Swipe Page (盲盒抽卡頁面)
 * 處理卡片翻轉、喜歡/跳過、配對成功等邏輯
 */

// 頁面狀態
let currentUserIndex = 0;
let swipesRemaining = 5;
let users = [];
let currentCard = null;
let currentUser = null; // 當前登入用戶

/**
 * 初始化頁面
 */
function initSwipePage() {
  // 載入當前用戶資料
  currentUser = initializeUserData();
  swipesRemaining = currentUser.dailySwipesRemaining || 5;

  // 打亂用戶順序
  users = Utils.shuffle([...FAKE_USERS]);

  // 顯示第一張卡片
  showNextCard();

  // 綁定事件
  document.getElementById('likeBtn').addEventListener('click', () => handleLike());
  document.getElementById('passBtn').addEventListener('click', () => handlePass());

  // 頁面進場動畫
  gsap.from('.card-container', {
    duration: 0.6,
    scale: 0.8,
    opacity: 0,
    ease: 'back.out(1.5)'
  });
}

/**
 * 顯示下一張卡片
 */
function showNextCard() {
  if (swipesRemaining === 0 || currentUserIndex >= users.length) {
    showEmptyState();
    return;
  }

  const user = users[currentUserIndex];
  const cardHtml = createCardHTML(user);

  const container = document.getElementById('cardContainer');
  container.innerHTML = cardHtml;

  // 使用 setTimeout 確保 DOM 已更新
  setTimeout(() => {
    currentCard = document.getElementById('swipeCard');

    if (!currentCard) {
      console.error('Failed to get swipeCard element');
      return;
    }

    console.log('Card created, binding click event...');

    // 綁定翻卡事件
    currentCard.addEventListener('click', flipCard);

    // 添加視覺提示
    currentCard.style.cursor = 'pointer';

    // 卡片進場動畫
    gsap.from(currentCard, {
      duration: 0.5,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out(1.5)'
    });
  }, 0);

  // 更新計數
  document.getElementById('swipesCount').textContent = swipesRemaining;
}

/**
 * 創建卡片 HTML
 * @param {Object} user - 用戶資料
 * @returns {string} HTML 字符串
 */
function createCardHTML(user) {
  const commonInterests = Utils.getCommonInterests(
    currentUser.interests,
    user.interests
  );

  return `
    <div class="swipe-card" id="swipeCard">
      <!-- Front Face (未翻轉) -->
      <div class="card-face card-front">
        <div class="card-front-content">
          <div class="card-front-icon">🎁</div>
          <div class="card-front-text">點擊翻牌</div>
        </div>
      </div>

      <!-- Back Face (翻轉後) -->
      <div class="card-face card-back">
        <img src="${user.photos[0]}" alt="${user.name}" class="card-image">
        <div class="card-info">
          <div class="card-header">
            <div>
              <div class="card-name">${user.name}, ${user.age}</div>
              <div class="card-department">📍 ${user.department}</div>
            </div>
          </div>

          <div class="tag-list">
            ${user.interests.slice(0, 5).map(interest => {
              const isCommon = commonInterests.includes(interest);
              return `<span class="tag ${isCommon ? 'highlight' : ''}">${interest}</span>`;
            }).join('')}
          </div>

          <div class="card-bio">${user.bio}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 翻轉卡片
 */
function flipCard(event) {
  // 防止事件冒泡
  if (event) {
    event.stopPropagation();
  }

  if (!currentCard) {
    console.error('currentCard is null');
    return;
  }

  // 如果已經翻轉，不再執行
  if (currentCard.classList.contains('flipped')) {
    return;
  }

  console.log('Flipping card...');
  currentCard.classList.add('flipped');

  // 震動反饋
  Utils.vibrate(10);

  // 顯示提示
  Utils.showToast('已翻開卡片！', 'success');

  // 移除點擊事件(只能翻一次)
  currentCard.removeEventListener('click', flipCard);
}

/**
 * 處理「喜歡」操作
 */
function handleLike() {
  if (!currentCard) return;

  const user = users[currentUserIndex];

  // 卡片飛出動畫
  gsap.to(currentCard, {
    duration: 0.4,
    x: window.innerWidth,
    rotation: 15,
    opacity: 0,
    ease: 'power2.in',
    onComplete: () => {
      swipesRemaining--;
      currentUserIndex++;

      // 30% 機率配對成功
      if (Math.random() < 0.3) {
        showMatchModal(user);
      } else {
        showNextCard();
      }
    }
  });

  // 愛心飛出動畫
  showHeartAnimation();
}

/**
 * 處理「跳過」操作
 */
function handlePass() {
  if (!currentCard) return;

  // 卡片飛出動畫
  gsap.to(currentCard, {
    duration: 0.4,
    x: -window.innerWidth,
    rotation: -15,
    opacity: 0,
    ease: 'power2.in',
    onComplete: () => {
      swipesRemaining--;
      currentUserIndex++;
      showNextCard();
    }
  });
}

/**
 * 顯示愛心動畫
 */
function showHeartAnimation() {
  const heart = document.createElement('div');
  heart.style.cssText = `
    position: fixed;
    left: 50%;
    top: 50%;
    font-size: 64px;
    pointer-events: none;
    z-index: 1000;
  `;
  heart.textContent = '💖';
  document.body.appendChild(heart);

  gsap.fromTo(heart,
    { scale: 0, opacity: 0 },
    {
      duration: 0.5,
      scale: 2,
      opacity: 1,
      y: -100,
      onComplete: () => heart.remove()
    }
  );
}

/**
 * 顯示配對成功 Modal
 * @param {Object} user - 配對成功的用戶
 */
function showMatchModal(user) {
  const modal = document.getElementById('matchModal');
  const commonInterests = Utils.getCommonInterests(
    currentUser.interests,
    user.interests
  );

  // 填充資料
  document.getElementById('myAvatar').src = currentUser.avatar;
  document.getElementById('theirAvatar').src = user.avatar;
  document.getElementById('matchName').textContent = user.name;
  document.getElementById('matchCommon').textContent =
    `共同興趣: ${commonInterests.join('、')}`;

  // 顯示 Modal
  modal.classList.add('show');

  // 動畫
  const content = modal.querySelector('.match-content');
  gsap.from(content, {
    duration: 0.5,
    scale: 0.8,
    opacity: 0,
    ease: 'back.out(1.7)'
  });
}

/**
 * 關閉配對成功 Modal
 */
function closeMatchModal() {
  const modal = document.getElementById('matchModal');
  modal.classList.remove('show');
  showNextCard();
}

/**
 * 前往聊天室
 */
function goToChat() {
  Utils.showToast('開啟聊天室...', 'success');
  setTimeout(() => {
    window.location.href = 'chat-room.html?userId=1';
  }, 500);
}

/**
 * 顯示空狀態(沒有更多卡片)
 */
function showEmptyState() {
  document.getElementById('cardContainer').style.display = 'none';
  document.querySelector('.action-buttons').style.display = 'none';
  document.getElementById('emptyState').style.display = 'block';

  gsap.from('#emptyState', {
    duration: 0.5,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  });
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
  initSwipePage();
});
