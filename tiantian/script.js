// 获取游戏元素
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const gameOverElement = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

// 获取移动端控制按钮
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

// 游戏配置
const gridSize = 30; // 网格大小
const initialSpeed = 700; // 初始速度（毫秒）
const speedIncrease = 2; // 每吃一个食物增加的速度
const minSpeed = 150; // 最小速度限制（最快）
const wallPassScore = 50; // 每获得50分可以穿墙一次

// 游戏状态
let snake = []; // 蛇身体
let direction = 'right'; // 初始方向
let nextDirection = 'right'; // 下一个方向
let food = {}; // 食物位置
let score = 0; // 分数
let gameSpeed = initialSpeed; // 当前游戏速度
let gameLoop; // 游戏循环计时器
let gameActive = false; // 游戏是否激活
let wallPassAvailable = false; // 穿墙能力是否可用
let wallPassUsed = false; // 是否正在使用穿墙能力
let lastWallPassScore = 0; // 上次获得穿墙能力时的分数
let isMobileDevice = false; // 是否为移动设备

// 检测是否为移动设备
function detectMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// 调整画布大小以适应移动设备
function resizeCanvas() {
    isMobileDevice = detectMobileDevice();
    
    if (isMobileDevice) {
        // 获取游戏区域容器的宽度
        const containerWidth = canvas.parentElement.clientWidth;
        // 设置画布尺寸
        canvas.width = containerWidth;
        canvas.height = containerWidth;
    } else {
        // 桌面设备使用固定尺寸
        canvas.width = 550;
        canvas.height = 550;
    }
    
    // 如果游戏正在进行，重新绘制
    if (gameActive) {
        draw();
    }
}

// 图像对象
const snakeHeadImg = new Image(); // 六臂哪吒头像
const foodImg = new Image(); // 火尖枪食物
snakeHeadImg.src = 'assets/nezha-six-arms.svg';
foodImg.src = 'assets/food.svg'; // 使用原来的火尖枪作为食物

// 颜色配置
const colors = {
    snakeBody: '#e63946',
    snakeBodyBorder: '#c1121f',
    gridLines: '#f1faee',
    wallPassIndicator: '#ff9800'
};

// 初始化游戏
function initGame() {
    // 调整画布大小
    resizeCanvas();
    
    // 计算网格尺寸
    const gridWidth = Math.floor(canvas.width / gridSize);
    const gridHeight = Math.floor(canvas.height / gridSize);
    
    // 重置游戏状态，将蛇放在更合适的位置
    snake = [
        {x: Math.floor(gridWidth / 4), y: Math.floor(gridHeight / 2)},
        {x: Math.floor(gridWidth / 4) - 1, y: Math.floor(gridHeight / 2)},
        {x: Math.floor(gridWidth / 4) - 2, y: Math.floor(gridHeight / 2)}
    ];
    
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    gameSpeed = initialSpeed;
    gameActive = true;
    wallPassAvailable = false;
    wallPassUsed = false;
    lastWallPassScore = 0;
    
    // 更新分数显示
    scoreElement.textContent = score;
    
    // 隐藏游戏结束界面
    gameOverElement.classList.add('hidden');
    
    // 生成第一个食物
    generateFood();
    
    // 开始游戏循环
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(gameStep, gameSpeed);
    
    // 绘制初始状态
    draw();
}

// 生成食物
function generateFood() {
    // 计算可用的网格数
    const gridWidth = Math.floor(canvas.width / gridSize);
    const gridHeight = Math.floor(canvas.height / gridSize);
    
    // 生成随机位置
    let newFood;
    let foodOnSnake;
    
    do {
        foodOnSnake = false;
        newFood = {
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight)
        };
        
        // 检查食物是否在蛇身上
        for (let segment of snake) {
            if (segment.x === newFood.x && segment.y === newFood.y) {
                foodOnSnake = true;
                break;
            }
        }
    } while (foodOnSnake);
    
    food = newFood;
}

// 游戏步骤
function gameStep() {
    if (!gameActive) return;
    
    // 更新蛇的方向
    direction = nextDirection;
    
    // 获取蛇头位置
    const head = {...snake[0]};
    
    // 根据方向移动蛇头
    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    
    // 检查是否需要穿墙
    const gridWidth = Math.floor(canvas.width / gridSize);
    const gridHeight = Math.floor(canvas.height / gridSize);
    
    if (head.x < 0 || head.y < 0 || head.x >= gridWidth || head.y >= gridHeight) {
        if (wallPassAvailable) {
            // 使用穿墙能力
            wallPassAvailable = false;
            wallPassUsed = true;
            
            // 从另一侧出现
            if (head.x < 0) head.x = gridWidth - 1;
            else if (head.x >= gridWidth) head.x = 0;
            if (head.y < 0) head.y = gridHeight - 1;
            else if (head.y >= gridHeight) head.y = 0;
        } else {
            // 没有穿墙能力，游戏结束
            endGame();
            return;
        }
    } else {
        wallPassUsed = false;
    }
    
    // 检查是否撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }
    
    // 将新头部添加到蛇身体
    snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        // 增加分数
        score += 10;
        scoreElement.textContent = score;
        
        // 检查是否获得穿墙能力
        if (score - lastWallPassScore >= wallPassScore) {
            wallPassAvailable = true;
            lastWallPassScore = score;
        }
        
        // 生成新食物
        generateFood();
        
        // 增加游戏速度
        if (gameSpeed > minSpeed) {
            gameSpeed -= speedIncrease;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, gameSpeed);
        }
    } else {
        // 如果没有吃到食物，移除尾部
        snake.pop();
    }
    
    // 重新绘制游戏
    draw();
}

