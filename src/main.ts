import './style.css'
import Engine from './Engine'
import MenuScene from './Scene/MenuScene'

const engine = new Engine()
new MenuScene(engine).load()

// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)
//
// const scene = new THREE.Scene()
//
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
//
// const controls = new OrbitControls(camera, renderer.domElement)
//
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
//
// camera.position.z = 5
// controls.update()
// animate()
// function animate (): void {
//   requestAnimationFrame(animate)
//
//   // required if controls.enableDamping or controls.autoRotate are set to true
//   controls.update()
//
//   renderer.render(scene, camera)
// }
