document.addEventListener('DOMContentLoaded', () => {
    const redirectBtn = document.getElementById('redirectBtn');
    const gameBtns = document.querySelectorAll('.game-btn');
    const result = document.getElementById('result');

        redirectBtn.addEventListener('click', () => {
        window.location.href = 'https://curiouscat.live/Idkwallah';
    });

    gameBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const playerChoice = e.target.getAttribute('data-choice');
            const computerChoice = getComputerChoice();
            const gameResult = playGame(playerChoice, computerChoice);
            result.textContent = gameResult;
        });
    });

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function playGame(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return `It's a draw! You both chose ${playerChoice}.`;
        }

        if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return `You win! ${playerChoice} beats ${computerChoice}.`;
        } else {
            return `You lose! ${computerChoice} beats ${playerChoice}.`;
        }
    }
});

