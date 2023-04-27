document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("curiousCat").onclick = function () {
    window.location.href = "https://curiouscat.live/Idkwallah";
  };

  const rockButton = document.getElementById("rock");
  const paperButton = document.getElementById("paper");
  const scissorsButton = document.getElementById("scissors");
  const resultText = document.getElementById("result");

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
    resultText.classList.add("win");
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
