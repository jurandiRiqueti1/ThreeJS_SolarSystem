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
    0.001,
    5000
);
camera.position.set(0, 40, 60);
camera.lookAt(0, 0, 0);

//constantes
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const clock = new THREE.Clock;
const objectsDefinition = 10;
//-----------------------------------------------------------------------

//objects
const starsObj = {
    radius: 1000,
    texture: '../img/milky_way_texture.jpg'
}

const sunObj = {
    radius: 13.91000/2,
    rotation: 0.01,
    texture: '../img/sun/sun_texture.jpg'
}

const mercuryObj = {
    radius: 0.04880/2,
    rotation: 0.01,
    texture: '../img/mercury/mercury_texture.jpg'
}

const venusObj = {
    radius: 0.12104/2,
    rotation: 0.01,
    texture: '../img/venus/venus_atmosphere_texture.jpg'
}

const earthObj = {
    radius: 0.12756/2,
    radiusCloud: (0.12756/2) + 0.001,
    rotation: 0.01,
    rotationCloud: 0.02,
    texture: '../img/earth/earth_day_texture.jpg',
    textureCloud: '../img/earth/earth_cloud_texture.png',
    normalMap: '../img/earth/earth_normal_map.tif',
    specularMap: '../img/earth/earth_specular_map.tif'
}

//-----------------------------------------------------------------------

//Milk Way
const starsGeometry = new THREE.SphereGeometry(starsObj.radius, objectsDefinition, objectsDefinition);
const starsMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(starsObj.texture),
    side: THREE.BackSide
});
const stars = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(stars);
//-----------------------------------------------------------------------

//Sun
const sunGeometry = new THREE.SphereGeometry(sunObj.radius, objectsDefinition, objectsDefinition);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunObj.texture)
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
//-----------------------------------------------------------------------

//mercury
const mercuryGeometry = new THREE.SphereGeometry(mercuryObj.radius, objectsDefinition, objectsDefinition);
const mercuryMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(mercuryObj.texture)
})
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);
//-----------------------------------------------------------------------

//venus
const venusGeometry = new THREE.SphereGeometry(venusObj.radius, objectsDefinition, objectsDefinition);
const venusMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(venusObj.texture)
})
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus);
//-----------------------------------------------------------------------

//earth group
const earthGroup = new THREE.Group();

const earthGeometry = new THREE.SphereGeometry(earthObj.radius, objectsDefinition, objectsDefinition);
const earthMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(earthObj.texture)
})
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earth);

const cloudGeometry = new THREE.SphereGeometry(earthObj.radiusCloud, objectsDefinition, objectsDefinition);
const cloudMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(earthObj.textureCloud),
    transparent: true
});
const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
earthGroup.add(cloud);

scene.add(earthGroup);
//-----------------------------------------------------------------------

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//-----------------------------------------------------------------------

function animate() {
    
    let time = clock.getElapsedTime();

    //obj rotations
    sun.rotation.y += sunObj.rotation;
    cloud.rotation.y += earthObj.rotationCloud;

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