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

    // add hilarious effect on win
    const winEffects = [
      "stretch",
      "dance",
      "sling",
      "rotate"
    ];
    const randomEffect = winEffects[Math.floor(Math.random() * winEffects.length)];
    resultText.classList.add(randomEffect);
    setTimeout(function () {
      resultText.classList.remove(randomEffect);
    }, 1000);
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
    resultText.style.animation = "win 0.5s ease-out";
  } else {
    resultTextContent = "You Lost...";
    resultEmoji = "😢";
    resultColor = "red";
    resultText.style.animation = "lose 0.5s ease-out";
  }

  resultText.innerHTML = `${resultTextContent} ${resultEmoji}<br>Computer chose ${computerChoice} ${
    computerChoice === "rock" ? "🪨" : computerChoice === "paper" ? "📄" : "✂️"
  }`;
  resultText.style.color = resultColor;

  if (result === "tie" || result === "lose") {
    if ((previousResult === "tie" || previousResult === "lose") && result !== "win") {
      consecutiveTieOrLossCount++;
    } else {
      consecutiveTieOrLossCount = 1;
    }
  } else {
    consecutiveTieOrLossCount = 0;
  }

  previousResult = result;

  if (consecutiveTieOrLossCount >= 2) {
    resultText.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97)";
  } else {
    resultText.style.animation = "";
  }

  if (result === "win") {
    resultText.style.animation = "pop 1s ease-in-out forwards";
    setTimeout(function () {
      resultText.classList.remove("pop");
    }, 1000);
  } else {
    resultText.classList.remove("pop");
  }
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
