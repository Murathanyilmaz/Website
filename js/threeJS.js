const scene = new THREE.Scene();
const loader = new THREE.GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const container = document.querySelector('.threeJS-area');

scene.background = new THREE.Color(0x202020);
const scaler = 0.6;
const aspect = 0.60;
let widthSize = window.innerWidth * scaler;
let heightSize = aspect * widthSize;
const camera = new THREE.PerspectiveCamera(90, 1, 0.1, 100);//FOV-ASPECT-NEAR-FAR
camera.position.z = 10;

/*
const renderer = new THREE.WebGLRenderer({
    alpha: true
});
scene.background = null;*/

const renderer = new THREE.WebGLRenderer();
renderer.setSize(widthSize, heightSize);
document.querySelector('.threeJS-area').appendChild(renderer.domElement);

//CREATE ROOM
let walls = [];
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
const backWallMat = new THREE.MeshBasicMaterial({ color: 0x887788 });
const leftWall = new THREE.Mesh(planeGeo, planeMat);
const rightWall = new THREE.Mesh(planeGeo, planeMat);
const floor = new THREE.Mesh(planeGeo);
const ceiling = new THREE.Mesh(planeGeo, ceilingMat);
const backWall = new THREE.Mesh(planeGeo, backWallMat);
leftWall.position.z = -5;
leftWall.position.x = -10;
leftWall.rotation.y = THREE.MathUtils.degToRad(90);
leftWall.name = "Wall";
scene.add(leftWall);
walls.push(leftWall);
rightWall.position.z = -5;
rightWall.position.x = 10;
rightWall.rotation.y = THREE.MathUtils.degToRad(-90);
rightWall.name = "Wall";
scene.add(rightWall);
walls.push(rightWall);
floor.position.y = -10;
floor.position.z = -5;
floor.rotation.x = THREE.MathUtils.degToRad(-90);
floor.name = "Wall";
scene.add(floor);
walls.push(floor);
ceiling.position.y = 10;
ceiling.position.z = -5;
ceiling.rotation.x = THREE.MathUtils.degToRad(90);
ceiling.name = "Wall";
scene.add(ceiling);
walls.push(ceiling);
backWall.position.z = -10;
backWall.name = "Wall";
scene.add(backWall);
walls.push(backWall);

//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5); 
scene.add(directionalLight);
//directionalLight.target.position.set(0, 0, 0); //Default
//scene.add(directionalLight.target); // Need to add the target if you change its position

let spawnPos = new THREE.Vector3(0, 0, -3);
let inTheArea = false;
let canSpawn = false;
let cooldown = true;
let frameCount = 0;
let spawnCount = 0;
let spawnItems = [];

//RAYCAST
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', onMouseClick);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mouseover", onmouseover);

function CalculateCoords (value) {
    const rect = container.getBoundingClientRect();
    const clientX_relative = value.clientX - rect.left; 
    const clientY_relative = value.clientY - rect.top;
    mouse.x = ((clientX_relative / rect.width) *  2 - 1) / scaler; 
    mouse.y = -(clientY_relative / rect.height) * 2 + 1;
    spawnPos.x = mouse.x * -(spawnPos.z - camera.position.z);
    spawnPos.y = mouse.y * -(spawnPos.z - camera.position.z);
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
    setTimeout(() => {
        RemoveItem();
    }, 500);
    
}

function onMouseClick(event) {
    CalculateCoords(event);
    //SpawnItem();
}

let monkey = null;
function Hover() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(walls, true);
    if (intersects.length > 0) {
        //const hitObject = intersects[0].object;
        canSpawn = true;
        container.style.cursor = 'pointer';
    }
    else {
        container.style.cursor = 'default';
        canSpawn = false;
    }
}

function RemoveItem () {
    if (spawnItems.length > 0 || !cooldown) {
        cooldown = false;
        if (spawnItems[0] == null) return;
        spawnItems[0].traverse((child) => {
            if (child.isMesh) {
                if (child.geometry) child.geometry.dispose();
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => m.dispose());
                } else if (child.material) {
                    child.material.dispose();
                }
            }
        });
        scene.remove(spawnItems[0]);
        spawnItems.shift();
        setTimeout(() => {
            cooldown = true;
        }, 10);
    }
}

function SpawnItem() {
    if (!inTheArea || !canSpawn) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x444444});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = spawnPos.x;
    cube.position.y = spawnPos.y;
    cube.position.z = spawnPos.z;
    cube.name = "Cube";
    scene.add(cube);
    spawnItems.push(cube);

    /*if (intersects.length > 0) {
        const firstHit = intersects[0].object;
        let objectToRemove = null;

        if (firstHit === cube) {
            console.log("Cube Clicked!");
            objectToRemove = cube;
        }

        let currentParent = firstHit;
        while (currentParent) {
            if (currentParent === monkey) {
                console.log("Monkey Model Clicked!");
                objectToRemove = monkey;
                break;
            }
            currentParent = currentParent.parent;
        }
        
        // --- Deletion Logic ---
        if (objectToRemove) {
            // Traverse and dispose resources (memory cleanup)
            objectToRemove.traverse((child) => {
                if (child.isMesh) {
                    if (child.geometry) child.geometry.dispose();
                    if (Array.isArray(child.material)) {
                        child.material.forEach(m => m.dispose());
                    } else if (child.material) {
                        child.material.dispose();
                    }
                }
            });

            // Remove the object from the scene
            scene.remove(objectToRemove);
            
            // If the monkey was removed, set the global reference to null
            if (objectToRemove === monkey) {
                monkey = null;
            }
        }
    }*/
}

//LOAD MODEL
loader.load(
    'models/hat.glb', 
    function (gltf) {
        const model = gltf.scene; 
        model.scale.set(0.5, 0.5, 0.5);
        model.position.x = -3;
        model.position.y = 3;
        model.position.z = -5;
        scene.add(model);
        monkey = model;
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

function animate() {
    //ROTATION
    requestAnimationFrame(animate);
    //COLOR
    frameCount++;
    const hue = (frameCount % 200) / 200;
    if (frameCount > 200) frameCount = 0;
    if (monkey) {
        //monkey.rotation.y += 0.01;
        monkey.lookAt(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z - 10));
        monkey.position.x = spawnPos.x;
        monkey.position.y = spawnPos.y;
        monkey.position.z = spawnPos.z;
        latestPos = spawnPos;
        monkey.traverse((child) => {
            if (child.isMesh) {
                child.material.color.setHSL(hue, 0.5, 0.5);
            }
        });
    }
    spawnItems.forEach((el, i) => {
        el.material.color.setHSL(hue + (i / spawnItems.length) , 0.5, 0.5);
    })
    widthSize = window.innerWidth * scaler;
    heightSize = aspect * widthSize;
    renderer.setSize(widthSize, heightSize);
    renderer.render(scene, camera);
}
animate();

/*
if (monkey) {
    // 1. Traverse and dispose resources
    monkey.traverse((child) => {
        if (child.isMesh) {
            // Dispose geometry and materials
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                // Handle materials (which might be an array or a single material)
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
                
                // Note: If you share materials, only dispose of them once.
                // In your case (changing color), they are likely unique per mesh.
            }
        }
    });

    // 2. Remove the object from the scene
    scene.remove(monkey);

    // 3. Set the global reference to null (optional, but good practice)
    monkey = null;
}*/