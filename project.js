const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});
const inputName = document.querySelector(".form")

inputName.addEventListener("submit", function(event){
    event.preventDefault
})

let firstCard = null
let secondCard = null
let lockBoard = false //when this is true the cards will be locked in place

function flipCard(){
    if(lockBoard) 
        return;//stops the function if two cards dont match preventing the player from flipping more cards during the delay(1 second)
    if(this===firstCard) //if the card is the same (this referring to the card clicked) end the function
        return
    this.classList.add("flipped")   
    if (firstCard === null) { //storing first card for comparison
  firstCard = this;
  return;
}

    secondCard = this //storing the second card
    checkForMatch()
}

function checkForMatch(){
    const isMatch = firstCard.dataset.value === secondCard.dataset.value
    if(isMatch){
        keepCards()
    }else{
        unflipCard()
    }

}
function keepCards(){
    firstCard.removeEventListener("clicl", flipCard())
    secondCard.removeEventListener("click", flipCard())
    resetBoard()
}
function unflipCard(){
       function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
  }, 1000); // 1 second delay
}
 function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

}
//Will re-arrange function so they are declared at the right points


