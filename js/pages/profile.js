/**
 * MatchU - Profile Page (個人中心頁面)
 * 顯示個人資料、統計數據、設定選項
 * 支持查看自己或其他用戶的檔案
 */

let viewingUser = null; // 正在查看的用戶
let currentUser = null; // 當前登入用戶
let isOwnProfile = false; // 是否為自己的檔案

/**
 * 從 URL 獲取參數
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * 載入個人檔案
 */
function loadProfile() {
    // 載入當前登入用戶
    currentUser = initializeUserData();

    // 從 URL 獲取要查看的用戶 ID
    const userId = getUrlParameter('userId');

    if (userId) {
        // 查看其他用戶的檔案
        const targetUserId = parseInt(userId);
        viewingUser = FAKE_USERS.find(u => u.id === targetUserId);

        if (!viewingUser) {
            Utils.showToast('找不到該用戶', 'error');
            viewingUser = currentUser;
            isOwnProfile = true;
        } else {
            isOwnProfile = (viewingUser.id === currentUser.id);
        }
    } else {
        // 查看自己的檔案
        viewingUser = currentUser;
        isOwnProfile = true;
    }

    // 更新頁面顯示
    updateProfileUI();
    updateButtons();
    updateStats();
    animateEntrance();
}

/**
 * 更新個人檔案 UI
 */
function updateProfileUI() {
    // 更新頭像
    document.getElementById('profileAvatar').src = viewingUser.avatar;

    // 更新名字和系所
    document.getElementById('profileName').textContent = `${viewingUser.name}, ${viewingUser.age}`;
    document.getElementById('profileDepartment').textContent = viewingUser.department;

    // 更新頁面標題
    document.title = isOwnProfile ? 'MatchU - 個人中心' : `MatchU - ${viewingUser.name}`;
}

/**
 * 更新按鈕顯示
 */
function updateButtons() {
    const editBtn = document.getElementById('editProfileBtn');
    const messageBtn = document.getElementById('sendMessageBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    const otherMenu = document.getElementById('otherMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    if (isOwnProfile) {
        // 查看自己的檔案 - 顯示編輯按鈕和設定
        editBtn.style.display = 'inline-block';
        messageBtn.style.display = 'none';
        settingsMenu.style.display = 'block';
        otherMenu.style.display = 'block';
        logoutBtn.style.display = 'block';
    } else {
        // 查看他人的檔案 - 顯示發送訊息按鈕
        editBtn.style.display = 'none';
        messageBtn.style.display = 'inline-block';
        settingsMenu.style.display = 'none';
        otherMenu.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
}

/**
 * 更新統計數據
 */
function updateStats() {
    if (isOwnProfile) {
        // 自己的檔案 - 顯示真實統計
        document.getElementById('matchCount').textContent = currentUser.matches.length;
        document.getElementById('chatCount').textContent = currentUser.matches.filter(id =>
            FAKE_MESSAGES[id] && FAKE_MESSAGES[id].length > 0
        ).length;
        document.getElementById('activityCount').textContent = 0;
    } else {
        // 他人的檔案 - 顯示公開統計（或隱藏敏感資訊）
        document.getElementById('matchCount').textContent = '?';
        document.getElementById('chatCount').textContent = '?';
        document.getElementById('activityCount').textContent = '?';
    }
}

/**
 * 進場動畫
 */
function animateEntrance() {
    gsap.from('.profile-header', {
        duration: 0.6,
        y: -30,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.stats-section', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        delay: 0.2,
        ease: 'power2.out'
    });

    gsap.from('.menu-section', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out',
        stagger: 0.1
    });
}

/**
 * 編輯個人檔案
 */
function editProfile() {
    Utils.showToast('編輯功能開發中', 'info');
}

/**
 * 查看照片
 */
function viewPhotos() {
    Utils.showToast('照片功能開發中', 'info');
}

/**
 * 編輯興趣
 */
function editInterests() {
    Utils.showToast('興趣編輯功能開發中', 'info');
}

/**
 * 發送訊息（查看他人檔案時）
 */
function sendMessage() {
    if (!viewingUser) return;

    // 跳轉到聊天室
    window.location.href = `chat-room.html?userId=${viewingUser.id}`;
}

/**
 * 登出
 */
function logout() {
    Utils.showConfirm(
        '確定要登出嗎?',
        () => {
            Storage.clear();
            Utils.showToast('已登出', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        }
    );
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    loadProfile();
});
