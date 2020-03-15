//TODO: Re-write using two classes one for the GAME and one for the CARDS
// class Game {
//   // left off adding cards array in.
//   constructor(totalTime, cards) {
//     this.cardArray = cards;
//     this.totalTime = totalTime;
//     this.timeRemaining = totalTime;
//     this.timer = document.getElementById('time-remaining');
//     this.ticker = document.getElementById('flips');
//   }

//   startGame() {
//     //Dynamic updates to these values
//     console.log('Game Started');
//     this.totalClicks = 0;
//     this.ticker.innerHTML = this.totalClicks;
//     this.timeRemaining = this.totalTime;
//     this.timer.innerHTML = this.timeRemaining;

//     setTimeout(() => {
//       this.countDown = this.startCountDown();
//       this.busy = false;
//     }, 500);

//     this.hasFlippedCard = false;
//     this.lockBoard = false;
//     this.firstCard = null;
//     this.secondCard = null;
//   }

//   flipCard() {
//     console.log('flipCard called', this.firstCard);
//     //Tracking Clicks
//     this.totalClicks++;
//     this.ticker.innerText = this.totalClicks;

//     if (this.lockBoard) return;
//     //if (this === this.firstCard) return;

//     if (!this.hasFlippedCard) {
//       // first click
//       this.hasFlippedCard = true;
//       this.classList.add('flip');

//       return;
//     }
//     // second click
//     this.secondCard = this;

//     this.checkForMatch();
//   }

//   checkForMatch() {
//     console.log('check for match called');
//     let isMatch = this.firstCard.dataset.framework === this.secondCard.dataset.framework;
//     isMatch ? this.matched() : this.notMatched();
//   }

//   matched() {
//     console.log('matched called!');
//     //match!
//     this.firstCard.removeEventListener('click', this.flipCard());
//     this.secondCard.removeEventListener('click', this.flipCard());

//     this.resetBoard();
//   }

//   notMatched() {
//     console.log('notMatched called!');
//     this.lockBoard = true;
//     //not a match!
//     setTimeout(() => {
//       this.firstCard.classList.remove('flip');
//       this.secondCard.classList.remove('flip');

//       resetBoard();
//     }, 1200);
//   }

//   resetBoard() {
//     console.log('resetBoard called!');
//     [this.hasFlippedCard, this.lockBoard] = [false, false];
//     [this.firstCard, this.secondCard] = [null, null];
//   }

//   startCountDown() {
//     return setInterval(() => {
//       this.timeRemaining--;
//       this.timer.innerText = this.timeRemaining;
//       if (this.timeRemaining === 0) this.gameOver();
//     }, 1000);
//   }

//   gameOver() {
//     console.log('game over');
//     clearInterval(this.countDown);
//     document.getElementById('game-over').classList.add('visible');
//   }

//   victory() {
//     console.log('victory');
//     clearInterval(this.countDown);
//     document.getElementById('victory').classList.add('visible');
//   }
// }

// function ready() {
//   console.log('ready function being called');
//   let overlays = Array.from(document.getElementsByClassName('overlay'));
//   let cards = Array.from(document.getElementsByClassName('memory-card'));
//   let game = new Game(100, cards);

//   overlays.forEach((overlay) => {
//     overlay.addEventListener('click', () => {
//       overlay.classList.remove('visible');
//       game.startGame();
//     });
//   });
//   cards.forEach((card) =>
//     card.addEventListener('click', () => {
//       game.flipCard(card);
//     })
//   );

//   (function shuffle() {
//     console.log('cards have shuffled');
//     cards.forEach((card) => {
//       let randomPostion = Math.floor(Math.random() * 12);
//       card.style.order = randomPostion;
//     });
//   })();
// }

// if (document.readyState === 'loading') {
//   console.log('loading');
//   document.addEventListener('DOMContentLoaded', ready());
// } else {
//   console.log('Everything is ready to go!');
//   ready();
// }