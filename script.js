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

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}
