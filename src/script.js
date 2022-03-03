import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x000000 );
// Instantiate a loader
const loader = new GLTFLoader();
loader.load( 'https://d1a370nemizbjq.cloudfront.net/2e8848cf-64c5-478a-b5eb-f30a60c74f51.glb', function ( obj ) {

    const root = obj.scene
    var box = new THREE.Box3().setFromObject( root );
    var center = new THREE.Vector3();
    box.getCenter( center );
    root.position.sub( center ); // center the model
    // root.rotation.y = Math.PI;   // rotate the model
    scene.add( root );

}, undefined, function ( error ) {

	console.error( error );

} );

var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );
// const light = new THREE.DirectionalLight(0xffffff, 1)
// light.position.set(2, 2, 5)
// scene.add(light)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding;
/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{
    // Render
    renderer.render(scene, camera)
controls.update()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()