const gridfield = document.querySelector(".gridfield");
const winCountField = document.querySelector(".gridWinCount");

let gridCards = [];
let phase = 0;
let states = new Array(25);
states.fill(true);
let winCount = Number(localStorage.getItem('winCount')) || 0;
winCountField.innerHTML = winCount;
winCountField.style.color = "#F15924";
/*
states = states.map(() => true);
states.fill(true);
const states = new Array(25).fill(false);
*/

function RestartGridPuzzle () {
    gridCards.forEach(el => {
        el.style.margin = "2px";
    });
    phase = 0;
    states.fill(true);
    CreatePuzzle();
    UpdateGrid();
    gridCards.forEach(el => {
        el.style.margin = "2px";
    });
}

function CreateGridPuzzle() {
    const gridTable = document.createElement("table");
    gridfield.appendChild(gridTable);
    for (let i = 0; i < 5; i++) {
        const tr = document.createElement("tr");
        gridTable.appendChild(tr);
        for (let j = 0; j < 5; j++) {
            const td = document.createElement("td");
            tr.appendChild(td);
            const button = document.createElement("button");
            button.className = "gridCard";
            td.appendChild(button);
            gridCards.push(button);
        }
    }
    gridCards.forEach(function (value, index) {
        value.addEventListener("click", function () {
            if (states[index]) return;
            GridGame_Button(index);
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
        gridCards.forEach(el => {
            el.style.margin = "-5px";
            el.style.backgroundColor = "#4a4948";
        });
        setTimeout(() => {
            //alert("Congratulations, you won! 🎉 Tap to restart!");
            RestartGridPuzzle();
        }, 1000);
    }
}

function GridGame_Button(value) {
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
    GridGame_Button(rand1);
    while (phase < 10) {
        let rand2 = Math.floor(Math.random() * 25);
        if (rand2 != rand1 && states[rand2]) {
            GridGame_Button(rand2);
        }
        phase++;
    }
    UpdateGrid();
}