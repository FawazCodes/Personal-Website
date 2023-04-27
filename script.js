document.addEventListener("DOMContentLoaded", function () {
  // Handle the curiousCat button click
  document.getElementById("curiousCat").onclick = function () {
    window.location.href = "https://curiouscat.live/Idkwallah";
  };

  // Get the necessary elements
  const rockButton = document.getElementById("rock");
  const paperButton = document.getElementById("paper");
  const scissorsButton = document.getElementById("scissors");
  const resultText = document.getElementById("result");

  // Define the images to use
  const images = [
    {
      src: "background.gif",
      loaded: false,
    },
    {
      src: "background2.gif",
      loaded: false,
    },
  ];

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

  // Define the playRound function
  function playRound(playerChoice) {
    // Generate the computer's choice
    const computerChoice = generateComputerChoice();

    // Determine the result of the round
    const result = determineResult(playerChoice, computerChoice);

    // Handle the win result
    if (result === "win") {
      const winEffects = [
        "stretch",
        "dance",
        "sling",
        "rotate",
        "bounce",
        "flip"
      ];

      let i = 0;

      function applyEffect() {
        resultText.classList.add(winEffects[i]);
        setTimeout(() => {
          resultText.classList.remove(winEffects[i]);
          i = (i + 1) % winEffects.length;
          applyEffect();
        }, 2000);
      }

      applyEffect();

      const audio = new Audio();
      audio.preload = "auto";
      audio.src = `win-sound${Math.floor(Math.random() * 4) + 1}.mp3`;
      audio.play();

      let j = 0;
      function changeBackground() {
        document.body.style.backgroundImage = `url('${images[j].src}')`;
        j = (j + 1) % images.length;
        setTimeout(changeBackground, 2000);
      }
      changeBackground();
    }

    // Determine the result text content, emoji, and color
    let resultTextContent, resultEmoji, resultColor;
    if (result === "tie") {
      resultTextContent = "It's a Tie";
      resultEmoji = "😐";
      resultColor = "white";
      resultText.classList.add("shake");
    } else if (result === "win") {
      resultTextContent = "You Won!!!";
      resultEmoji = "🥳";
      resultColor = "green";
    } else {
      resultTextContent = "You Lost...";
      resultEmoji = "😢";
      resultColor = "red";
      resultText.classList.add("shake");
    }

    // Update the result text with the appropriate content, emoji, and color
    resultText.innerHTML = `${resultTextContent} ${resultEmoji}<br>Computer chose ${computerChoice} ${
  computerChoice === "rock" ? "🪨" : computerChoice === "paper" ? "📄" : "✂️"
}`;
resultText.style.color = resultColor;

// Update the consecutive tie/loss count
if (result === "tie" || result === "lose") {
  consecutiveTieOrLossCount++;
} else {
  consecutiveTieOrLossCount = 0;
}

// Remove the shake class before the next round begins
setTimeout(() => {
  resultText.classList.remove("shake");
}, 2000);

// Update the previous result
previousResult = result;
    }

// Load the images
images.forEach(function (image) {
const img = new Image();
img.onload = function () {
image.loaded = true;
};
img.onerror = function () {
console.error(Error loading ${img.src});
};
img.src = image.src;
image.img = img;
});

// Add event listeners for the player's choices
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
