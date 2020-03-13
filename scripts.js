const cards = document.querySelectorAll('.memory-card');

cards.forEach((card) => card.addEventListener('click', flipCard));

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		// first click
		hasFlippedCard = true;
		firstCard = this;

		return;
	}
	// second click
	secondCard = this;

	checkForMatch();
}

function checkForMatch() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	isMatch ? matched() : notMatched();
}

function matched() {
	//match!
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}

function notMatched() {
	lockBoard = true;
	//not a match!
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1200);
}

function resetBoard() {
	[ hasFlippedCard, lockBoard ] = [ false, false ];
	[ firstCard, secondCard ] = [ null, null ];
}

(function shuffle() {
	cards.forEach((card) => {
		let randomPostion = Math.floor(Math.random() * 12);
		card.style.order = randomPostion;
	});
	//putting the function into a set of () and then calling with ();
	//right after will execute the fucntion right after it is defined.
	//So, the cards will load shuffled.
})();
