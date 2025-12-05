const snake3dScene = new THREE.Scene();
const snakeContainer = document.querySelector('.threeJS-area-2');
snake3dScene.background = new THREE.Color(0x505050);

const snakeCam = new THREE.PerspectiveCamera(90, 1, 0.1, 100);//FOV-ASPECT-NEAR-FAR
snakeCam.position.z = 10;
/*
const snakeRenderer = new THREE.WebGLRenderer({
    alpha: true
});*/
//scene.background = null;
const snakeRenderer = new THREE.WebGLRenderer();
snakeRenderer.setSize(widthSize, heightSize);
snakeContainer.appendChild(snakeRenderer.domElement);
const snake3dCamera = new THREE.PerspectiveCamera(90, 1, 0.1, 100);//FOV-ASPECT-NEAR-FAR
snake3dCamera.position.z = 10;

const snakeLeftWall = leftWall.clone();
const snakeRightWall = rightWall.clone();
const snakeFloor = floor.clone();
const snakeCeiling = ceiling.clone();

snake3dScene.add(snakeLeftWall);
snake3dScene.add(snakeRightWall);
snake3dScene.add(snakeFloor);
snake3dScene.add(snakeCeiling);


snakeRenderer.setSize(widthSize, heightSize);
snakeRenderer.render(snake3dScene, snake3dCamera);