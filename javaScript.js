
const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer = document.getElementById('time-remain');
let ticker = document.getElementById('flips');

startGameS = document.createElement("audio");
startGameS.src = "sounds/StartGame.mp3";
flipSound = document.createElement("audio");
flipSound.src = "sounds/filpCard.wav";
gameOver = document.createElement("audio");
gameOver.src = "sounds/GameEnd.mp3";
victoryS = document.createElement("audio");
victoryS.src = "sounds/victory.mp3";
wrongAs = document.createElement("audio");
wrongAs.src = "sounds/WrongAnswerSound.wav";
matchSound = document.createElement("audio");
matchSound.src = "sounds/match.wav";


let overlays = Array.from(document.getElementsByClassName('overlay-text')); // make array from class name overlay-text witch have visible word that we will be change it

overlays.forEach(overlay => {   // make click event to remove visisble word to disapper and start game and add audio when we start the game
    overlay.addEventListener('click', () => {
        overlay.classList.remove('visible');
        //startSound.play(); 
        startGameS.play();
    });  

});




cards.forEach(card => card.addEventListener('click', flipCard));



   function flipCard() {
      

      if (lockBoard) return; // return from the function if lock board is true so the rest wonn't executed.
      if (this === firstCard) return; // when you click twice on the same card it will return the function.

       this.classList.add('flip');
      if (!hasFlippedCard) { //the played clicked first card
        
      hasFlippedCard = true;
      firstCard = this;
      flipSound.play();

      return;
      } 
     //second click
   
     secondCard = this 
    

      checkForMatch();
   }  


function checkForMatch() {
    let isMatch = firstCard.dataset.img === secondCard.dataset.img;
        
    isMatch ? disableCards() : unflipCards();
      
}
function disableCards() {

    flipSound.play();
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchSound.play();
    
    
    resetBoard();
}

function unflipCards() {
    flipSound.play();
    lockBoard = true;
    wrongAs.play();  // unlocked when the cards finish on flipping    
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip'); 
    
    resetBoard();

  }, 800)
}


function resetBoard() {  // to let our condition to work after each round. (make you choose the same first card after you choose second one )
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

