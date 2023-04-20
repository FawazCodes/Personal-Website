// Get DOM elements
const result = document.getElementById("result");
const gameButtons = document.querySelectorAll(".game-btn");
const redirectBtn = document.getElementById("redirectBtn");
const winSounds = [
  new Audio("win-sound.mp3"),
  new Audio("win-sound2.mp3"),
  new Audio("win-sound3.mp3"),
  new Audio("win-sound4.mp3")
];

// Add event listeners
redirectBtn.addEventListener("click", () => {
  window.location.href = "https://curiouscat.live/Idkwallah";
});

gameButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userChoice = button.dataset.choice;
    const computerChoice = getRandomChoice();
    const outcome = determineWinner(userChoice, computerChoice);
    result.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${outcome}`;
    
    if (outcome.includes("win")) {
      switchBackground();
      playRandomWinSound();
    } else {
      switchBackground(false);
    }
  });
});

// Define functions
function getRandomChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomChoice = choices[randomIndex];
  console.log(`Computer choice: ${randomChoice}`);
  return randomChoice;
}

function playRandomWinSound() {
  const randomIndex = Math.floor(Math.random() * winSounds.length);
  winSounds[randomIndex].currentTime = 0;
  winSounds[randomIndex].loop = true;
  winSounds[randomIndex].play();
}

function determineWinner(userChoice, computerChoice) {
  console.log(`User choice: ${userChoice}, Computer choice: ${computerChoice}`);
  if (userChoice === computerChoice) {
    return "It's a tie!";
  }

  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    console.log("You win!");
    return "You win!";
  }

  console.log("You lose!");
  return "You lose!";
}

function switchBackground(isWin) {
  const background = document.querySelector("body");
  const randomNumber = Math.floor(Math.random() * 2) + 1;
  console.log("Random number: ", randomNumber);
  
  if (isWin) {
    if (randomNumber === 1) {
      background.style.backgroundImage = "url('background.gif')";
      console.log("Background switched to background.gif");
    } else {
      background.style.backgroundImage = "url('background2.gif')";
      console.log("Background switched to background2.gif");
    }
  } else {
    background.style.backgroundImage = "none";
    console.log("Background switched to none");
  }
}
