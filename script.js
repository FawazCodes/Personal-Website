document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("curiousCat").onclick = function() {
    window.location.href = "https://curiouscat.live/Idkwallah";
  };
  const rock = document.getElementById("rock");
  const paper = document.getElementById("paper");
  const scissors = document.getElementById("scissors");
  const result = document.getElementById("result");
  const background = new Image();
  background.onload = function() {
    document.body.style.backgroundImage = `url('${background.src}')`;
  };
  background.onerror = function() {
    console.error(`Error loading ${background.src}`);
  };
  background.src = "dvd.gif";
  const backgrounds = [
    { src: "background.gif", loaded: false },
    { src: "background2.gif", loaded: false }
  ];
  function preloadImage(obj) {
    const image = new Image();
    image.onload = function() {
      obj.loaded = true;
    };
    image.onerror = function() {
      console.error(`Error loading ${image.src}`);
    };
    image.src = obj.src;
    obj.img = image;
  }
  backgrounds.forEach(preloadImage);
  function playRound(playerChoice) {
    const computerChoice = (function() {
      const choices = ["rock", "paper", "scissors"];
      return choices[Math.floor(Math.random() * choices.length)];
    })();
    const outcome = (playerChoice === computerChoice) ? "tie"
                 : (playerChoice === "rock" && computerChoice === "scissors") ||
                   (playerChoice === "paper" && computerChoice === "rock") ||
                   (playerChoice === "scissors" && computerChoice === "paper")
                   ? "win" : "lose";
    if (outcome === "win") {
      let index;
      do {
        index = Math.floor(Math.random() * backgrounds.length);
      } while (!backgrounds[index].loaded);
      const background = backgrounds[index];
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = `win-sound${Math.floor(4 * Math.random()) + 1}.mp3`;
      audio.play();
      document.body.style.backgroundImage = `url('${background.src}')`;
    }
    let message, icon, color;
    if (outcome === "tie") {
      message = "It's a Tie";
      icon = "😐";
      color = "white";
    } else if (outcome === "win") {
      message = "You Won!!!";
      icon = "🥳";
      color = "green";
    } else {
      message = "You Lost...";
      icon = "😢";
      color = "red";
    }
    const computerIcon = (computerChoice === "rock") ? "🪨"
                        : (computerChoice === "paper") ? "📄"
                        : "✂️";
    result.innerHTML = `${message} ${icon}<br>Computer chose ${computerChoice} ${computerIcon}`;
    result.style.color = color;
  }
  rock.addEventListener("click", function() {
    playRound("rock");
  });
  paper.addEventListener("click", function() {
    playRound("paper");
  });
  scissors.addEventListener("click", function() {
    playRound("scissors");
  });
});
