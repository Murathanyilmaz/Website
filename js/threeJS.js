const scene = new THREE.Scene();
const loader = new THREE.GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const container = document.querySelector('.threeJS-area-1');

scene.background = new THREE.Color(0x505050);
const scaler = 0.6;
let widthSize = window.innerWidth * scaler;
let heightSize = widthSize * 0.6;
let aspect = widthSize/heightSize;
const camera = new THREE.PerspectiveCamera(90, aspect, 0.1, 100);//FOV-ASPECT-NEAR-FAR
camera.position.z = 0;
/*
const renderer = new THREE.WebGLRenderer({
    alpha: true
});
scene.background = null;*/
const renderer = new THREE.WebGLRenderer();
renderer.setSize(widthSize, heightSize);
container.appendChild(renderer.domElement);

//CREATE ROOM
const planeGeo = new THREE.PlaneGeometry(20, 20, 1, 1);
const floorTexture = textureLoader.load('img/icons/gmail.png',
    function (texture) {
        const floorMat = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0x502020,
        });
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 30);
        floor.material = floorMat;
        console.log('Floor texture loaded successfully!');
    },
    undefined,
    function (err) {
        console.error('An error occurred loading the texture', err);
    }
);

const planeMat = new THREE.MeshBasicMaterial({ color: 0xCCCCAA });
const ceilingMat = new THREE.MeshBasicMaterial({ color: 0xBBBB99 });
const backWallMat = new THREE.MeshBasicMaterial({ color: 0x999977 });
const leftWall = new THREE.Mesh(planeGeo, planeMat);
const rightWall = new THREE.Mesh(planeGeo, planeMat);
const floor = new THREE.Mesh(planeGeo);
const ceiling = new THREE.Mesh(planeGeo, ceilingMat);
const backWall = new THREE.Mesh(planeGeo, backWallMat);
leftWall.position.z = -15;
leftWall.position.x = -10;
leftWall.rotation.y = THREE.MathUtils.degToRad(90);
leftWall.name = "Wall";
scene.add(leftWall);
rightWall.position.z = -15;
rightWall.position.x = 10;
rightWall.rotation.y = THREE.MathUtils.degToRad(-90);
rightWall.name = "Wall";
scene.add(rightWall);
floor.position.y = -8;
floor.position.z = -15;
floor.rotation.x = THREE.MathUtils.degToRad(-90);
floor.name = "Wall";
scene.add(floor);
ceiling.position.y = 8;
ceiling.position.z = -15;
ceiling.rotation.x = THREE.MathUtils.degToRad(90);
ceiling.name = "Wall";
scene.add(ceiling);
backWall.position.z = -15;
backWall.name = "Wall";
scene.add(backWall);

//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 5); 
scene.add(directionalLight);
//directionalLight.target.position.set(0, 0, 0); //Default
//scene.add(directionalLight.target); // Need to add the target if you change its position

let spawnPos = new THREE.Vector3(0, 0, -10);
let inTheArea = false;
let canSpawn = false;
let cooldown = true;
let frameCount = 0;
let spawnCount = 0;
let spawnItems = [];
let monkey = null;
let eaten = false;
let ateCount = 0;
let animationFrameId = null;

//RAYCAST
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
//window.addEventListener('click', onMouseClick);
window.addEventListener("mousemove", onMouseMove);

const fov = camera.fov;
const dis = -spawnPos.z;
const fovRad = THREE.MathUtils.degToRad(fov);
const scaleY = dis * Math.tan(fovRad / 2);
const scaleX = scaleY * aspect;

function CalculateCoords (value) {
    const rect = container.getBoundingClientRect();
    const clientX_relative = value.clientX - rect.left; 
    const clientY_relative = value.clientY - rect.top;
    mouse.x = ((clientX_relative / rect.width) *  2 - 1) / scaler; 
    mouse.y = (-(clientY_relative / rect.height) * 2 + 1);
    spawnPos.x = mouse.x * scaleX;
    spawnPos.y = mouse.y * scaleY;
    /*if (spawnPos.x < -8) spawnPos.x += 16;
    else if (spawnPos.x > 8) spawnPos.x -= 16;
    if (spawnPos.y < -8) spawnPos.y += 16;
    else if (spawnPos.y > 8) spawnPos.y -= 16;*/
    if (mouse.x > -1 && mouse.x < 1 && mouse.y > -1 && mouse.y < 1) {
        inTheArea = true;
    }
    else inTheArea = false;
    //document.querySelector(".threeJS-desc").innerHTML = "X: " + mouse.x.toFixed(2) + " | Y: " + mouse.y.toFixed(2);
}

