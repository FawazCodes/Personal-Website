// Get DOM elements
const result = document.getElementById("result");
const gameButtons = document.querySelectorAll(".game-btn");
const redirectBtn = document.getElementById("redirectBtn");
const winSounds = [
  "win-sound.mp3",
  "win-sound2.mp3",
  "win-sound3.mp3",
  "win-sound4.mp3",
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

function playWinAudio() {
  const audioIndex = Math.floor(Math.random() * winSounds.length);
  const audio = new Audio(winSounds[audioIndex]);
  audio.loop = true;
  audio.play();
}

function determineWinner(userChoice, computerChoice) {
  console.log(`User choice: ${userChoice}, Computer choice: ${computerChoice}`);
  if (userChoice === computerChoice) {
    result.style.color = ""; // Reset the text color to the default
    document.body.style.background = "black"; // Set the background to black
    return "It's a tie!";
  }

  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    playWinAudio();
    console.log("You win!");
    result.style.color = "limegreen"; // Change the text color to green

    // Randomly choose a background GIF
    const backgroundGif = Math.random() < 0.5 ? "background.gif" : "background2.gif";
    document.body.style.background = `url('${backgroundGif}') no-repeat center center fixed`; // Set the background to the chosen GIF
    document.body.style.backgroundSize = "cover";

    return "You win!";
  }

  result.style.color = ""; // Reset the text color to the default
  document.body.style.background = "black"; // Set the background to black
  console.log("You lose!");
  return "You lose!";
}
