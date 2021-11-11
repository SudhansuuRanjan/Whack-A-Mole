const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;
var start = document.getElementById("start"); 
var tapp = document.getElementById("tapp"); 
var finalWin = document.getElementById("final-win"); 


window.onload = () => {
  start.play();
};


function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function popOut(){
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time);
}

function startGame(){
    startButton.style.display =  'none';
    countdown = timeLimit / 1000 ;
    scoreBoard.textContent = 0;
    scoreBoard.style.display =  'block';
    countdownBoard.textContent = countdown ; 
    timeUp = false ;
    score = 0;
    popOut();
    setTimeout(function(){
         timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
         countdown -= 1;
         countdownBoard.textContent = countdown;
         if( countdown < 0){
             countdown = 0;
             clearInterval(startCountdown);
             finalWin.play();
             countdownBoard.textContent = 'Times Up!    Thank You for saving our planet. This is the Way !!!'
             startButton.style.display =  'block';
             startButton.innerHTML =  'Play Again';
         }
    },1000);
}

startButton.addEventListener('click',startGame);

function whack(e){
    tapp.play();
    score++;
    this.style.backgroundImage = 'url("http://frankslaboratory.co.uk/wp-content/uploads/2020/08/yoda2.png")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("http://frankslaboratory.co.uk/wp-content/uploads/2020/08/yoda1.png")';
        this.style.pointerEvents = 'all';

    }, 800);
    scoreBoard.textContent = score;

}
moles.forEach(mole => mole.addEventListener('click', whack));

