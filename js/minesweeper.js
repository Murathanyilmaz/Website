const minefield = document.querySelector(".minefield");
let fieldSize = 81;
let gridSize = Math.sqrt(fieldSize);
let mineCount = 10;
let mineButtons = [];
let mineButtonsGrid = [];
let grid = [];
let order = [];
let shuffled = [];
let boxes = [];
let popped = false;
let coords = [];
let openedCoords = [];
let tempCoords = [];
let won = false;

function CreateMinesweeperGame () {
    CreateMinefield();
    SetGame();
}

function CreateMinefield() {
    for (let i = 0; i < 81; i++) {
        const mineButton = document.createElement("button");
        mineButton.className = "mine";
        minefield.appendChild(mineButton);
        mineButtons.push(mineButton);
        if (i % gridSize == gridSize - 1) {
            const br = document.createElement("br");
            minefield.appendChild(br);
        }
    }
    mineButtons.forEach(function (value, index) {
        value.addEventListener("click", function () {
            Minesweeper_Button(index);
        });
    });
}

function RestartMinesweeper() {
    popped = false;
    won = false;
    grid = [];
    boxes = [];
    order = [];
    mineButtons = [];
    mineButtonsGrid = [];
    coords = [];
    openedCoords = [];
    tempCoords = [];
    document.querySelectorAll('.minefield').forEach(parent => {
        parent.querySelectorAll('button, br').forEach(node => node.remove());
    });
    CreateMinefield();
    SetGame();
}

function CheckWin() {
    if (openedCoords.length >= fieldSize - mineCount) {
        if (won) return;
        won = true;
        popped = true;

        for (let i = 0; i < mineCount; i++) {
            let value = shuffled[i];
            let div = Math.floor(value / gridSize);
            let mod = value % gridSize;
            mineButtonsGrid[div][mod].innerHTML = "🎉";
            mineButtonsGrid[div][mod].style.fontSize = "16px";
            mineButtonsGrid[div][mod].style.backgroundColor = "green";
        }
        setTimeout(() => {
            alert("Congratulations, you won! 🎉 Tap to restart!");
            RestartMinesweeper();
        }, 100);
    }
}

function Minesweeper_Button(value) {
    if (popped) return;
    if (mineButtons[value].classList.contains("danger")) {
        mineButtons[value].style.backgroundColor = "purple";
        mineButtons[value].innerHTML = "💥";
        popped = true;
        setTimeout(() => {
            alert("Kaboom! 💥 Tap to restart!");
            RestartMinesweeper();
        }, 100);
    }
    else {
        mineButtons[value].style.backgroundColor = "black";
        tempCoords[0] = Math.floor(value / gridSize);
        tempCoords[1] = value % gridSize;
        openedCoords.push([tempCoords[0], tempCoords[1]]);
        if (mineButtons[value].classList[1] == "0") {
            tempCoords[0] = Math.floor(value / gridSize);
            tempCoords[1] = value % gridSize;
            CheckAround(tempCoords[0], tempCoords[1]);
        }
        else {
            mineButtons[value].innerHTML = mineButtons[value].classList[1];
            mineButtons[value].style.color = "#f15924";
        }
        CheckWin();
    }
}

function SetMineTexs() {
    for (let i = 0; i < order.length; i++) {
        let div = Math.floor(i / gridSize);
        let mod = i % gridSize;
        if (grid[div][mod]) continue;
        let counter = 0;
        if (div + 1 >= 0 && div + 1 < gridSize) {
            if (grid[div + 1][mod]) counter++;
        }
        if (div - 1 >= 0 && div - 1 < gridSize) {
            if (grid[div - 1][mod]) counter++;
        }
        if (mod + 1 >= 0 && mod + 1 < gridSize) {
            if (grid[div][mod + 1]) counter++;
        }
        if (mod - 1 >= 0 && mod - 1 < gridSize) {
            if (grid[div][mod - 1]) counter++;
        }
        if (div + 1 >= 0 && div + 1 < gridSize && mod + 1 >= 0 && mod + 1 < gridSize) {
            if (grid[div + 1][mod + 1]) counter++;
        }
        if (div - 1 >= 0 && div - 1 < gridSize && mod + 1 >= 0 && mod + 1 < gridSize) {
            if (grid[div - 1][mod + 1]) counter++;
        }
        if (div + 1 >= 0 && div + 1 < gridSize && mod - 1 >= 0 && mod - 1 < gridSize) {
            if (grid[div + 1][mod - 1]) counter++;
        }
        if (div - 1 >= 0 && div - 1 < gridSize && mod - 1 >= 0 && mod - 1 < gridSize) {
            if (grid[div - 1][mod - 1]) counter++;
        }
        mineButtonsGrid[div][mod].classList.add(counter);
        mineButtonsGrid[div][mod].innerHTML = "&nbsp";
        mineButtonsGrid[div][mod].style.fontSize = "16px";
    }
}

