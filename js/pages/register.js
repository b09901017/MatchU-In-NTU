/**
 * MatchU - Register Page (註冊頁面)
 * 處理用戶註冊流程、興趣選擇、個人資料設定
 */

// 註冊資料
let userData = {
    email: '',
    name: '',
    gender: '',
    birthday: '',
    college: '',
    department: '',
    grade: '',
    photos: [],
    bio: '',
    interests: []
};

// 當前步驟
let currentStep = 1;

// 選擇狀態
let selectedGender = null;
let selectedGrade = null;
let selectedInterests = [];

// 驗證碼相關
let verificationCode = '';
let resendTimer = 60;
let timerInterval = null;

// ============================================
// 初始化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setupEmailForm();
    setupVerificationCode();
    setupCollegeSelect();
    setupBasicInfoForm();
    setupGenderSelect();
    setupGradeSelect();
    setupPhotoUpload();
    setupBioCounter();
    setupInterests();
});

// ============================================
// Step 1: Email Verification
// ============================================

function setupEmailForm() {
    document.getElementById('emailForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const emailError = document.getElementById('emailError');

        // 驗證台大信箱格式
        if (!email.endsWith('@ntu.edu.tw')) {
            emailError.style.display = 'block';
            return;
        }

        emailError.style.display = 'none';
        userData.email = email;

        // 模擬發送驗證碼
        Utils.showLoading('發送驗證碼中...');
        setTimeout(() => {
            Utils.hideLoading();
            verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
            console.log('驗證碼:', verificationCode); // 開發用

            document.getElementById('emailDisplay').textContent = email;
            Utils.showToast('驗證碼已發送到您的信箱', 'success');
            goToStep(2);
            startResendTimer();
        }, 1500);
    });
}

// ============================================
// Step 2: Verification Code
// ============================================

function setupVerificationCode() {
    const inputs = document.querySelectorAll('.code-input');

    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;

            if (value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }

            // 檢查是否填滿所有輸入框
            const code = Array.from(inputs).map(i => i.value).join('');
            if (code.length === 4) {
                verifyCode(code);
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });

    document.getElementById('verifyBtn').addEventListener('click', () => {
        const code = Array.from(inputs).map(i => i.value).join('');
        verifyCode(code);
    });
}

function verifyCode(code) {
    if (code.length !== 4) {
        Utils.showToast('請輸入完整的驗證碼', 'error');
        return;
    }

    Utils.showLoading('驗證中...');
    setTimeout(() => {
        Utils.hideLoading();

        // 開發階段：任何4位數字都可通過
        // if (code === verificationCode) {
        Utils.showToast('驗證成功!', 'success');
        goToStep(3);
        // } else {
        //     Utils.showToast('驗證碼錯誤,請重新輸入', 'error');
        //     document.querySelectorAll('.code-input').forEach(input => input.value = '');
        //     document.querySelector('.code-input').focus();
        // }
    }, 1000);
}

function startResendTimer() {
    resendTimer = 60;
    const timerElement = document.getElementById('timer');

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        resendTimer--;
        timerElement.textContent = `${resendTimer}秒後可重發`;

        if (resendTimer <= 0) {
            clearInterval(timerInterval);
            timerElement.innerHTML = '<button class="btn btn-text" onclick="resendCode()">重新發送</button>';
        }
    }, 1000);
}

function resendCode() {
    Utils.showLoading('發送驗證碼中...');
    setTimeout(() => {
        Utils.hideLoading();
        verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        console.log('新驗證碼:', verificationCode);
        Utils.showToast('驗證碼已重新發送', 'success');
        startResendTimer();
    }, 1000);
}

// ============================================
// Step 3: Basic Info
// ============================================

function setupCollegeSelect() {
    const collegeSelect = document.getElementById('college');
    const departmentSelect = document.getElementById('department');

    // 填充學院選項
    COLLEGES.forEach(college => {
        const option = document.createElement('option');
        option.value = college.name;
        option.textContent = college.name;
        collegeSelect.appendChild(option);
    });

    // 學院變更時更新系所
    collegeSelect.addEventListener('change', (e) => {
        const collegeName = e.target.value;
        departmentSelect.innerHTML = '<option value="">選擇系所</option>';

        if (collegeName) {
            const college = COLLEGES.find(c => c.name === collegeName);
            if (college) {
                college.departments.forEach(dept => {
                    const option = document.createElement('option');
                    option.value = dept;
                    option.textContent = dept;
                    departmentSelect.appendChild(option);
                });
            }
        }
    });
}

