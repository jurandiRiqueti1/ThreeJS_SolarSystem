import * as THREE from 'three';
import { TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.set(0, 40, 60);
camera.lookAt(0, 0, 0);

//constantes
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const clock = new THREE.Clock;
//-----------------------------------------------------------------------

//Pointlight
const light = new THREE.PointLight( 0xffffff, 0.5, 100 );
light.position.set( 0, 35, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 50; // default
//-----------------------------------------------------------------------

//Spotlight parameters
const distanceSpotlight = 35;
const heightSpotlight = 35;
const intesitySpotlight = 0.5;
const cameraFarSpotlight = 120;

//Spotlight 1
const spotlight = new THREE.SpotLight( 0xffffff, intesitySpotlight);
spotlight.position.set( -35, heightSpotlight, distanceSpotlight );
spotlight.castShadow = true; // default false

//Set up shadow properties for the light
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;
spotlight.shadow.camera.near = 0.5;
spotlight.shadow.camera.far = cameraFarSpotlight;
spotlight.shadow.camera.fov = 20;
scene.add( spotlight );
//-----------------------------------------------------------------------

//Spotlight 2
const spotlight2 = new THREE.SpotLight( 0xffffff, intesitySpotlight);
spotlight2.position.set( 0, heightSpotlight, distanceSpotlight + 5 );
spotlight2.castShadow = true; // default false

//Set up shadow properties for the light
spotlight2.shadow.mapSize.width = 1024;
spotlight2.shadow.mapSize.height = 1024;
spotlight2.shadow.camera.near = 0.5;
spotlight2.shadow.camera.far = cameraFarSpotlight;
spotlight2.shadow.camera.fov = 20;
scene.add( spotlight2 );
//-----------------------------------------------------------------------

//Spotlight 3
const spotlight3 = new THREE.SpotLight( 0xffffff , intesitySpotlight);
spotlight3.position.set( 35, heightSpotlight, distanceSpotlight );
spotlight3.castShadow = true; // default false

//Set up shadow properties for the light
spotlight3.shadow.mapSize.width = 1024;
spotlight3.shadow.mapSize.height = 1024;
spotlight3.shadow.camera.near = 0.5;
spotlight3.shadow.camera.far = cameraFarSpotlight;
spotlight3.shadow.camera.fov = 20;
scene.add( spotlight3 );
//-----------------------------------------------------------------------

//Textures
const groundTexture = '../img/white_wood_texture.jpg';
const platformTexture = '../img/gray_wood_texture.jpg';
const milkWayTexture = '../img/star_texture.jpg';
const jupiterTexture = '../img/jupiter_texture.jpg';
const moon1Texture = '../img/moon1_texture.jpg';
const moon2Texture = '../img/moon2_texture.jpg';
const moon3Texture = '../img/moon3_texture.jpg';
const moon4Texture = '../img/moon4_texture.jpg'; 
//-----------------------------------------------------------------------

//Create a ground that receives shadows
const groundGeometry = new THREE.CylinderGeometry(100,100,0.5,64);
const groundMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(groundTexture),
    emissive: 0x000000,
    roughness: 0,
    metalness: 0.5
});
const ground = new THREE.Mesh( groundGeometry, groundMaterial );
ground.position.y = -12;
ground.castShadow = false; //default is false
ground.receiveShadow = true; //default
scene.add( ground );
//-----------------------------------------------------------------------

//Create platform
const platformGeometry = new THREE.CylinderGeometry(20,25,5.5,64);
const platformMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(platformTexture),
    emissive: 0x000000,
    roughness: 0,
    metalness: 0.5
});
const platformMesh = new THREE.Mesh(platformGeometry, platformMaterial);
platformMesh.position.y = -9;
platformMesh.castShadow = true;
platformMesh.receiveShadow = true;
scene.add(platformMesh);
//-----------------------------------------------------------------------

//Moon1
const moon1Speed = 1.8;
const moon1Size = 0.6;
const moon1Orbit = 5.5;
//-----------------------------------------------------------------------

//Moon2
const moon2Speed = -0.7;
const moon2Size = 1;
const moon2Orbit = moon1Orbit + 3;
//-----------------------------------------------------------------------

//Moon3
const moon3Speed = 0.4;
const moon3Size = 0.7;
const moon3Orbit = moon2Orbit + 3;
//-----------------------------------------------------------------------

//Mooon4
const moon4Speed = -0.16;
const moon4Size = 0.7;
const moon4Orbit = moon3Orbit + 3;
//-----------------------------------------------------------------------

