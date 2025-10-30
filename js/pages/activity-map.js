/**
 * MatchU - Activity Map Page
 * 活動地圖頁面邏輯
 */

// 地圖變數
let map = null;
let markers = [];
let userMarker = null;
let activeFilters = new Set();

// 活動類型配置
const ACTIVITY_TYPES = {
    coffee: { emoji: '☕', name: '喝咖啡', color: '#8B4513', class: 'marker-coffee' },
    movie: { emoji: '🎬', name: '看電影', color: '#9C27B0', class: 'marker-movie' },
    study: { emoji: '📚', name: '一起讀書', color: '#2196F3', class: 'marker-study' },
    food: { emoji: '🍽️', name: '吃美食', color: '#FF9800', class: 'marker-food' },
    sports: { emoji: '⚽', name: '運動', color: '#4CAF50', class: 'marker-sports' },
    art: { emoji: '🎨', name: '看展覽', color: '#E91E63', class: 'marker-art' },
    game: { emoji: '🎮', name: '打遊戲', color: '#FF5722', class: 'marker-game' },
    walk: { emoji: '🌳', name: '散步', color: '#009688', class: 'marker-walk' }
};

// 擴展的活動資料（包含坐標）
const MAP_ACTIVITIES = [
    {
        id: 1,
        type: 'coffee',
        title: '週五下午喝咖啡聊天',
        time: '今天 15:00',
        location: '舟山路咖啡廳',
        lat: 25.0162,
        lng: 121.5355,
        organizer: '小美',
        participants: 2,
        maxParticipants: 4,
        status: 'recruiting',
        description: '想找人一起喝咖啡聊聊天，分享最近的生活和學習心得。歡迎喜歡咖啡的朋友一起來！'
    },
    {
        id: 2,
        type: 'study',
        title: '總圖夜讀小組',
        time: '今天 19:00',
        location: '總圖書館 4F',
        lat: 25.0154,
        lng: 121.5405,
        organizer: '小明',
        participants: 3,
        maxParticipants: 6,
        status: 'recruiting',
        description: '準備期中考，找幾個人一起讀書互相督促。會準備一些小零食，讀書氛圍很好！'
    },
    {
        id: 3,
        type: 'movie',
        title: '週末一起看電影',
        time: '明天 14:00',
        location: '威秀影城',
        lat: 25.0424,
        lng: 121.5675,
        organizer: '阿傑',
        participants: 2,
        maxParticipants: 4,
        status: 'recruiting',
        description: '最近有部很棒的電影上映，想找人一起看。看完可以一起聊聊劇情！'
    },
    {
        id: 4,
        type: 'food',
        title: '公館美食探險',
        time: '明天 12:00',
        location: '公館商圈',
        lat: 25.0138,
        lng: 121.5345,
        organizer: '小華',
        participants: 3,
        maxParticipants: 5,
        status: 'recruiting',
        description: '想要探索公館的美食，有沒有人要一起來？可以一起發掘新餐廳！'
    },
    {
        id: 5,
        type: 'sports',
        title: '籃球鬥牛',
        time: '明天 16:00',
        location: '綜合體育館',
        lat: 25.0204,
        lng: 121.5389,
        organizer: '大衛',
        participants: 4,
        maxParticipants: 8,
        status: 'recruiting',
        description: '找人一起打籃球！不限程度，重點是開心運動，認識新朋友。'
    },
    {
        id: 6,
        type: 'walk',
        title: '椰林大道散步',
        time: '今天 17:30',
        location: '椰林大道',
        lat: 25.0173,
        lng: 121.5397,
        organizer: '小薇',
        participants: 2,
        maxParticipants: 6,
        status: 'recruiting',
        description: '傍晚的椰林大道很美，想找人一起散步聊天，放鬆心情。'
    },
    {
        id: 7,
        type: 'art',
        title: '北美館看展覽',
        time: '週六 10:00',
        location: '台北市立美術館',
        lat: 25.0724,
        lng: 121.5244,
        organizer: '小雅',
        participants: 1,
        maxParticipants: 3,
        status: 'recruiting',
        description: '最近有個很棒的藝術展覽，想找喜歡藝術的朋友一起去欣賞。'
    },
    {
        id: 8,
        type: 'game',
        title: '桌遊之夜',
        time: '週六 19:00',
        location: '公館桌遊店',
        lat: 25.0125,
        lng: 121.5358,
        organizer: '阿傑',
        participants: 3,
        maxParticipants: 6,
        status: 'recruiting',
        description: '週末想玩桌遊放鬆一下，有很多好玩的遊戲可以選擇！'
    },
    {
        id: 9,
        type: 'coffee',
        title: '小福咖啡館聚會',
        time: '週日 14:00',
        location: '小福樓咖啡館',
        lat: 25.0185,
        lng: 121.5372,
        organizer: '小美',
        participants: 2,
        maxParticipants: 5,
        status: 'recruiting',
        description: '在校園內的咖啡館聚會，輕鬆愉快的下午茶時光。'
    },
    {
        id: 10,
        type: 'study',
        title: '社科圖讀書會',
        time: '週日 13:00',
        location: '社會科學院圖書館',
        lat: 25.0168,
        lng: 121.5387,
        organizer: '小華',
        participants: 4,
        maxParticipants: 8,
        status: 'recruiting',
        description: '準備報告的讀書會，可以互相討論、交流想法。'
    }
];

