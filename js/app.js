/*
 * Create a list that holds all of your cards
 */
const deck = ["fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", 
			"fa-cube", "fa-cube", "fa-leaf", "fa-leaf", 
			"fa-bicycle", "fa-bicycle", "fa-diamond", "fa-diamond", 
			"fa-bomb", "fa-bomb", "fa-paper-plane-o", 
			"fa-paper-plane-o"]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function displayDeck(){
 	let newDeck, cardBeg, cardEnd, htmlAddDeck; 
 	newDeck = shuffle(deck);  //Shuffles deck array into a new variable
 	cardBeg = '<li class="card"><i class="fa ';
 	cardEnd = '"></i>';
 	htmlAddDeck = "";

 	$('.deck').empty(); //empties deck to add new one

 	for (x in newDeck){ //loops through newDeck and stores with HTML to append once
 		htmlAddDeck += cardBeg + newDeck[x] + cardEnd;
 	}

 	$('.deck').append(htmlAddDeck); //adds the new deck for display
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
	//$(this).attr('id', '#open');
}

function addOpenCard(card){
	let searchCard;

	if (openCards.length === 0) {
		openCards[0] = card;
	} else if (openCards.length === 1) {
		openCards[1] = card;
		
		if (openCards[0] === openCards[1]){
			
			console.log('match found: ' + searchCard);
		} else {
			console.log("no match");
		}
		console.log("openCards: " + openCards);
		openCards = []; 
		return;
	}
}
let openCards, moveCount;
openCards = [];
moveCount = 0;

$('.deck').on('click', '.card', function(){
	displayCard.call(this);
	addOpenCard($(this).children().attr('class'));

});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

displayDeck();