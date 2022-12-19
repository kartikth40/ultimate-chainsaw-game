export class KeyPressListner {
  constructor(keyCode, callback) {
    let keySafe = true
    this.keyDownFunction = (event) => {
      if (event.code === keyCode) {
        if (keySafe) {
          keySafe = false
          callback()
        }
      }
    }

    this.keyUpFunction = (event) => {
      if (event.code === keyCode) {
        keySafe = true
      }
    }

    document.addEventListener('keydown', this.keyDownFunction)
    document.addEventListener('keyup', this.keyUpFunction)
  }
  unbind() {
    document.addEventListener('keydown', this.keyDownFunction)
    document.addEventListener('keyup', this.keyUpFunction)
  }
}
