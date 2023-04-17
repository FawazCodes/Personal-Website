const result = document.getElementById("result");
const gameButtons = document.querySelectorAll(".game-btn");
const redirectBtn = document.getElementById("redirectBtn");
const winAudio = document.getElementById("winAudio");

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

function getRandomChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playWinAudio() {
    winAudio.currentTime = 0;
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
        playWinAudio();
        return "You win!";
    }

    return "You lose!";
}
