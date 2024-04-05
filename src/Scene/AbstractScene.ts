import { Scene } from 'three'
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
import type Engine from '../Engine'

export default abstract class AbstractScene extends Scene {
  protected readonly mainUiBlock = document.createElement('div')
  protected readonly mailUiObject = new CSS2DObject(this.mainUiBlock)

  constructor (protected readonly engine: Engine) {
    super()
  }

  load (): void {
    this.engine.scene = this
    this.init()
  }

  protected abstract init (): void

  protected clearMailUiBlock (): void {
    // this.mainUiBlock.innerHTML = ''
  }
}
