// Get DOM elements
const result = document.getElementById("result");
const gameButtons = document.querySelectorAll(".game-btn");
const redirectBtn = document.getElementById("redirectBtn");
const winAudio = new Audio("win-sound.mp3");

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
    winAudio.currentTime = 0;
    winAudio.play();
}

function determineWinner(userChoice, computerChoice) {
    console.log(`User choice: ${userChoice}, Computer choice: ${computerChoice}`);
    if (userChoice === computerChoice) {
        result.style.color = ""; // Reset the text color to the default
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
        return "You win!";
    }

    result.style.color = ""; // Reset the text color to the default
    console.log("You lose!");
    return "You lose!";
}
