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

  // Define the winEffects array and functions to apply and get a random effect
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

  // Define variables to keep track of the previous round and consecutive tie/loss counts
  let previousResult = null;
  let consecutiveTieOrLossCount = 0;

  // Define the playRound function
  function playRound(playerChoice) {
    // Generate the computer's choice
    const computerChoice = generateComputerChoice();

    // Determine the result of the round
    const result = determineResult(playerChoice, computerChoice);

    // Handle the win result
    if (result === "win") {
      const randomEffect = getRandomEffect();
      resultText.classList.add(randomEffect);

      const audio = new Audio();
      audio.preload = "auto";
      audio.src = `win-sound${Math.floor(Math.random() * 4) + 1}.mp3`;
      audio.play();

      const image = images[Math.floor(Math.random() * images.length)];
      document.body.style.backgroundImage = `url('${image.src}')`;

      rockButton.disabled = true;
      paperButton.disabled = true;
      scissorsButton.disabled = true;

      setTimeout(() => {
        resultText.classList.remove(randomEffect);
        rockButton.disabled = false;
        paperButton.disabled = false;
        scissorsButton.disabled = false;
      }, 6000);
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
    const computerChoiceEmoji = computerChoice === "rock" ? "🪨" : computerChoice === "paper" ? "📄" : "✂️";
    resultText.innerHTML = `${resultTextContent} ${resultEmoji}<br>Computer chose ${computerChoice} ${computerChoiceEmoji}`;
    resultText.style.color = resultColor;

    // Update the consecutive tie/loss count
    consecutiveTieOrLossCount = updateTieOrLossCount(result);

    // Apply the shake animation if the consecutive tie/loss count is >= 1
    if (consecutiveTieOrLossCount >= 1) {
      resultText.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97)";
    } else {
      resultText.style.animation = "";
    }

    // Apply the pop animation if the player wins
    if (result === "win") {
      resultText.style.animation = "pop 1s ease-in-out forwards";
      setTimeout(function () {
        resultText.classList.remove("pop");
      }, 1000);
    } else {
      resultText.classList.remove("pop");
    }
  }

  // Define the generateComputerChoice function
  function generateComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Define the determineResult function
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

  // Define the updateTieOrLossCount function
  function updateTieOrLossCount(result) {
    if (result === "tie" || result === "lose") {
      return consecutiveTieOrLossCount + 1;
    } else {
      return 0;
    }
  }

  // Load the images
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

  images.forEach(function (image) {
    const img = new Image();
    img.onload = function () {
      image.loaded = true;
    };
    img.onerror = function () {
      console.error(`Error loading ${img.src}`);
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
