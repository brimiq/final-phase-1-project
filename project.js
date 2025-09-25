document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.container');
  const cards = Array.from(document.querySelectorAll('.card'));
  let pointsCount = document.querySelector('.pointsCnt');

  

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  // Shuffle + reset points
  shuffleCards();
  resetPoints();

  cards.forEach(card => {
    const back = card.querySelector('.card-back');
    card.dataset.value = back ? back.textContent.trim() : '';
    card.addEventListener('click', flipCard);
  });

  function shuffleCards() {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.forEach(card => board.appendChild(card));
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains('flipped')) return;

    this.classList.add('flipped');

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if (isMatch) {
      disableMatched();
      pointsCounter();
      resetSelection(); //  clear after match
    } else {
      unflipCards();
    }
  }

  function disableMatched() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetSelection();
    }, 900);
  }

  function resetSelection() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  function pointsCounter() {
    let currentPoints = parseInt(pointsCount.textContent, 10);
    currentPoints++;
    pointsCount.textContent = currentPoints;
  }

  function resetPoints() {
    pointsCount.textContent = 0;
  }
});

let playerName = ""
document.querySelector(".form").addEventListener("submit",(event)=>{event.preventDefault()
  const input = document.querySelector(".nameBox")
  playerName=input.value.trim()
  if(playerName){
    alert(`Welcome ${playerName}!`)
  }
})