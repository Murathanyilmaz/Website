jsSection = "WIP";

const snake3dScene = new THREE.Scene();
const snakeContainer = document.querySelector('.threeJS-area-2');
snake3dScene.background = new THREE.Color(0x505050);
const snakeCam = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);//FOV-ASPECT-NEAR-FAR
snakeCam.position.z = 0;
/*
const snakeRenderer = new THREE.WebGLRenderer({
    alpha: true
});*/
//scene.background = null;
const snakeRenderer = new THREE.WebGLRenderer();
snakeRenderer.setSize(widthSize, heightSize);
snakeContainer.appendChild(snakeRenderer.domElement);

snakeRenderer.setSize(widthSize, heightSize);
snakeRenderer.render(snake3dScene, snakeCam);

const sphereGeo = new THREE.SphereGeometry(0.5, 16, 16);
const snakeMat = new THREE.MeshStandardMaterial({ color: 0x444444});
const snakeHead = new THREE.Mesh(sphereGeo, snakeMat);
snakeHead.name = "SnakeHead";
snakeHead.position.z = -20;
snake3dScene.add(snakeHead);

let direction = 1;
let lastTime = 0;
let speed = 5;
let lastBait = null;
let bodyCount = 0;
let positions = [];
let snakeBodies = [];

function SpawnSnake () {
    const snakeBody = new THREE.Mesh(sphereGeo, snakeMat);
    snakeBody.name = "SnakeBody";
    snakeBody.position.z = -20;
    snake3dScene.add(snakeBody);
    snakeBodies.unshift(snakeBody);
    bodyCount++;
}

function SpawnBait () {
    let rand1 = Math.floor((Math.random() * 36) - 18);
    let rand2 = Math.floor((Math.random() * 20) - 10);
    const baitSphere = new THREE.SphereGeometry(0.2, 16, 16);
    const baitMat = new THREE.MeshStandardMaterial({ color: 0x444444});
    const bait = new THREE.Mesh(baitSphere, baitMat);
    bait.position.x = rand1;
    bait.position.y = rand2;
    bait.position.z = -20;
    snake3dScene.add(bait);
    lastBait = bait;
}


function SnakeAnimation (currentTime) {
    requestAnimationFrame(SnakeAnimation);
    widthSize = window.innerWidth * scaler;
    heightSize = widthSize * scaler;
    aspect = widthSize/heightSize;
    snakeCam.aspect = aspect;
    snakeCam.updateProjectionMatrix();
    snakeRenderer.setSize(widthSize, heightSize);

    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    let movement = speed * deltaTime;

    positions.unshift(snakeHead.position.clone());
    if (positions.length > 1000) {
        positions.pop();
    }
    if (direction == 0) {
        snakeHead.position.y += movement;
    }
    else if (direction == 1) {
        snakeHead.position.x += movement;
    }
    else if (direction == 2) {
        snakeHead.position.y -= movement;
    }
    else if (direction == 3) {
        snakeHead.position.x -= movement;
    }

    if (snakeHead.position.x > 20) snakeHead.position.x = -20;
    else if (snakeHead.position.x < -20) snakeHead.position.x = 20;
    if (snakeHead.position.y > 12) snakeHead.position.y = -12;
    else if (snakeHead.position.y < -12) snakeHead.position.y = 12;
    
    if (bodyCount > 0) {
        for (let i = 0; i < snakeBodies.length; i++) {
            snakeBodies[i].position.x = positions[(i + 1) * 10].x;
            snakeBodies[i].position.y = positions[(i + 1) * 10].y;
        }
    }

    if (lastBait != null) {
        let distance = lastBait.position.distanceTo(snakeHead.position);
        if (distance < 0.5) {
            lastBait.traverse((child) => {
                if (child.isMesh) {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(m => m.dispose());
                        } else if (child.material) {
                            child.material.dispose();
                        }
                    }
                }
            });
            snake3dScene.remove(lastBait);
            lastBait = null;
            SpawnSnake();
            SpawnBait();
        }
    }
    snakeRenderer.render(snake3dScene, snakeCam);
}
SnakeAnimation(0);
SpawnBait();

document.addEventListener('keydown', (event) => {
    const keysToPreventScroll = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        " "
    ];
    if (keysToPreventScroll.includes(event.key)) {
        event.preventDefault(); 
    }
    if (event.key == "ArrowUp" || event.key == "W" || event.key == "w") {
        direction = 0;
    }
    else if (event.key == "ArrowRight" || event.key == "D" || event.key == "d") {
        direction = 1;
    }
    else if (event.key == "ArrowDown" || event.key == "S" || event.key == "s") {
        direction = 2;
    }
    else if (event.key == "ArrowLeft" || event.key == "A" || event.key == "a") {
        direction = 3;
    }
});

function StartSnakeGame () {
    
}
StartSnakeGame();

function StopSnakeGame () {

}