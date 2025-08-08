const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// 角色初始化
let player = {
    x: 100,
    y: 100,
    width: 30,
    height: 30,
    color: 'green',
    speed: 5,
};

// 敌人数组
let enemies = [];

// 地图
const mapWidth = canvas.width;
const mapHeight = canvas.height;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer(direction) {
    switch (direction) {
        case 'up':
            if (player.y > 0) player.y -= player.speed;
            break;
        case 'down':
            if (player.y < mapHeight - player.height) player.y += player.speed;
            break;
        case 'left':
            if (player.x > 0) player.x -= player.speed;
            break;
        case 'right':
            if (player.x < mapWidth - player.width) player.x += player.speed;
            break;
    }
}

function spawnEnemy() {
    const enemy = {
        x: Math.random() * mapWidth,
        y: Math.random() * mapHeight,
        width: 30,
        height: 30,
        color: 'red',
    };
    enemies.push(enemy);
}

function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

let inBattle = false;
let currentEnemy = null;

function encounterEnemy() {
    if (Math.random() < 0.1) { // 10%的概率遇到敌人
        spawnEnemy();
        currentEnemy = enemies[enemies.length - 1];
        inBattle = true;
    }
}

function startBattle() {
    // 模拟战斗：可以添加攻击、防御、逃跑逻辑
    console.log('战斗开始！');
    // 示例：攻击逻辑
    function attack() {
        console.log('攻击敌人！');
        if (Math.random() < 0.5) {
            console.log('敌人被击败！');
            enemies = enemies.filter(enemy => enemy !== currentEnemy);
            inBattle = false;
            currentEnemy = null;
        } else {
            console.log('攻击失败，敌人反击！');
        }
    }

    // 示例：逃跑逻辑
    function flee() {
        console.log('逃跑成功！');
        inBattle = false;
        currentEnemy = null;
    }

    return { attack, flee };
}

function drawBattleUI() {
    // 显示战斗UI（选择攻击或逃跑）
    ctx.fillStyle = 'black';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('1. 攻击 2. 逃跑', 10, canvas.height - 60);
}

document.getElementById('startGame').addEventListener('click', () => {
    startGame();
});

function startGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
        drawPlayer();
        drawEnemies();

        // 如果在战斗中，显示战斗UI
        if (inBattle) {
            drawBattleUI();
        }

        encounterEnemy(); // 每次玩家行动时有概率遇到敌人
    }, 1000 / 60); // 每秒60帧

    // 移动监听
    window.addEventListener('keydown', (event) => {
        if (inBattle) return;
        switch (event.key) {
            case 'ArrowUp':
                movePlayer('up');
                break;
            case 'ArrowDown':
                movePlayer('down');
                break;
            case 'ArrowLeft':
                movePlayer('left');
                break;
            case 'ArrowRight':
                movePlayer('right');
                break;
        }
    });
}
