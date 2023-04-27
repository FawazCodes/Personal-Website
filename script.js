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

  // Define variables to keep track of the previous round and consecutive tie/loss counts
  let previousResult = null;
  let consecutiveTieOrLossCount = 0;

  // Define the playRound function
  function playRound(playerChoice) {
    // Generate the computer's choice
    const computerChoice = (function () {
      const choices = ["rock", "paper", "scissors"];
      return choices[Math.floor(Math.random() * choices.length)];
    })();

    // Determine the result of the round
    const result = (function () {
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
    })();

    // Handle the win result
    if (result === "win") {
      const winEffects = [
        "stretch",
        "dance",
        "sling",
        "rotate",
        "bounce",
        "flip",
        "run",
        "wave",
      ];

      let currentIndex = 0;
      let previousIndex = -1;

      const changeWinEffect = () => {
        previousIndex = currentIndex;
        while (currentIndex === previousIndex) {
          currentIndex = Math.floor(Math.random() * winEffects.length);
        }

        resultText.classList.remove(winEffects[previousIndex]);
        resultText.classList.add(winEffects[currentIndex]);

        setTimeout(changeWinEffect, 200);
      };

      changeWinEffect();
    } else {
      resultText.classList.remove("run", "dance");
      resultText.classList.add("shake");
    }

    // Determine the result text content, emoji, and color
    let resultTextContent, resultEmoji, resultColor;
    if (result === "tie") {
      resultTextContent = "It's a Tie";
      resultEmoji = "😐";
      resultColor = "white";
    } else if (result === "win") {
      resultTextContent = "You Won!!!";
      resultEmoji = "🥳";
      resultColor = "green";
    } else {
      resultTextContent = "You Lost...";
      resultEmoji = "😢";
      resultColor = "red";
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

// Apply the shake animation if the consecutive tie/loss count is >= 1
if (consecutiveTieOrLossCount >= 1) {
  resultText.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97)";
} else {
  resultText.style.animation = "";
}
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
