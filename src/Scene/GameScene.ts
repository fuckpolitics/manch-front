import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import AbstractScene from './AbstractScene'

export default class GameScene extends AbstractScene {
  protected init (): void {
    this.engine.getRenderer('CSS2D').domElement.style.pointerEvents = 'none'

    const ambientLight = new THREE.AmbientLight(0x777777)
    this.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF)
    this.add(directionalLight)
    directionalLight.position.set(5, 5, -5)

    const floorGeometry = new THREE.PlaneGeometry(7.5, 7.5)
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.position.set(0, -4, 0)
    floor.rotateX(-Math.PI / 2)
    this.add(floor)

    const loader = new GLTFLoader()
    loader.load('table/scene.gltf', gltf => {
      this.add(gltf.scene)
      gltf.scene.position.set(0, 0, 0)

      const controls = new OrbitControls(this.engine.camera, this.engine.getRenderer('WebGL')?.domElement)
      this.engine.camera.position.z = 10
      this.engine.camera.lookAt(gltf.scene.position)
      directionalLight.lookAt(gltf.scene.position)

      const floor2Geometry = new THREE.BoxGeometry(1, 1, 0.01)
      const envMap = new THREE.TextureLoader().load('adsf.png')
      const floor2Material = new THREE.MeshBasicMaterial()
      floor2Material.map = envMap
      const floor2 = new THREE.Mesh(floor2Geometry, floor2Material)
      floor2.position.set(0, 0.5, 0)
      floor2.rotateX(-Math.PI / 2)
      this.add(floor2)
      const c2 = floor2.clone()
      c2.position.y = 0.52
      this.add(c2)
      // this.add(floor2)
      // this.add(floor2)
      // this.add(floor2)

      controls.update()
      this.engine.updateObjects.push(controls)
    })
  }
}