function setupBasicInfoForm() {
    document.getElementById('basicInfoForm').addEventListener('submit', (e) => {
        e.preventDefault();

        userData.name = document.getElementById('name').value;
        userData.gender = selectedGender;
        userData.birthday = document.getElementById('birthday').value;
        userData.college = document.getElementById('college').value;
        userData.department = document.getElementById('department').value;
        userData.grade = selectedGrade;

        if (!userData.gender || !userData.grade) {
            Utils.showToast('請完整填寫所有資料', 'error');
            return;
        }

        goToStep(4);
    });
}

function setupGenderSelect() {
    document.querySelectorAll('.gender-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.gender-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedGender = option.dataset.gender;
        });
    });
}

function setupGradeSelect() {
    document.querySelectorAll('.grade-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.grade-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedGrade = option.dataset.grade;
        });
    });
}

// ============================================
// Step 4: Photos & Bio
// ============================================

function setupPhotoUpload() {
    document.querySelectorAll('.photo-box').forEach(box => {
        box.addEventListener('click', () => {
            // 模擬照片上傳
            const photos = [
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
                'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
            ];
            const randomPhoto = Utils.randomPick(photos);

            box.innerHTML = `<img src="${randomPhoto}" alt="照片">`;
            Utils.showToast('照片已上傳', 'success');
        });
    });
}

function setupBioCounter() {
    const bioInput = document.getElementById('bio');
    const counter = document.getElementById('bioCount');

    bioInput.addEventListener('input', () => {
        const length = bioInput.value.length;
        counter.textContent = length;

        if (length > 100) {
            bioInput.value = bioInput.value.slice(0, 100);
            counter.textContent = 100;
        }
    });
}

// ============================================
// Step 5: Interests
// ============================================

function setupInterests() {
    const container = document.getElementById('interestCategories');

    Object.entries(INTEREST_CATEGORIES).forEach(([key, category]) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'category-group';

        groupDiv.innerHTML = `
            <div class="category-title">${category.name}</div>
            <div class="interest-tags">
                ${category.tags.map(tag => `
                    <div class="interest-tag" data-interest="${tag}">${tag}</div>
                `).join('')}
            </div>
        `;

        container.appendChild(groupDiv);
    });

    // Add click handlers
    document.querySelectorAll('.interest-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const interest = tag.dataset.interest;

            if (tag.classList.contains('selected')) {
                tag.classList.remove('selected');
                selectedInterests = selectedInterests.filter(i => i !== interest);
            } else {
                if (selectedInterests.length < 10) {
                    tag.classList.add('selected');
                    selectedInterests.push(interest);
                } else {
                    Utils.showToast('最多只能選擇10個興趣', 'warning');
                }
            }

            updateInterestCount();
        });
    });
}

function updateInterestCount() {
    document.getElementById('interestCount').textContent = selectedInterests.length;
    document.getElementById('completeBtn').disabled = selectedInterests.length < 3;
}

// ============================================
// Navigation
// ============================================

function goToStep(step) {
    // Hide current step
    document.querySelectorAll('.register-step').forEach(s => s.classList.remove('active'));

    // Show new step
    document.getElementById(`step${step}`).classList.add('active');

    // Update indicators
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        if (index < step) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    currentStep = step;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Complete Registration
// ============================================

document.getElementById('completeBtn').addEventListener('click', () => {
    userData.interests = selectedInterests;
    userData.bio = document.getElementById('bio').value;

    Utils.showLoading('正在創建您的帳號...');

    setTimeout(() => {
        Utils.hideLoading();
        Utils.showToast('註冊成功!歡迎加入 MatchU!', 'success', 3000);

        // 儲存用戶資料 (實際應該呼叫 API)
        Storage.save('currentUser', userData);
        console.log('註冊資料:', userData);

        setTimeout(() => {
            window.location.href = 'swipe.html';
        }, 1000);
    }, 2000);
});
