const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

const brickRowCount = 9;
const brickColumnCount = 5;
const delayReset = 500;

const ball = {
    x: canvas.width / 2,
    y: canvas.hight / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
    visible: true
};

const paddle = {
    x: canvas.width /2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    dx: 0,
    visible: true
}

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// creating breaks

const bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];

    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo};
    }
}

// drawing balls 

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.clothPath();
}