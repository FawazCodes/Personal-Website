function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.addEventListener("DOMContentLoaded", function () {
  const rockButton = document.getElementById("rock");
  const paperButton = document.getElementById("paper");
  const scissorsButton = document.getElementById("scissors");
  const curiousCatButton = document.getElementById("curiousCat");
  const resultText = document.getElementById("result");

  // Apply gradient to the buttons when the page loads
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const gradient = `linear-gradient(45deg, ${color1}, ${color2})`;
  rockButton.style.backgroundImage = gradient;
  paperButton.style.backgroundImage = gradient;
  scissorsButton.style.backgroundImage = gradient;
  curiousCatButton.style.backgroundImage = gradient;

  curiousCatButton.onclick = function () {
    window.location.href = "https://curiouscat.live/Idkwallah";
  };

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

  let previousResult = null;
  let consecutiveTieOrLossCount = 0;

  function playRound(playerChoice) {
    const computerChoice = (function () {
      const choices = ["rock", "paper", "scissors"];
      return choices[Math.floor(Math.random() * choices.length)];
    })();

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
    }

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

    resultText.innerHTML = `${resultTextContent} ${resultEmoji}<br>Computer chose ${computerChoice} ${
      computerChoice === "rock" ? "🪨" : computerChoice === "paper" ? "📄" : "✂️"
    }`;
    resultText.style.color = resultColor;

       if (result === "tie" || result === "lose") {
      if (previousResult === "tie" || previousResult === "lose") {
        consecutiveTieOrLossCount++;
      } else {
        consecutiveTieOrLossCount = 1;
      }
    } else {
      consecutiveTieOrLossCount = 0;
    }

    previousResult = result;

    if (consecutiveTieOrLossCount >= 2) {
      resultText.style.fontSize = "1.5em"; // Adjust the font size here
      resultText.style.opacity = 0;
      setTimeout(() => {
        resultText.style.transition = "opacity 0.5s";
        resultText.style.opacity = 1;
      }, 50);
    } else {
      resultText.style.fontSize = ""; // Reset the font size
      resultText.style.transition = "";
      resultText.style.opacity = "";
    }

    if (result === "win") {
      resultText.style.animation = "dance 0.3s infinite";
    } else {
      resultText.style.animation = ""; // Remove dancing effect
    }

    resultText.style.display = "flex";
    resultText.style.flexDirection = "column";
    resultText.style.justifyContent = "center";
    resultText.style.alignItems = "center";
    resultText.style.textAlign = "center";

  }

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
