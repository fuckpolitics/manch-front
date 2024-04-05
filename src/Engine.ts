import * as THREE from 'three'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { CAMERA, BG_COLOR } from './constants'
import type AbstractScene from './Scene/AbstractScene'

type Renderer = THREE.Renderer | CSS2DRenderer

export default class Engine {
  private readonly renderers: Record<string, Renderer> = {}

  private _scene!: AbstractScene
  private readonly _camera = new THREE.PerspectiveCamera(CAMERA.FOV, window.innerWidth / window.innerHeight, CAMERA.NEAR, CAMERA.FAR)

  get camera (): THREE.PerspectiveCamera {
    return this._camera
  }

  get scene (): AbstractScene {
    return this._scene
  }

  set scene (scene: AbstractScene) {
    this._scene = scene
    this._camera.position.set(0, 0, 0)
  }

  public updateObjects: Array<{ update: () => void }> = []

  constructor () {
    const webglRenderer = new THREE.WebGLRenderer()
    webglRenderer.setPixelRatio(window.devicePixelRatio)
    webglRenderer.setClearColor(BG_COLOR)
    document.body.appendChild(webglRenderer.domElement)
    this.addRenderer('WebGL', webglRenderer)

    const css2dRenderer = new CSS2DRenderer()
    this.addRenderer('CSS2D', css2dRenderer)
    css2dRenderer.domElement.style.position = 'absolute'
    css2dRenderer.domElement.style.top = '0px'
    document.body.appendChild(css2dRenderer.domElement)

    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.onUpdate()
  }

  private onUpdate (): void {
    requestAnimationFrame(this.onUpdate.bind(this))
    if (!this.scene) return
    this.updateObjects.forEach(object => {
      object.update()
    })
    Object.values(this.renderers).forEach((renderer) => {
      renderer.render(this.scene, this.camera)
    })
  }

  private onWindowResize (): void {
    Object.values(this.renderers).forEach((renderer) => {
      renderer.setSize(window.innerWidth, window.innerHeight)
    })
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  getRenderer (name: string): Renderer {
    return this.renderers[name]
  }

  addRenderer (name: string, renderer: Renderer): void {
    this.renderers[name] = renderer
  }

  removeRenderer (name: string): void {
    this.renderers[name] && delete this.renderers[name]
  }
}
