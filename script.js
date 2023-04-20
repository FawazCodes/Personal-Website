// Get DOM elements
const result = document.getElementById("result");
const gameButtons = document.querySelectorAll(".game-btn");
const redirectBtn = document.getElementById("redirectBtn");
const winAudio = document.getElementById("winAudio");
const gifContainer = document.querySelector(".gif-container");

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
        if (outcome.startsWith("You win!")) {
            playWinAudio();
            gifContainer.style.backgroundImage = `url(${getRandomBackgroundGif()})`;
        } else {
            gifContainer.style.backgroundImage = "";
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
    winAudio.currentTime = 0;
    winAudio.play();
    winAudio.loop = true;
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
        return "You win! 🎉";
    }

    console.log("You lose!");
    return "You lose! 😔";
}

function getRandomBackgroundGif() {
    const gifs = ["background.gif", "background2.gif"];
    const randomIndex = Math.floor(Math.random() * gifs.length);
    const randomGif = gifs[randomIndex];
    console.log(`Background gif: ${randomGif}`);
    return randomGif;
}
