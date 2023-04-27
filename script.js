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
      let i;
      do {
        i = Math.floor(Math.random() * images.length);
      } while (!images[i].loaded);

      const image = images[i];
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = `win-sound${Math.floor(Math.random() * 4) + 1}.mp3`;
      audio.play();

      document.body.style.backgroundImage = `url('${image.src}')`;

      // Add hilarious effect on win
      const winEffects = [
        "stretch",
        "dance",
        "sling",
        "rotate"
      ];
      const randomEffect = winEffects[Math.floor(Math.random() * winEffects.length)];
      resultText.classList.add(randomEffect);

      // Remove the win effect class before the next round begins
      rockButton.disabled = true;
      paperButton.disabled = true;
      scissorsButton.disabled = true;
      setTimeout(function () {
        resultText.classList.remove(randomEffect);
        rockButton.disabled = false;
        paperButton.disabled = false;
        scissorsButton.disabled = false;
      }, 2000);
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
      resultText.style.animation = "win 0.5s ease-out";
    } else {
      resultTextContent = "You Lost...";
      resultEmoji = "😢";
      resultColor = "red";
      resultText.style.animation = "lose 0.5s ease-out";
    }

    // Update the result text with the appropriate content, emoji, and color
    resultText.innerHTML = `${resultTextContent} ${resultEmoji}<br>Computer chose ${computerChoice} ${
      computerChoice === "rock" ? "🪨" : computerChoice === "paper" ? "📄" : "✂️"
    }`;
    resultText.style.color = resultColor;

    // Update the consecutive tie/loss count
    if (result === "tie" || result === "lose") {
      if ((previousResult === "tie" || previousResult === "lose") && result !== "win") {
        consecutiveTieOrLossCount++;
      } else {
        consecutiveTieOrLossCount = 1;
      }
    } else {
      consecutiveTieOrLossCount = 0;
    }

    // Update the previous result
    previousResult = result;

    // Apply the shake animation if the consecutive tie/loss count is >= 2
    if (consecutiveTieOrLossCount >= 2) {
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

  // Load the images
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
