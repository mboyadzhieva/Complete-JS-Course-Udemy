"use strict";

// selecting all the elements we need to manipulate using their html classes
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");
const openModalBtns = document.querySelectorAll(".show-modal");

// opening the modal window with the three buttons
for (let i = 0; i < openModalBtns.length; i++) {
  openModalBtns[i].addEventListener("click", function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

// three ways to close the modal: the x button, clicking on the overlay and pressing escape
// not calling the function like that => closeModal(), because it will be executed right away, not waiting for the event
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
