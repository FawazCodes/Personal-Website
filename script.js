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
  document.getElementById('score').textContent = playerScore;
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
  setTimeout(gameLoop, 20);
}

function startGame() {
  setInterval(generateObstacle, 2500);
  gameLoop();
}

startGame();

// Tic Tac Toe

let currentPlayer = 'X';

function handleButtonClick(event) {
  let button = event.target;
  if (button.textContent !== '') {
    return;
  }
  button.textContent = currentPlayer;
  if (checkForWin()) {
    alert(`${currentPlayer} wins!`);
    resetBoard();
  } else if (checkForDraw()) {
    alert(`It's a draw!`);
    resetBoard();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkForWin() {
  let buttonList = document.getElementsByClassName('ticTacToeButton');
  let boardArray = Array.from(buttonList).map(button => button.textContent);
  if (
    (boardArray[0] === currentPlayer && boardArray[1] === currentPlayer && boardArray[2] === currentPlayer) ||
    (boardArray[3] === currentPlayer && boardArray[4] === currentPlayer && boardArray[5] === currentPlayer) ||
    (boardArray[6] === currentPlayer && boardArray[7] === currentPlayer && boardArray[8] === currentPlayer) ||
    (boardArray[0] === currentPlayer && boardArray[3] === currentPlayer && boardArray[6] === currentPlayer) ||
    (boardArray[1] === currentPlayer && boardArray[4] === currentPlayer && boardArray[7] === currentPlayer) ||
    (boardArray[2] === currentPlayer && boardArray[5] === currentPlayer && boardArray[8] === currentPlayer) ||
    (boardArray[0] === currentPlayer && boardArray[4] === currentPlayer && boardArray[8] === currentPlayer) ||
    (boardArray[2] === currentPlayer && boardArray[4] === currentPlayer && boardArray[6] === currentPlayer)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkForDraw() {
  let buttonList = document.getElementsByClassName('ticTacToeButton');
  for (let i = 0; i < buttonList.length; i++) {
    if (buttonList[i].textContent === '') {
      return false;
    }
  }
  return true;
}

function resetBoard() {
  let buttonList = document.getElementsByClassName('ticTacToeButton');
  for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].textContent = '';
  }
  currentPlayer = 'X';
}

let ticTacToeButtons = document.getElementsByClassName('ticTacToeButton');
for (let i = 0; i < ticTacToeButtons.length; i++) {
  ticTacToeButtons[i].addEventListener('click', handleButtonClick);
}

// Curious Cat button redirect

document.getElementById('curiousCatButton').addEventListener('click', function() {
  window.location.href = 'https://curiouscat.live/notifications';
});
