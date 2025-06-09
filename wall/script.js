// 金句数据
const quotesData = [
    {
        id: 1,
        text: "状态、关系、生长是个万金油",
        author: "白白～组织者",
        category: "growth",
        categoryLabel: "成长思维"
    },
    {
        id: 2,
        text: "状态，关系，生长 - 武功秘籍般刻进大脑了，可行走江湖~",
        author: "徐琴丽",
        category: "growth",
        categoryLabel: "成长思维"
    },
    {
        id: 3,
        text: "我们搞不好，难道还搞不砸吗",
        author: "Cathy🍉",
        category: "mindset",
        categoryLabel: "心态管理"
    },
    {
        id: 4,
        text: "世界是复杂的，要放下0-1思维",
        author: "Kaylee",
        category: "mindset",
        categoryLabel: "心态管理"
    },
    {
        id: 5,
        text: "要去看事物的底层思维",
        author: "VV",
        category: "mindset",
        categoryLabel: "心态管理"
    },
    {
        id: 6,
        text: "把0到100，拆分成100步，走一步是容易的",
        author: "Kaylee",
        category: "action",
        categoryLabel: "行动力"
    },
    {
        id: 7,
        text: "不要去卷孩子，卷你们自己",
        author: "Kimi-志愿者",
        category: "education",
        categoryLabel: "教育理念"
    },
    {
        id: 8,
        text: "先给现状打个分，再一点一点做好加分",
        author: "小空",
        category: "action",
        categoryLabel: "行动力"
    },
    {
        id: 9,
        text: "手心脑",
        author: "米粒",
        category: "growth",
        categoryLabel: "成长思维"
    },
    {
        id: 10,
        text: "我没办法给你一个答案，但是给你一个思考框架，你可以试一试；每个孩子都不一样，事情都是复杂的；你不可能一次性想明白，不是表面的东西，而是复杂的系统的认识",
        author: "刘祐昕｜Lucky",
        category: "education",
        categoryLabel: "教育理念"
    },
    {
        id: 11,
        text: "先做，少学习，学了要多输出，多分享多表达",
        author: "朱珠",
        category: "action",
        categoryLabel: "行动力"
    },
    {
        id: 12,
        text: "把生活上的很多小习惯养成，状态就好了；状态好了，能量提高了，很多问题就都不再是问题",
        author: "周菁Helen Zhou",
        category: "mindset",
        categoryLabel: "心态管理"
    },
    {
        id: 13,
        text: "AI趋势飞速变化，我们只有拥抱变化，尤其对孩子的将来，尽量站在未来看现在，尽可能不被眼下的大环境裹挟",
        author: "TreeSee",
        category: "education",
        categoryLabel: "教育理念"
    },
    {
        id: 14,
        text: "房价都能崩盘，你怎么知道教育不会崩？内卷是最后的疯狂！教育体系必将崩盘",
        author: "#Season同学",
        category: "education",
        categoryLabel: "教育理念"
    },
    {
        id: 15,
        text: "世界正在变快，面向未来必须回归本质的思考",
        author: "#Season同学",
        category: "mindset",
        categoryLabel: "心态管理"
    },
    {
        id: 16,
        text: "对孩子的教育不要太焦虑，考上大学又怎么样呢？藤校毕业的都有很多找不到工作，会赚钱和学历是两码事",
        author: "周菁Helen Zhou",
        category: "education",
        categoryLabel: "教育理念"
    },
    {
        id: 17,
        text: "小环境的选择可能更适合确定未来的方向",
        author: "Lyna",
        category: "growth",
        categoryLabel: "成长思维"
    },
    {
        id: 18,
        text: "消除焦虑性价比最高的办法就是诺友们间相互聊天赋能",
        author: "Emily",
        category: "mindset",
        categoryLabel: "心态管理"
    },
    {
        id: 19,
        text: "读书的厚度和脸皮的厚度成反比",
        author: "Gabriel晓成",
        category: "growth",
        categoryLabel: "成长思维"
    },
    {
        id: 20,
        text: "少看书，多行动",
        author: "林丸子",
        category: "action",
        categoryLabel: "行动力"
    },
    {
        id: 21,
        text: "跳坑吧 要跳就跳个人少的坑",
        author: "志愿者-wandy",
        category: "action",
        categoryLabel: "行动力"
    },
    {
        id: 22,
        text: "精神胜利法和完全的真实，这两者不矛盾的。走弯路，做复盘。平衡是个妄念，有平衡的思维很重要，水多了加面，面多了加水。关注当下能做的一点点小改变",
        author: "燕敏",
        category: "mindset",
        categoryLabel: "心态管理"
    },
    {
        id: 23,
        text: "关注日常的小习惯，你的状态是由小习惯决定，把睡觉饮食放第一位，总之让良性系统启动最重要",
        author: "水果沙拉",
        category: "mindset",
        categoryLabel: "心态管理"
    },
    {
        id: 24,
        text: "那些超过现实的期待都是执念",
        author: "知非",
        category: "mindset",
        categoryLabel: "心态管理"
    },
    {
        id: 25,
        text: "状态，关系，生长（是生而不是成）。生长有一个生长目标。生长目标是手（知识与技能），心（心力与素养），脑（认知与思维）三者的合一。我们修的是能量，能量上来什么问题都不是问题",
        author: "志愿者-白静",
        category: "growth",
        categoryLabel: "成长思维"
    },
    {
        id: 26,
        text: "横竖都是卷，那就看看怎么样卷得好看些",
        author: "在水一方",
        category: "mindset",
        categoryLabel: "心态管理"
    }
];

