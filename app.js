const cards = document.querySelectorAll('.memoryCard');

cards.forEach(card => card.addEventListener('click', flipCard));

let hasFlippedCard = false;
let firstCard, secondCard;
let lock = false;
let count = 0;
let cardsFlipped = 0;

newScore = document.querySelector(".bestScore");
newScore.innerText = `Best score: ${localStorage.getItem("best-score")}`;
if (localStorage.getItem("best-score") === null) {
    newScore.innerText = `Best score: 0`;
}
score = document.querySelector(".score");
score.innerText = `Current score: ${count}`;

function flipCard () {
    if (lock) return;
    if (this === firstCard) return;
   
    this.classList.add('flip');
   
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        setScore();
        return;
    }
        hasFlippedCard = false;
        secondCard = this;  
        setScore();
        checkForMatch();

}

function checkForMatch () {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflip();
    //if (firstCard.dataset.name === secondCard.dataset.name) {
    //    disableCards();
    //}
    //else {
    //    unflip();
    //}
}

function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardsFlipped += 2;
    if (cardsFlipped === 16) {finished();}
}

function unflip () {
    lock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        reset();
        }, 1500);
}

function reset () {
    hasFlippedCard = false;
    lock = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle () {
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 12);
        card.style.order = randomNum;
    })
})()

function shuffle () {
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 12);
        card.style.order = randomNum;
    })
}

function setScore() {
    score = document.querySelector(".score");
    count++;
    score.innerText = `Current score: ${count}`;
}

//function bestScore() {
//    bestScore = document.querySelector(".bestScore");
//    bestScore.innerText = `Best score: ${lowScore}`;
//}
function finished() {
    let bestScore =+ localStorage.getItem("best-score") || Infinity;
    if (count < bestScore) {
        localStorage.setItem("best-score", count);
    }
    newScore = document.querySelector(".bestScore");
    newScore.innerText = `Best score: ${count}`;
    cardsFlipped = 0;
}
const resetButton = document.querySelector('.btn');
resetButton.addEventListener('click', function(){
    cards.forEach(card => {
        card.classList.remove('flip');
    })
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();

    score = document.querySelector(".score");
    count = 0;
    score.innerText = `Current score: ${count}`;

    return;
})