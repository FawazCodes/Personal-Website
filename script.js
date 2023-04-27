const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const result = document.getElementById("result");
const curiousCat = document.getElementById("curiousCat");

const choices = ["rock", "paper", "scissors"];

function randomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function displayResult(resultText) {
  result.textContent = resultText;
}

function playRound(e) {
  const playerChoice = e.target.id;
  const computerChoice = randomChoice();
  const gameResult = determineWinner(playerChoice, computerChoice);

  result.classList.remove("win", "lose", "tie");
  result.classList.add(gameResult);

  if (gameResult === "win") {
    result.textContent = `You won! 🥳`;
    applyWinEffects();
  } else if (gameResult === "lose") {
    result.textContent = `You lost 😥`;
    applyShakeEffect();
  } else {
    result.textContent = `It's a tie 😐`;
    applyShakeEffect();
  }
}

function applyWinEffects() {
  const effects = ['stretch', 'dance', 'sling', 'rotate'];
  let effectIndex = 0;
  result.classList.add(effects[effectIndex]);

  setInterval(() => {
    result.classList.remove(effects[effectIndex]);
    effectIndex = (effectIndex + 1) % effects.length;
    result.classList.add(effects[effectIndex]);
  }, 500);
}

function applyShakeEffect() {
  result.classList.add("shake");

  setTimeout(() => {
    result.classList.remove("shake");
  }, 820);
}

rock.addEventListener("click", playRound);
paper.addEventListener("click", playRound);
scissors.addEventListener("click", playRound);
curiousCat.addEventListener("click", () => {
  window.location.href = "https://curiouscat.live/Idkwallah";
});
