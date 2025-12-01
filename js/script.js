"use strict"

const snapchatButton = document.getElementById("snapchatButton");
const unityButton = document.getElementById("unityButton");
const javascriptButton = document.getElementById("javasScriptButton");
const portfolioButton = document.getElementById("portfolioButton");
const aboutmeButton = document.getElementById("aboutmeButton")
const wordJumbleButton = document.getElementById("wordJumbleButton");
const diceCounterButton = document.getElementById("diceCounterButton");
const guessNumberButton = document.getElementById("guessNumberButton");
const memoryCardsButton = document.getElementById("memoryCardsButton");
const gridPuzzleButton = document.getElementById("gridPuzzleButton");

let lastSection;

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
    "javascript",
    "portfolio",
    "aboutme",
    "wordJumble",
    "guessNumber",
    "memoryCards",
    "diceCounter",
    "diceCounterDesc",
    "gridPuzzle"
];

function show(section) {
    if (section == "javascript") {
        dropDownFunction();
        section = "gridPuzzle";
    }
    if (lastSection == section) return;
    if (section != "wordJumble" &&
        section != "diceCounter" &&
        section != "guessNumber" &&
        section != "memoryCards" &&
        section != "gridPuzzle") {
        dropDownFunction2();
    }
    sections.forEach(name => {
        const el = document.querySelector("." + name);
        el.classList.toggle("hidden", name !== section)
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
    lastSection = section;
}

snapchatButton.onclick = () => show("snapchat");
unityButton.onclick = () => show("unity");
javascriptButton.onclick = () => show("javascript");
portfolioButton.onclick = () => show("portfolio");
aboutmeButton.onclick = () => show("aboutme");
wordJumbleButton.onclick = () => show("wordJumble");
diceCounterButton.onclick = () => show("diceCounter");
guessNumberButton.onclick = () => show("guessNumber");
memoryCardsButton.onclick = () => show("memoryCards");
gridPuzzleButton.onclick = () => show("gridPuzzle");

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
    lastSection = "aboutme";
    setTimeout(() => {
        paragraphs.forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('show');
            }, index * 500);
        });
    }, 100);
});