const deck = ["fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", 
			"fa-cube", "fa-cube", "fa-leaf", "fa-leaf", 
			"fa-bicycle", "fa-bicycle", "fa-diamond", "fa-diamond", 
			"fa-bomb", "fa-bomb", "fa-paper-plane-o", 
			"fa-paper-plane-o"]

function displayDeck(){
 	let newDeck, cardBeg, cardEnd, htmlAddDeck; 
 	newDeck = shuffle(deck);  //Shuffles deck array into a new variable
 	cardBeg = '<li class="card"><i class="fa ';
 	cardEnd = '"></i>';
 	htmlAddDeck = "";

 	openCards.length = 0;
 	moveCount = 0;
 	$('.moves').text(moveCount);
 	$('.deck').empty();
 	setStars(3);
 	$('.final-score').hide();
 	elapsed_seconds = 0;
 	totalMatched = 0;
 	
 	for (x in newDeck){ //loops through newDeck and stores with HTML to append once
 		htmlAddDeck += cardBeg + newDeck[x] + cardEnd;
 	}

 	$('.deck').append(htmlAddDeck); //adds the new deck for display
}

function setStars(numOfStars) {
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

function displayCard(){
	$(this).addClass('show open');
}

function addOpenCard(card){

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

function setMatched(){
	$('.show').addClass('match');
	totalMatched++;
}

function incMoves(){
	moveCount++;
	$('.moves').text(moveCount);
}
	
function removeCards(){

	setTimeout(function(){
		openCards.length = 0; 
		$('.deck').children().removeClass('open show wrong unclickable');
	}, 1000);
}

function gameComplete(){
	if (totalMatched === 8) {
		$('#final-time').text(get_elapsed_time_string(elapsed_seconds));
		$('.final-score').show();
	}
}

function get_elapsed_time_string(total_seconds) { //From https://stackoverflow.com/a/2605236
  function pretty_time_string(num) {
    return ( num < 10 ? "0" : "" ) + num;
  }

  var hours = Math.floor(total_seconds / 3600);
  total_seconds = total_seconds % 3600;

  var minutes = Math.floor(total_seconds / 60);
  total_seconds = total_seconds % 60;

  var seconds = Math.floor(total_seconds);

  // Pad the minutes and seconds with leading zeros, if required
  hours = pretty_time_string(hours);
  minutes = pretty_time_string(minutes);
  seconds = pretty_time_string(seconds);

  // Compose the string for display
  var currentTimeString = hours + ":" + minutes + ":" + seconds;

  return currentTimeString;
}



$('.deck').on('click', '.card', function(){
	

	$(this).addClass('unclickable'); //prevents double clicking to match
	if (openCards.length >= 2) {return;} //stops extra clicks past one pair of cards

	displayCard.call(this);
	addOpenCard($(this).children().attr('class'));

	if (moveCount === 20) {
		setStars(2);
	} else if (moveCount === 30) {
		setStars(1);
	}
});

$('.restart').click(displayDeck);


let openCards, moveCount, totalMatched, elapsed_seconds;
elapsed_seconds = 0;
openCards = [];

displayDeck();
	
setInterval(function() {
	elapsed_seconds = elapsed_seconds + 1;
	$('#timer').text(get_elapsed_time_string(elapsed_seconds));
}, 1000);