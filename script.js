const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerX = 50;
let playerY = canvas.height - 150;
let playerSpeed = 10;
let gravity = 1;
let jumpForce = 20;
let playerScore = 0;
let isGameOver = false;

let obstacleList = [];

class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 7;
  }

  draw() {
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
  }

  isCollidingWithPlayer() {
    if (playerX + 40 > this.x && playerX < this.x + this.width && playerY + 40 > this.y && playerY < this.y + this.height) {
      return true;
    } else {
      return false;
    }
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.fillStyle = '#f1c40f';
  ctx.fillRect(playerX, playerY, 40, 40);
}

function updatePlayer() {
  playerY += gravity;
  if (playerY > canvas.height - 150) {
    playerY = canvas.height - 150;
  }
  if (playerY < 0) {
    playerY = 0;
  }
}

function handleJump() {
  playerY -= jumpForce;
}

function generateObstacle() {
  let obstacleHeight = Math.floor(Math.random() * 200) + 50;
  let obstacleWidth = 40;
  let obstacleX = canvas.width + 40;
  let obstacleY = canvas.height - obstacleHeight - 150;
  obstacleList.push(new Obstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight));
}

function drawObstacles() {
  for (let i = 0; i < obstacleList.length; i++) {
    obstacleList[i].draw();
  }
}

function updateObstacles() {
  for (let i = 0; i < obstacleList.length; i++) {
    obstacleList[i].update();
    if (obstacleList[i].x + obstacleList[i].width < 0) {
      obstacleList.splice(i, 1);
    }
  }
}

function handleScore() {
  playerScore += 1;
}

function checkCollisions() {
  for (let i = 0; i < obstacleList.length; i++) {
    if (obstacleList[i].isCollidingWithPlayer()) {
      isGameOver = true;
    }
  }
}

function displayGameOver() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.font = '40px Open Sans';
  ctx.fillText(`Game Over! Your score is ${playerScore}`, 50, canvas.height / 2);
}

function gameLoop() {
  clearCanvas();
  drawPlayer();
  updatePlayer();
  drawObstacles();
  updateObstacles();
  handleScore();
  checkCollisions();
  if (isGameOver) {
    displayGameOver();
    return;
  }
  setTimeout

});

btn1.addEventListener('click', () => {
  window.location.href = 'https://curiouscat.live/Idkwallah';
});
