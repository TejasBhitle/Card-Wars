var suits = ["spades","hearts","clubs","diams"];
var cardFace = ["2","3","4","5","6","7","8","9","10","J","Q","K","A",];
var cards = [];
var players = [[],[]];
var firstRun = true;
var gameover = false;
var timer;
var r=0;

var fightButton = document.querySelector("#btnBattle");
var fightButton10 = document.querySelector("#btnBattle10");

var p1 = document.querySelector("#player1 .hand");
var p2 = document.querySelector("#player2 .hand");

var score1 = document.querySelector("#player1 .score");
var score2 = document.querySelector("#player2 .score");

//init
score1.innerHTML = "0";
score2.innerHTML = "0";

//event listeners
fightButton.addEventListener('click',battle);
fightButton10.addEventListener('click',function(){
	rounds(10);
});

function rounds(num){
	r= num;
	timer = setInterval(function(){
		battle()
	},100);
}

//functions
function battle(){
	if(timer){
		r--;
		show("Rounds left "+r);
		if(r<1){
			window.clearInterval(timer);
		}
	}
	if(firstRun){
		firstRun = false;
		buildCards();
		shuffleArray(cards);
		dealCards(cards);
		//console.log(cards);
	}
	attack();
}

function attack(){
	if(!gameover){
		//poping the first card
		var card1 = players[0].shift();
		var card2 = players[1].shift();
		var pot = [card1,card2];

		p1.innerHTML = showCard(card1,0);
		p2.innerHTML = showCard(card2,0);

		checkWinner(card1,card2,pot);

		score1.innerHTML = players[0].length;
		score2.innerHTML = players[1].length;;
	}
	else{
		show("Game Over");
	}

}

function checkWinner(card1,card2,pot){
	if((players[0].length < 4) || (players[1].length < 4) ){
		console.log("Game Over");
		gameover = true;
		return ;
	}
	if(card1.cardvalue > card2.cardvalue){
		show("Player 1 wins");
		players[0] = players[0].concat(pot);
	}
	else if(card1.cardvalue < card2.cardvalue){
		show("Player 2 wins");
		players[1] = players[1].concat(pot);	
	}
	else{
		//tie
		show("Tie");
		tie_mode(pot);
		
	}
}

function tie_mode(pot){
	var car1,card2;
	var position = (pot.length/2);
	if((players[0].length < 4) || (players[1].length < 4) ){
		return;
	}
	else{
		for(var i=0;i<4;i++){
			card1 = players[0].shift();
			pot = pot.concat(card1);

			p1.innerHTML += showCard(card1,(position +i));

		}
		for(var i=0;i<4;i++){
			card2 = players[1].shift();
			pot = pot.concat(card2);

			p2.innerHTML += showCard(card2,(position +i));

		}
		checkWinner(card1,card2,pot);
	}
}

function showCard(card,position){
	var move = position * 40;
	//var bgColor = (card.icon == "H" || card.icon == "D") ? "red":"black";
	var bCard = '<div class="icard '+card.suit+'" style="left:'+move+'px">';
	bCard += ' <div class="cardtop suit"> '+card.num+' <br></div>';
	bCard += ' <div class="cardmid suit"></div>'
	bCard += ' <div class="cardbottom suit">'+card.num+'<br></div>' 
	bCard += '</div>' ;
	console.log(card,move);
	return bCard;
}

function buildCards(){
	cards = [];
	for(i in suits){
		var suitNew = suits[i][0].toUpperCase();
		for(j in cardFace){
			
			var card = { 
				suit: suits[i],
				num: cardFace[j],
				cardvalue:parseInt(j) + 2,
				icon:suitNew
			}

			cards.push(card);
		}
	}
}

function shuffleArray(array){
	for(var x = array.length - 1;x>0;x--){
		var random = Math.floor(Math.random() * (x+1));
		var temp = array[x];
		array[x] = array[random];
		array[random] = temp;
	}
	return array;
}

function dealCards(array){
	for(var i=0;i<array.length-1;i++){
		players[i%2].push(array[i]);
	}
	return array;
}

function show(msg){
	document.getElementById("message").innerHTML = msg;
}