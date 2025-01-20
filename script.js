"use strict"
const portfolioButton = document.getElementById("portfolioButton");
const lensesButton = document.getElementById("lensesButton");
const unityButton = document.getElementById("unityButton");
const jumbleButton = document.getElementById("jumbleButton");
const diceButton = document.getElementById("diceButton");
const guessButton = document.getElementById("guessButton");
const memoryGameButton = document.getElementById("memoryGameButton");
const gridPuzzleButton = document.getElementById("gridPuzzleButton");

portfolioButton.addEventListener("click", () => {
    document.querySelector(".portfolio").classList.remove("hidden");
    document.querySelector(".lenses").classList.add("hidden");
    document.querySelector(".unity").classList.add("hidden");
    document.querySelector(".jumble-game").classList.add("hidden");
    document.querySelector(".pig-game").classList.add("hidden");
    document.querySelector(".pig-game-desc").classList.add("hidden");
    document.querySelector(".guess-game").classList.add("hidden");
    document.querySelector(".memorygame").classList.add("hidden");
    document.querySelector(".gridpuzzle").classList.add("hidden");
})
lensesButton.addEventListener("click", () => {
    document.querySelector(".portfolio").classList.add("hidden");
    document.querySelector(".lenses").classList.remove("hidden");
    document.querySelector(".unity").classList.add("hidden");
    document.querySelector(".jumble-game").classList.add("hidden");
    document.querySelector(".pig-game").classList.add("hidden");
    document.querySelector(".pig-game-desc").classList.add("hidden");
    document.querySelector(".guess-game").classList.add("hidden");
    document.querySelector(".memorygame").classList.add("hidden");
    document.querySelector(".gridpuzzle").classList.add("hidden");
})
unityButton.addEventListener("click", () => {
    document.querySelector(".portfolio").classList.add("hidden");
    document.querySelector(".lenses").classList.add("hidden");
    document.querySelector(".unity").classList.remove("hidden");
    document.querySelector(".jumble-game").classList.add("hidden");
    document.querySelector(".pig-game").classList.add("hidden");
    document.querySelector(".pig-game-desc").classList.add("hidden");
    document.querySelector(".guess-game").classList.add("hidden");
    document.querySelector(".memorygame").classList.add("hidden");
    document.querySelector(".gridpuzzle").classList.add("hidden");
})
jumbleButton.addEventListener("click", () => {
    document.querySelector(".portfolio").classList.add("hidden");
    document.querySelector(".lenses").classList.add("hidden");
    document.querySelector(".unity").classList.add("hidden");
    document.querySelector(".jumble-game").classList.remove("hidden");
    document.querySelector(".pig-game").classList.add("hidden");
    document.querySelector(".pig-game-desc").classList.add("hidden");
    document.querySelector(".guess-game").classList.add("hidden");
    document.querySelector(".memorygame").classList.add("hidden");
    document.querySelector(".gridpuzzle").classList.add("hidden");
})
diceButton.addEventListener("click", () => {
    document.querySelector(".portfolio").classList.add("hidden");
    document.querySelector(".lenses").classList.add("hidden");
    document.querySelector(".unity").classList.add("hidden");
    document.querySelector(".jumble-game").classList.add("hidden");
    document.querySelector(".pig-game").classList.remove("hidden");
    document.querySelector(".pig-game-desc").classList.remove("hidden");
    document.querySelector(".guess-game").classList.add("hidden");
    document.querySelector(".memorygame").classList.add("hidden");
    document.querySelector(".gridpuzzle").classList.add("hidden");
})
guessButton.addEventListener("click", () => {
    document.querySelector(".portfolio").classList.add("hidden");
    document.querySelector(".lenses").classList.add("hidden");
    document.querySelector(".unity").classList.add("hidden");
    document.querySelector(".jumble-game").classList.add("hidden");
    document.querySelector(".pig-game").classList.add("hidden");
    document.querySelector(".pig-game-desc").classList.add("hidden");
    document.querySelector(".guess-game").classList.remove("hidden");
    document.querySelector(".memorygame").classList.add("hidden");
    document.querySelector(".gridpuzzle").classList.add("hidden");
})
memoryGameButton.addEventListener("click", () => {
    document.querySelector(".portfolio").classList.add("hidden");
    document.querySelector(".lenses").classList.add("hidden");
    document.querySelector(".unity").classList.add("hidden");
    document.querySelector(".jumble-game").classList.add("hidden");
    document.querySelector(".pig-game").classList.add("hidden");
    document.querySelector(".pig-game-desc").classList.add("hidden");
    document.querySelector(".guess-game").classList.add("hidden");
    document.querySelector(".memorygame").classList.remove("hidden");
    document.querySelector(".gridpuzzle").classList.add("hidden");
})
gridPuzzleButton.addEventListener("click", () => {
    document.querySelector(".portfolio").classList.add("hidden");
    document.querySelector(".lenses").classList.add("hidden");
    document.querySelector(".unity").classList.add("hidden");
    document.querySelector(".jumble-game").classList.add("hidden");
    document.querySelector(".pig-game").classList.add("hidden");
    document.querySelector(".pig-game-desc").classList.add("hidden");
    document.querySelector(".guess-game").classList.add("hidden");
    document.querySelector(".memorygame").classList.add("hidden");
    document.querySelector(".gridpuzzle").classList.remove("hidden");
})
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