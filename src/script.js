// yes structure of this code is ugly but it s just an experiment about threejs
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('lightblue')

const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/7.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader()
// const cubetexture = textureLoader.load('textures/sq.png')
// cubetexture.magFilter = THREE.NearestFilter
// cubetexture.generateMipmaps = false

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshStandardMaterial({map: cubetexture})
// )

// cube.position.set(-2, 0, 0)
// scene.add(cube)

const fontLoader = new FontLoader()

const bevelSize = 0.02;
const bevelThickness = 0.03

const textMaterial = new THREE.MeshMatcapMaterial();
textMaterial.matcap = matcapTexture;

fontLoader.load('fonts/font.json', (font) => {
    const textGeometry = new TextGeometry('Hello Karina!', {
        font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness,
        bevelSize,
        bevelOffset: 0,
        bevelSegments: 4,
    })

    textGeometry.center()
    // textGeometry.computeBoundingBox()

    // textGeometry.translate(
    //     - (textGeometry.boundingBox.max.x - bevelSize) * 0.5,
    //     - (textGeometry.boundingBox.max.y - bevelSize) * 0.5,
    //     - (textGeometry.boundingBox.max.z - bevelThickness) * 0.5
    // )

    // textGeometry.computeBoundingBox()
    // console.log(textGeometry.boundingBox)



    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
})

// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper)

const light = new THREE.AmbientLight('white', 0.5)
const point = new THREE.PointLight('white', 10)

point.position.set(0, 1, 1)

scene.add(light, point)

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

const geom = new THREE.TorusGeometry(0.5, 0.2, 20, 50);
for (let i = 0; i < 200; i++) {

    const donut = new THREE.Mesh(geom, textMaterial)

    donut.position.x = (Math.random() - 0.5) * 20
    donut.position.y = (Math.random() - 0.5) * 20
    donut.position.z = (Math.random() - 0.5) * 20

    donut.rotation.x = Math.PI*Math.random()
    donut.rotation.y = Math.PI*Math.random()

    const scaleSize = Math.random()

    donut.scale.set(scaleSize, scaleSize, scaleSize)
    // donut.scale.x = scaleSize
    // donut.scale.y = scaleSize
    // donut.scale.z = scaleSize

    scene.add(donut)
}


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()