//CREATE SCENE
const container = document.querySelector('.threeJS-area');

const scene = new THREE.Scene();
const loader = new THREE.GLTFLoader();
scene.background = new THREE.Color(0x101010);
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10);//FOV-ASPECT-NEAR-FAR
camera.position.z = 3;
//CLEAN BACKGROUND
const renderer = new THREE.WebGLRenderer({
    alpha: true
});
//scene.background = null;
//SCREEN SIZE
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.querySelector('.threeJS-area').appendChild(renderer.domElement);
//CREATE MESH
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 1;
cube.position.y = -1;
scene.add(cube);
//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5); 
//directionalLight.target.position.set(0, 0, 0); //Default

scene.add(directionalLight);
//scene.add(directionalLight.target); // Need to add the target if you change its position

//RAYCAST
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    const rect = container.getBoundingClientRect();
    const clientX_relative = event.clientX - rect.left;
    const clientY_relative = event.clientY - rect.top;
    mouse.x = (clientX_relative / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY_relative / window.innerHeight) * 2 + 1;
    checkIntersections();
}

let monkey = null;

function checkIntersections() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    console.log(intersects.length);
    /*if (intersects.length > 0) {
        console.log(intersects.length);
        const firstHit = intersects[0].object;
        console.log(firstHit.name);
        console.log('Clicked on:', firstHit.name || firstHit.uuid);
        if (monkey != null && firstHit === monkey) {
            console.log("Monkey");
        } 
        else if (firstHit === cube) {
            console.log("Cube");
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