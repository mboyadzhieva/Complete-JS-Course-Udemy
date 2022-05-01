"use strict";

// dice image
const diceImageElement = document.querySelector(".dice");

// game buttons
const rollDiceBtn = document.querySelector(".btn--roll");
const holdScoreBtn = document.querySelector(".btn--hold");
const newGameBtn = document.querySelector(".btn--new");

let activePlayerIndex = 0;
let currentScore = 0;
let totalScores = [0, 0];

// setting up the game on page load
window.onload = function () {
  initializeGame();
};

// game initialization, all scores are set to 0, the dice is hidden
function initializeGame() {
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;

  document.querySelector("#total--0").textContent = 0;
  document.querySelector("#total--1").textContent = 0;

  diceImageElement.classList.add("hidden");

  rollDiceBtn.addEventListener("click", rollTheDice);
  holdScoreBtn.addEventListener("click", holdCurrentScore);
}

// sets the current player as inactive in favor of the other
function changeTurn() {
  const nextPlayerIndex = activePlayerIndex == 1 ? 0 : 1;

  document
    .querySelector(`.player--${activePlayerIndex}`)
    .classList.remove("player--active");
  document
    .querySelector(`.player--${nextPlayerIndex}`)
    .classList.add("player--active");

  activePlayerIndex = nextPlayerIndex;
}

function rollTheDice() {
  const diceNum = Math.trunc(Math.random() * 6) + 1;
  diceImageElement.src = `dice-${diceNum}.png`;
  diceImageElement.classList.remove("hidden");

  // gets the current score of the active player and increses it with the dice number
  if (diceNum !== 1) {
    currentScore += diceNum;
    updateGame();
  } else {
    currentScore = 0;
    updateGame();
    changeTurn();
  }
}

// adds the current score to the total and checks if the player has won
function holdCurrentScore() {
  totalScores[activePlayerIndex] += currentScore;
  currentScore = 0;
  updateGame();

  if (hasWon()) {
    diceImageElement.classList.add("hidden");
    rollDiceBtn.removeEventListener("click", rollTheDice);
    holdScoreBtn.removeEventListener("click", holdCurrentScore);
  } else {
    changeTurn();
  }
}

function updateGame() {
  document.querySelector(`#current--${activePlayerIndex}`).textContent =
    currentScore;
  document.querySelector(`#total--${activePlayerIndex}`).textContent =
    totalScores[activePlayerIndex];
}

// checks weather the current player has reached 100 points that are needed to win
function hasWon() {
  if (totalScores[activePlayerIndex] >= 100) {
    document
      .querySelector(`.player--${activePlayerIndex}`)
      .classList.add("player--winner");
    return true;
  } else {
    return false;
  }
}

newGameBtn.addEventListener("click", function () {
  document
    .querySelector(`.player--${activePlayerIndex}`)
    .classList.remove("player--winner");

  currentScore = 0;
  totalScores = [0, 0];
  activePlayerIndex = 0;

  initializeGame();
});
