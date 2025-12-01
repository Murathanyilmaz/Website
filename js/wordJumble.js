"use strict"

const today = new Date(); 
const yyyy = today.getFullYear();
const mm   = String(today.getMonth() + 1).padStart(2, '0');
const dd   = String(today.getDate()).padStart(2, '0');
const dailyUrl = `https://www.nytimes.com/svc/wordle/v2/${yyyy}-${mm}-${dd}.json`;
let fixedUrl = 'https://api.allorigins.win/raw?url=' + dailyUrl;

let wordOfTheDay;

fetch(fixedUrl)
.then(response => {
if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}
return response.json();
})
.then(data => {
const word = data.solution;
wordOfTheDay = word.toUpperCase();
console.log(wordOfTheDay);
CreateGame();
})
.catch(err => {
console.error('Error fetching word:', err);
});


const fixedUrl2 = 'https://www.nytimes.com/svc/wordle/v2/2025-12-02.json' + dailyUrl;

fetch(fixedUrl2)
.then(response => {
if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}
return response.json();
})
.then(data => {
const word = data.solution;
console.log("2" + word);
})
.catch(err => {
console.error('Error fetching word:', err);
});


const allowed = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const buttons = ["A", "B", "C", "D", "E", "F", "G", "H", "I","J", "K", "L", "M", "N", "O", "P", "Q", "R", "S","T", "U", "V", "W", "X", "Y", "Z"];

const wotdArray = [];
const letterCount = [];

function CreateGame () {
    for (let i = 0; i < buttons.length; i++) {
        letterCount[buttons[i]] = 0;
    }
    for (let i = 0; i < 5; i++) {
        wotdArray[i] = wordOfTheDay.substring(i, i + 1);
        letterCount[wordOfTheDay.substring(i, i + 1)]++;
    }
}

const flags = [];
const flaggedFor = [];

let endJumble = false;
let lifeLeft = 6;
let letterLocation = 1;
let currentPoint = 0;

var deleteEvent = function () {
    letterLocation--;
    document.querySelector(`#harf${letterLocation}`).textContent = "";
    document.getElementById("buttonBackspace").blur();
}

//SCREEN KEYBOARD SETTINGS
for (let i = 0; i < buttons.length; i++) {
    let clickedButton = [];
    clickedButton[i] = "button" + buttons[i];
    document.getElementById(clickedButton[i]).addEventListener("click", () => {
        if (letterLocation <= 5 && endJumble == false) {
            document.getElementById(`harf${letterLocation}`).textContent = buttons[i];
            letterLocation++;
        }
        document.getElementById(clickedButton[i]).blur();
    })
}
document.getElementById("buttonBackspace").addEventListener("click", () => {
    if (endJumble == false && letterLocation > 1) {
        deleteEvent();
    }
})
document.getElementById("buttonEnter").addEventListener("click", (event) => {
    enterEvent();
    document.getElementById("buttonEnter").blur();
})

//KEYBOARD SETTINGS
document.addEventListener('keydown', (event) => {
    if (endJumble == false && (allowed.includes(event.key) || event.key == "Backspace" || event.key == "Enter")) {
        if (event.code == "Backspace" && letterLocation > 1) {
            deleteEvent();
        }
        else if (allowed.includes(event.key) && letterLocation <= 5) {
            document.querySelector(`#harf${letterLocation}`).textContent = event.key.toLocaleUpperCase();
            letterLocation++;
        }
        else if (letterLocation == 6 && event.code == "Enter") {
            enterEvent();
        }
    }
})


var enterEvent = function () {
    if (endJumble == false & letterLocation == 6) {
        for (let i = 0; i < 5; i++) {
            let currentGuessedLetter = document.querySelector(`#harf${i + 1}`).textContent;
            if (!wotdArray.includes(currentGuessedLetter)) {
                flags[i] = 0;
                flaggedFor[i] = currentGuessedLetter;
            }
            else {
                if (wotdArray[i] == currentGuessedLetter) {
                    flags[i] = 2;
                    flaggedFor[i] = currentGuessedLetter;
                    wotdArray[i] = "?";
                    for (let k = 0; k < 5; k++) {
                        if (flags[k] == 1 && flaggedFor[k] == currentGuessedLetter) {
                            flags[k] = 0;
                        }
                    }
                }
                else {
                    flags[i] = 1;
                    flaggedFor[i] = currentGuessedLetter;
                    for (let k = 0; k < 5; k++) {
                        if (k != i && flags[k] == 1 && flaggedFor[k] == currentGuessedLetter) {
                            flags[k] = 0;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < 5; i++) {
            if (flags[i] == 0) {
                document.getElementById(`harf${i + 1}`).style.backgroundColor = "#d8d8d8";
                document.getElementById(`button${flaggedFor[i]}`).style.backgroundColor = "gray";
            }
            else if (flags[i] == 1) {
                document.getElementById(`harf${i + 1}`).style.backgroundColor = "orange";
                document.getElementById(`button${flaggedFor[i]}`).style.backgroundColor = "orange";
            }
            else if (flags[i] == 2) {
                document.getElementById(`harf${i + 1}`).style.backgroundColor = "#0b812f";
                document.getElementById(`button${flaggedFor[i]}`).style.backgroundColor = "#0b812f";
                currentPoint++;
            }
        }
        if (currentPoint == 5) {
            endgame(true);
        }
        currentPoint = 0;
        for (let i = 0; i < 5; i++) {
            wotdArray[i] = wordOfTheDay.substring(i, i + 1);
        }
        for (let i = -25; i <= 30; i++) {
            if (document.getElementById(`harf${i}`)) {
                document.getElementById(`harf${i}`).id = `harf${i - 5}`;
            }
        }
        lifeLeft--
        if (lifeLeft > 0) {
            letterLocation = 1;
        }
        else {
            endgame(false);
        }
    }
}

function endgame(sonuc) {
    const bildir = sonuc ? "Congratulations!" : "You have lost.";
    alert(`${bildir}
    Word of the Day: ${wordOfTheDay}`);
    endJumble = true;
}