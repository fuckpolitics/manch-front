import AbstractScene from './AbstractScene'
import GameScene from './GameScene'

export default class MenuScene extends AbstractScene {
  protected init (): void {
    this.add(this.mailUiObject)
    this.mailUiObject.position.set(0, 0, -100)
    this.renderLoginMenu()
  }

  protected clearMailUiBlock (): void {
    super.clearMailUiBlock()
    const title = document.createElement('h1')
    title.style.textAlign = 'center'
    title.textContent = 'Munch'
    this.mainUiBlock.appendChild(title)
  }

  private renderLoginMenu (): void {
    this.clearMailUiBlock()
    const loginBlock = document.createElement('div')
    loginBlock.style.display = 'flex'
    loginBlock.style.flexDirection = 'column'
    loginBlock.style.alignItems = 'center'
    loginBlock.style.justifyContent = 'center'

    const loginInput = document.createElement('input')
    loginInput.placeholder = 'Логин'
    loginInput.type = 'text'

    const passwordInput = document.createElement('input')
    passwordInput.placeholder = 'Пароль'
    passwordInput.type = 'password'

    const loginButton = document.createElement('button')
    loginButton.textContent = 'Войти'
    loginButton.addEventListener('click', () => {
      this.remove(this.mailUiObject)
      new GameScene(this.engine).load()
    })

    const registerButton = document.createElement('button')
    registerButton.textContent = 'Регистрация'
    registerButton.addEventListener('click', this.renderRegistrationMenu.bind(this))

    loginBlock.appendChild(loginInput)
    loginBlock.appendChild(passwordInput)
    loginBlock.appendChild(loginButton)
    loginBlock.appendChild(registerButton)
    this.mainUiBlock.appendChild(loginBlock)
  }

  private renderRegistrationMenu (): void {
    this.clearMailUiBlock()
    const registrationBlock = document.createElement('div')
    registrationBlock.style.display = 'flex'
    registrationBlock.style.flexDirection = 'column'
    registrationBlock.style.alignItems = 'center'
    registrationBlock.style.justifyContent = 'center'

    const loginInput = document.createElement('input')
    loginInput.placeholder = 'Логин'
    loginInput.type = 'text'

    const passwordInput = document.createElement('input')
    passwordInput.placeholder = 'Пароль'
    passwordInput.type = 'password'

    const passwordRepeatInput = document.createElement('input')
    passwordRepeatInput.placeholder = 'Повторите пароль'
    passwordRepeatInput.type = 'password'

    const registerButton = document.createElement('button')
    registerButton.textContent = 'Зарегистрироваться'
    registerButton.addEventListener('click', this.renderRegistrationMenu.bind(this))

    const loginButton = document.createElement('button')
    loginButton.textContent = 'Войти'
    loginButton.addEventListener('click', this.renderLoginMenu.bind(this))

    registrationBlock.appendChild(loginInput)
    registrationBlock.appendChild(passwordInput)
    registrationBlock.appendChild(passwordRepeatInput)
    registrationBlock.appendChild(registerButton)
    registrationBlock.appendChild(loginButton)
    this.mainUiBlock.appendChild(registrationBlock)
  }
}
