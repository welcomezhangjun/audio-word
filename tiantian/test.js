// 哪吒贪吃蛇游戏测试用例
// 这个文件包含了测试游戏各个功能的测试用例

// 模拟DOM元素
const mockElements = {
    canvas: {
        width: 400,
        height: 400,
        getContext: () => ({
            clearRect: jest.fn(),
            beginPath: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            stroke: jest.fn(),
            fill: jest.fn(),
            roundRect: jest.fn(),
            drawImage: jest.fn()
        })
    },
    score: { textContent: '0' },
    finalScore: { textContent: '0' },
    gameOver: { 
        classList: {
            add: jest.fn(),
            remove: jest.fn()
        }
    },
    restartButton: {
        addEventListener: jest.fn()
    }
};

// 测试用例1: 初始化游戏
function testGameInitialization() {
    console.log('测试用例1: 初始化游戏');
    
    // 模拟document.getElementById
    document.getElementById = (id) => {
        switch(id) {
            case 'game-canvas': return mockElements.canvas;
            case 'score': return mockElements.score;
            case 'final-score': return mockElements.finalScore;
            case 'game-over': return mockElements.gameOver;
            case 'restart-button': return mockElements.restartButton;
            default: return null;
        }
    };
    
    // 加载游戏脚本
    const script = document.createElement('script');
    script.src = 'script.js';
    document.body.appendChild(script);
    
    // 验证初始状态
    setTimeout(() => {
        console.log('蛇的初始长度应该为3:', snake.length === 3);
        console.log('初始方向应该为右:', direction === 'right');
        console.log('初始分数应该为0:', score === 0);
        console.log('游戏应该处于激活状态:', gameActive === true);
    }, 500);
}

// 测试用例2: 食物生成
function testFoodGeneration() {
    console.log('测试用例2: 食物生成');
    
    // 模拟蛇的位置
    snake = [
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 3, y: 5}
    ];
    
    // 生成食物
    generateFood();
    
    // 验证食物不在蛇身上
    let foodOnSnake = false;
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            foodOnSnake = true;
            break;
        }
    }
    
    console.log('食物不应该在蛇身上:', !foodOnSnake);
    console.log('食物x坐标应该在画布范围内:', food.x >= 0 && food.x < canvas.width / gridSize);
    console.log('食物y坐标应该在画布范围内:', food.y >= 0 && food.y < canvas.height / gridSize);
}

// 测试用例3: 蛇的移动
function testSnakeMovement() {
    console.log('测试用例3: 蛇的移动');
    
    // 初始化蛇
    snake = [
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 3, y: 5}
    ];
    
    // 测试向右移动
    direction = 'right';
    nextDirection = 'right';
    const originalLength = snake.length;
    
    // 模拟游戏步骤
    const oldHead = {...snake[0]};
    gameStep();
    
    // 验证蛇头位置正确移动
    console.log('向右移动后蛇头x坐标应该+1:', snake[0].x === oldHead.x + 1);
    console.log('向右移动后蛇头y坐标应该不变:', snake[0].y === oldHead.y);
    console.log('移动后蛇长度应该保持不变(未吃食物):', snake.length === originalLength);
    
    // 测试转向
    nextDirection = 'up';
    gameStep();
    console.log('转向上移动后蛇头y坐标应该-1:', snake[0].y === oldHead.y - 1);
    
    // 测试无效转向(180度转向)
    direction = 'right';
    nextDirection = 'left'; // 这应该被忽略，因为蛇不能180度转向
    handleKeydown({key: 'ArrowLeft', preventDefault: () => {}});
    console.log('180度转向应该被忽略:', nextDirection !== 'left');
}

// 测试用例4: 吃食物
function testEatingFood() {
    console.log('测试用例4: 吃食物');
    
    // 初始化蛇和食物
    snake = [
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 3, y: 5}
    ];
    food = {x: 6, y: 5}; // 食物在蛇头右侧
    score = 0;
    scoreElement.textContent = '0';
    
    // 记录初始长度
    const originalLength = snake.length;
    
    // 向右移动吃到食物
    direction = 'right';
    nextDirection = 'right';
    gameStep();
    
    // 验证结果
    console.log('吃到食物后分数应该增加10:', score === 10);
    console.log('吃到食物后蛇长度应该+1:', snake.length === originalLength + 1);
    console.log('吃到食物后应该生成新食物:', food.x !== 6 || food.y !== 5);
}

// 测试用例5: 游戏结束条件
function testGameOver() {
    console.log('测试用例5: 游戏结束条件');
    
    // 测试撞墙
    snake = [
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0}
    ];
    direction = 'left';
    nextDirection = 'left';
    gameActive = true;
    
    // 模拟向左移动撞墙
    gameStep();
    console.log('撞墙后游戏应该结束:', gameActive === false);
    
    // 重置游戏状态
    gameActive = true;
    
    // 测试撞到自己
    snake = [
        {x: 5, y: 5},
        {x: 5, y: 6},
        {x: 6, y: 6},
        {x: 6, y: 5},
        {x: 6, y: 4},
        {x: 5, y: 4}
    ];
    direction = 'left';
    nextDirection = 'left';
    
    // 模拟向左移动撞到自己
    gameStep();
    console.log('撞到自己后游戏应该结束:', gameActive === false);
}

// 运行所有测试
function runAllTests() {
    console.log('开始运行哪吒贪吃蛇游戏测试...');
    
    testGameInitialization();
    setTimeout(() => {
        testFoodGeneration();
        testSnakeMovement();
        testEatingFood();
        testGameOver();
        
        console.log('所有测试完成!');
    }, 1000);
}

// 在页面加载完成后运行测试
window.onload = function() {
    // 注释掉下面一行来禁用自动测试
    // runAllTests();
    
    console.log('测试文件已加载。在控制台中调用runAllTests()函数来运行所有测试。');
}; 