function CheckAround(row, col) {
    let openBoxes = [];
    let div = row;
    let mod = col;
    if (div + 1 >= 0 && div + 1 < gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div + 1 && coord[1] === mod
        );
        if (!exists) {
            openBoxes.push(mineButtonsGrid[div + 1][mod]);
            coords.push([div + 1, mod]);
            openedCoords.push([div + 1, mod]);
        }
    }
    if (div - 1 >= 0 && div - 1 < gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div - 1 && coord[1] === mod
        );
        if (!exists) {
            openBoxes.push(mineButtonsGrid[div - 1][mod]);
            coords.push([div - 1, mod]);
            openedCoords.push([div - 1, mod]);
        }
    }
    if (mod + 1 >= 0 && mod + 1 < gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div && coord[1] === mod + 1
        );
        if (!exists) {
            openBoxes.push(mineButtonsGrid[div][mod + 1]);
            coords.push([div, mod + 1]);
            openedCoords.push([div, mod + 1]);
        }
    }
    if (mod - 1 >= 0 && mod - 1 < gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div && coord[1] === mod - 1
        );
        if (!exists) {
            openBoxes.push(mineButtonsGrid[div][mod - 1]);
            coords.push([div, mod - 1]);
            openedCoords.push([div, mod - 1]);
        }
    }
    if (div + 1 >= 0 && div + 1 < gridSize && mod + 1 >= 0 && mod + 1 < gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div + 1 && coord[1] === mod + 1
        );
        if (!exists) {
            openBoxes.push(mineButtonsGrid[div + 1][mod + 1]);
            coords.push([div + 1, mod + 1]);
            openedCoords.push([div + 1, mod + 1]);
        }
    }
    if (div - 1 >= 0 && div - 1 < gridSize && mod + 1 >= 0 && mod + 1 < gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div - 1 && coord[1] === mod + 1
        );
        if (!exists) {
            openBoxes.push(mineButtonsGrid[div - 1][mod + 1]);
            coords.push([div - 1, mod + 1]);
            openedCoords.push([div - 1, mod + 1]);
        }
    }
    if (div + 1 >= 0 && div + 1 < gridSize && mod - 1 >= 0 && mod - 1 < gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div + 1 && coord[1] === mod - 1
        );
        if (!exists) {
            openBoxes.push(mineButtonsGrid[div + 1][mod - 1]);
            coords.push([div + 1, mod - 1]);
            openedCoords.push([div + 1, mod - 1]);
        }
    }
    if (div - 1 >= 0 && div - 1 < gridSize && mod - 1 >= 0 && mod - 1 < gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div - 1 && coord[1] === mod - 1
        );
        if (!exists) {
            openBoxes.push(mineButtonsGrid[div - 1][mod - 1]);
            coords.push([div - 1, mod - 1]);
            openedCoords.push([div - 1, mod - 1]);
        }
    }
    for (let i = 0; i < openBoxes.length; i++) {
        if (openBoxes[i].classList[1] != "0") {
            openBoxes[i].innerHTML = openBoxes[i].classList[1];
            openBoxes[i].style.color = "#f15924";
        }
        openBoxes[i].style.backgroundColor = "black";
    }
    if (coords.length > 0) {
        let temp = coords[0];
        coords.shift();
        if (mineButtonsGrid[temp[0]][temp[1]].classList[1] == "0") {
            tempCoords[0] = temp[0];
            tempCoords[1] = temp[1];
            CheckAround(temp[0], temp[1]);
        }
        else {
            tempCoords[0] = div;
            tempCoords[1] = mod;
            CheckAround(div, mod);
        }
    }
    CheckWin();
}

function Shuffle() {
    shuffled = [];
    shuffled = order.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
}

function SetGame() {
    grid = [];
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        mineButtonsGrid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = false;
            order.push(i * gridSize + j);
            mineButtonsGrid[i][j] = mineButtons[i * gridSize + j];
        }
    }
    Shuffle();
    for (let i = 0; i < mineCount; i++) {
        let value = shuffled[i];
        let div = Math.floor(value / gridSize);
        let mod = value % gridSize;
        grid[div][mod] = true;
        mineButtonsGrid[div][mod].classList.add("danger");
        mineButtonsGrid[div][mod].innerHTML = "&nbsp";
        mineButtonsGrid[div][mod].style.fontSize = "16px";
    }
    //ShowMineGrid();
    SetMineTexs();
}

function ShowMineGrid() {
    for (let i = 0; i < gridSize; i++) {
        console.log(i + ":" + grid[i]);
    }
}