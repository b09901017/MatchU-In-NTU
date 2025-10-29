/**
 * MatchU - Chat Room Page (聊天室頁面)
 * 處理即時訊息、活動推薦、邀約發送等功能
 */

let messages = [];
let currentUser = null; // 當前登入用戶
let chatPartner = null; // 聊天對象

/**
 * 從 URL 獲取參數
 */
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * 初始化聊天室
 */
function initChatRoom() {
    // 載入當前用戶資料
    currentUser = initializeUserData();

    // 從 URL 獲取聊天對象 ID
    const partnerId = parseInt(getUrlParameter('userId')) || 1;

    // 根據 ID 找到聊天對象
    chatPartner = FAKE_USERS.find(u => u.id === partnerId);

    // 如果找不到用戶,使用預設用戶
    if (!chatPartner) {
        chatPartner = FAKE_USERS[0];
        console.warn(`User with id ${partnerId} not found, using default user`);
    }

    // 更新頁面標題和用戶資訊
    updatePartnerInfo();

    // 載入歷史訊息
    loadInitialMessages();

    // 綁定事件
    setupEventListeners();

    // 自動滾動到底部
    scrollToBottom();
}

/**
 * 更新聊天對象資訊顯示
 */
function updatePartnerInfo() {
    // 更新頭像
    document.getElementById('partnerAvatar').src = chatPartner.avatar;
    document.getElementById('partnerAvatar').alt = chatPartner.name;

    // 更新名字
    document.getElementById('partnerName').textContent = chatPartner.name;

    // 更新在線狀態
    const statusEl = document.getElementById('partnerStatus');
    if (chatPartner.isOnline) {
        statusEl.textContent = '● 在線';
        statusEl.style.color = 'var(--success)';
    } else {
        statusEl.textContent = chatPartner.lastSeen ? `上次上線: ${chatPartner.lastSeen}` : '離線';
        statusEl.style.color = 'var(--text-tertiary)';
    }

    // 更新頁面標題
    document.title = `MatchU - ${chatPartner.name}`;
}

/**
 * 載入初始訊息
 */
