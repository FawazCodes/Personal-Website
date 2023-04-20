// Variables to store the score and player's choice
let playerScore = 0;
let computerScore = 0;
let playerChoice = "";

// Variables to store the DOM elements
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const resultTextElement = document.getElementById("result-text");
const rockButton = document.getElementById("rock-button");
const paperButton = document.getElementById("paper-button");
const scissorsButton = document.getElementById("scissors-button");
const curiouscatButton = document.getElementById("curiouscat-button");

// Array to store the win sounds
const winSounds = ["win-sound.mp3", "win-sound2.mp3", "win-sound3.mp3", "win-sound4.mp3"];

// Function to play the win sound
function playWinSound() {
  const randomIndex = Math.floor(Math.random() * winSounds.length);
  const audio = new Audio(winSounds[randomIndex]);
  audio.loop = true;
  audio.play();
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  resultTextElement.textContent = "Make your move!";
}

// Function to update the score
function updateScore(playerWon) {
  if (playerWon) {
    playerScore++;
    playerScoreElement.textContent = playerScore.toString();
    resultTextElement.innerHTML = `<span class="win-text">You win! &#x1F389;</span> ${playerChoice} beats ${computerChoice}`;
    playWinSound();
  } else {
    computerScore++;
    computerScoreElement.textContent = computerScore.toString();
    resultTextElement.innerHTML = `<span class="lose-text">You lose! &#x1F61E;</span> ${computerChoice} beats ${playerChoice}`;
  }
}

// Function to handle the player's choice
function handlePlayerChoice(choice) {
  playerChoice = choice;
  const computerChoice = getComputerChoice();
  switch (choice + computerChoice) {
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      updateScore(true);
      break;
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      updateScore(false);
      break;
    default:
      resultTextElement.textContent = "It's a tie!";
      break;
  }
}

// Function to get the computer's choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Event listeners for the buttons
rockButton.addEventListener("click", () => handlePlayerChoice("rock"));
paperButton.addEventListener("click", () => handlePlayerChoice("paper"));
scissorsButton.addEventListener("click", () => handlePlayerChoice("scissors"));
curiouscatButton.addEventListener("click", () => {
  window.location.href = "https://curiouscat.me/";
});

// Reset the game when the page is loaded
resetGame();
