document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.container');
  const cards = Array.from(document.querySelectorAll('.card'));
  let pointsCount = document.querySelector('.pointsCnt');

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;
  const totalPairs = cards.length / 2;

  // player name
  let playerName = "";

  // Handle form submit to capture player name
  const form = document.querySelector('.form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('.nameBox');
    playerName = input.value.trim();
    if (!playerName) {
      alert("Please enter your name before starting!");
      return;
    }
    form.style.display = "none"; // hide form after entering name
  });

  // shuffle + reset points at start
  shuffleCards();
  resetPoints();

  // assign dataset values for matching
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
      matchedPairs++;
      if (matchedPairs === totalPairs) {
        endGame();
      }
    } else {
      unflipCards();
      pointDeducter()
    }
  }

  function disableMatched() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetSelection();
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
  function pointDeducter(){
    let currentPoints = parseInt(pointsCount.textContent, 10)
    currentPoints--;
    pointsCount.textContent = currentPoints
  }

  function resetPoints() {
    pointsCount.textContent = 0;
    matchedPairs = 0;
  }

  function endGame() {
    const points = parseInt(pointsCount.textContent, 10);
    if (!playerName) {
      alert(`Game Over! Your score: ${points}`);
      return;
    }

    // Save to db.json
    fetch("http://localhost:3000/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: playerName,
        points: points
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(" Score saved:", data);
        alert(`Game Over, ${playerName}! Your score of ${points} has been saved.`);
      })
      .catch(err => {
        console.error(" Error saving score:", err);
        alert("Game Over, but score could not be saved.");
      });
  }
});
