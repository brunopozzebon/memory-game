//If have a card turned, this variable will be the index of the card in list, otherwise will be -1
let firstOverturned;
//How many cards are already correct;
let pars=0;
let group = $('li[class=card]');
let moves = document.getElementsByClassName("moves")[0];
let movesInNumber = parseInt(moves.textContent);
let body = document.getElementsByTagName("body")[0];
let numOfStars = 3;

//Function to button of restart game
let restart = $(".restart").click(function(){
	location.reload();
});

let repeat =true;
group.click(function(evt){
	let card = $(evt.target);
	//If the card is already open or correct, nothing happens;
	if(repeat&&card.is('li')&&!(card.attr('class').split(' ')[1]==="correct")&&!(card.attr('class').split(' ')[1]==="open")&&!(card.attr('class').split(' ')[1]==="wrong")){
		/*
		Verify if have another card already turn, if yes, 
		verify if the combination of cards is correct,
		otherwise, set the class open in this card and set your index in let firstOverturned
		*/
		if(firstOverturned>=0){
			//Add moves and verify the stars
			repeat = false;
			verifyStatus();
			if(verify(card)){
				correctAnimation(card);
				//Reset firstOverturned, because the cards matched
				firstOverturned=-1;
				pars++;
				if(pars>=8){
					//Set the new view
					body.innerHTML = '<div class="container"><div><i class="fa fa-check" ></i></div><h2>Congratulations You Won!</h2><h3>Data</h3><button><a href="index.html">Play Again!</a></button></div>';
					let data = $('h3')[0];
					data.textContent = "Win with "+movesInNumber+" moves and "+numOfStars+" stars.\r\nWooooooo!";
				}
			}else{
				//Reset firstOverturned, because the cards are differents
				wrongAnimation(card);
				firstOverturned=-1;
			}
			setTimeout(function(){
				repeat=true;
			},500);
		}else{
			card.addClass('open');
			firstOverturned = $( ".deck li" ).index(card);	
		}
	}
});

function verify(card){
	let first = ($(".deck").find('i:eq('+firstOverturned+')').attr('class').split(' ')[1]);
	let second = (card.find('i').attr('class').split(' ')[1]);
	return (first===second)?true:false;
}

function wrongAnimation(card){
	card.addClass('wrong');
	$('.deck .card.open').addClass('wrong').removeClass('open');
	setTimeout(function(){
		$(".wrong").removeClass('wrong');
	},1000);
}

function correctAnimation(card){
	card.addClass('correct');
	$('.deck .card.open').addClass('correct').removeClass('open');
}

function verifyStatus(){
	moves.textContent = ++movesInNumber;
	switch(movesInNumber){
		case 14:
		numOfStars--;
		$(".stars i:eq(1)").addClass("fa-star-o").removeClass("fa-star");
		return;
		case 11:
		numOfStars--;
		$(".stars i:eq(2)").addClass("fa-star-o").removeClass("fa-star");
		return;
	
	}
}



 