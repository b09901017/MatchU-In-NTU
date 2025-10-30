/**
 * MatchU - Settings Page (設定頁面)
 * 管理用戶偏好、通知設定、帳號管理
 */

        // Settings state
        const settings = {
            profileVisibility: true,
            onlineStatus: true,
            readReceipts: true,
            matchNotifications: true,
            messageNotifications: true,
            activityNotifications: true,
            genderPreference: 'all',
            minAge: 18,
            maxAge: 30,
            distance: 5
        };

        document.addEventListener('DOMContentLoaded', () => {
            loadSettings();
            animateEntrance();
        });

        function loadSettings() {
            // Load from localStorage if exists
            const saved = localStorage.getItem('matchuSettings');
            if (saved) {
                Object.assign(settings, JSON.parse(saved));
            }
            updateUI();
        }

        function updateUI() {
            document.getElementById('genderPreference').textContent =
                settings.genderPreference === 'all' ? '全部' :
                settings.genderPreference === 'male' ? '男性' : '女性';

            document.getElementById('ageRange').textContent =
                `${settings.minAge} - ${settings.maxAge} 歲`;

            document.getElementById('distance').textContent =
                `${settings.distance} 公里`;
        }

        function saveSettings() {
            localStorage.setItem('matchuSettings', JSON.stringify(settings));
        }

        function toggleSetting(key, element) {
            const toggle = element.querySelector('.toggle-switch');
            settings[key] = !settings[key];
            toggle.classList.toggle('active');
            saveSettings();

            gsap.to(toggle, {
                duration: 0.2,
                scale: 1.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        }

        // Modal functions
        function openEmailModal() {
            document.getElementById('emailModal').classList.add('show');
            animateModal('emailModal');
        }

        function openPasswordModal() {
            document.getElementById('passwordModal').classList.add('show');
            animateModal('passwordModal');
        }

        function openGenderPreferenceModal() {
            document.getElementById('genderPreferenceModal').classList.add('show');
            animateModal('genderPreferenceModal');

            // Set current selection
            document.querySelectorAll('#genderPreferenceModal .preference-option').forEach(option => {
                const radio = option.querySelector('input');
                if (radio.value === settings.genderPreference) {
                    option.classList.add('selected');
                    radio.checked = true;
                } else {
                    option.classList.remove('selected');
                }
            });

            // Add click handlers
            document.querySelectorAll('#genderPreferenceModal .preference-option').forEach(option => {
                option.onclick = () => {
                    document.querySelectorAll('#genderPreferenceModal .preference-option').forEach(o =>
                        o.classList.remove('selected'));
                    option.classList.add('selected');
                    option.querySelector('input').checked = true;
                };
            });
        }

        function openAgeRangeModal() {
            document.getElementById('ageRangeModal').classList.add('show');
            animateModal('ageRangeModal');

            // Set current values
            document.getElementById('minAge').value = settings.minAge;
            document.getElementById('maxAge').value = settings.maxAge;
            document.getElementById('minAgeValue').textContent = settings.minAge;
            document.getElementById('maxAgeValue').textContent = settings.maxAge;
        }

        function openDistanceModal() {
            document.getElementById('distanceModal').classList.add('show');
            animateModal('distanceModal');

            // Set current value
            document.getElementById('distanceSlider').value = settings.distance;
            document.getElementById('distanceValue').textContent = `${settings.distance} 公里`;
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

        // Update functions
        function updateEmail() {
            const newEmail = document.getElementById('newEmail').value;
            const password = document.getElementById('confirmPassword').value;

            if (!Utils.isValidNTUEmail(newEmail)) {
                Utils.showToast('請輸入有效的台大信箱', 'error');
                return;
            }

            if (!password) {
                Utils.showToast('請輸入密碼以確認變更', 'error');
                return;
            }

            Utils.showLoading('更新中...');
            setTimeout(() => {
                Utils.hideLoading();
                document.getElementById('currentEmail').textContent = newEmail;
                closeModal('emailModal');
                Utils.showToast('電子郵件已更新', 'success');
            }, 1000);
        }

        function updatePassword() {
            const current = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirm = document.getElementById('confirmNewPassword').value;

            if (!current || !newPass || !confirm) {
                Utils.showToast('請填寫所有欄位', 'error');
                return;
            }

            if (newPass.length < 8) {
                Utils.showToast('新密碼至少需要 8 個字元', 'error');
                return;
            }

            if (newPass !== confirm) {
                Utils.showToast('新密碼不一致', 'error');
                return;
            }

            Utils.showLoading('更新中...');
            setTimeout(() => {
                Utils.hideLoading();
                closeModal('passwordModal');
                Utils.showToast('密碼已更新', 'success');
            }, 1000);
        }

        function updateGenderPreference() {
            const selected = document.querySelector('#genderPreferenceModal input:checked').value;
            settings.genderPreference = selected;
            saveSettings();
            updateUI();
            closeModal('genderPreferenceModal');
            Utils.showToast('性別偏好已更新', 'success');
        }

        function updateAgeRange() {
            const minAge = parseInt(document.getElementById('minAge').value);
            const maxAge = parseInt(document.getElementById('maxAge').value);

            // Ensure min is not greater than max
            if (minAge > maxAge) {
                document.getElementById('maxAge').value = minAge;
            }

            document.getElementById('minAgeValue').textContent = document.getElementById('minAge').value;
            document.getElementById('maxAgeValue').textContent = document.getElementById('maxAge').value;
        }

        function saveAgeRange() {
            settings.minAge = parseInt(document.getElementById('minAge').value);
            settings.maxAge = parseInt(document.getElementById('maxAge').value);
            saveSettings();
            updateUI();
            closeModal('ageRangeModal');
            Utils.showToast('年齡範圍已更新', 'success');
        }

        function updateDistanceValue() {
            const value = document.getElementById('distanceSlider').value;
            document.getElementById('distanceValue').textContent = `${value} 公里`;
        }

        function saveDistance() {
            settings.distance = parseInt(document.getElementById('distanceSlider').value);
            saveSettings();
            updateUI();
            closeModal('distanceModal');
            Utils.showToast('距離範圍已更新', 'success');
        }

        function confirmDeleteAccount() {
            Utils.showConfirm(
                '確定要刪除帳號嗎? 此操作無法復原,所有資料將被永久刪除。',
                () => {
                    Utils.showLoading('刪除中...');
                    setTimeout(() => {
                        Utils.hideLoading();
                        Utils.showToast('帳號已刪除', 'success');
                        setTimeout(() => {
                            window.location.href = '../index.html';
                        }, 1000);
                    }, 2000);
                }
            );
        }

        function animateEntrance() {
            gsap.from('.settings-section', {
                duration: 0.5,
                y: 20,
                opacity: 0,
                stagger: 0.1,
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
