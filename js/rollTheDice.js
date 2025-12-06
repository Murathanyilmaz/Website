'use strict';
let currentEl;
const diceEl = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const holdDice = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");
let turn = 0, current;
let currentScore = 0;
let scoreZero = 0;
let scoreOne = 0;
let diceResult;
document.getElementById("score--0").textContent = scoreZero;
document.getElementById("score--1").textContent = scoreOne;
diceEl.classList.add("hidden");

rollDice.addEventListener("click", () => {
    if (scoreZero < 100 && scoreOne < 100) {
        current = turn % 2 == 0 ? 0 : 1;
        currentEl = document.getElementById(`current--${current}`);
        diceResult = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `../img/dice/dice-${diceResult}.png`;
        diceEl.classList.remove("hidden");
        if (diceResult != 1) {
            currentScore += diceResult;
            currentEl.textContent = currentScore;
        }
        else {
            document.querySelector(".player--0").classList.toggle("player--active");
            document.querySelector(".player--1").classList.toggle("player--active");
            turn++;
            currentScore = 0;
            currentEl.textContent = currentScore;
        }
    }

})
holdDice.addEventListener("click", () => {
    if (scoreZero < 100 && scoreOne < 100) {
        current = turn % 2 == 0 ? 0 : 1;
        turn++;
        current === 0 ? scoreZero += currentScore : scoreOne += currentScore;
        document.getElementById("score--0").textContent = scoreZero;
        document.getElementById("score--1").textContent = scoreOne;
        currentScore = 0;
        currentEl.textContent = currentScore;
        if (scoreZero >= 100 || scoreOne >= 100) {
            document.querySelector(".player--active").classList.add("player--winner");
            document.querySelector(".player--active").classList.toggle("player--active");
            diceEl.classList.add("hidden");
        }
        document.querySelector(".player--0").classList.toggle("player--active");
        document.querySelector(".player--1").classList.toggle("player--active");
    }
})
newGame.addEventListener("click", () => {
    turn = 0, scoreZero = 0, scoreOne = 0, current = 0, currentScore = 0;;
    document.getElementById("score--0").textContent = scoreZero;
    document.getElementById("score--1").textContent = scoreOne;
    document.getElementById("current--0").textContent = currentScore;
    document.getElementById("current--1").textContent = currentScore;
    document.querySelector(".player--0").classList.add("player--active");
    document.querySelector(".player--1").classList.remove("player--active");
    if (document.querySelector(".player--winner")) {
        document.querySelector(".player--winner").classList.toggle("player--winner");
    }
    diceEl.classList.add("hidden");
})
