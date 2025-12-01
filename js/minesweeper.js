const minefield = document.querySelector(".minefield");
let fieldSize = 81;
let mineCount = 10;
let mineButtons = [];


function CreateMinefield() {
    for (let i = 0; i < 81; i++) {
        const mineButton = document.createElement("button");
        mineButton.className = "mine";
        minefield.appendChild(mineButton)
        mineButtons.push(mineButton);
        if (i % Math.sqrt(fieldSize) == Math.sqrt(fieldSize) - 1) {
            const br = document.createElement("br");
            minefield.appendChild(br);
        }
    }
}

/*
//@input Asset.ObjectPrefab box
//@input SceneObject parent
//@input SceneObject resetCTA
//@input int gridSize
//@input int mineCount
//@input int boxSize
//@input Asset.Material boxMat
//@input float indent
//@input vec4[] textColors {"widget":"color"}

let gameMineCount = script.mineCount;
let grid = [];
let order = [];
let shuffled = [];
let boxes = [];
let popped = false;
let canReset = false;
let openCount = 0;
let coords = [];
let openedCoords = [];
let tempCoords = [];


function Shuffle () {
    shuffled = [];
    shuffled = order.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
}

function SetTexs() {
    for (let i = 0; i < order.length; i++) {
        let div = Math.floor(i / script.gridSize);
        let mod = i % script.gridSize;
        if (grid[div][mod]) continue;
        let counter = 0;
        if (div + 1 >= 0 && div + 1< script.gridSize) {
            if (grid[div + 1][mod]) counter++;
        }
        if (div - 1 >= 0 && div - 1< script.gridSize) {
            if (grid[div - 1][mod]) counter++;
        }
        if (mod + 1 >= 0 && mod + 1< script.gridSize) {   
            if (grid[div][mod + 1]) counter++;
        }
        if (mod - 1 >= 0 && mod - 1< script.gridSize) {   
            if (grid[div][mod - 1]) counter++;
        }
        if (div + 1 >= 0 && div + 1< script.gridSize && mod + 1 >= 0 && mod + 1< script.gridSize) {
            if (grid[div + 1][mod + 1]) counter++;
        }
        if (div - 1 >= 0 && div - 1< script.gridSize && mod + 1 >= 0 && mod + 1< script.gridSize) {
            if (grid[div - 1][mod + 1]) counter++;
        }
        if (div + 1 >= 0 && div + 1< script.gridSize && mod - 1 >= 0 && mod - 1< script.gridSize) {
            if (grid[div + 1][mod - 1]) counter++;
        }
        if (div - 1 >= 0 && div - 1< script.gridSize && mod - 1 >= 0 && mod - 1< script.gridSize) {
            if (grid[div - 1][mod - 1]) counter++;
        }
        boxes[div][mod].getChild(1).getComponent("Component.Text").text = counter.toString();
        boxes[div][mod].getChild(1).getComponent("Component.Text").textFill.color = script.textColors[counter];
    } 
}

function ShowGrid () {
    for (let i = 0; i < script.gridSize; i++) {
        print(i + ":" + grid[i]);
    }
}

let DelayReset = script.createEvent("DelayedCallbackEvent");
DelayReset.bind(function () {
    canReset = true; 
    script.resetCTA.enabled = true;
});

let DelayCheckAround = script.createEvent("DelayedCallbackEvent");
DelayCheckAround.bind(function () {
    CheckAround(tempCoords[0], tempCoords[1]);
});

function CheckAround (row, col) {
    let openBoxes = [];
    let div = row;
    let mod = col;
    if (div + 1 >= 0 && div + 1 < script.gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div + 1 && coord[1] === mod
        );
        if (!exists) {
            openBoxes.push(boxes[div + 1][mod]);
            coords.push([div + 1, mod]);
            openedCoords.push([div + 1, mod]);
        }   
    }
    if (div - 1 >= 0 && div - 1< script.gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div - 1 && coord[1] === mod
        );
        if (!exists) {
            openBoxes.push(boxes[div - 1][mod]);
            coords.push([div - 1, mod]);
            openedCoords.push([div - 1, mod]);
        }
    }
    if (mod + 1 >= 0 && mod + 1< script.gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div && coord[1] === mod + 1
        );
        if (!exists) {
            openBoxes.push(boxes[div][mod + 1]);
            coords.push([div, mod + 1]);
            openedCoords.push([div, mod + 1]);
        }
    }
    if (mod - 1 >= 0 && mod - 1< script.gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div && coord[1] === mod - 1
        );
        if (!exists) {
            openBoxes.push(boxes[div][mod - 1]);
            coords.push([div, mod - 1]);
            openedCoords.push([div, mod - 1]);
        }
    }
    if (div + 1 >= 0 && div + 1< script.gridSize && mod + 1 >= 0 && mod + 1< script.gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div + 1&& coord[1] === mod + 1
        );
        if (!exists) {
            openBoxes.push(boxes[div + 1][mod + 1]);
            coords.push([div + 1, mod + 1]);
            openedCoords.push([div + 1, mod + 1]);
        }
    }
    if (div - 1 >= 0 && div - 1< script.gridSize && mod + 1 >= 0 && mod + 1< script.gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div - 1 && coord[1] === mod + 1
        );
        if (!exists) {
            openBoxes.push(boxes[div - 1][mod + 1]);
            coords.push([div - 1, mod + 1]);
            openedCoords.push([div - 1, mod + 1]);
        }        
    }
    if (div + 1 >= 0 && div + 1< script.gridSize && mod - 1 >= 0 && mod - 1< script.gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div + 1 && coord[1] === mod - 1
        );
        if (!exists) {
            openBoxes.push(boxes[div + 1][mod - 1]);
            coords.push([div + 1, mod - 1]);
            openedCoords.push([div + 1, mod - 1]);
        }
    }
    if (div - 1 >= 0 && div - 1< script.gridSize && mod - 1 >= 0 && mod - 1< script.gridSize) {
        let exists = openedCoords.some(
            coord => coord[0] === div - 1 && coord[1] === mod - 1
        );
        if (!exists) {
            openBoxes.push(boxes[div - 1][mod - 1]);
            coords.push([div - 1, mod - 1]);
            openedCoords.push([div - 1, mod - 1]);
        }
    }
    for (let i = 0; i < openBoxes.length; i++) {
        if (openBoxes[i].getChild(1).getComponent("Component.Text").text != 0) {
            openBoxes[i].getChild(1).getComponent("Component.Text").setRenderOrder(2);
            openBoxes[i].getChild(1).enabled = true;
        }
        openBoxes[i].getComponent("Component.InteractionComponent").enabled = false;
        //openBoxes[i].getComponent("Component.RenderMeshVisual").enabled = false;
        openBoxes[i].getComponent("Component.RenderMeshVisual").mainMaterial.mainPass.baseColor = new vec4(0.5, 0.5, 0.5, 1);
        //openBoxes[i].getTransform().setWorldScale(new vec3(script.boxSize, script.boxSize, 0.1));
    }
    if (coords.length > 0) {
        let temp = coords[0];
        coords.shift();
        if (boxes[temp[0]][temp[1]].getChild(1).getComponent("Component.Text").text == 0) {
            tempCoords[0] = temp[0];
            tempCoords[1] = temp[1];
            CheckAround(temp[0], temp[1]);
            //DelayCheckAround.reset(0);
        }
        else {
            tempCoords[0] = div;
            tempCoords[1] = mod;
            CheckAround(div, mod);
            //DelayCheckAround.reset(0);
        }
    }
}

function SetGame () {
    if (gameMineCount >= script.gridSize**2) gameMineCount = script.gridSize**2 - 1;
    grid = [];
    for (let i = 0; i < script.gridSize; i++) {
        grid[i] = [];
        boxes[i] = [];
        for (let j = 0; j < script.gridSize; j++) {
            grid[i][j] = false;
            order.push(i * script.gridSize + j);
            let obj = script.box.instantiate(script.parent);
            obj.getComponent("Component.RenderMeshVisual").mainMaterial = script.boxMat.clone();
            let pos;
            if (script.gridSize % 2 == 1) {
                pos = new vec3(Math.ceil(i - (script.gridSize / 2)) * script.indent,
                Math.ceil(j - (script.gridSize / 2)) * script.indent,
                0);
            }
            else {
                pos = new vec3((Math.ceil(i - (script.gridSize / 2)) + 0.5) * script.indent,
                (Math.ceil(j - (script.gridSize / 2)) + 0.5) * script.indent,
                0);
            }         
            obj.getTransform().setWorldPosition(pos);
            obj.getTransform().setWorldScale(new vec3(script.boxSize, script.boxSize, script.boxSize));
            boxes[i][j] = obj;
            obj.getComponent("Component.InteractionComponent").onTap.add(function () {   
                if (popped) return;
                global.tweenManager.startTween(obj, "press", function () {
                    obj.getComponent("Component.InteractionComponent").enabled = false;
                    //obj.getComponent("Component.RenderMeshVisual").enabled = false;
                    obj.getComponent("Component.RenderMeshVisual").mainMaterial.mainPass.baseColor = new vec4(0.5, 0.5, 0.5, 1);
                    //obj.getTransform().setWorldScale(new vec3(script.boxSize, script.boxSize, 0.1));
                    if (obj.getChild(0).enabled) {
                        popped = true;
                        obj.getComponent("Component.RenderMeshVisual").enabled = false;
                        DelayReset.reset(0.1);
                    }
                    else {
                        if (obj.getChild(1).getComponent("Component.Text").text == 0) {
                            tempCoords[0] = i;
                            tempCoords[1] = j;
                            CheckAround(i, j);
                            //DelayCheckAround.reset(0);
                        }
                        else {
                            obj.getChild(1).getComponent("Component.Text").setRenderOrder(2);
                            obj.getChild(1).enabled = true;
                        }
                    }                    
                });
            });
        }
    }
    Shuffle();
    for (let i = 0; i < gameMineCount; i++) {
        let value = shuffled[i];
        let div = Math.floor(value / script.gridSize);
        let mod = value % script.gridSize;
        grid[div][mod] = true;
        boxes[div][mod].getChild(0).enabled = true;
    }    
    //ShowGrid();
    SetTexs();
}
SetGame();

function Tap () {
    if (!canReset) return;
    popped = false;
    canReset = false;
    grid = [];
    boxes = [];
    order = [];
    openCount = 0;
    coords = [];
    openedCoords = [];
    
    
    let childCount = script.parent.getChildrenCount();
    for (let i = 0; i < childCount; i++) {
        script.parent.getChild(0).destroy();
    }
    script.resetCTA.enabled = false;
    SetGame();
}
script.createEvent("TapEvent").bind(Tap);
*/