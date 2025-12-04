"use strict"
const navButtons = document.querySelectorAll(".nav_button");
let sections = [];
navButtons.forEach((el, i) => {
    sections[i] = el.id.replace("Button", "");
    el.onclick = () => ShowSection(sections[i]);
});

let lastSection = "aboutme";
let inJS = false;
let jsSection = "gridPuzzle";

let wordJumbleLoaded = false;
let minesweeperLoaded = false;
let gridPuzzleLoaded = false;

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

function ShowSection (section) {
    if (section == "javaScript") {
        if (inJS) return;
        inJS = true;
        dropDownFunction();
        section = jsSection;
    }
    if (lastSection == section) return;
    document.querySelector("." + lastSection).classList.toggle("hidden", true);
    document.querySelector("#" + lastSection + "Button").classList.toggle("active", false);
    lastSection = section;
    if (section != "wordJumble" &&
        section != "rollTheDice" &&
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
    document.querySelector("." + lastSection).classList.toggle("hidden", false);
    document.querySelector("#" + lastSection + "Button").classList.toggle("active", true);
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
            CreateWordJumble();
        }
    }
    else if (section == "minesweeper") {
        if (!minesweeperLoaded) {
            minesweeperLoaded = true;
            CreateMinesweeperGame();
        }
    }
    else if (section == "gridPuzzle") {
        if (!gridPuzzleLoaded) {
            gridPuzzleLoaded = true;
            CreateGridPuzzle();
        }
    }
}

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

document.addEventListener('keydown', (event) => {
    if (lastSection != "portfolio") return;
    if (event.key == "Escape" && !lightbox.classList.contains("hidden")) {
       lightbox.classList.add('hidden');
    }
});