// 应用程序状态
let currentFilter = 'all';
let searchQuery = '';
let filteredQuotes = [...quotesData];

// DOM 元素
const searchInput = document.getElementById('searchInput');
const quotesGrid = document.getElementById('quotesGrid');
const filterTags = document.querySelectorAll('.filter-tag');
const totalQuotesEl = document.getElementById('totalQuotes');
const totalAuthorsEl = document.getElementById('totalAuthors');

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderQuotes();
    setupEventListeners();
});

// 设置事件监听器
function setupEventListeners() {
    // 搜索功能
    searchInput.addEventListener('input', handleSearch);
    
    // 筛选标签
    filterTags.forEach(tag => {
        tag.addEventListener('click', handleFilterClick);
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboard);
}

// 处理搜索
function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase().trim();
    filterAndRenderQuotes();
}

// 处理筛选点击
function handleFilterClick(e) {
    const clickedCategory = e.target.dataset.category;
    
    // 更新激活状态
    filterTags.forEach(tag => tag.classList.remove('active'));
    e.target.classList.add('active');
    
    currentFilter = clickedCategory;
    filterAndRenderQuotes();
}

// 键盘快捷键处理
function handleKeyboard(e) {
    // Ctrl/Cmd + K 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // 按 Escape 清空搜索
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchQuery = '';
        filterAndRenderQuotes();
    }
}

// 筛选和渲染金句
function filterAndRenderQuotes() {
    filteredQuotes = quotesData.filter(quote => {
        const matchesCategory = currentFilter === 'all' || quote.category === currentFilter;
        const matchesSearch = searchQuery === '' || 
            quote.text.toLowerCase().includes(searchQuery) ||
            quote.author.toLowerCase().includes(searchQuery);
        
        return matchesCategory && matchesSearch;
    });
    
    renderQuotes();
    updateStats();
}

// 渲染金句卡片
function renderQuotes() {
    if (filteredQuotes.length === 0) {
        quotesGrid.innerHTML = `
            <div class="no-results">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 48px; height: 48px; color: #9CA3AF; margin-bottom: 16px;">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                    <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
                </svg>
                <h3 style="color: #6B7280; margin-bottom: 8px;">没有找到相关金句</h3>
                <p style="color: #9CA3AF; font-size: 14px;">尝试修改搜索关键词或筛选条件</p>
            </div>
        `;
        return;
    }
    
    quotesGrid.innerHTML = filteredQuotes.map((quote, index) => `
        <div class="quote-card" data-category="${quote.category}" style="animation-delay: ${index * 0.1}s">
            <div class="quote-text">${quote.text}</div>
            <div class="quote-author">
                <span class="author-name">${quote.author}</span>
                <span class="quote-category">${quote.categoryLabel}</span>
            </div>
        </div>
    `).join('');
}

// 更新统计信息
function updateStats() {
    totalQuotesEl.textContent = filteredQuotes.length;
    
    const uniqueAuthors = new Set(filteredQuotes.map(quote => quote.author));
    totalAuthorsEl.textContent = uniqueAuthors.size;
    
    // 添加数字动画效果
    animateNumber(totalQuotesEl);
    animateNumber(totalAuthorsEl);
}

// 数字动画效果
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 800;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化搜索性能
const debouncedSearch = debounce(handleSearch, 300);
searchInput.removeEventListener('input', handleSearch);
searchInput.addEventListener('input', debouncedSearch);

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加滚动效果
let ticking = false;

function updateScrollEffect() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        header.style.background = 'rgba(248, 250, 252, 0.95)';
        header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(248, 250, 252, 0.8)';
        header.style.boxShadow = 'none';
    }
    
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffect);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate);

// 添加卡片点击效果
document.addEventListener('click', function(e) {
    if (e.target.closest('.quote-card')) {
        const card = e.target.closest('.quote-card');
        const quote = filteredQuotes.find(q => q.text === card.querySelector('.quote-text').textContent);
        
        // 可以在这里添加更多交互功能，比如分享、收藏等
        console.log('点击了金句:', quote);
    }
});

// 添加键盘导航支持
let currentCardIndex = -1;

document.addEventListener('keydown', function(e) {
    if (e.target === searchInput) return;
    
    const cards = document.querySelectorAll('.quote-card');
    
    switch(e.key) {
        case 'ArrowDown':
            e.preventDefault();
            currentCardIndex = Math.min(currentCardIndex + 1, cards.length - 1);
            focusCard(cards[currentCardIndex]);
            break;
        case 'ArrowUp':
            e.preventDefault();
            currentCardIndex = Math.max(currentCardIndex - 1, 0);
            focusCard(cards[currentCardIndex]);
            break;
        case 'Enter':
            if (currentCardIndex >= 0 && cards[currentCardIndex]) {
                cards[currentCardIndex].click();
            }
            break;
    }
});

function focusCard(card) {
    if (!card) return;
    
    // 移除之前的焦点样式
    document.querySelectorAll('.quote-card').forEach(c => {
        c.style.outline = 'none';
        c.style.transform = '';
    });
    
    // 添加焦点样式
    card.style.outline = '2px solid var(--primary-color)';
    card.style.transform = 'translateY(-2px)';
    
    // 滚动到可见区域
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
} 