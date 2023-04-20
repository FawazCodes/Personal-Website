// Define all of the buttons
const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const curiouscat = document.querySelector('.curiouscat');

// Define the audio files
const winSounds = ['win-sound.mp3', 'win-sound2.mp3', 'win-sound3.mp3', 'win-sound4.mp3'];
const loseSound = new Audio('lose-sound.mp3');
const tieSound = new Audio('tie-sound.mp3');
let winSound;

// Define the message text and elements
const messageText = document.querySelector('.message-text');
const messageContainer = document.querySelector('.message-container');

// Define the container element
const container = document.querySelector('.container');

// Define the function to generate the computer's choice
function computerPlay() {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  return computerChoice;
}

// Define the function to play the win sound
function playWinSound() {
  winSound = new Audio(winSounds[Math.floor(Math.random() * winSounds.length)]);
  winSound.loop = true;
  winSound.play();
}

// Define the function to stop the win sound
function stopWinSound() {
  winSound.pause();
  winSound.currentTime = 0;
}

// Define the function to show the win message
function showWinMessage(playerSelection, computerSelection) {
  messageText.innerHTML = `🎉 You won! ${playerSelection} beats ${computerSelection}! 🎉`;
  messageContainer.classList.add('win-message');
  container.classList.add('win-background');
}

// Define the function to show the lose message
function showLoseMessage(playerSelection, computerSelection) {
  messageText.textContent = `😞 You lost! ${computerSelection} beats ${playerSelection}. 😞`;
  messageContainer.classList.add('lose-message');
}

// Define the function to show the tie message
function showTieMessage(playerSelection) {
  messageText.textContent = `🤝 It's a tie! You both chose ${playerSelection}. 🤝`;
  messageContainer.classList.add('tie-message');
}

// Define the function to reset the game
function resetGame() {
  messageText.textContent = 'Choose your weapon!';
  messageContainer.classList.remove('win-message', 'lose-message', 'tie-message');
  container.classList.remove('win-background');
  stopWinSound();
}

// Define the function to play a round of rock-paper-scissors
function playRound(playerSelection) {
  const computerSelection = computerPlay();
  if (playerSelection === 'rock' && computerSelection === 'scissors' ||
      playerSelection === 'paper' && computerSelection === 'rock' ||
      playerSelection === 'scissors' && computerSelection === 'paper') {
    playWinSound();
    showWinMessage(playerSelection, computerSelection);
  } else if (playerSelection === computerSelection) {
    tieSound.play();
    showTieMessage(playerSelection);
  } else {
    loseSound.play();
    showLoseMessage(playerSelection, computerSelection);
  }
}

// Add event listeners to all of the buttons
rock.addEventListener('click', () => playRound('rock'));
paper.addEventListener('click', () => playRound('paper'));
scissors.addEventListener('click', () => playRound('scissors'));

// Add event listener to the curiouscat button
curiouscat.addEventListener('click', () => window.open('https://curiouscat.live/Idkwallah'));

// Function to play a random win sound
function playWinSound() {
  var sounds = ["win-sound.mp3", "win-sound2.mp3", "win-sound3.mp3", "win-sound4.mp3"];
  var randSound = sounds[Math.floor(Math.random() * sounds.length)];
  var audio = new Audio(randSound);
  audio.loop = true;
  audio.play();
}

// Function to stop playing the win sound
function stopWinSound() {
  var audio = document.querySelector("audio");
  audio.pause();
}

// Function to switch the background when player wins
function changeBackground() {
  var backgrounds = ["background.gif", "background2.gif"];
  var randBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  document.body.style.backgroundImage = "url(" + randBg + ")";
}

// Add event listener to the play button
document.getElementById("play").addEventListener("click", function() {
  // Get the user's choice
  var userChoice = document.querySelector("input[name='choice']:checked").value;
  // Get the computer's choice
  var computerChoice = Math.random();
  if (computerChoice < 0.34) {
    computerChoice = "rock";
  } else if (computerChoice <= 0.67) {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }

  // Determine the winner
  var result = "";
  if (userChoice === computerChoice) {
    result = "It's a tie!";
  } else if (userChoice === "rock") {
    if (computerChoice === "paper") {
      result = "You lose! 😔";
    } else {
      result = "You win! 🎉";
      changeBackground();
      playWinSound();
    }
  } else if (userChoice === "paper") {
    if (computerChoice === "scissors") {
      result = "You lose! 😔";
    } else {
      result = "You win! 🎉";
      changeBackground();
      playWinSound();
    }
  } else if (userChoice === "scissors") {
    if (computerChoice === "rock") {
      result = "You lose! 😔";
    } else {
      result = "You win! 🎉";
      changeBackground();
      playWinSound();
    }
  }

  // Update the result text
  document.getElementById("result").innerHTML = result;
});

// Add event listener to the stop button
document.getElementById("stop").addEventListener("click", function() {
  stopWinSound();
});

// Add event listener to the reset button
document.getElementById("reset").addEventListener("click", function() {
  document.getElementById("result").innerHTML = "";
  stopWinSound();
  document.body.style.backgroundImage = "url(dvd.gif)";
});
