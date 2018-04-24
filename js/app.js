const deck = ["fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", 
			"fa-cube", "fa-cube", "fa-leaf", "fa-leaf", 
			"fa-bicycle", "fa-bicycle", "fa-diamond", "fa-diamond", 
			"fa-bomb", "fa-bomb", "fa-paper-plane-o", 
			"fa-paper-plane-o"];

function displayDeck(){ //Shuffles the deck and sets up the board
 	let newDeck, cardBeg, cardEnd, htmlAddDeck; 
 	newDeck = shuffle(deck);  //Shuffles deck array into a new variable
 	cardBeg = '<li class="card"><i class="fa ';
 	cardEnd = '"></i>';
 	htmlAddDeck = "";

 	//resets the board
 	$('.final-score').hide();
 	clearInterval(gameTimer);
 	$('#timer').data({'execute':true});
 	openCards.length = 0;
 	moveCount = 0;
 	$('.moves').text(moveCount);
 	$('.deck').empty();
 	setStars(3);
 	elapsedSeconds = 0;
 	totalMatched = 0;

 	//builds the board
 	newDeck.forEach(function(item) { //loops through newDeck and stores with HTML to append once
 		htmlAddDeck += cardBeg + item + cardEnd;
 	});

 	$('.deck').append(htmlAddDeck); //adds the new deck for display
}

function setStars(numOfStars) { //controls number of stars displayed
	let addHtml = "";
 	$('.stars').empty();

 	for (i = numOfStars; i > 0; i--) {
 		addHtml += '<li><i class="fa fa-star"></i></li>';
 	}

	$('.stars').append(addHtml);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCard(){ //keeps card face up
	$(this).addClass('show open');
}

function addOpenCard(card){ //adds card to check if it is a matched pair

	if (openCards.length === 0) {
		openCards[0] = card;
	} else if (openCards.length === 1) {
		
		openCards[1] = card;
		
		if (openCards[0] === openCards[1]){
			setMatched();
		} else {
			setTimeout(function(){
				$('.show').addClass('wrong');
			}, 250);
		}
		
		incMoves();
		removeCards();
		gameComplete();
	}
}

function setMatched(){ //sets a pair of cards to match
	$('.show').addClass('match');
	totalMatched++;
}

function incMoves(){ //increments moves by 1
	moveCount++;
	$('.moves').text(moveCount);
}
	
function removeCards(){ //puts cards face down

	setTimeout(function(){
		openCards.length = 0; 
		$('.deck').children().removeClass('open show wrong unclickable');
	}, 1000);
}

function gameComplete(){ //ends game and brings up scoreboard
	if (totalMatched === 8) {
		$('#final-time').text(elapsedTime(elapsedSeconds));
		$('.final-score').show();
		clearInterval(gameTimer);
	}
}

//Time function from https://stackoverflow.com/a/2605236
function elapsedTime(totalSeconds) { 
  function prettyTime(num) {
    return ( num < 10 ? "0" : "" ) + num;
  }

  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds = totalSeconds % 3600;

  var minutes = Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;

  var seconds = Math.floor(totalSeconds);

  // Pad the minutes and seconds with leading zeros, if required
  hours = prettyTime(hours);
  minutes = prettyTime(minutes);
  seconds = prettyTime(seconds);

  // Compose the string for display
  var currentTimeString = hours + ":" + minutes + ":" + seconds;

  return currentTimeString;
}


//Monitor on click function for each card
$('.deck').on('click', '.card', function(){

	if ($('#timer').data('execute') === true) { //Timer only runs once per game

		gameTimer = setInterval(function() {
			elapsedSeconds = elapsedSeconds + 1;
			$('#timer').text(elapsedTime(elapsedSeconds));
		}, 1000);

		$('#timer').data({'execute':false});
	}

	$(this).addClass('unclickable'); //prevents double clicking to match
	if (openCards.length >= 2) {return;} //stops extra clicks past one pair of cards

	displayCard.call(this);
	addOpenCard($(this).children().attr('class'));

	if (moveCount === 10) {
		setStars(2);
	} else if (moveCount === 20) {
		setStars(1);
	}
});

$('.restart').click(displayDeck);


let openCards, moveCount, totalMatched, elapsedSeconds, gameTimer;
elapsedSeconds = 0;
openCards = [];

displayDeck();
	
