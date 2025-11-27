"use strict"

const portfolioButton = document.getElementById("portfolioButton");
const lensesButton = document.getElementById("lensesButton");
const unityButton = document.getElementById("unityButton");
const aboutmeButton = document.getElementById("aboutmeButton")
const jumbleButton = document.getElementById("jumbleButton");
const diceButton = document.getElementById("diceButton");
const guessButton = document.getElementById("guessButton");
const memoryGameButton = document.getElementById("memoryGameButton");
const gridPuzzleButton = document.getElementById("gridPuzzleButton");

function dropDownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("arrow").classList.toggle("fa-caret-down");
    document.getElementById("arrow").classList.toggle("fa-caret-up");
}
function dropDownFunction2() {
    document.getElementById("myDropdown").classList.remove("show");
    document.getElementById("arrow").classList.add("fa-caret-down");
    document.getElementById("arrow").classList.remove("fa-caret-up");
}

const sections = [
    "lenses",
    "unity",
    "portfolio",
    "aboutme",
    "jumble-game",
    "pig-game",
    "pig-game-desc",
    "guess-game",
    "memorygame",
    "gridpuzzle",
];

function show(section) {
    sections.forEach(name => {
        const el = document.querySelector("." + name);
        el.classList.toggle("hidden", name !== section)
    });
}

lensesButton.onclick = () => show("lenses");
unityButton.onclick = () => show("unity");
portfolioButton.onclick = () => show("portfolio");
aboutmeButton.onclick = () => show("aboutme");
jumbleButton.onclick = () => show("jumble-game");
diceButton.onclick = () => show("pig-game");
guessButton.onclick = () => show("guess-game");
memoryGameButton.onclick = () => show("memorygame");
gridPuzzleButton.onclick = () => show("gridpuzzle");