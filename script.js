document.addEventListener("DOMContentLoaded", function () {
  const rockButton = document.getElementById("rock");
  const paperButton = document.getElementById("paper");
  const scissorsButton = document.getElementById("scissors");
  const resultText = document.getElementById("result");
  const curiousCatButton = document.getElementById("curiousCat");
  const winEffects = ["stretch", "dance", "sling", "rotate", "bounce", "flip"];

  const images = [
    { src: "background.gif", loaded: false },
    { src: "background2.gif", loaded: false },
  ];

  images.forEach((image) => {
    const img = new Image();
    img.onload = () => (image.loaded = true);
    img.onerror = () => console.error(`Error loading ${img.src}`);
    img.src = image.src;
    image.img = img;
  });

  curiousCatButton.onclick = () => {
    window.location.href = "https://curiouscat.live/Idkwallah";
  };

  rockButton.addEventListener("click", () => playRound("rock"));
  paperButton.addEventListener("click", () => playRound("paper"));
  scissorsButton.addEventListener("click", () => playRound("scissors"));

  let consecutiveTieOrLossCount = 0;

  function playRound(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(playerChoice, computerChoice);

    if (result === "win") {
      handleWin();
    } else {
      handleShake();
    }

    updateResultText(result, playerChoice, computerChoice);
    consecutiveTieOrLossCount = updateTieOrLossCount(result);
  }

  function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return "tie";
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) return "win";
    return "lose";
  }

  function handleWin() {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    const randomEffectIndex = Math.floor(Math.random() * winEffects.length);
    const randomAudioIndex = Math.floor(Math.random() * 4) + 1;

    document.body.style.backgroundImage = `url('${images[randomImageIndex].src}')`;
    resultText.classList.add(winEffects[randomEffectIndex]);
    new Audio(`win-sound${randomAudioIndex}.mp3`).play();

    setTimeout(() => {
      resultText.classList.remove(winEffects[randomEffectIndex]);
    }, 3000);
  }

  function handleShake() {
    if (consecutiveTieOrLossCount >= 1) {
      resultText.classList.add("shake");

      setTimeout(() => {
        resultText.classList.remove("shake");
      }, 820);
    }
  }

  function updateResultText(result, playerChoice, computerChoice) {
    const emojiMap = {
      tie: "😐",
      win: "🥳",
      lose: "😢",
    };
    const choiceEmojiMap = {
      rock: "🪨",
      paper: "📄",
      scissors: "✂️",
    };

    const resultTextMap = {
      tie: "It's a Tie",
      win: "You Won!!!",
      lose: "You Lost...",
    };

       const resultTextColorMap = {
      tie: "white",
      win: "green",
      lose: "red",
    };

    resultText.innerHTML = `${resultTextMap[result]} ${emojiMap[result]}<br>Computer chose ${computerChoice} ${choiceEmojiMap[computerChoice]}`;
    resultText.style.color = resultTextColorMap[result];
  }

  function updateTieOrLossCount(result) {
    if (result === "tie" || result === "lose") {
      return consecutiveTieOrLossCount + 1;
    }
    return 0;
  }
});
