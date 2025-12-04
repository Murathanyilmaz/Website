const gridfield = document.querySelector(".gridfield");
let gridCards = [];
let steps = [];
let phase = 0;
let cardCounter = 0;
let canTap = true;
let states = [
    true, true, true, true, true,
    true, true, true, true, true,
    true, true, true, true, true,
    true, true, true, true, true,
    true, true, true, true, true
];

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
    //gridCards = document.querySelectorAll(".gridCard");
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
    for (let i = 0; i < gridCards.length; i++) {
        if (!states[i]) {
            gridCards[i].style.backgroundColor = "#3264a8";
            gridCards[i].classList.add("active");
        }
        else {
            gridCards[i].style.backgroundColor = "#F15924";
            gridCards[i].classList.remove("active");
        }
    }
    if (!states.includes(false)) {
        setTimeout(() => alert("Congratulations!"), 1000);
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
    steps.unshift(value);
    UpdateGrid();
}

function CreatePuzzle() {
    let rand1 = Math.floor(Math.random() * 25);
    GridGame_Button(rand1);
    while (phase < 10) {
        let rand2 = Math.floor(Math.random() * 25);
        if (rand2 != rand1 && states[rand2]) {
            steps.unshift(rand2);
            GridGame_Button(rand2);
        }
        phase++;
    }
    UpdateGrid();
}