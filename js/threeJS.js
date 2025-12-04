const scene = new THREE.Scene();
const loader = new THREE.GLTFLoader();

const container = document.querySelector('.threeJS-area');

scene.background = new THREE.Color(0x202020);
const scaler = 0.6;
const aspect = 0.60;
let widthSize = window.innerWidth * scaler;
let heightSize = aspect * widthSize;
const camera = new THREE.PerspectiveCamera(90, 1, 0.1, 10);//FOV-ASPECT-NEAR-FAR
camera.position.z = 5;

/*
const renderer = new THREE.WebGLRenderer({
    alpha: true
});
scene.background = null;*/

const renderer = new THREE.WebGLRenderer();
renderer.setSize(widthSize, heightSize);
document.querySelector('.threeJS-area').appendChild(renderer.domElement);
//CREATE MESH
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 3;
cube.position.y = -1;
cube.name= "Cube1";
scene.add(cube);
//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5); 
//directionalLight.target.position.set(0, 0, 0); //Default
scene.add(directionalLight);
//scene.add(directionalLight.target); // Need to add the target if you change its position

let currentIntersected = null;


//RAYCAST
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', onMouseClick);
window.addEventListener("mousemove", onMouseMove);

let spawnPos = new THREE.Vector2(0, 0);

function CalculateCoords (value) {
    const rect = container.getBoundingClientRect();
    const clientX_relative = value.clientX - rect.left; 
    const clientY_relative = value.clientY - rect.top;
    mouse.x = ((clientX_relative / rect.width) *  2 - 1) / scaler; 
    mouse.y = -(clientY_relative / rect.height) * 2 + 1;
    spawnPos.x = mouse.x * camera.position.z;
    spawnPos.y = mouse.y * camera.position.z;
    document.querySelector(".threeJS-desc").innerHTML = mouse.x.toFixed(2) + ":" + mouse.y.toFixed(2);
}
function onMouseMove(event) {
    CalculateCoords(event);
    checkHover();
    //checkIntersections();
}
function onMouseClick(event) {
    CalculateCoords(event);
    checkIntersections();
}

let monkey = null;
function checkHover() {
    raycaster.setFromCamera(mouse, camera);
    const objectsToTest = [cube]; 
    if (monkey) {
        objectsToTest.push(monkey);
    }
    // Check intersections (recursive: true)
    const intersects = raycaster.intersectObjects(objectsToTest, true);
    if (intersects.length > 0) {
        const hitObject = intersects[0].object;
        
        // Use the ancestor logic to find the main parent (cube or monkey)
        let foundObject = null;
        
        // Check for Cube
        if (hitObject === cube) {
            foundObject = cube;
        } else {
            // Check for Monkey model (by traversing parents)
            let currentParent = hitObject;
            while (currentParent) {
                if (currentParent === monkey) {
                    foundObject = monkey;
                    break;
                }
                currentParent = currentParent.parent;
            }
        }
        
        // --- Cursor Management ---
        if (foundObject && foundObject !== currentIntersected) {
            // NEW OBJECT HOVERED
            currentIntersected = foundObject;
            container.style.cursor = 'pointer'; // Change cursor to a hand
            console.log("HOVERING:", currentIntersected.name || 'Monkey Model');
        }
        
    } else {
        if (currentIntersected) {
            currentIntersected = null;
            container.style.cursor = 'default';
        }
    }
}

function checkIntersections() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = spawnPos.x;
    cube.position.y = spawnPos.y;
    scene.add(cube);

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

let frameCount = 0;
//LOAD MODEL
loader.load(
    'models/hat.glb', 
    function (gltf) {
        const model = gltf.scene; 
        model.scale.set(0.5, 0.5, 0.5);
        model.position.x = -1;
        model.position.y = 1;
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
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //COLOR
    frameCount++; 
    const hue = (frameCount % 200) / 200;
    material.color.setHSL(hue, 0.5, 0.5);

    if (monkey) {
        monkey.rotation.y += 0.01;
        monkey.traverse((child) => {
            if (child.isMesh) {
                child.material.color.setHSL(-hue, 0.5, 0.5);
            }
        });
    }

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