// 结束游戏
function endGame() {
    gameActive = false;
    clearInterval(gameLoop);
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}

// 绘制游戏
function draw() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格线
    drawGrid();
    
    // 计算实际的网格像素大小（可能会因为画布大小调整而变化）
    const actualGridSize = canvas.width / Math.floor(canvas.width / gridSize);
    
    // 绘制食物
    ctx.drawImage(
        foodImg, 
        food.x * actualGridSize, 
        food.y * actualGridSize, 
        actualGridSize, 
        actualGridSize
    );
    
    // 绘制蛇身体
    for (let i = 1; i < snake.length; i++) {
        const segment = snake[i];
        
        ctx.fillStyle = colors.snakeBody;
        ctx.strokeStyle = colors.snakeBodyBorder;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.roundRect(
            segment.x * actualGridSize + 1, 
            segment.y * actualGridSize + 1, 
            actualGridSize - 2, 
            actualGridSize - 2,
            5
        );
        ctx.fill();
        ctx.stroke();
    }
    
    // 绘制蛇头（六臂哪吒头像）
    ctx.drawImage(
        snakeHeadImg, 
        snake[0].x * actualGridSize, 
        snake[0].y * actualGridSize, 
        actualGridSize, 
        actualGridSize
    );
    
    // 如果穿墙能力可用，绘制提示
    if (wallPassAvailable) {
        // 在蛇头周围绘制光环
        ctx.strokeStyle = colors.wallPassIndicator;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(
            snake[0].x * actualGridSize + actualGridSize / 2,
            snake[0].y * actualGridSize + actualGridSize / 2,
            actualGridSize / 2 + 5,
            0,
            Math.PI * 2
        );
        ctx.stroke();
        
        // 在画布右上角显示穿墙能力图标
        ctx.fillStyle = colors.wallPassIndicator;
        ctx.beginPath();
        ctx.arc(canvas.width - 20, 20, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 绘制网格线
function drawGrid() {
    ctx.strokeStyle = colors.gridLines;
    ctx.lineWidth = 0.5;
    
    // 计算实际的网格像素大小
    const actualGridSize = canvas.width / Math.floor(canvas.width / gridSize);
    
    // 绘制垂直线
    for (let x = 0; x <= canvas.width; x += actualGridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // 绘制水平线
    for (let y = 0; y <= canvas.height; y += actualGridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// 处理键盘输入
function handleKeydown(e) {
    if (!gameActive) return;
    
    // 防止方向键滚动页面
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }
    
    // 更新方向（防止180度转向）
    switch (e.key) {
        case "ArrowUp":
            if (direction !== 'down') nextDirection = 'up';
            break;
        case "ArrowDown":
            if (direction !== 'up') nextDirection = 'down';
            break;
        case "ArrowLeft":
            if (direction !== 'right') nextDirection = 'left';
            break;
        case "ArrowRight":
            if (direction !== 'left') nextDirection = 'right';
            break;
    }
}

// 处理移动端按钮点击
function handleMobileControls() {
    btnUp.addEventListener('click', function() {
        if (gameActive && direction !== 'down') {
            nextDirection = 'up';
        }
    });
    
    btnDown.addEventListener('click', function() {
        if (gameActive && direction !== 'up') {
            nextDirection = 'down';
        }
    });
    
    btnLeft.addEventListener('click', function() {
        if (gameActive && direction !== 'right') {
            nextDirection = 'left';
        }
    });
    
    btnRight.addEventListener('click', function() {
        if (gameActive && direction !== 'left') {
            nextDirection = 'right';
        }
    });
    
    // 添加触摸事件，防止触摸延迟
    btnUp.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (gameActive && direction !== 'down') {
            nextDirection = 'up';
        }
    });
    
    btnDown.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (gameActive && direction !== 'up') {
            nextDirection = 'down';
        }
    });
    
    btnLeft.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (gameActive && direction !== 'right') {
            nextDirection = 'left';
        }
    });
    
    btnRight.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (gameActive && direction !== 'left') {
            nextDirection = 'right';
        }
    });
}

// 处理窗口大小变化
function handleResize() {
    resizeCanvas();
    
    // 如果游戏正在进行，重新绘制
    if (gameActive) {
        draw();
    }
}

// 事件监听器
document.addEventListener('keydown', handleKeydown);
restartButton.addEventListener('click', initGame);
window.addEventListener('resize', handleResize);

// 初始化移动端控制
handleMobileControls();

// 图像加载完成后开始游戏
let imagesLoaded = 0;
function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) { // 两个图像：蛇头和食物
        initGame();
    }
}

snakeHeadImg.onload = checkAllImagesLoaded;
foodImg.onload = checkAllImagesLoaded;

// 如果图像加载失败，也要启动游戏
snakeHeadImg.onerror = function() {
    console.error('Failed to load snake head image');
    checkAllImagesLoaded();
};

foodImg.onerror = function() {
    console.error('Failed to load food image');
    checkAllImagesLoaded();
}; 