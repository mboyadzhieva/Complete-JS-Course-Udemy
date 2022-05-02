"use strict";

// player info
const playerZeroElement = document.querySelector(".player--0");
const playerOneElement = document.querySelector(".player--1");

const playerZeroCurrent = document.querySelector("#current--0");
const playerOneCurrent = document.querySelector("#current--1");

const playerZeroTotal = document.querySelector("#total--0");
const playerOneTotal = document.querySelector("#total--1");

// dice image
const diceImageElement = document.querySelector(".dice");

// game buttons
const rollDiceBtn = document.querySelector(".btn--roll");
const holdScoreBtn = document.querySelector(".btn--hold");
const newGameBtn = document.querySelector(".btn--new");

// game state
let activePlayerIndex;
let currentScore;
let totalScores = [];

// setting up the game on page load
window.onload = function () {
  initializeGame();
};

// all scores are set to 0 (the state variables, as well as the UI elements)
// player0 is active
// the dice is hidden
// event listeners are attached
function initializeGame() {
  currentScore = 0;
  totalScores = [0, 0];
  activePlayerIndex = 0;

  playerZeroCurrent.textContent = 0;
  playerOneCurrent.textContent = 0;

  playerZeroTotal.textContent = 0;
  playerOneTotal.textContent = 0;

  playerZeroElement.classList.add("player--active");
  playerOneElement.classList.remove("player--active");

  diceImageElement.classList.add("hidden");

  rollDiceBtn.addEventListener("click", rollTheDice);
  holdScoreBtn.addEventListener("click", holdCurrentScore);
}

function updateCurrentScore() {
  activePlayerIndex === 0
    ? (playerZeroCurrent.textContent = currentScore)
    : (playerOneCurrent.textContent = currentScore);
}

function updateTotalScore() {
  activePlayerIndex === 0
    ? (playerZeroTotal.textContent = totalScores[0])
    : (playerOneTotal.textContent = totalScores[1]);
}

// sets the currentScore to 0 and updates the UI
// adds the active class if it's not present
// and removes it if it's present
function changeTurn() {
  currentScore = 0;
  updateCurrentScore();

  playerZeroElement.classList.toggle("player--active");
  playerOneElement.classList.toggle("player--active");

  activePlayerIndex = activePlayerIndex === 1 ? 0 : 1;
}

function rollTheDice() {
  const diceNum = Math.trunc(Math.random() * 6) + 1;
  diceImageElement.src = `dice-${diceNum}.png`;
  diceImageElement.classList.remove("hidden");

  // gets the current score of the active player and increses it with the dice number
  if (diceNum !== 1) {
    currentScore += diceNum;
    updateCurrentScore();
  } else {
    changeTurn();
  }
}

// adds the current score to the total and if the total points of the player are 100 or more they win
function holdCurrentScore() {
  totalScores[activePlayerIndex] += currentScore;
  updateTotalScore();

  if (totalScores[activePlayerIndex] >= 100) {
    document
      .querySelector(`.player--${activePlayerIndex}`)
      .classList.add("player--winner");

    diceImageElement.classList.add("hidden");

    // deactivate buttons when there's a winner
    rollDiceBtn.removeEventListener("click", rollTheDice);
    holdScoreBtn.removeEventListener("click", holdCurrentScore);
  } else {
    changeTurn();
  }
}

newGameBtn.addEventListener("click", function () {
  document
    .querySelector(`.player--${activePlayerIndex}`)
    .classList.remove("player--winner");

  initializeGame();
});
