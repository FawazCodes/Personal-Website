document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("curiousCat").onclick = function () {
    window.location.href = "https://curiouscat.live/Idkwallah";
  };

  const rockButton = document.getElementById("rock");
  const paperButton = document.getElementById("paper");
  const scissorsButton = document.getElementById("scissors");
  const resultText = document.getElementById("result");

  let consecutiveTieOrLossCount = 0;

  const winEffects = [
    "stretch",
    "dance",
    "sling",
    "rotate",
    "bounce",
    "flip"
  ];

  function getRandomEffect() {
    return winEffects[Math.floor(Math.random() * winEffects.length)];
  }

  function applyRandomEffect() {
    const randomEffect = getRandomEffect();
    resultText.classList.add(randomEffect);

    setTimeout(() => {
      resultText.classList.remove(randomEffect);
      applyRandomEffect();
    }, 3000);
  }

  function playRound(playerChoice) {
    const computerChoice = generateComputerChoice();
    const result = determineResult(playerChoice, computerChoice);

    if (result === "win") {
      applyRandomEffect();
    } else {
      resultText.classList.add("shake");

      setTimeout(() => {
        resultText.classList.remove("shake");
      }, 3000);
    }

    updateResultText(result, computerChoice);
    consecutiveTieOrLossCount = updateTieOrLossCount(result);
  }

  function generateComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function determineResult(playerChoice, computerChoice) {
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

  function updateResultText(result, computerChoice) {
    const resultTextMap = {
      tie: "It's a Tie 😐",
      win: "You Won!!! 🥳",
      lose: "You Lost... 😢",
    };

    const choiceEmojiMap = {
      rock: "🪨",
      paper: "📄",
      scissors: "✂️",
    };

    const resultTextColorMap = {
      tie: "white",
      win: "green",
      lose: "red",
    };

    resultText.innerHTML = `${resultTextMap[result]}<br>Computer chose ${computerChoice} ${choiceEmojiMap[computerChoice]}`;
    resultText.style.color = resultTextColorMap[result];
  }

  function updateTieOrLossCount(result) {
    if (result === "tie" || result === "lose") {
      return consecutiveTieOrLossCount + 1;
    }
    return 0;
  }

  rockButton.addEventListener("click", function () {
    playRound("rock");
  });

  paperButton.addEventListener("click", function () {
    playRound("paper");
  });

  scissorsButton.addEventListener("click", function () {
    playRound("scissors");
  });
});