function onMouseMove(event) {
    CalculateCoords(event);
    Hover();
    SpawnItem();
    /*setTimeout(() => {
        RemoveItem();
    }, 500);*/
}

function onMouseClick(event) {
    CalculateCoords(event);
}

function Hover() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0 && inTheArea) {
        //const hitObject = intersects[0].object;
        canSpawn = true;
        //container.style.cursor = 'pointer';
    }
    else {
        //container.style.cursor = 'default';
        canSpawn = false;
    }
}

function MoveMonkey () {
    let rand1 = (Math.random() * 16) - 8;
    let rand2 = (Math.random() * 16) - 8;
    monkey.position.x = rand1;
    monkey.position.y = rand2;
    monkey.lookAt(new THREE.Vector3(spawnPos.x, spawnPos.y, camera.position.z - 8));
    ateCount += 10;
    setTimeout(() => {
        eaten = false;
    }, 100);
}

function SpawnItem() {
    if (!inTheArea || !canSpawn || !cooldown) return;
    cooldown = false;
    setTimeout(() => {
        cooldown = true;
    }, 5);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x444444});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = spawnPos.x;
    cube.position.y = spawnPos.y;
    cube.position.z = spawnPos.z;
    cube.name = "Cube";
    scene.add(cube);
    spawnItems.push(cube);
    if (spawnItems.length > ateCount + 10) {
        if (spawnItems[0] == null) return;
        spawnItems[0].traverse((child) => {
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
        scene.remove(spawnItems[0]);
        spawnItems[0] = null;
        spawnItems.shift();
    }
}

//LOAD MODEL
loader.load(
    'models/hat.glb', 
    function (gltf) {
        const model = gltf.scene; 
        model.scale.set(0.5, 0.5, 0.5);
        model.position.x = 0;
        model.position.y = 0;
        model.position.z = -10;
        scene.add(model);
        monkey = model;
        const testMat = new THREE.MeshStandardMaterial({ color: 0x707070});
        monkey.traverse((child) => {
            if (child.isMesh) {
                child.material = testMat;
            }
        });
    },
    function (xhr) {
        console.log((Math.floor(xhr.loaded / xhr.total) * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

function Start3D_Scene() {
    if (!animationFrameId) {
        animateJS();
    }
}

function Stop3D_Scene() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function animateJS() {
    //animationFrameId = requestAnimationFrame(animateJS);
    if (jsSection != "snake3D") {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        return;
    }
    //ROTATION
    requestAnimationFrame(animateJS);
    //COLOR
    frameCount++;
    const hue = (frameCount % 200) / 200;
    if (frameCount > 200) frameCount = 0;
    if (monkey) {
        //monkey.rotation.y += 0.01;
        monkey.lookAt(new THREE.Vector3(spawnPos.x, spawnPos.y, camera.position.z - 8));
        /*monkey.position.x = spawnPos.x;
        monkey.position.y = spawnPos.y;
        monkey.position.z = spawnPos.z;*/
        monkey.traverse((child) => {
            if (child.isMesh) {
                child.material.color.setHSL(hue, 1, 0.2);
            }
        });
    }

    if (monkey) {
        if (eaten) return;
        let distance = spawnPos.distanceTo(monkey.position);
        if (distance < 1 && inTheArea) {
            eaten = true;
            MoveMonkey();
        }
    }
    spawnItems.forEach((el, i) => {
        el.material.color.setHSL(hue + (i / spawnItems.length) , 0.8, 0.4);
    })
    //widthSize = window.innerWidth * scaler;
    //heightSize = aspect * widthSize;
    widthSize = window.innerWidth * scaler;
    heightSize = widthSize * 0.6;
    aspect = widthSize/heightSize;
    camera.aspect = aspect
    renderer.setSize(widthSize, heightSize);
    renderer.render(scene, camera);
    camera.position.x = spawnPos.x / 50;
    camera.position.y = spawnPos.y / 50;
    camera.rotation.x = spawnPos.y / 90;
    camera.rotation.y = -spawnPos.x / 90;
    camera.updateProjectionMatrix();
}
jsSection = "snake3D";
animateJS();

function DisposeScene(scene) {
    scene.traverse((object) => {
        if (object.geometry) {
            object.geometry.dispose();
            console.log('Disposed geometry:', object.geometry.uuid);
        }
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
            } else {
                object.material.dispose();
            }
            console.log('Disposed material:', object.material.uuid);
        }
        if (object.material && object.material.map) {
            object.material.map.dispose();
            console.log('Disposed texture:', object.material.map.uuid);
        }
    });
    //renderer.domElement.remove(); 
}

function RemoveEventListeners() {
    //window.removeEventListener("mousemove", onMouseMove);
    //window.removeEventListener("click", onMouseClick);
}