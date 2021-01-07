const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


   function flipCard() {

      if (lockBoard) return; // return from the function if lock board is true so the rest wonn't executed.
      if (this === firstCard) return; // when you click twice on the same card it will return the function.

       this.classList.add('flip');
      if (!hasFlippedCard) {  //the played clicked first card
      hasFlippedCard = true;
      firstCard = this;

      return;
      } 
     //second click
   
     secondCard = this;  

      checkForMatch();
   }  


function checkForMatch() {
    let isMatch = firstCard.dataset.img === secondCard.dataset.img;
        
    isMatch ? disableCards() : unflipCards();
      
}
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard()
}

function unflipCards() {
    lockBoard = true; // unlocked when the cards finish on flipping

    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');  
       
    resetBoard();
  }, 1000)
}


function resetBoard() {  // to let our condition to work after each round.
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() { // when you refresh the site or enter the level agin it will shuffle the cards
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 36);
        card.style.order = randomPos;
    });
})(); //warp it inside a parenthesis and net next repair parenthesis to end of it that makes the function it will executed right after the player get in the or refresh it



cards.forEach(card => card.addEventListener('click', flipCard));

let overlays = Array.from(document.getElementsByClassName('overlay-text'));

overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        overlay.classList.remove('visible');
        var myAudio = document.createElement("audio");
        myAudio.src = "sounds/StartGame.mp3";
        myAudio.play();

    });
});
