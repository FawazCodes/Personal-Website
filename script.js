document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("curiousCat").onclick = function() {
    window.location.href = "https://curiouscat.live/Idkwallah";
  };

  const rock = document.getElementById("rock");
  const paper = document.getElementById("paper");
  const scissors = document.getElementById("scissors");
  const result = document.getElementById("result");

  const buttonColors = [
    "linear-gradient(to bottom, #FFC300, #FF5733)",
    "linear-gradient(to bottom, #6DD5FA, #2980B9)",
    "linear-gradient(to bottom, #FF3CAC, #784BA0)",
  ];

  const randomColor1 = buttonColors[Math.floor(Math.random() * buttonColors.length)];
  const randomColor2 = buttonColors[Math.floor(Math.random() * buttonColors.length)];

  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.style.background = `linear-gradient(to bottom, ${randomColor1}, ${randomColor2})`;
    button.style.fontSize = '1.2rem';
  });

  const backgroundImages = [
    { src: "background.gif", loaded: false },
    { src: "background2.gif", loaded: false }
  ];

  backgroundImages.forEach((bgImage) => {
    const img = new Image();
    img.onload = function() {
      bgImage.loaded = true;
    };
    img.onerror = function() {
      console.error(`Error loading ${img.src}`);
    };
    img.src = bgImage.src;
    bgImage.img = img;
  });

  const sounds = [
    "win-sound1.mp3",
    "win-sound2.mp3",
    "win-sound3.mp3",
    "win-sound4.mp3",
  ];

  function playSound(src) {
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = src;
    audio.play();
  }

  function playWinSound() {
    let bgImage;
    do {
      bgImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    } while (!bgImage.loaded);

    const sound = sounds[Math.floor(Math.random() * sounds.length)];
    playSound(sound);

    document.body.style.backgroundImage = `url('${bgImage.src}')`;
  }

  function getResult(playerChoice) {
    const computerChoice = (function() {
      const choices = ["rock", "paper", "scissors"];
      return choices[Math.floor(Math.random() * choices.length)];
    })();
    const outcome = (() => {
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
    if (outcome === "win") {
      playWinSound();
    }
    let resultText, resultEmoji, resultColor;
    if (outcome === "tie") {
      resultText = "It's a Tie";
      resultEmoji = "😐";
      resultColor = "white";
    } else if (outcome === "win") {
      resultText = "You Won!!!";
      resultEmoji = "🥳";
      resultColor = "green";
    } else {
      resultText = "You Lost...";
      resultEmoji = "😢";
      resultColor = "red";
    }
    result.innerHTML = `${resultText} ${resultEmoji}<br>Computer chose ${computerChoice} ${computerChoice === "rock" ? "🪨" : computerChoice === "paper" ? "📄" : "✂️"}`;
    result.style.color = resultColor;
  }

  rock.addEventListener("click", function() {
    getResult("rock");
  });
  paper.addEventListener("click", function() {
    getResult("paper");
  });
  scissors.addEventListener("click", function() {
    getResult("scissors");
  });
});
