const cards = document.querySelectorAll(".card");
const inputName = document.querySelector(".form");

inputName.addEventListener("submit", function(event){
  event.preventDefault();
});

let firstCard = null;
let secondCard = null;
let lockBoard = false; // prevent extra clicks during unflip delay

// Attach the main flip function
cards.forEach(card => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return; // prevent double-clicking the same card

  this.classList.add("flipped");

  if (firstCard === null) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;
  isMatch ? keepCards() : unflipCards();
}

function keepCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
