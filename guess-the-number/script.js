"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;

// part of the application state
let score = 20;
let highScore = 0;

document.querySelector(".guess").value = "";
document.querySelector(".check").addEventListener("click", playGame);
document.querySelector(".again").addEventListener("click", resetGame);

function playGame() {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  if (!guess) {
    displayMsg("No number! ⛔");
  } else if (guess === secretNumber) {
    displayMsg("Congtratulations! 🎉");

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;

    if (highScore < score) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else {
    if (score > 1) {
      displayMsg(
        guess > secretNumber
          ? "The guess is too high! 📈"
          : "The guess is too low! 📉"
      );
    } else {
      displayMsg("The score is 0. You lost! 💣");
    }
    score--;
    document.querySelector(".score").textContent = score;
  }
}

function resetGame() {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  score = 20;

  displayMsg("Start guessing... ⭐");

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
}

function displayMsg(message) {
  document.querySelector(".message").textContent = message;
}
