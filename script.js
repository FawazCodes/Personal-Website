const result = document.getElementById("result");
const gameButtons = document.querySelectorAll(".game-btn");
const redirectBtn = document.getElementById("redirectBtn");

redirectBtn.addEventListener("click", () => {
    window.location.href = "https://curiouscat.live/Idkwallah";
});

function setBackground(gifName) {
    document.body.style.backgroundImage = `url(${gifName})`;
}

function clearBackground() {
    document.body.style.backgroundImage = '';
}

function getRandomGif() {
    const gifs = ['background.gif', 'background2.gif'];
    const randomIndex = Math.floor(Math.random() * gifs.length);
    return gifs[randomIndex];
}

function playRandomWinSound() {
    const sounds = ['win-sound.mp3', 'win-sound2.mp3', 'win-sound3.mp3', 'win-sound4.mp3'];
    const randomIndex = Math.floor(Math.random() * sounds.length);
    const audio = new Audio(sounds[randomIndex]);
    audio.loop = true;
    audio.play();
}

gameButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const userChoice = button.dataset.choice;
        const computerChoice = getRandomChoice();
        const outcome = determineWinner(userChoice, computerChoice);
        result.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${outcome}`;

        if (outcome === "You win!") {
            setBackground(getRandomGif());
            playRandomWinSound();
        } else {
            clearBackground();
        }
    });
});

function getRandomChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const randomChoice = choices[randomIndex];
    return randomChoice;
}

function determineWinner(userChoice, computerChoice) {
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
