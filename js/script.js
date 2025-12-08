"use strict"
const navButtons = document.querySelectorAll(".nav_button");
const sections = [];
navButtons.forEach((el, i) => {
    sections[i] = el.id.replace("Button", "");
    el.onclick = () => ShowSection(sections[i]);
});

let lastSection = "aboutme";
let jsSection = "gridPuzzle";
let inJS = false;

let wordJumbleLoaded = false;
let minesweeperLoaded = false;
let gridPuzzleLoaded = false;
let memoryCardsLoaded = false;
let portfolioLoaded = false;

function Toggle_JS_Menu() {
    document.getElementById("jsDropdown").classList.toggle("show");
    document.getElementById("arrow").classList.toggle("fa-caret-down");
    document.getElementById("arrow").classList.toggle("fa-caret-up");
}
function Close_JS_Menu() {
    document.getElementById("jsDropdown").classList.toggle("show", false);
    document.getElementById("arrow").classList.toggle("fa-caret-down", true);
    document.getElementById("arrow").classList.toggle("fa-caret-up", false);
}

function ShowSection (section) {
    if (lastSection == section) return;
    if (section == "javaScript") {
        Toggle_JS_Menu();
        if (inJS) return;
        inJS = true;
        section = jsSection;
    }
    if (section != "wordJumble" &&
        section != "rollTheDice" &&
        section != "memoryCards" &&
        section != "gridPuzzle" &&
        section != "minesweeper" &&
        section != "snake3D" &&
        section != "WIP" &&
        section != "nodeJS") {
        Close_JS_Menu();
        inJS = false;
    }
    else {
        jsSection = section;
    }
    if (section == "aboutme") {
        const paragraphs = document.querySelector('.aboutme').querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.classList.remove('show');
            setTimeout(() => {
                p.classList.add('show');
            }, index * 500);
        });
    }
    else if (section == "portfolio") {
        if (!portfolioLoaded) {
            portfolioLoaded = true;
            CreatePortfolioPage();
        }
        document.addEventListener('keydown', OnKeyPress);
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
    else if (section == "memoryCards") {
        if (!memoryCardsLoaded) {
            memoryCardsLoaded = true;
            CreateMemoryGame();
        }
    }
    else if (section == "snake3D") {
        Start3D_Scene();
    }
    else if (section == "WIP") {
        //StartSnakeGame();
    }
    document.querySelector("." + lastSection).classList.toggle("hidden", true);
    document.querySelector("#" + lastSection + "Button").classList.toggle("active", false);
    if (lastSection == "snake3D") {
        Stop3D_Scene();
        //DisposeScene(snake3dScene);
        //RemoveEventListeners();
    }
    else if (lastSection == "WIP") {
        StopSnakeGame();
    }
    else if (lastSection == "portfolio") {
        document.removeEventListener("keydown", OnKeyPress);
    }
    lastSection = section;
    document.querySelector("." + lastSection).classList.toggle("hidden", false);
    document.querySelector("#" + lastSection + "Button").classList.toggle("active", true);
}

function CreatePortfolioPage () {
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
}

function OnKeyPress (event) {
    console.log(event.key);
    if (event.key == "Escape" && !lightbox.classList.contains("hidden")) {
       lightbox.classList.add('hidden');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const aboutEl = document.querySelector('.aboutme');
    const paragraphs = document.querySelectorAll('.aboutme p');
    aboutEl.classList.add('visible');
    setTimeout(() => {
        paragraphs.forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('show');
            }, index * 500);
        });
    }, 100);
});

document.addEventListener("mousemove", (event) => {
    let mousePosX = 1 - (2 * (window.innerWidth - event.clientX) / window.innerWidth);
    let mousePosY = event.clientY / window.innerHeight;
    const icon = document.querySelector(".icon");
    icon.style.transform = `rotateX(${mousePosY * 60}deg) rotateY(${-mousePosX * 70}deg)`;
});

let serverLoaded = false;
let serverStep = 0;

setTimeout(function FetchTest () {
    if (serverLoaded) return;
    const serverStatus = document.querySelector(".server-status");
    let serverText = "Server initializing";
    for (let i = 0; i < serverStep; i++) {
        serverText += ".";
    }
    serverStatus.innerHTML = serverText;
    if (serverStep > 2) serverStep = 0;
    serverStep++;
    setTimeout(FetchTest, 500);
}, 1000);

//ROOT SERVER COMMAND
fetch("https://nodejs-server-c0m3.onrender.com")
    .then(res => {
    res.json();
    serverLoaded = true;
    })
    .then(data => {
    console.log(data.message);
    })
    .catch(err => console.error(err));
//GET-GREET SERVER COMMAND-Murat
fetch("https://nodejs-server-c0m3.onrender.com/greet?name=Murat")
  .then(res => res.json())
  .then(data => console.log(data.message));
//GET-GREET SERVER COMMAND-Empty
fetch("https://nodejs-server-c0m3.onrender.com/greet")
  .then(res => res.json())
  .then(data => console.log(data.message));
//POST-ECHO YOUR MESSAGE
fetch("https://nodejs-server-c0m3.onrender.com/echo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        test: "Hello server!",
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("youSent:" + data.youSent);
        console.log("youDidntSent:" + data.youDidntSent);
    });