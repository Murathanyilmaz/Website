'use strict';
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let endGuess = false;
let highscore = 0;
document.querySelector(".score-guess").textContent = score;
function getValue() {
    if (score > 0 && endGuess === false) {
        const guess = Number(document.querySelector(".guess").value);
        if (!guess) {
            document.querySelector(".message").textContent = "⛔ No number!"
        }
        else if (guess != secretNumber) {
            document.querySelector(".message").textContent = guess > secretNumber ? "📈 Too high!" : "📉 Too low!";
            score--;
            document.querySelector(".score-guess").textContent = score;
        }
        else {
            endGuess = true;
            document.querySelector(".message").textContent = "🎉 Correct number!";
            document.querySelector(".guess-game").style.backgroundColor = "#437534";
            document.querySelector(".number").textContent = secretNumber;
            if (highscore < score) highscore = score;
            document.querySelector(".highscore").textContent = highscore;
        }
        if (score == 0) {
            endGuess = true;
            document.querySelector(".message").textContent = "😥 You have lost!";
            document.querySelector(".guess-game").style.backgroundColor = "maroon";
            document.querySelector(".number").textContent = secretNumber;
            ;
        }
    }
}
function resetValues() {
    score = 10;
    endGuess = false;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector(".guess-game").style = "background-color: #222";
    document.querySelector(".message").textContent = "Start guessing..."
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
    document.querySelector(".score-guess").textContent = score;
    document.querySelector(".message").textContent = "Start guessing...";
}

document.querySelector(".check").addEventListener("click", getValue);//mouseover, mouseout
document.querySelector(".again").addEventListener("click", resetValues);//mouseover, mouseout


/*document.addEventListener("click", (e) => {
    e.target.style.display = "none";
})
*/