/**
 * 初始化地圖
 */
function initMap() {
    // 創建地圖，中心點設在台大
    map = L.map('map', {
        center: [25.0173, 121.5398], // 台大校門口
        zoom: 15,
        zoomControl: true
    });

    // 添加地圖圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // 添加台大校門口標記
    const ntuIcon = L.divIcon({
        className: 'custom-marker marker-default',
        html: '🏛️',
        iconSize: [40, 40]
    });

    L.marker([25.0173, 121.5398], { icon: ntuIcon })
        .addTo(map)
        .bindPopup('<div style="text-align: center; padding: 10px;"><strong>🎓 台大校門口</strong></div>');

    // 加載活動標記
    loadActivityMarkers();

    // 初始化篩選器
    initFilters();

    // 更新計數
    updateActivityCount();
}

/**
 * 載入活動標記
 */
function loadActivityMarkers() {
    MAP_ACTIVITIES.forEach(activity => {
        createActivityMarker(activity);
    });
}

/**
 * 創建活動標記
 */
function createActivityMarker(activity) {
    const typeConfig = ACTIVITY_TYPES[activity.type];

    // 創建自訂圖標
    const icon = L.divIcon({
        className: `custom-marker ${typeConfig.class}`,
        html: typeConfig.emoji,
        iconSize: [40, 40]
    });

    // 創建標記
    const marker = L.marker([activity.lat, activity.lng], { icon: icon })
        .addTo(map)
        .bindPopup(createPopupContent(activity), {
            maxWidth: 300,
            className: 'activity-popup'
        });

    // 保存標記引用
    marker.activityType = activity.type;
    marker.activityId = activity.id;
    markers.push(marker);
}

/**
 * 創建彈出窗口內容
 */
