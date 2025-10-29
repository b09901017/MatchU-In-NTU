/**
 * MatchU - Register Page (註冊頁面)
 * 處理用戶註冊流程、興趣選擇、個人資料設定
 */


            if (college) {
                college.departments.forEach(dept => {
                    const option = document.createElement('option');
                    option.value = dept;
                    option.textContent = dept;
                    departmentSelect.appendChild(option);
                });
            }
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

        function setupPhotoUpload() {
            document.querySelectorAll('.photo-box').forEach(box => {
                box.addEventListener('click', () => {
                    // 模擬照片上傳
                    const photos = [
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
                        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
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

        document.getElementById('completeBtn').addEventListener('click', () => {
            userData.interests = selectedInterests;

            Utils.showLoading('正在創建您的帳號...');

            setTimeout(() => {
                Utils.hideLoading();
                Utils.showToast('註冊成功!歡迎加入 MatchU!', 'success', 3000);

                setTimeout(() => {
                    window.location.href = 'swipe.html';
                }, 1000);
            }, 2000);
        });
    </script>
</body>
</html>
