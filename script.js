// Get DOM elements
const result = document.getElementById("result");
const gameButtons = document.querySelectorAll(".game-btn");
const redirectBtn = document.getElementById("redirectBtn");
const winAudios = [
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
            playWinAudio();
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

function playWinAudio() {
    const randomIndex = Math.floor(Math.random() * winAudios.length);
    const winAudio = winAudios[randomIndex];
    winAudio.currentTime = 0;
    winAudio.loop = true;
    winAudio.play();
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
        return "🎉 You win!";
    }

    console.log("You lose!");
    return "😢 You lose!";
}
