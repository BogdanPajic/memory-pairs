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
var colors = ['apple', 'apple', 'cherry', 'cherry', 'banana', 'banana', 'grapes', 'grapes', 'pear', 'pear', 'watermelon', 'watermelon', 'peach', 'peach', 'lemon', 'lemon', 'plum', 'plum'];
var open = 0;
var activePlayer = 1;
var announcement = document.getElementById('announcement');
var announcementText = document.getElementById('announcement-text');
var playButton = document.getElementById('play-again-btn');
var container = document.getElementById('container-cards');

shuffleArray(colors);
player2.classList.add('inactivePlayer');
announcement.classList.add('hidden');

for (i = 0; i<cards.length; i++) {
	cardsBack[i].style.backgroundImage = 'url(images/backgrounds/' + colors[i] + '.jpg)';
}

for (i = 0; i<cards.length; i++) {
	cards[i].style.visibility = 'visible';
	cardsBack[i].id = (colors[i]);
}

function revealCard(number) {

	if (counter == 0) {
		cardSound.play();
		counter++;
		cardsInner[number].classList.add('rotated');
		string = cardsBack[number].style.backgroundImage;
		img1 = string.substring(24, string.length - 6);
		number1 = number;
		
	} else if (counter == 1 && number != number1) {
		cardSound.play();
		counter++;
		cardsInner[number].classList.add('rotated');
		string = cardsBack[number].style.backgroundImage;
		img2 = string.substring(24, string.length - 6);
		number2 = number;

		if (img1 !== img2) {
			setTimeout(function() {
				cardsInner[number1].classList.remove('rotated');
				cardSound.play();
				cardsInner[number2].classList.remove('rotated');
				cardSound.play();
				counter = 0;
				if (activePlayer == 1) {
					player1.classList.add('inactivePlayer');
					player2.classList.remove('inactivePlayer');
					activePlayer = 2;
				} else {
					activePlayer = 1;
					player1.classList.remove('inactivePlayer');
					player2.classList.add('inactivePlayer');
					activePlayer = 1;
				}
			}, 1000);
		} else if (img1 == img2) {
			setTimeout(function() {
				if (score1 + score2 < 9){
					success.play();
				}
				cards[number1].style.visibility = 'hidden';
				cards[number2].style.visibility = 'hidden';
				counter = 0;
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
	announcement.classList.add('hidden');
	shuffleArray(colors);
	for (i = 0; i < cards.length; i++) {
		cardsInner[i].classList.remove('rotated');
	}
	setTimeout(function() {
		for (i = 0; i<cards.length; i++) {
			cardsBack[i].style.backgroundImage = 'url(images/backgrounds/' + colors[i] + '.jpg)';
		}
		for (var i = 0; i < cards.length; i++) {
			container.style.display = 'grid';
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
	if (score1 > 4 && score1 + score2 == 9) {
		announcement.style.backgroundImage = "url('images/celebration.gif')";
		winnerSound.play();
		announcementText.innerHTML = 'The winner is number 1';    // jedna funkcija koja rradi isto ovo samo je parametar 1 ili 2
		announcement.classList.remove('hidden');
		container.style.display = 'none';
		
	} else if (score2 > 4 && score1 + score2 == 9) {
		announcement.style.backgroundImage = "url('images/celebration.gif')";
		winnerSound.play();
		announcementText.innerHTML = 'The winner is number 2';
		announcement.classList.remove('hidden');
		container.style.display = 'none';
		
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
