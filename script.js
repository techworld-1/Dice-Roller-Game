'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let score0EI = document.querySelector('#score--0');
let score1EI = document.getElementById('score--1');
let score2EI = document.getElementById('score--2');
let diceEI = document.querySelector('.dice');
let playEI = document.querySelector('.btn--play');

const current0EI = document.getElementById('current--0');
const current1EI = document.getElementById('current--1');
const current2EI = document.getElementById('current--2');
const player0EI = document.querySelector('.player--0');
const player1EI = document.querySelector('.player--1');
const player2EI = document.querySelector('.player--2');

score0EI.textContent = 0;
score1EI.textContent = 0;
score2EI.textContent = 0;
diceEI.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  //create a random number roll dice
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display the dice
    diceEI.classList.remove('hidden');
    diceEI.src = `dice-${dice}.png`;

    //checking the dice is 1 or not
    if (dice !== 1) {
      //add dice i current
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch next player
      switchPlayer();
    }
  }
});

let currentScore, activePlayer, scores, playing;
//resetting function
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0, 0];
  playing = true;

  score0EI.textContent = 0;
  score1EI.textContent = 0;
  score2EI.textContent = 0;
  current0EI.textContent = 0;
  current1EI.textContent = 0;
  current2EI.textContent = 0;
  player0EI.classList.remove('player--winner');
  player1EI.classList.remove('player--winner');
  player2EI.classList.remove('player--winner');
  player0EI.classList.add('player--active');
  player1EI.classList.remove('player--active');
  player2EI.classList.remove('player--active');
  diceEI.classList.add('hidden');
};
init();
//Switch Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
    player0EI.classList.remove('player--active');
    player1EI.classList.add('player--active');
  } else if (activePlayer === 1) {
    activePlayer = 2;
    player1EI.classList.remove('player--active');
    player2EI.classList.add('player--active');
  } else {
    activePlayer = 0;
    player2EI.classList.remove('player--active');
    player0EI.classList.add('player--active');
  }
};

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if players s00
    //3. Finish game
    //4. Switch to the next player
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
