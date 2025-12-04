"use strict"

const snapchatButton = document.getElementById("snapchatButton");
const unityButton = document.getElementById("unityButton");
const javascriptButton = document.getElementById("javaScriptButton");
const portfolioButton = document.getElementById("portfolioButton");
const aboutmeButton = document.getElementById("aboutmeButton")
const wordJumbleButton = document.getElementById("wordJumbleButton");
const diceCounterButton = document.getElementById("diceCounterButton");
const memoryCardsButton = document.getElementById("memoryCardsButton");
const gridPuzzleButton = document.getElementById("gridPuzzleButton");
const minesweeperButton = document.getElementById("minesweeperButton");
const threeJSButton = document.getElementById("threeJSButton");

let lastSection = "aboutme";
let inJS = false;
let jsSection = "gridPuzzle";

let wordJumbleLoaded = false;
let minesweeperLoaded = false;

function dropDownFunction() {
    document.getElementById("jsDropdown").classList.toggle("show");
    document.getElementById("arrow").classList.toggle("fa-caret-down");
    document.getElementById("arrow").classList.toggle("fa-caret-up");
}
function dropDownFunction2() {
    document.getElementById("jsDropdown").classList.toggle("show", false);
    document.getElementById("arrow").classList.add("fa-caret-down");
    document.getElementById("arrow").classList.remove("fa-caret-up");
}

const sections = [
    "snapchat",
    "unity",
    "javaScript",
    "portfolio",
    "aboutme",
    "wordJumble",
    "memoryCards",
    "diceCounter",
    "diceCounterDesc",
    "gridPuzzle",
    "minesweeper",
    "threeJS"
];

function show(section) {
    if (section == "javascript") {
        if (inJS) return;
        inJS = true;
        dropDownFunction();
        section = jsSection;
    }
    if (lastSection == section) return;
    lastSection = section;
    if (section != "wordJumble" &&
        section != "diceCounter" &&
        section != "memoryCards" &&
        section != "gridPuzzle" &&
        section != "minesweeper"&&
        section != "threeJS") {
        dropDownFunction2();
        inJS = false;
    }
    else {
        jsSection = section;
    }
    sections.forEach(name => {
        const el = document.querySelector("." + name);
        el.classList.toggle("hidden", name !== section)
        if (section == "diceCounter") {
            document.querySelector(".diceCounterDesc").classList.toggle("hidden", false);
        }
        const button = document.querySelector("#" + name + "Button");
        if (name != "diceCounterDesc") {
            button.classList.toggle("active", name === section);
        }
    });
    if (section == "aboutme") {
        document.querySelector('.aboutme').classList.add('visible');
        const paragraphs = document.querySelector('.aboutme').querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.classList.remove('show');
            setTimeout(() => {
                p.classList.add('show');
            }, index * 500);
        });
    }
    else if (section == "wordJumble") {
        if (!wordJumbleLoaded) {
            wordJumbleLoaded = true;
            console.log("Creating Jumble Game");
            CreateWordJumble();
        }
    }
    else if (section == "minesweeper") {
        if (!minesweeperLoaded) {
            minesweeperLoaded = true;
            console.log("Creating Minesweeper Game");
            CreateMinesweeperGame();
        }
    }
}

snapchatButton.onclick = () => show("snapchat");
unityButton.onclick = () => show("unity");
javascriptButton.onclick = () => show("javascript");
portfolioButton.onclick = () => show("portfolio");
aboutmeButton.onclick = () => show("aboutme");
wordJumbleButton.onclick = () => show("wordJumble");
diceCounterButton.onclick = () => show("diceCounter");
memoryCardsButton.onclick = () => show("memoryCards");
gridPuzzleButton.onclick = () => show("gridPuzzle");
minesweeperButton.onclick = () => show("minesweeper");
threeJSButton.onclick = () => show("threeJS");

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

document.querySelectorAll('.portfolio img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const aboutEl = document.querySelector('.aboutme');
    const paragraphs = aboutEl.querySelectorAll('p');
    aboutEl.classList.add('visible');
    setTimeout(() => {
        paragraphs.forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('show');
            }, index * 500);
        });
    }, 100);
});