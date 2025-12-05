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

const snakeLeftWall = leftWall.clone();
const snakeRightWall = rightWall.clone();
const snakeFloor = floor.clone();
const snakeCeiling = ceiling.clone();

snake3dScene.add(snakeLeftWall);
snake3dScene.add(snakeRightWall);
snake3dScene.add(snakeFloor);
snake3dScene.add(snakeCeiling);


snakeRenderer.setSize(widthSize, heightSize);
snakeRenderer.render(snake3dScene, snakeCam);

const sphereGeo = new THREE.SphereGeometry(1, 16, 16);
const snakeMat = new THREE.MeshStandardMaterial({ color: 0x444444});
const snakeHead = new THREE.Mesh(sphereGeo, snakeMat);
snakeHead.name = "SnakeHead";
snakeHead.position.z = -10;
snake3dScene.add(snakeHead);


function SnakeAnimation () {

    requestAnimationFrame(SnakeAnimation);
    
    widthSize = window.innerWidth * scaler;
    heightSize = widthSize * 0.6;
    aspect = widthSize/heightSize;
    snakeCam.aspect = aspect
    snakeCam.updateProjectionMatrix();
    snakeRenderer.setSize(widthSize, heightSize);
    snakeRenderer.render(snake3dScene, snakeCam);


    snakeHead.position.x+=0.01;

}
SnakeAnimation();