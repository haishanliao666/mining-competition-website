/* ============================================
   学习自测脚本 - quiz.js
   ============================================
   【功能说明】
   本文件负责学习自测模块的功能实现：
   1. 题库加载和渲染
   2. 答题逻辑（单选、多选、判断）
   3. 答案判断和得分计算
   4. 结果显示和解析展示
   
   【数据来源】
   读取data/question.js中的questions数组
   支持题型：单选题(single)、多选题(multiple)、判断题(judge)
   ============================================ */

// 测试状态
let quizState = {
    currentQuestion: 0,
    answers: {},      // 存储用户答案
    score: 0,
    isFinished: false,
    questions: []     // 题库
};

// ==========================================
// 1. 初始化
// ==========================================

/**
 * 初始化自测模块
 */
function initQuiz() {
    if (typeof QUIZ_DATA === 'undefined') {
        console.warn('QUIZ_DATA未加载');
        return;
    }
    
    quizState.questions = QUIZ_DATA.questions || [];
    
    // 更新题目数量显示
    const totalCountEl = document.getElementById('quiz-total-count');
    if (totalCountEl) {
        totalCountEl.textContent = quizState.questions.length;
    }
    
    // 绑定开始测试按钮
    const startBtn = document.getElementById('start-quiz-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    
    // 绑定导航按钮
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.addEventListener('click', goToPrevQuestion);
    if (nextBtn) nextBtn.addEventListener('click', goToNextQuestion);
    
    // 绑定结果页按钮
    const retryBtn = document.getElementById('retry-btn');
    const viewWrongBtn = document.getElementById('view-wrong-btn');
    if (retryBtn) retryBtn.addEventListener('click', restartQuiz);
    if (viewWrongBtn) viewWrongBtn.addEventListener('click', showWrongAnswers);
}

// ==========================================
// 2. 测试流程控制
// ==========================================

/**
 * 开始测试
 */
function startQuiz() {
    if (quizState.questions.length === 0) {
        alert('题库为空，请先配置题目');
        return;
    }
    
    // 重置状态
    quizState.currentQuestion = 0;
    quizState.answers = {};
    quizState.score = 0;
    quizState.isFinished = false;
    
    // 切换界面
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-question').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    
    // 渲染第一题
    renderQuestion();
    updateProgress();
}

/**
 * 渲染当前题目
 */
function renderQuestion() {
    const question = quizState.questions[quizState.currentQuestion];
    if (!question) return;
    
    // 更新题号
    document.getElementById('current-question-num').textContent = quizState.currentQuestion + 1;
    document.getElementById('total-question-num').textContent = quizState.questions.length;
    
    // 更新题目类型标签
    const typeLabels = {
        'single': '单选题',
        'multiple': '多选题',
        'judge': '判断题'
    };
    const typeEl = document.getElementById('question-type');
    typeEl.textContent = typeLabels[question.type] || '单选题';
    
    // 更新题干
    document.getElementById('question-text').textContent = question.question;
    
    // 渲染选项
    renderOptions(question);
    
    // 隐藏解析
    document.getElementById('explanation-container').classList.add('hidden');
    
    // 更新按钮状态
    updateNavButtons();
}

/**
 * 渲染选项
 */
function renderOptions(question) {
    const container = document.getElementById('options-container');
    if (!container) return;
    
    let html = '';
    question.options.forEach((option, index) => {
        const optionLetter = String.fromCharCode(65 + index); // A, B, C, D...
        const isSelected = isOptionSelected(question.id, optionLetter);
        const selectedClass = isSelected ? 'selected' : '';
        
        html += `
            <button class="option-btn ${selectedClass}" 
                    data-index="${index}" 
                    data-letter="${optionLetter}"
                    onclick="selectOption('${optionLetter}')">
                <span class="option-marker">${optionLetter}</span>
                <span class="option-text">${option}</span>
            </button>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * 检查选项是否被选中
 */
function isOptionSelected(questionId, optionLetter) {
    const answer = quizState.answers[questionId];
    if (!answer) return false;
    
    if (Array.isArray(answer)) {
        return answer.includes(optionLetter);
    }
    return answer === optionLetter;
}

// ==========================================
// 3. 答题逻辑
// ==========================================

/**
 * 选择选项
 */
function selectOption(optionLetter) {
    if (quizState.isFinished) return;
    
    const question = quizState.questions[quizState.currentQuestion];
    
    if (question.type === 'multiple') {
        // 多选题：切换选中状态
        let currentAnswers = quizState.answers[question.id] || [];
        if (!Array.isArray(currentAnswers)) {
            currentAnswers = [];
        }
        
        const index = currentAnswers.indexOf(optionLetter);
        if (index > -1) {
            currentAnswers.splice(index, 1);
        } else {
            currentAnswers.push(optionLetter);
        }
        
        quizState.answers[question.id] = currentAnswers;
    } else {
        // 单选题和判断题：直接设置答案
        quizState.answers[question.id] = optionLetter;
        
        // 自动显示解析（可选）
        if (QUIZ_DATA.config.showExplanation) {
            showExplanation();
        }
    }
    
    // 重新渲染选项以更新选中状态
    renderOptions(question);
}

/**
 * 显示答案解析
 */
function showExplanation() {
    const question = quizState.questions[quizState.currentQuestion];
    const explanationContainer = document.getElementById('explanation-container');
    const explanationText = document.getElementById('explanation-text');
    
    if (explanationContainer && explanationText) {
        explanationText.textContent = question.explanation;
        explanationContainer.classList.remove('hidden');
    }
    
    // 标记正确和错误选项
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        const letter = btn.dataset.letter;
        const userAnswer = quizState.answers[question.id];
        
        btn.classList.add('disabled');
        
        if (question.type === 'multiple') {
            // 多选题
            const correctAnswers = question.answer;
            const userAnswers = userAnswer || [];
            
            if (correctAnswers.includes(letter)) {
                btn.classList.add('correct');
            } else if (userAnswers.includes(letter)) {
                btn.classList.add('wrong');
            }
        } else {
            // 单选题和判断题
            if (letter === question.answer) {
                btn.classList.add('correct');
            } else if (letter === userAnswer) {
                btn.classList.add('wrong');
            }
        }
    });
}

// ==========================================
// 4. 导航控制
// ==========================================

/**
 * 上一题
 */
function goToPrevQuestion() {
    if (quizState.currentQuestion > 0) {
        quizState.currentQuestion--;
        renderQuestion();
        updateProgress();
    }
}

/**
 * 下一题
 */
function goToNextQuestion() {
    if (quizState.currentQuestion < quizState.questions.length - 1) {
        quizState.currentQuestion++;
        renderQuestion();
        updateProgress();
    } else {
        // 最后一题，提交
        submitQuiz();
    }
}

/**
 * 更新进度条
 */
function updateProgress() {
    const progress = ((quizState.currentQuestion + 1) / quizState.questions.length) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

/**
 * 更新导航按钮状态
 */
function updateNavButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = quizState.currentQuestion === 0;
    }
    
    if (nextBtn) {
        if (quizState.currentQuestion === quizState.questions.length - 1) {
            nextBtn.textContent = '提交';
        } else {
            nextBtn.textContent = '下一题';
        }
    }
}

// ==========================================
// 5. 提交和评分
// ==========================================

/**
 * 提交测试
 */
function submitQuiz() {
    quizState.isFinished = true;
    
    // 计算得分
    calculateScore();
    
    // 显示结果
    showResults();
}

/**
 * 计算得分
 */
function calculateScore() {
    quizState.score = 0;
    
    quizState.questions.forEach(question => {
        const userAnswer = quizState.answers[question.id];
        const correctAnswer = question.answer;
        
        if (question.type === 'multiple') {
            // 多选题：全部选对才得分
            const userAnswers = userAnswer || [];
            if (JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswer.sort())) {
                quizState.score += question.score;
            }
        } else {
            // 单选题和判断题
            if (userAnswer === correctAnswer) {
                quizState.score += question.score;
            }
        }
    });
}

/**
 * 显示结果
 */
function showResults() {
    // 隐藏答题界面
    document.getElementById('quiz-question').classList.add('hidden');
    
    // 显示结果界面
    const resultContainer = document.getElementById('quiz-result');
    resultContainer.classList.remove('hidden');
    
    // 计算总分
    const totalScore = quizState.questions.reduce((sum, q) => sum + q.score, 0);
    
    // 显示得分
    document.getElementById('score').textContent = quizState.score;
    document.getElementById('total-score').textContent = totalScore;
    
    // 显示评语
    const percentage = (quizState.score / totalScore) * 100;
    const comments = QUIZ_DATA.config.comments;
    let comment = '';
    
    if (percentage >= comments.excellent.min) {
        comment = comments.excellent.text;
    } else if (percentage >= comments.good.min) {
        comment = comments.good.text;
    } else if (percentage >= comments.pass.min) {
        comment = comments.pass.text;
    } else {
        comment = comments.fail.text;
    }
    
    document.getElementById('result-comment').textContent = comment;
    
    // 设置结果图标
    const iconContainer = document.getElementById('result-icon');
    if (percentage >= comments.pass.min) {
        iconContainer.innerHTML = `
            <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        `;
        iconContainer.className = 'w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-green-100';
    } else {
        iconContainer.innerHTML = `
            <svg class="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
        `;
        iconContainer.className = 'w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-orange-100';
    }
}

// ==========================================
// 6. 结果操作
// ==========================================

/**
 * 重新开始测试
 */
function restartQuiz() {
    if (!QUIZ_DATA.config.allowRetry) {
        alert('本测试不允许重复作答');
        return;
    }
    
    startQuiz();
}

/**
 * 显示错题解析
 */
function showWrongAnswers() {
    // 切换到答题界面
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-question').classList.remove('hidden');
    
    // 找到第一题错题
    let firstWrongIndex = -1;
    for (let i = 0; i < quizState.questions.length; i++) {
        const question = quizState.questions[i];
        const userAnswer = quizState.answers[question.id];
        
        let isCorrect = false;
        if (question.type === 'multiple') {
            const userAnswers = userAnswer || [];
            isCorrect = JSON.stringify(userAnswers.sort()) === JSON.stringify(question.answer.sort());
        } else {
            isCorrect = userAnswer === question.answer;
        }
        
        if (!isCorrect) {
            firstWrongIndex = i;
            break;
        }
    }
    
    if (firstWrongIndex === -1) {
        alert('恭喜你，全部答对了！');
        document.getElementById('quiz-question').classList.add('hidden');
        document.getElementById('quiz-result').classList.remove('hidden');
        return;
    }
    
    // 跳转到第一题错题
    quizState.currentQuestion = firstWrongIndex;
    renderQuestion();
    showExplanation();
    updateProgress();
    
    // 修改按钮功能
    const nextBtn = document.getElementById('next-btn');
    nextBtn.textContent = '下一道错题';
    nextBtn.onclick = goToNextWrongAnswer;
}

/**
 * 跳转到下一道错题
 */
function goToNextWrongAnswer() {
    // 从当前位置往后找错题
    for (let i = quizState.currentQuestion + 1; i < quizState.questions.length; i++) {
        const question = quizState.questions[i];
        const userAnswer = quizState.answers[question.id];
        
        let isCorrect = false;
        if (question.type === 'multiple') {
            const userAnswers = userAnswer || [];
            isCorrect = JSON.stringify(userAnswers.sort()) === JSON.stringify(question.answer.sort());
        } else {
            isCorrect = userAnswer === question.answer;
        }
        
        if (!isCorrect) {
            quizState.currentQuestion = i;
            renderQuestion();
            showExplanation();
            updateProgress();
            return;
        }
    }
    
    // 没有更多错题了
    alert('已查看完所有错题');
    document.getElementById('quiz-question').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');
    
    // 恢复按钮功能
    const nextBtn = document.getElementById('next-btn');
    nextBtn.onclick = goToNextQuestion;
}

// ==========================================
// 7. 初始化
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保数据文件已加载
    setTimeout(() => {
        initQuiz();
    }, 100);
});
