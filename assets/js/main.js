/* ============================================
   网站主脚本 - main.js
   ============================================
   【功能说明】
   本文件是网站的核心脚本，负责：
   1. 导航栏交互（移动端汉堡菜单）
   2. 从config.js读取并渲染基础内容
   3. 章节学习模块的渲染和切换
   4. 团队成员、成果等信息的渲染
   
   【重要提示】
   本文件读取data/config.js和data/study.js中的数据
   如需修改内容，请直接编辑对应的数据文件
   ============================================ */

// ==========================================
// 1. 导航栏功能
// ==========================================

/**
 * 初始化导航栏功能
 * 包括：移动端菜单切换、平滑滚动
 */
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // 移动端菜单切换
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
        });
        
        // 点击导航链接后关闭菜单
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // 导航栏滚动效果
    let lastScroll = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 滚动时添加阴影
        if (currentScroll > 50) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
}

// ==========================================
// 2. 基础内容渲染
// ==========================================

/**
 * 渲染首页Hero区内容
 * 数据来源：SITE_CONFIG
 */
function renderHeroSection() {
    if (typeof SITE_CONFIG === 'undefined') {
        console.warn('SITE_CONFIG未加载');
        return;
    }
    
    // 项目名称
    const projectNameEl = document.getElementById('hero-project-name');
    if (projectNameEl && SITE_CONFIG.projectName) {
        // 检查是否为占位符
        if (!SITE_CONFIG.projectName.includes('【请填写')) {
            projectNameEl.innerHTML = SITE_CONFIG.projectName;
        }
    }
    
    // 项目简介
    const projectIntroEl = document.getElementById('hero-project-intro');
    if (projectIntroEl && SITE_CONFIG.projectIntro) {
        if (!SITE_CONFIG.projectIntro.includes('【请填写')) {
            projectIntroEl.textContent = SITE_CONFIG.projectIntro;
        }
    }
    
    // 团队信息
    const teamInfoEl = document.getElementById('hero-team-info');
    if (teamInfoEl) {
        let teamHtml = '';
        
        // 团队名称
        if (SITE_CONFIG.teamName && !SITE_CONFIG.teamName.includes('【请填写')) {
            teamHtml += `
                <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    ${SITE_CONFIG.teamName}
                </span>
            `;
        }
        
        // 指导老师
        if (SITE_CONFIG.teacher && SITE_CONFIG.teacher.name && 
            !SITE_CONFIG.teacher.name.includes('【请填写')) {
            teamHtml += `
                <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    指导老师：${SITE_CONFIG.teacher.name}
                </span>
            `;
        }
        
        if (teamHtml) {
            teamInfoEl.innerHTML = teamHtml;
        }
    }
    
    // 网页标题
    const pageTitle = document.getElementById('page-title');
    if (pageTitle && SITE_CONFIG.projectName && 
        !SITE_CONFIG.projectName.includes('【请填写')) {
        pageTitle.textContent = SITE_CONFIG.projectName + SITE_CONFIG.titleSuffix;
    }
}

/**
 * 渲染项目背景 - 研究目标
 */
function renderResearchGoals() {
    if (typeof SITE_CONFIG === 'undefined') {
        console.warn('SITE_CONFIG未定义，无法渲染研究目标');
        return;
    }
    
    const container = document.getElementById('research-goals-container');
    if (!container) {
        console.warn('未找到research-goals-container元素');
        return;
    }
    
    const goals = SITE_CONFIG.researchGoals;
    console.log('研究目标数据:', goals);
    
    // 检查数据有效性 - 只要数组存在且有内容就渲染
    if (!goals || goals.length === 0) {
        console.warn('研究目标数组为空');
        return;
    }
    
    // 过滤掉占位符内容
    const validGoals = goals.filter(goal => goal && !goal.includes('【请填写'));
    
    if (validGoals.length === 0) {
        console.warn('研究目标数组中没有有效内容');
        return;
    }
    
    let html = '<ul class="space-y-4">';
    validGoals.forEach((goal, index) => {
        html += `
            <li class="flex items-start">
                <span class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 font-medium">
                    ${index + 1}
                </span>
                <span class="text-gray-700 pt-1">${goal}</span>
            </li>
        `;
    });
    html += '</ul>';
    
    container.innerHTML = html;
    console.log('研究目标渲染完成');
}

/**
 * 渲染项目背景 - 创新点
 */