//Milk Way
const estrelaGeometry = new THREE.SphereGeometry(320, 64, 64);
const estrelaMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(milkWayTexture),
    side: THREE.BackSide
});
const estrelaMesh = new THREE.Mesh(estrelaGeometry, estrelaMaterial);
scene.add(estrelaMesh);
//-----------------------------------------------------------------------

//Jupiter
const jupiterGeometry = new THREE.SphereGeometry(4, 64, 64);
const jupiterMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(jupiterTexture)
});
const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiterMesh.castShadow = true; //default is false
jupiterMesh.receiveShadow = false; //default
scene.add(jupiterMesh);
//-----------------------------------------------------------------------

//Moon1
const moon1Geometry = new THREE.SphereGeometry(moon1Size, 32, 32);
const moon1Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(moon1Texture)
});
const moon1Mesh = new THREE.Mesh(moon1Geometry, moon1Material);
moon1Mesh.position.set(moon1Orbit, 0, 0);
moon1Mesh.castShadow = true; //default is false
moon1Mesh.receiveShadow = false; //default
scene.add(moon1Mesh);
//-----------------------------------------------------------------------

//Moon2
const moon2Geometry = new THREE.SphereGeometry(moon2Size, 32, 32);
const moon2Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(moon2Texture)
});
const moon2Mesh = new THREE.Mesh(moon2Geometry, moon2Material);
moon2Mesh.position.set(moon2Orbit, 0, 0);
moon2Mesh.castShadow = true; //default is false
moon2Mesh.receiveShadow = false; //default
scene.add(moon2Mesh);
//-----------------------------------------------------------------------

//Moon3
const moon3Geometry = new THREE.SphereGeometry(moon3Size, 32, 32);
const moon3Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(moon3Texture)
});
const moon3Mesh = new THREE.Mesh(moon3Geometry, moon3Material);
moon3Mesh.position.set(moon3Orbit, 0, 0);
moon3Mesh.castShadow = true; //default is false
moon3Mesh.receiveShadow = false; //default
scene.add(moon3Mesh);
//-----------------------------------------------------------------------

//Moon4
const moon4Geometry = new THREE.SphereGeometry(moon4Size, 32, 32);
const moon4Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(moon4Texture)
});
const moon4Mesh = new THREE.Mesh(moon4Geometry, moon4Material);
moon4Mesh.position.set(moon4Orbit, 0, 0);
moon4Mesh.castShadow = true; //default is false
moon4Mesh.receiveShadow = false; //default
scene.add(moon4Mesh);
//-----------------------------------------------------------------------

//helpers
const helperSpotLight = new THREE.CameraHelper( spotlight.shadow.camera );
scene.add( helperSpotLight );

const helperSpotLight2 = new THREE.CameraHelper( spotlight2.shadow.camera );
scene.add( helperSpotLight2 );

const helperSpotLight3 = new THREE.CameraHelper( spotlight3.shadow.camera );
scene.add( helperSpotLight3 );

const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );
//-----------------------------------------------------------------------

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//-----------------------------------------------------------------------

function animate() {
    
    let time = clock.getElapsedTime();
    
    // Orbita da lua 1 em torno de Jupiter
    moon1Mesh.position.x = -Math.cos(time * moon1Speed) * moon1Orbit;
    moon1Mesh.position.z = -Math.sin(time * moon1Speed) * moon1Orbit;
    moon1Mesh.rotation.y += 0.02;
    // Orbita da lua 2 em torno de Jupiter
    moon2Mesh.position.x = -Math.cos(time * moon2Speed) * moon2Orbit;
    moon2Mesh.position.z = -Math.sin(time * moon2Speed) * moon2Orbit;
    moon2Mesh.rotation.y += 0.02;

    // Orbita da lua 3 em torno de Jupiter
    moon3Mesh.position.x = -Math.cos(time * moon3Speed) * moon3Orbit;
    moon3Mesh.position.z = -Math.sin(time * moon3Speed) * moon3Orbit;
    moon3Mesh.rotation.y += 0.02;

    // Orbita da lua 4 em torno de Jupiter
    moon4Mesh.position.x = -Math.cos(time * moon4Speed) * moon4Orbit;
    moon4Mesh.position.z = -Math.sin(time * moon4Speed) * moon4Orbit;
    moon4Mesh.rotation.y += 0.02;

    jupiterMesh.rotation.y += 0.01;

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);

}

animate();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);