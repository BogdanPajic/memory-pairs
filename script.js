var cardsBack = document.getElementsByClassName('card-back');
var cards = document.getElementsByClassName('card');
var cardsInner = document.getElementsByClassName('card-inner');
var player_1_score = document.getElementById('player-1-score');
var player_2_score = document.getElementById('player-2-score');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var color1, color2, nuber1, number2;
var score1 = 0;
var score2 = 0;
var counter = 0;
var counterPairs = 0;
var colors = ['apple', 'apple', 'cherry', 'cherry', 'banana', 'banana', 'grapes', 'grapes', 'pear', 'pear', 'watermelon', 'watermelon', 'peach', 'peach', 'lemon', 'lemon', 'plum', 'plum'];
var open = 0;
var activePlayer = 1;
var giphyEmbed = document.getElementById('giphy');

shuffleArray(colors);

for (i = 0; i<cards.length; i++) {
	cards[i].style.visibility = 'visible';
	cardsBack[i].id = (colors[i]);
	console.log(cardsBack[i].id);
}

function revealCard(number) {

	if (counter == 0) {
		cardSound.play();
		counter++;
		cardsInner[number].classList.add('rotated');
		id1 = cardsBack[number].id;
		number1 = number;
		
	} else if (counter == 1 && number != number1) {
		cardSound.play();
		counter++;
		cardsInner[number].classList.add('rotated');
		id2 = cardsBack[number].id;
		number2 = number;

		if (id1 !== id2) {
			setTimeout(function() {
				cardsInner[number1].classList.remove('rotated');
				cardSound.play();
				cardsInner[number2].classList.remove('rotated');
				cardSound.play();
				counter = 0;
				if (activePlayer == 1) {
					player2.classList.add('activePlayer');
					player1.classList.remove('activePlayer');
					activePlayer = 2;
				} else {
					activePlayer = 1;
					player1.classList.add('activePlayer');
					player2.classList.remove('activePlayer');
					activePlayer = 1;
				}
			}, 1000);
		} else if (id1 == id2) {
			setTimeout(function() {
				if (score1 < 5 && score2 < 5){
					success.play();
				}
				cards[number1].style.visibility = 'hidden';
				cards[number2].style.visibility = 'hidden';
				counter = 0;
				counterPairs++;
			}, 1000);

			if (activePlayer == 1) {
				score1++;
				player_1_score.innerHTML = score1;
				winner();
			} else if (activePlayer == 2) {
				score2++;
				player_2_score.innerHTML = score2;
				winner();
			}
		}
	}
}

function resetCards() {
	shuffleArray(colors);
	for (i = 0; i < cards.length; i++) {
		cardsInner[i].classList.remove('rotated');
	}
	setTimeout(function() {
		for (i = 0; i<cards.length; i++) {
			cardsBack[i].style.backgroundColor = colors[i];
			cards[i].style.visibility = 'visible';
		}
	}, 500);

	if (activePlayer == 2) {
		player1.classList.add('activePlayer');
		player2.classList.remove('activePlayer');
	}

	resetScore();
}

 function resetScore() {
 	score1 = 0;
 	player_1_score.innerHTML = score1;
	score2 = 0;
	player_2_score.innerHTML = score2;
}

function winner() {
	if (score1 > 4) {
		winnerSound.play();
		player_1_score.innerHTML = 'WINNER!';
		for (var i = 0; i < cards.length; i++) {
			cards[i].style.visibility = 'hidden';
		}
		giphyEmbed.classList.remove('hidden');
		giphyEmbed.classList.add('show');
	} else if (score2 > 4) {
		winnerSound.play();
		player_2_score.innerHTML = 'WINNER!';
		for (var i = 0; i < cards.length; i++) {
			cards[i].style.visibility = 'hidden';
		}
		giphyEmbed.classList.remove('hidden');
		giphyEmbed.classList.add('show');
	}
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


var cardSound = new Audio("sounds/cardFlip.wav");
var success = new Audio("sounds/success.wav");
var winnerSound = new Audio("sounds/win.wav");