function renderInnovations() {
    if (typeof SITE_CONFIG === 'undefined') {
        console.warn('SITE_CONFIG未定义，无法渲染创新点');
        return;
    }
    
    const container = document.getElementById('innovations-container');
    if (!container) {
        console.warn('未找到innovations-container元素');
        return;
    }
    
    const innovations = SITE_CONFIG.innovations;
    console.log('创新点数据:', innovations);
    
    // 检查数据有效性
    if (!innovations || innovations.length === 0) {
        console.warn('创新点数组为空');
        return;
    }
    
    // 过滤掉占位符内容
    const validInnovations = innovations.filter(item => item && !item.includes('【请填写'));
    
    if (validInnovations.length === 0) {
        console.warn('创新点数组中没有有效内容');
        return;
    }
    
    let html = '';
    validInnovations.forEach((innovation, index) => {
        html += `
            <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
                <div class="flex items-start">
                    <span class="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-4">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                    </span>
                    <div>
                        <h4 class="font-bold text-gray-900 mb-1">创新点 ${index + 1}</h4>
                        <p class="text-gray-600">${innovation}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    console.log('创新点渲染完成');
}

// ==========================================
// 3. 理论学习中心
// ==========================================

let currentChapterIndex = 0;

/**
 * 渲染章节导航
 */
function renderChapterNav() {
    if (typeof STUDY_DATA === 'undefined') return;
    
    const navContainer = document.getElementById('chapter-nav');
    if (!navContainer) return;
    
    const chapters = STUDY_DATA.chapters;
    if (!chapters || chapters.length === 0) return;
    
    let html = '';
    chapters.forEach((chapter, index) => {
        const isActive = index === 0 ? 'active' : '';
        html += `
            <button class="chapter-btn ${isActive} px-6 py-3 bg-white rounded-lg shadow-sm text-gray-600 hover:text-primary transition-colors border-2 border-transparent hover:border-primary" 
                    data-index="${index}">
                ${chapter.icon || ''} ${chapter.title}
            </button>
        `;
    });
    
    navContainer.innerHTML = html;
    
    // 添加点击事件
    const buttons = navContainer.querySelectorAll('.chapter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            switchChapter(index);
        });
    });
}

/**
 * 切换章节
 */
function switchChapter(index) {
    if (typeof STUDY_DATA === 'undefined') return;
    
    const chapters = STUDY_DATA.chapters;
    if (!chapters || index < 0 || index >= chapters.length) return;
    
    currentChapterIndex = index;
    const chapter = chapters[index];
    
    // 更新导航按钮状态
    const buttons = document.querySelectorAll('.chapter-btn');
    buttons.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 渲染章节内容
    renderChapterContent(chapter);
}

/**
 * 渲染章节内容
 */
function renderChapterContent(chapter) {
    const contentContainer = document.getElementById('chapter-content');
    if (!contentContainer) return;
    
    // 检查内容是否已填充
    if (!chapter.content || chapter.content.includes('【请填写')) {
        return; // 保持占位符
    }
    
    let html = `
        <div class="p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">${chapter.title}</h3>
            <div class="chapter-body">
                ${chapter.content}
            </div>
    `;
    
    // 添加公式区域
    if (chapter.formulas && chapter.formulas.length > 0) {
        html += `
            <div class="mt-8">
                <h4 class="text-lg font-bold text-gray-900 mb-4">相关公式</h4>
                <div class="space-y-4">
        `;
        chapter.formulas.forEach(formula => {
            html += `
                <div class="formula-box">
                    <div class="text-lg font-mono mb-2">${formula.formula}</div>
                    <div class="text-sm text-gray-600">
                        <span class="font-medium">${formula.name}：</span>
                        ${formula.description}
                    </div>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    // 添加图片区域
    if (chapter.images && chapter.images.length > 0) {
        html += `
            <div class="mt-8">
                <h4 class="text-lg font-bold text-gray-900 mb-4">配图说明</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        `;
        chapter.images.forEach(img => {
            html += `
                <div class="bg-gray-50 p-4 rounded-lg text-center">
                    <div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                        <span class="text-gray-400">${img.caption}</span>
                    </div>
                    <p class="text-sm text-gray-600">${img.caption}</p>
                </div>
            `;
        });
        html += '</div></div>';
    }
    
    html += '</div>';
    
    contentContainer.innerHTML = html;
}

// ==========================================
// 4. 成果与团队模块
// ==========================================

/**
 * 渲染团队成员
 */
function renderTeamMembers() {
    if (typeof SITE_CONFIG === 'undefined') return;
    
    const container = document.getElementById('team-members-container');
    if (!container) return;
    
    const members = SITE_CONFIG.teamMembers;
    if (!members || members.length === 0 || members[0].name.includes('【请填写')) {
        return; // 保持占位符
    }
    
    let html = '';
    members.forEach(member => {
        const avatar = member.avatar ? 
            `<img src="${member.avatar}" alt="${member.name}" class="w-full h-full object-cover">` :
            `<svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>`;
        
        html += `
            <div class="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
                <div class="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    ${avatar}
                </div>
                <h4 class="font-bold text-gray-900">${member.name}</h4>
                <p class="text-sm text-gray-500 mt-1">${member.role}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * 渲染项目成果
 */
function renderAchievements() {
    if (typeof SITE_CONFIG === 'undefined') return;
    
    const container = document.getElementById('achievements-container');
    if (!container) return;
    
    const achievements = SITE_CONFIG.achievements;
    if (!achievements || achievements.length === 0 || achievements[0].includes('【请填写')) {
        return; // 保持占位符
    }
    
    let html = '<ul class="space-y-3">';
    achievements.forEach(achievement => {
        html += `
            <li class="flex items-center p-3 bg-gray-50 rounded-lg">
                <svg class="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-gray-700">${achievement}</span>
            </li>
        `;
    });
    html += '</ul>';
    
    container.innerHTML = html;
}

/**
 * 渲染论文发表
 */
function renderPublications() {
    if (typeof SITE_CONFIG === 'undefined') return;
    
    const container = document.getElementById('publications-container');
    if (!container) return;
    
    const publications = SITE_CONFIG.publications;
    if (!publications || publications.length === 0 || 
        publications[0].title.includes('【请填写')) {
        return; // 保持占位符
    }
    
    let html = '<ul class="space-y-4">';
    publications.forEach((pub, index) => {
        html += `
            <li class="p-4 bg-gray-50 rounded-lg">
                <div class="flex items-start">
                    <span class="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 text-sm">
                        ${index + 1}
                    </span>
                    <div>
                        <h4 class="font-medium text-gray-900">${pub.title}</h4>
                        <p class="text-sm text-gray-600 mt-1">
                            <span class="text-primary">${pub.journal}</span> · ${pub.year}
                        </p>
                    </div>
                </div>
            </li>
        `;
    });
    html += '</ul>';
    
    container.innerHTML = html;
}

// ==========================================
// 5. 资料下载模块
// ==========================================

/**
 * 渲染下载列表
 */
function renderDownloads() {
    if (typeof SITE_CONFIG === 'undefined') return;
    
    const container = document.getElementById('downloads-container');
    if (!container) return;
    
    const files = SITE_CONFIG.downloadFiles;
    if (!files || files.length === 0 || files[0].name.includes('【请填写')) {
        return; // 保持占位符
    }
    
    let html = '';
    files.forEach(file => {
        html += `
            <div class="bg-secondary p-6 rounded-xl hover:shadow-md transition-shadow">
                <div class="flex items-start">
                    <div class="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-900">${file.name}</h4>
                        <p class="text-sm text-gray-600 mt-1">${file.description}</p>
                        <div class="flex items-center justify-between mt-3">
                            <span class="text-xs text-gray-500">${file.size}</span>
                            <a href="downloads/${file.filename}" download 
                               class="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors">
                                下载
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ==========================================
// 6. 页脚信息
// ==========================================

/**
 * 渲染页脚信息
 */
function renderFooter() {
    if (typeof SITE_CONFIG === 'undefined') return;
    
    // 项目名称
    const footerProjectName = document.getElementById('footer-project-name');
    if (footerProjectName && SITE_CONFIG.projectName && 
        !SITE_CONFIG.projectName.includes('【请填写')) {
        footerProjectName.textContent = SITE_CONFIG.projectName;
    }
    
    // 联系信息
    const footerContact = document.getElementById('footer-contact');
    if (footerContact) {
        let contactHtml = '';
        if (SITE_CONFIG.teacher && SITE_CONFIG.teacher.email && 
            !SITE_CONFIG.teacher.email.includes('【请填写')) {
            contactHtml += `<p>邮箱：${SITE_CONFIG.teacher.email}</p>`;
        }
        if (SITE_CONFIG.organization && !SITE_CONFIG.organization.includes('【请填写')) {
            contactHtml += `<p>${SITE_CONFIG.organization}</p>`;
        }
        if (contactHtml) {
            footerContact.innerHTML = contactHtml;
        }
    }
}

// ==========================================
// 7. 初始化
// ==========================================

/**
 * 页面加载完成后初始化所有功能
 */
document.addEventListener('DOMContentLoaded', () => {
    // 初始化导航
    initNavigation();
    
    // 渲染基础内容
    renderHeroSection();
    renderResearchGoals();
    renderInnovations();
    
    // 渲染章节学习
    renderChapterNav();
    if (typeof STUDY_DATA !== 'undefined' && STUDY_DATA.chapters && 
        STUDY_DATA.chapters.length > 0) {
        renderChapterContent(STUDY_DATA.chapters[0]);
    }
    
    // 渲染团队与成果
    renderTeamMembers();
    renderAchievements();
    renderPublications();
    
    // 渲染下载列表
    renderDownloads();
    
    // 渲染页脚
    renderFooter();
    
    console.log('网站主脚本加载完成');
});
