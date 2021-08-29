'use strict';

// '.' is used for classes
// '#' is used for id's

// We can also use getElementById method for selecting id's
// getElementById method is faster than querySelector

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const diceRollEl = document.querySelector('.btn--roll');
const diceHoldEl = document.querySelector('.btn--hold');
const newGame = document.querySelector(`.btn--new`);
const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');

// Making scores array to store the final score
// playing - boolean var for handling newGame event

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

score0El.textContent = '0';
score1El.textContent = '0';
diceEl.classList.add('hidden');

diceRollEl.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');

    // Modifying images src using javascript
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // Add current score
      currentScore = currentScore + dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch to next player
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = '0';
      activePlayer = activePlayer === 0 ? 1 : 0;

      // toggle - add the class if not present
      // and remove the class if present
      // player--active contains style element in css file
      // so we only have to toggle among them

      player0El.classList.toggle(`player--active`);
      player1El.classList.toggle(`player--active`);
    }
  }
});

diceHoldEl.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    if (scores[activePlayer] >= 100) {
      playing = false;
      console.log(`Player ${activePlayer + 1} wins!!!`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      diceEl.classList.add('hidden');
      document.getElementById(`name--${activePlayer}`).textContent =
        'You won !!!';
    } else {
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle(`player--active`);
      player1El.classList.toggle(`player--active`);
    }
  }
});

newGame.addEventListener('click', function () {
  if (!playing) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
  }
  document.querySelector(`.player--0`).classList.add(`player--active`);
  document.getElementById(`name--${activePlayer}`).textContent = `PLAYER ${
    activePlayer + 1
  }`;
  score0El.textContent = '0';
  score1El.textContent = '0';
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
});