function createPopupContent(activity) {
    const typeConfig = ACTIVITY_TYPES[activity.type];

    return `
        <div class="activity-popup">
            <div class="activity-popup-header">
                <div class="activity-popup-emoji">${typeConfig.emoji}</div>
                <div class="activity-popup-title">${activity.title}</div>
                <div class="activity-popup-type">${typeConfig.name}</div>
            </div>
            <div class="activity-popup-body">
                <div class="activity-popup-info">
                    <div class="activity-popup-info-item">
                        <span class="activity-popup-info-icon">🕐</span>
                        <span>${activity.time}</span>
                    </div>
                    <div class="activity-popup-info-item">
                        <span class="activity-popup-info-icon">📍</span>
                        <span>${activity.location}</span>
                    </div>
                    <div class="activity-popup-info-item">
                        <span class="activity-popup-info-icon">👥</span>
                        <span>${activity.participants}/${activity.maxParticipants} 人</span>
                    </div>
                </div>
                <div class="activity-popup-description">
                    ${activity.description}
                </div>
                <div class="activity-popup-footer">
                    <div class="activity-popup-btn activity-popup-btn-secondary" onclick="viewActivityDetail(${activity.id})">
                        查看詳情
                    </div>
                    <div class="activity-popup-btn activity-popup-btn-primary" onclick="joinActivityFromMap(${activity.id})">
                        參加活動
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * 初始化篩選器
 */
function initFilters() {
    const filterOptions = document.getElementById('filterOptions');

    Object.keys(ACTIVITY_TYPES).forEach(type => {
        const config = ACTIVITY_TYPES[type];
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.dataset.type = type;
        option.innerHTML = `
            <div class="filter-option-emoji">${config.emoji}</div>
            <div class="filter-option-text">${config.name}</div>
        `;
        option.addEventListener('click', () => toggleFilterOption(type, option));
        filterOptions.appendChild(option);
    });
}

/**
 * 切換篩選選項
 */
function toggleFilterOption(type, element) {
    if (activeFilters.has(type)) {
        activeFilters.delete(type);
        element.classList.remove('active');
    } else {
        activeFilters.add(type);
        element.classList.add('active');
    }

    applyFilters();
    updateActivityCount();
    Utils.vibrate(5);
}

/**
 * 應用篩選
 */
function applyFilters() {
    markers.forEach(marker => {
        if (activeFilters.size === 0 || activeFilters.has(marker.activityType)) {
            marker.setOpacity(1);
            marker._icon.style.display = '';
        } else {
            marker.setOpacity(0);
            marker._icon.style.display = 'none';
        }
    });
}

/**
 * 清除所有篩選
 */
function clearFilters() {
    activeFilters.clear();
    document.querySelectorAll('.filter-option').forEach(option => {
        option.classList.remove('active');
    });
    applyFilters();
    updateActivityCount();
    Utils.showToast('已清除所有篩選', 'success');
}

/**
 * 切換篩選面板
 */
function toggleFilter() {
    const panel = document.getElementById('filterPanel');
    panel.classList.toggle('show');
    Utils.vibrate(5);
}

/**
 * 定位到用戶位置
 */
function locateUser() {
    if (!navigator.geolocation) {
        Utils.showToast('您的瀏覽器不支援定位功能', 'error');
        return;
    }

    Utils.showToast('正在定位...', 'info');

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // 移除舊的用戶標記
            if (userMarker) {
                map.removeLayer(userMarker);
            }

            // 創建用戶位置標記
            const userIcon = L.divIcon({
                className: 'custom-marker',
                html: '📍',
                iconSize: [40, 40],
                style: 'background: #FF6B6B;'
            });

            userMarker = L.marker([lat, lng], { icon: userIcon })
                .addTo(map)
                .bindPopup('<div style="text-align: center; padding: 10px;"><strong>📍 您的位置</strong></div>')
                .openPopup();

            // 移動地圖到用戶位置
            map.setView([lat, lng], 16);

            Utils.showToast('定位成功！', 'success');
        },
        (error) => {
            console.error('定位失敗:', error);
            Utils.showToast('定位失敗，請檢查定位權限', 'error');
        }
    );
}

/**
 * 更新活動計數
 */
function updateActivityCount() {
    const visibleCount = activeFilters.size === 0
        ? MAP_ACTIVITIES.length
        : MAP_ACTIVITIES.filter(a => activeFilters.has(a.type)).length;

    document.getElementById('visibleCount').textContent = visibleCount;
    document.getElementById('totalCount').textContent = MAP_ACTIVITIES.length;
}

/**
 * 查看活動詳情
 */
function viewActivityDetail(activityId) {
    // 跳轉到活動詳情頁面
    window.location.href = `activity-list.html?id=${activityId}`;
}

/**
 * 從地圖參加活動
 */
function joinActivityFromMap(activityId) {
    const activity = MAP_ACTIVITIES.find(a => a.id === activityId);

    if (!activity) return;

    if (activity.participants >= activity.maxParticipants) {
        Utils.showToast('活動已額滿', 'error');
        return;
    }

    Utils.showConfirm(
        `確定要參加「${activity.title}」嗎？`,
        () => {
            activity.participants++;
            Utils.showToast('報名成功！', 'success');

            // 更新標記彈出窗口
            const marker = markers.find(m => m.activityId === activityId);
            if (marker) {
                marker.setPopupContent(createPopupContent(activity));
            }
        }
    );
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    // 確保 Leaflet 已載入
    if (typeof L === 'undefined') {
        console.error('Leaflet not loaded');
        Utils.showToast('地圖載入失敗', 'error');
        return;
    }

    initMap();

    // 點擊地圖外部關閉篩選面板
    document.addEventListener('click', (e) => {
        const filterPanel = document.getElementById('filterPanel');
        const filterBtn = document.getElementById('filterToggleBtn');

        if (!filterPanel.contains(e.target) && !filterBtn.contains(e.target)) {
            filterPanel.classList.remove('show');
        }
    });
});
