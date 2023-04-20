// Get DOM elements
const result = document.getElementById("result");
const gameButtons = document.querySelectorAll(".game-btn");
const redirectBtn = document.getElementById("redirectBtn");
const winAudio = document.getElementById("winAudio");
const body = document.querySelector("body");

// Add event listeners
redirectBtn.addEventListener("click", () => {
  window.location.href = "https://curiouscat.live/Idkwallah";
});

gameButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const userChoice = button.dataset.choice;
    const computerChoice = getRandomChoice();
    const outcome = determineWinner(userChoice, computerChoice);

    if (outcome.includes("win")) {
      const randomBackground = Math.random() < 0.5 ? "background.gif" : "background2.gif";
      body.style.backgroundImage = `url(${randomBackground})`;
      winAudio.currentTime = 0;
      winAudio.play();
    } else {
      body.style.backgroundImage = "url('dvd.gif')";
    }

    result.innerHTML = outcome.includes("win") ? `🎉 ${outcome}` : outcome;
    result.style.color = outcome.includes("win") ? "green" : "inherit";
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
    return "You win!";
  }

  return "You lose!";
}
