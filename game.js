let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
let moves = 0;
let timeleft = 60;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  //Establishing first card
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  //Second card
  secondCard = this;

  checkForMatch();
}

function minuteTimer() {
  return setInterval(function() {
    if (timeleft >= 0) {
      document.getElementById('countdown').innerHTML = timeleft;
      timeleft -= 1;
    } else {
      gameOver();
    }
  }, 1000);
}

function checkForMatch() {
  //Adding a to the ticker, 1 move = 2 cards flipped
  moves++;
  document.getElementById('moves').innerHTML = moves;
  //Compring Cards
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? matched() : notMatched();
}

function matched() {
  //There was a match
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  //Adding matches up to a mx of 6 = victory of game
  matches++;
  if (matches === 6) {
    victory();
  }
  resetBoard();
}

function notMatched() {
  lockBoard = true;
  //not a match!
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function gameOver() {
  clearInterval(minuteTimer);
  document.getElementById('countdown').innerHTML = 'Time Expired';
  document.getElementById('game-over').classList.add('visible');
  // restartGameOver();
}

function victory() {
  clearInterval(minuteTimer);
  document.getElementById('countdown').innerHTML = 'Finished';
  document.getElementById('victory').classList.add('visible');
}

// TODO: Add in logic to restart the game based off victory or game over screen...
// function restartGameOver() {
//   let endGameOverlay = document.getElementById('game-over');

//   endGameOverlay.addEventListener(
//     'click',
//     () => {
//       endGameOverlay.classList.remove('visible');
//     },
//     ready()
//   );
// }

function ready() {
  let cards = Array.from(document.getElementsByClassName('memory-card'));
  let startOverlay = document.getElementById('start');

  startOverlay.addEventListener('click', () => {
    minuteTimer();
    startOverlay.classList.remove('visible');
  });

  console.log('Cards List: ', cards);
  cards.forEach((card) => {
    card.addEventListener('click', flipCard);
  });

  (function shuffle() {
    cards.forEach((card) => {
      let randomPostion = Math.floor(Math.random() * 12);
      card.style.order = randomPostion;
    });
  })();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready());
} else {
  ready();
}