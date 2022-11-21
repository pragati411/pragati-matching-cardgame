const cards = document.querySelectorAll('.card');
const score = document.querySelector('.score span') 

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let matchedSound;
// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {

    // Prompt Window To Ask For Name
    let yourName = prompt("Whats Your Name?");
  
    // If Name Is Empty
    if (yourName == null || yourName == "") {
  
      // Set Name To Unknown
      document.querySelector(".name span").innerHTML = 'Unknown';
  
    // Name Is Not Empty
    } else {
  
      // Set Name To Your Name
      document.querySelector(".name span").innerHTML = yourName;
  
    }
  
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
  
  }; 


const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
 
//Initial Time
let seconds = 0,
  minutes = 0;


//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};
//Start timer
interval = setInterval(timeGenerator, 1000);


function flipCard(e){ 
    let clickedCard = e.target; //getting user clicked card

    if(clickedCard !== cardOne && !disableDeck){ 
        clickedCard.classList.add('flip');

        if(!cardOne){
            return cardOne = clickedCard; //return the cardOne value to clickedCard
        }
        cardTwo = clickedCard;

        disableDeck = true;

        let cardOneImg = cardOne.querySelector('img').src, 
        cardTwoImg = cardTwo.querySelector('img').src; 
        matchCards(cardOneImg, cardTwoImg);
    }
}

    
  

function matchCards(img1, img2){ 

    if(img1 === img2){ // if two cards img matched
        matchedCard++; //increment matched value by one
        if(matchedCard == 8){ // if matched value is 8 that means user has matched all the cards

            setTimeout(() => { 
                return shuffleCard();
            }, 1200); //calling shuffleCard function after 1s
        }
        
      document.getElementById('success').play();
        score.innerHTML = parseInt(score.innerHTML) + 1
        

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        
        cardOne = cardTwo = '';//7.4
        return disableDeck = false;
        
    }
    else{
        setTimeout(() => { // if two card not matched
            cardOne.classList.add('shake');// adding shake class to both card after 400ms
            cardTwo.classList.add('shake');
        }, 400);

        setTimeout(() => { // removing both shake and flip classes from the both card after 1.2s
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = cardTwo = '';//setting both card value to blank
            document.getElementById('fail').play();

            disableDeck = false;

        }, 1200);
    }
}

function shuffleCard(){
    matchedCard = 0;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; //creating array of 16 items and each item is repeated twice
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);//sorting array item randomly



   
    cards.forEach((card, index) => { 
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);

        
        let imgTag = card.querySelector('img');
        imgTag.src = `images/img-${arr[index]}.png`;

        
    });
}
shuffleCard();

cards.forEach(card => { // adding click event to all cards
    card.addEventListener('click', flipCard); 
});