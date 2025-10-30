/**
 * MatchU - Activity List Page (活動列表頁面)
 * 顯示校園活動、發起活動、活動報名
 */

// Activity list data (用於活動列表頁面)
const ACTIVITY_LIST_DATA = [
    {
        id: 1,
        type: 'coffee',
        emoji: '☕',
        title: '週五下午喝咖啡聊天',
        time: '今天 15:00',
        location: '舟山路咖啡廳',
        organizer: FAKE_USERS[0],
        participants: [FAKE_USERS[0], FAKE_USERS[1]],
        maxParticipants: 4,
        status: 'recruiting',
        description: '想找人一起喝咖啡聊聊天,分享最近的生活和學習心得。歡迎喜歡咖啡的朋友一起來!'
    },
    {
        id: 2,
        type: 'study',
        emoji: '📚',
        title: '總圖夜讀小組',
        time: '今天 19:00',
        location: '總圖書館 4F',
        organizer: FAKE_USERS[2],
        participants: [FAKE_USERS[2], FAKE_USERS[3], FAKE_USERS[4]],
        maxParticipants: 6,
        status: 'recruiting',
        description: '準備期中考,找幾個人一起讀書互相督促。會準備一些小零食,讀書氛圍很好!'
    },
    {
        id: 3,
        type: 'movie',
        emoji: '🎬',
        title: '週末一起看電影',
        time: '明天 14:00',
        location: '威秀影城',
        organizer: FAKE_USERS[1],
        participants: [FAKE_USERS[1], FAKE_USERS[5]],
        maxParticipants: 4,
        status: 'recruiting',
        description: '最近有部新片上映,想找人一起去看。看完可以一起討論劇情!'
    },
    {
        id: 4,
        type: 'food',
        emoji: '🍽️',
        title: '公館美食探險',
        time: '明天 12:00',
        location: '公館商圈',
        organizer: FAKE_USERS[3],
        participants: [FAKE_USERS[3], FAKE_USERS[0], FAKE_USERS[2], FAKE_USERS[1]],
        maxParticipants: 4,
        status: 'full',
        description: '一起去公館吃美食!有幾家想試試的餐廳,吃貨歡迎加入~'
    },
    {
        id: 5,
        type: 'sport',
        emoji: '⚽',
        title: '醉月湖慢跑',
        time: '今天 17:30',
        location: '醉月湖',
        organizer: FAKE_USERS[4],
        participants: [FAKE_USERS[4], FAKE_USERS[5]],
        maxParticipants: 5,
        status: 'recruiting',
        description: '下課後一起去醉月湖慢跑,大概跑 3-5 圈。跑完可以一起吃晚餐!'
    },
    {
        id: 6,
        type: 'walk',
        emoji: '🌳',
        title: '椰林大道散步',
        time: '今天 16:00',
        location: '椰林大道',
        organizer: FAKE_USERS[5],
        participants: [FAKE_USERS[5], FAKE_USERS[2], FAKE_USERS[3]],
        maxParticipants: 4,
        status: 'recruiting',
        description: '天氣很好,想找人一起在椰林大道散散步聊聊天。會帶相機,可以幫大家拍照!'
    }
];

let currentFilter = 'all';
let selectedActivityType = null;
let participantLimit = 4;
let currentActivityDetail = null;

document.addEventListener('DOMContentLoaded', () => {
    renderActivities();
    animateEntrance();
});

