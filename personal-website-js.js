// 导航栏响应式功能
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // 切换导航
        nav.classList.toggle('nav-active');

        // 动画链接
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // 汉堡按钮动画
        burger.classList.toggle('toggle');
    });
};

// 滚动动画
const scrollAnimation = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const experienceCards = document.querySelectorAll('.experience-card');
    const projectCards = document.querySelectorAll('.project-card');
    const skillCategories = document.querySelectorAll('.skill-category');
    // 不再需要单独选择interest-item，因为已使用project-card样式

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // 如果是技能条，则添加宽度动画
                if (entry.target.classList.contains('skill-category')) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = `${width}%`;
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => observer.observe(item));
    experienceCards.forEach(card => observer.observe(card));
    projectCards.forEach(card => observer.observe(card));
    skillCategories.forEach(category => observer.observe(category));
    // 游戏经历使用project-card，已在上面的选择器中处理
};

// 平滑滚动到锚点
const smoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            // 如果是移动端，点击后关闭菜单
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
};

// 回到顶部按钮功能
const backToTop = () => {
    const backToTopButton = document.getElementById('back-to-top');

    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // 点击按钮回到顶部
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// 修复项目详情下拉菜单功能
const initProjectDropdowns = () => {
    const toggleButtons = document.querySelectorAll('.toggle-details');
    
    toggleButtons.forEach(button => {
        // 获取对应的详情区域
        const projectInfo = button.closest('.project-info');
        const details = projectInfo.querySelector('.project-details');
        
        // 给每个按钮和详情区域添加唯一ID，确保一对一关联
        const uniqueId = 'project-' + Math.random().toString(36).substr(2, 9);
        button.setAttribute('data-target', uniqueId);
        details.setAttribute('id', uniqueId);
        
        // 初始状态设置 - 默认隐藏详情
        details.style.maxHeight = '0px';
        details.style.opacity = '0';
        
        button.addEventListener('click', (e) => {
            // 阻止事件冒泡
            e.stopPropagation();
            
            // 切换active类
            button.classList.toggle('active');
            details.classList.toggle('active');
            
            // 设置高度和过渡效果
            if (details.classList.contains('active')) {
                // 展开详情
                details.style.maxHeight = details.scrollHeight + 'px';
                details.style.opacity = '1';
                
                // 更新按钮提示文本
                button.setAttribute('aria-label', '收起详情');
                // 修改加号为减号
                button.querySelector('.toggle-icon').textContent = '-';
            } else {
                // 折叠详情
                details.style.maxHeight = '0px';
                details.style.opacity = '0';
                
                // 更新按钮提示文本
                button.setAttribute('aria-label', '展开详情');
                // 恢复减号为加号
                button.querySelector('.toggle-icon').textContent = '+';
            }
        });
    });
};


// 游戏卡片动画
const initGameCards = () => {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
};

// 米哈游游戏活跃天数计算
const calculateActiveDays = () => {
    const currentDate = new Date();

    // 原神开始日期 (根据713天倒推)
    const genshinStartDate = new Date(2025, 2, 28);
    genshinStartDate.setDate(genshinStartDate.getDate() - 713);
    const genshinDays = Math.floor((currentDate - genshinStartDate) / (1000 * 60 * 60 * 24));
    const genshinElement = document.getElementById('genshin-days');
    if (genshinElement) {
        genshinElement.textContent = genshinDays + '天';
    }

    // 崩坏星穹铁道开始日期 (根据435天倒推)
    const starrailStartDate = new Date(2025, 2, 28);
    starrailStartDate.setDate(starrailStartDate.getDate() - 435);
    const starrailDays = Math.floor((currentDate - starrailStartDate) / (1000 * 60 * 60 * 24));
    const starrailElement = document.getElementById('starrail-days');
    if (starrailElement) {
        starrailElement.textContent = starrailDays + '天';
    }

    // 绝区零开始日期 (根据267天倒推)
    const zenlessStartDate = new Date(2025, 2, 28);
    zenlessStartDate.setDate(zenlessStartDate.getDate() - 267);
    const zenlessDays = Math.floor((currentDate - zenlessStartDate) / (1000 * 60 * 60 * 24))-1;
    const zenlessElement = document.getElementById('zenless-days');
    if (zenlessElement) {
        zenlessElement.textContent = zenlessDays + '天';
    }
};

// 主初始化函数 - 使用let声明，允许后续修改
let app = () => {
    navSlide();
    scrollAnimation();
    smoothScroll();
    backToTop();
};

// 等待DOM完全加载后执行初始化
document.addEventListener('DOMContentLoaded', () => {
    // 执行主初始化
    app();
    
    // 初始化游戏卡片
    initGameCards();
    
    // 计算游戏活跃天数
    calculateActiveDays();
    
    // 应用修复后的项目下拉菜单功能
    initProjectDropdowns();
    
    // 为项目卡片添加滚动动画
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => observer.observe(card));
});