function loadInitialMessages() {
    // 從 FAKE_MESSAGES 載入對應的訊息記錄
    const savedMessages = FAKE_MESSAGES[chatPartner.id];

    if (savedMessages && savedMessages.length > 0) {
        // 轉換訊息格式
        messages = savedMessages.map(msg => ({
            id: msg.id,
            sender: msg.senderId === 'me' ? 'me' : 'them',
            content: msg.content,
            time: msg.timestamp
        }));
    } else {
        // 如果沒有歷史訊息,顯示歡迎訊息
        messages = [
            { id: 1, sender: 'them', content: `Hi! 很高興認識你~`, time: '剛剛' }
        ];
    }

    renderMessages();

    // 檢測並顯示活動推薦
    setTimeout(() => {
        showActivitySuggestion();
    }, 1000);
}

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    initChatRoom();
});

        function renderMessages() {
            const messagesArea = document.getElementById('messagesArea');
            messagesArea.innerHTML = '';

            messages.forEach(msg => {
                const messageEl = createMessageElement(msg);
                messagesArea.appendChild(messageEl);
            });
        }

        function createMessageElement(msg) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender === 'me' ? 'sent' : 'received'}`;

            if (msg.type === 'activity-suggestion') {
                messageDiv.innerHTML = createActivitySuggestionHTML(msg);
            } else if (msg.type === 'invitation') {
                messageDiv.innerHTML = createInvitationHTML(msg);
            } else {
                messageDiv.innerHTML = `
                    ${msg.sender === 'them' ? `<img src="${chatPartner.avatar}" alt="佳佳" class="message-avatar">` : ''}
                    <div class="message-content">
                        <div class="chat-bubble chat-bubble-${msg.sender === 'me' ? 'sent' : 'received'}">
                            ${msg.content}
                        </div>
                        <div class="chat-time">${msg.time}</div>
                    </div>
                `;
            }

            return messageDiv;
        }

        function showActivitySuggestion() {
            // 基於對話內容推薦活動
            const suggestions = Utils.suggestActivities(messages);

            if (suggestions.length > 0) {
                const suggestionMsg = {
                    id: Utils.generateId(),
                    type: 'activity-suggestion',
                    suggestions: suggestions.slice(0, 3)
                };

                messages.push(suggestionMsg);
                const messageEl = createMessageElement(suggestionMsg);
                document.getElementById('messagesArea').appendChild(messageEl);
                scrollToBottom();
            }
        }

        function createActivitySuggestionHTML(msg) {
            return `
                <div class="activity-suggestion">
                    <div class="activity-suggestion-header">
                        <span>🎯</span>
                        <span>根據你們的聊天,推薦活動</span>
                    </div>
                    ${msg.suggestions.map(suggestion => `
                        <div class="activity-option" onclick="selectActivity('${suggestion.title}', '${suggestion.locations[0]}')">
                            <div class="activity-option-title">
                                ${suggestion.emoji} ${suggestion.title}
                            </div>
                            <div class="activity-option-location">
                                📍 ${suggestion.locations[0]}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function selectActivity(title, location) {
            // 自動填入發起邀約表單
            openInvitationModal();

            setTimeout(() => {
                // 根據活動標題選擇對應的類型
                const typeMap = {
                    '一起喝咖啡': 'coffee',
                    '一起看電影': 'movie',
                    '一起讀書': 'study',
                    '一起吃飯': 'meal'
                };

                const type = Object.keys(typeMap).find(key => title.includes(key));
                if (type) {
                    document.getElementById('activityType').value = typeMap[type];
                    updateLocationSuggestions();
                }

                document.getElementById('activityLocation').value = location;
            }, 300);
        }

        function createInvitationHTML(msg) {
            const statusClass = msg.status === 'accepted' ? '' : (msg.status === 'rejected' ? 'rejected' : '');
            const statusText = msg.status === 'accepted' ? '✅ 已接受' : (msg.status === 'rejected' ? '❌ 已拒絕' : '');

            return `
                <div class="invitation-card">
                    <div class="invitation-header">
                        <span>📅</span>
                        <span>邀約邀請</span>
                    </div>
                    <div class="invitation-details">
                        <div class="invitation-row">
                            <span>${msg.activityEmoji}</span>
                            <span><strong>${msg.activityTitle}</strong></span>
                        </div>
                        <div class="invitation-row">
                            <span>📅</span>
                            <span>${msg.time}</span>
                        </div>
                        <div class="invitation-row">
                            <span>📍</span>
                            <span>${msg.location}</span>
                        </div>
                        ${msg.note ? `<div class="invitation-row" style="margin-top: var(--space-sm);">💬 ${msg.note}</div>` : ''}
                    </div>
                    ${msg.status ? `
                        <div class="invitation-status ${statusClass}">${statusText}</div>
                    ` : `
                        <div class="invitation-actions">
                            <button class="btn btn-secondary" style="flex: 1;" onclick="respondToInvitation('${msg.id}', 'reject')">拒絕</button>
                            <button class="btn btn-coral" style="flex: 1;" onclick="respondToInvitation('${msg.id}', 'accept')">接受</button>
                        </div>
                    `}
                </div>
            `;
        }

        function setupEventListeners() {
            const messageInput = document.getElementById('messageInput');
            const sendBtn = document.getElementById('sendBtn');
            const plusBtn = document.getElementById('plusBtn');

            // 輸入框自動調整高度
            messageInput.addEventListener('input', () => {
                messageInput.style.height = 'auto';
                messageInput.style.height = messageInput.scrollHeight + 'px';

                // 啟用/禁用發送按鈕
                sendBtn.disabled = messageInput.value.trim() === '';
            });

            // 發送訊息
            sendBtn.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!sendBtn.disabled) {
                        sendMessage();
                    }
                }
            });

            // Plus 按鈕
            plusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('plusMenu').classList.toggle('show');
            });

            // 點擊外部關閉菜單
            document.addEventListener('click', () => {
                document.getElementById('plusMenu').classList.remove('show');
            });

            // 邀約表單
            document.getElementById('invitationForm').addEventListener('submit', (e) => {
                e.preventDefault();
                sendInvitation();
            });
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const content = input.value.trim();

            if (!content) return;

            const newMessage = {
                id: Utils.generateId(),
                sender: 'me',
                content: content,
                time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
            };

            messages.push(newMessage);
            const messageEl = createMessageElement(newMessage);
            document.getElementById('messagesArea').appendChild(messageEl);

            // 清空輸入框
            input.value = '';
            input.style.height = 'auto';
            document.getElementById('sendBtn').disabled = true;

            // 滾動到底部
            scrollToBottom();

            // 模擬對方回覆
            setTimeout(() => {
                simulateReply();
            }, 1500);

            // 檢查是否需要顯示活動推薦
            if (messages.length > 6 && !messages.some(m => m.type === 'activity-suggestion')) {
                setTimeout(showActivitySuggestion, 2000);
            }
        }

        function simulateReply() {
            const replies = [
                '好啊!我也這麼覺得~',
                '聽起來不錯!',
                '哈哈哈 👍',
                '可以啊!',
                '沒問題~'
            ];

            const newMessage = {
                id: Utils.generateId(),
                sender: 'them',
                content: Utils.randomPick(replies),
                time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
            };

            messages.push(newMessage);
            const messageEl = createMessageElement(newMessage);
            document.getElementById('messagesArea').appendChild(messageEl);
            scrollToBottom();
        }

        function scrollToBottom() {
            const messagesArea = document.getElementById('messagesArea');
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }

        function openInvitationModal() {
            document.getElementById('invitationModal').classList.add('show');
            document.getElementById('plusMenu').classList.remove('show');

            // 設置默認時間為明天下午2點
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(14, 0);
            document.getElementById('activityTime').value = tomorrow.toISOString().slice(0, 16);
        }

        function closeInvitationModal() {
            document.getElementById('invitationModal').classList.remove('show');
        }

        function updateLocationSuggestions() {
            const type = document.getElementById('activityType').value;
            const suggestionsDiv = document.getElementById('locationSuggestions');

            const locationMap = {
                'coffee': ['舟山路咖啡廳', '小福咖啡', '鹿鳴堂咖啡'],
                'movie': ['台大附近戲院', '信義威秀', '西門町'],
                'study': ['總圖書館', '社科圖', '法律圖'],
                'meal': ['公館商圈', '小福樓', '活大餐廳'],
                'hiking': ['象山', '虎山', '貓空'],
                'sports': ['綜合體育館', '小體館', '操場'],
                'exhibition': ['北美館', '故宮', '華山文創'],
                'boardgame': ['公館桌遊店', '師大桌遊', '線上遊戲']
            };

            if (locationMap[type]) {
                suggestionsDiv.innerHTML = `建議: ${locationMap[type].join('、')}`;
            } else {
                suggestionsDiv.innerHTML = '';
            }
        }

        function sendInvitation() {
            const type = document.getElementById('activityType').value;
            const time = document.getElementById('activityTime').value;
            const location = document.getElementById('activityLocation').value;
            const note = document.getElementById('activityNote').value;

            if (!type || !time || !location) {
                Utils.showToast('請填寫所有必填欄位', 'error');
                return;
            }

            // 獲取活動信息
            const activityOption = document.querySelector(`#activityType option[value="${type}"]`).text;
            const [emoji, title] = activityOption.split(' ');

            // 格式化時間
            const dateTime = new Date(time);
            const formattedTime = dateTime.toLocaleDateString('zh-TW', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            const invitation = {
                id: Utils.generateId(),
                type: 'invitation',
                sender: 'me',
                activityEmoji: emoji,
                activityTitle: title,
                time: formattedTime,
                location: location,
                note: note,
                status: null  // null = 待回應, 'accepted' = 已接受, 'rejected' = 已拒絕
            };

            messages.push(invitation);
            const messageEl = createMessageElement(invitation);
            document.getElementById('messagesArea').appendChild(messageEl);
            scrollToBottom();

            closeInvitationModal();
            document.getElementById('invitationForm').reset();

            Utils.showToast('邀約已發送!', 'success');

            // 模擬對方回應(70%接受)
            setTimeout(() => {
                respondToInvitation(invitation.id, Math.random() < 0.7 ? 'accept' : 'reject', true);
            }, 3000);
        }

        function respondToInvitation(invitationId, response, isSimulated = false) {
            const invitation = messages.find(m => m.id === invitationId);
            if (!invitation) return;

            invitation.status = response === 'accept' ? 'accepted' : 'rejected';
            renderMessages();
            scrollToBottom();

            if (isSimulated) {
                const message = response === 'accept' ? '好啊!就這樣約定了~' : '不好意思,那天有事耶...';
                setTimeout(() => {
                    const reply = {
                        id: Utils.generateId(),
                        sender: 'them',
                        content: message,
                        time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
                    };
                    messages.push(reply);
                    const messageEl = createMessageElement(reply);
                    document.getElementById('messagesArea').appendChild(messageEl);
                    scrollToBottom();
                }, 500);
            }
        }

        function startIcebreakerGame() {
            const question = Utils.randomPick(ICEBREAKER_QUESTIONS);

            const gameMessage = {
                id: Utils.generateId(),
                sender: 'system',
                content: `🎮 破冰遊戲\n\n問題: ${question}`,
                time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
            };

            messages.push(gameMessage);
            const messageEl = createMessageElement(gameMessage);
            document.getElementById('messagesArea').appendChild(messageEl);
            scrollToBottom();

            document.getElementById('plusMenu').classList.remove('show');
            Utils.showToast('破冰遊戲已開始!', 'info');
        }

        function sendSticker() {
            const stickers = ['😊', '❤️', '👍', '😂', '🎉', '☕', '📚', '🌟'];
            const sticker = Utils.randomPick(stickers);

            const stickerMessage = {
                id: Utils.generateId(),
                sender: 'me',
                content: sticker,
                time: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
            };

            messages.push(stickerMessage);
            const messageEl = createMessageElement(stickerMessage);
            document.getElementById('messagesArea').appendChild(messageEl);
            scrollToBottom();

            document.getElementById('plusMenu').classList.remove('show');
        }

        function showChatMenu() {
            Utils.showToast('功能開發中', 'info');
        }
