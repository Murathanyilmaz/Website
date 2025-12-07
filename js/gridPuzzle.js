const gridfield = document.querySelector(".gridfield");
const winCountField = document.querySelector(".gridWinCount");
let gridCards = [];
let states = new Array(25);
let winCount = Number(localStorage.getItem('winCount')) || 0;

/*
states = states.map(() => true);
states.fill(true);
const states = new Array(25).fill(false);
*/

function RestartGridPuzzle () {
    gridfield.style.gap = "3px";
    gridfield.style.maxWidth = "300px";
    states.fill(true);
    CreatePuzzle();
    UpdateGrid();
}

function CreateGridPuzzle() {
    winCountField.innerHTML = winCount;
    winCountField.style.color = "#F15924";
    states.fill(true);
    for (let i = 0; i < 25; i++) {
        const button = document.createElement("button");
        button.className = "gridCard";
        gridfield.appendChild(button);
        gridCards.push(button);
    }
    gridCards.forEach(function (value, index) {
        value.addEventListener("click", function () {
            if (states[index]) return;
            GridGame_ButtonClick(index);
        })
    });
    CreatePuzzle();
    UpdateGrid();
}

function UpdateGrid() {
    gridCards.forEach((el, i) => {
        if (!states[i]) {
            gridCards[i].style.backgroundColor = "#3264a8";
            gridCards[i].classList.add("active");
        }
        else {
            gridCards[i].style.backgroundColor = "#F15924";
            gridCards[i].classList.remove("active");
        }
    })
    if (!states.includes(false)) {
        winCount++;
        localStorage.setItem('winCount', winCount);
        winCountField.innerHTML = winCount;
        gridfield.style.gap = "2.5px";
        gridfield.style.maxWidth = "250px";
        gridCards.forEach(el => {
            el.style.backgroundColor = "#4a4948";
        });
        setTimeout(() => {
            //alert("Congratulations, you won! 🎉 Tap to restart!");
            RestartGridPuzzle();
        }, 1000);
    }
}

function GridGame_ButtonClick(value) {
    states[value] = !states[value];
    if (value % 5 == 0) {
        states[value - 1 + 2] = !states[value - 1 + 2];
        states[value - 1 + 5] = !states[value - 1 + 5];
    }
    else if (value % 5 == 4) {
        states[value - 1] = !states[value - 1];
        states[value - 4] = !states[value - 4];
    }
    else {
        states[value - 1 + 2] = !states[value - 1 + 2];
        states[value - 1] = !states[value - 1];
    }
    if (value < 5) {
        states[value - 1 + 6] = !states[value - 1 + 6];
        states[value - 1 + 21] = !states[value - 1 + 21];
    }
    else if (value > 19) {
        states[value - 5] = !states[value - 5];
        states[value - 20] = !states[value - 20];
    }
    else {
        states[value - 1 + 6] = !states[value - 1 + 6];
        states[value - 5] = !states[value - 5];
    }
    UpdateGrid();
}

function CreatePuzzle() {
    let rand1 = Math.floor(Math.random() * 25);
    GridGame_ButtonClick(rand1);
    for (let i = 0; i < 10; i++) {
        let rand2 = Math.floor(Math.random() * 25);
        if (states[rand2]) {
            GridGame_ButtonClick(rand2);
        }
    }
    UpdateGrid();
}