function renderActivities() {
    const container = document.getElementById('activityList');
    const filtered = currentFilter === 'all'
        ? ACTIVITY_LIST_DATA
        : ACTIVITY_LIST_DATA.filter(a => a.type === currentFilter);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-emoji">🎉</div>
                <div class="empty-state-title">目前沒有相關活動</div>
                <div class="empty-state-description">
                    成為第一個發起活動的人吧!
                </div>
                <button class="btn btn-primary" onclick="openCreateActivityModal()">
                    發起新活動
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    filtered.forEach((activity, index) => {
        const card = createActivityCard(activity);
        container.appendChild(card);

        // Entrance animation
        gsap.from(card, {
            duration: 0.4,
            y: 20,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
}

function createActivityCard(activity) {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.onclick = () => openActivityDetail(activity);

    const statusText = activity.status === 'recruiting' ? '招募中' :
                      activity.status === 'full' ? '已額滿' : '已結束';
    const statusClass = activity.status;

    // Get participant avatars (show up to 3)
    const participantAvatars = activity.participants.slice(0, 3).map(p =>
        `<img src="${p.avatar}" alt="${p.name}" class="avatar-xs">`
    ).join('');

    card.innerHTML = `
        <div class="activity-card-header">
            <div class="activity-type">
                <span class="activity-type-emoji">${activity.emoji}</span>
                <span>${activity.title}</span>
            </div>
            <div class="activity-status ${statusClass}">${statusText}</div>
        </div>
        <div class="activity-details">
            <div class="activity-detail-item">
                <span class="activity-detail-icon">📅</span>
                <span>${activity.time}</span>
            </div>
            <div class="activity-detail-item">
                <span class="activity-detail-icon">📍</span>
                <span>${activity.location}</span>
            </div>
            <div class="activity-detail-item">
                <span class="activity-detail-icon">👥</span>
                <span>${activity.participants.length} / ${activity.maxParticipants} 人</span>
            </div>
        </div>
        <div class="activity-organizer">
            <img src="${activity.organizer.avatar}" alt="${activity.organizer.name}" class="avatar activity-organizer-avatar">
            <div class="activity-organizer-info">
                <div class="activity-organizer-name">${activity.organizer.name}</div>
                <div class="activity-organizer-dept">${activity.organizer.department}</div>
            </div>
            ${activity.participants.length > 1 ? `
                <div class="activity-participants">
                    <div class="activity-participants-avatars">
                        ${participantAvatars}
                    </div>
                    ${activity.participants.length > 3 ? `
                        <span class="activity-participants-count">+${activity.participants.length - 3}</span>
                    ` : ''}
                </div>
            ` : ''}
        </div>
    `;

    return card;
}

function filterActivities(filter) {
    currentFilter = filter;

    // Update filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
        if (chip.dataset.filter === filter) {
            chip.classList.add('active');
        }
    });

    renderActivities();
}

function openCreateActivityModal() {
    document.getElementById('createActivityModal').classList.add('show');
    animateModal('createActivityModal');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    gsap.to(modal.querySelector('.modal-content'), {
        duration: 0.2,
        scale: 0.9,
        opacity: 0,
        onComplete: () => {
            modal.classList.remove('show');
        }
    });
}

function animateModal(modalId) {
    const content = document.getElementById(modalId).querySelector('.modal-content');
    gsap.from(content, {
        duration: 0.3,
        scale: 0.9,
        opacity: 0,
        ease: 'back.out(1.7)'
    });
}

function selectActivityType(element) {
    document.querySelectorAll('.activity-type-option').forEach(opt =>
        opt.classList.remove('selected'));
    element.classList.add('selected');
    selectedActivityType = {
        type: element.dataset.type,
        emoji: element.dataset.emoji
    };
}

function adjustParticipantLimit(delta) {
    participantLimit = Math.max(2, Math.min(20, participantLimit + delta));
    document.getElementById('participantLimit').textContent = participantLimit;

    gsap.to('#participantLimit', {
        duration: 0.2,
        scale: 1.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
    });
}

function createActivity() {
    if (!selectedActivityType) {
        Utils.showToast('請選擇活動類型', 'error');
        return;
    }

    const title = document.getElementById('activityTitle').value.trim();
    const time = document.getElementById('activityTime').value;
    const location = document.getElementById('activityLocation').value.trim();
    const description = document.getElementById('activityDescription').value.trim();

    if (!title || !time || !location) {
        Utils.showToast('請填寫必填欄位', 'error');
        return;
    }

    Utils.showLoading('發起活動中...');
    setTimeout(() => {
        Utils.hideLoading();
        closeModal('createActivityModal');
        Utils.showToast('活動發起成功!', 'success');

        // Reset form
        document.getElementById('activityTitle').value = '';
        document.getElementById('activityTime').value = '';
        document.getElementById('activityLocation').value = '';
        document.getElementById('activityDescription').value = '';
        document.querySelectorAll('.activity-type-option').forEach(opt =>
            opt.classList.remove('selected'));
        selectedActivityType = null;
        participantLimit = 4;
        document.getElementById('participantLimit').textContent = 4;
    }, 1500);
}

function openActivityDetail(activity) {
    currentActivityDetail = activity;

    document.getElementById('detailEmoji').textContent = activity.emoji;
    document.getElementById('detailTitle').textContent = activity.title;

    const statusText = activity.status === 'recruiting' ? '招募中' :
                      activity.status === 'full' ? '已額滿' : '已結束';
    const statusClass = activity.status;
    const statusElement = document.getElementById('detailStatus');
    statusElement.textContent = statusText;
    statusElement.className = `activity-status ${statusClass}`;

    document.getElementById('detailInfo').innerHTML = `
        <div class="activity-detail-item">
            <span class="activity-detail-icon">📅</span>
            <span>${activity.time}</span>
        </div>
        <div class="activity-detail-item">
            <span class="activity-detail-icon">📍</span>
            <span>${activity.location}</span>
        </div>
        <div class="activity-detail-item">
            <span class="activity-detail-icon">👥</span>
            <span>${activity.participants.length} / ${activity.maxParticipants} 人</span>
        </div>
    `;

    document.getElementById('detailDescription').textContent =
        activity.description || '主辦人沒有留下說明';

    document.getElementById('detailOrganizer').innerHTML = `
        <img src="${activity.organizer.avatar}" alt="${activity.organizer.name}" class="avatar">
        <div class="activity-organizer-info" style="flex: 1;">
            <div class="activity-organizer-name">${activity.organizer.name}, ${activity.organizer.age}</div>
            <div class="activity-organizer-dept">${activity.organizer.department}</div>
        </div>
    `;

    const participantsHtml = activity.participants.map(p => `
        <div class="activity-organizer" style="border: none; padding: var(--space-sm) 0;">
            <img src="${p.avatar}" alt="${p.name}" class="avatar">
            <div class="activity-organizer-info">
                <div class="activity-organizer-name">${p.name}, ${p.age}</div>
                <div class="activity-organizer-dept">${p.department}</div>
            </div>
        </div>
    `).join('');
    document.getElementById('detailParticipants').innerHTML = participantsHtml;

    // Update join button
    const joinBtn = document.getElementById('joinBtn');
    if (activity.status === 'full') {
        joinBtn.textContent = '活動已額滿';
        joinBtn.disabled = true;
        joinBtn.style.opacity = '0.5';
    } else if (activity.status === 'closed') {
        joinBtn.textContent = '活動已結束';
        joinBtn.disabled = true;
        joinBtn.style.opacity = '0.5';
    } else {
        joinBtn.textContent = '參加活動';
        joinBtn.disabled = false;
        joinBtn.style.opacity = '1';
    }

    document.getElementById('activityDetailPage').classList.add('show');

    // Entrance animation
    gsap.from('#activityDetailPage .activity-detail-hero', {
        duration: 0.5,
        y: -30,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('#activityDetailPage .activity-detail-section', {
        duration: 0.4,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power2.out'
    });
}

function closeActivityDetail() {
    document.getElementById('activityDetailPage').classList.remove('show');
}

function joinActivity() {
    if (!currentActivityDetail) return;

    Utils.showConfirm(
        `確定要參加「${currentActivityDetail.title}」嗎?`,
        () => {
            Utils.showLoading('加入中...');
            setTimeout(() => {
                Utils.hideLoading();
                Utils.showToast('已成功參加活動!', 'success');
                closeActivityDetail();
            }, 1000);
        }
    );
}

function animateEntrance() {
    gsap.from('.activity-header', {
        duration: 0.6,
        y: -30,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.filter-section', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        delay: 0.2,
        ease: 'power2.out'
    });
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});
