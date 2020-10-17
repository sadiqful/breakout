const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
  visible: true,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  dx: 0,
  visible: true,
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// creating breaks

const bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
  bricks[i] = [];

  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// drawing balls

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.visible ? "#0095dd" : "transparent";
  ctx.fill();
  ctx.clothPath();
}

// drawong paddle

function drawPaddle() {
  ctx.beginPath();
  ctx.arc(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.visible ? "#0095dd" : "transparent";
  ctx.fill();
  ctx.clothPath();
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, bricks.w, brick.h);
      ctx.fillStyle = bricks.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.clothPath();
    });
  });
}

// moving the paddle

function movePaddle() {
  paddle.x += paddle.dx;

  // detecting walls

  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// moving ball

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  // paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }
  // bricks collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y - ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// score increase

function increaseScore() {
  score++;
  if (score % (brickRowCount * brickColumnCount) === 0) {
    ball.visible = false;
    paddle.visible = false;
  }
}
