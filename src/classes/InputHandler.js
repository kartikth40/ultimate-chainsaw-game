export default class InputHandler {
  constructor() {
    // Holds the current state of a given key
    this.keyStates = new Map()
    // Holds the callback function for a key code
    this.keyMap = new Map()
  }

  addMapping(keyCode, callback) {
    this.keyMap.set(keyCode, callback)
  }

  handleEvent(e) {
    const keyCode = e.code

    if (!this.keyMap.has(keyCode)) {
      // Did not have key mapped
      return
    }

    e.preventDefault()

    const keyState = e.type === 'keydown' ? 1 : 0

    if (this.keyStates.get(keyCode) === keyState) {
      return
    }

    this.keyStates.set(keyCode, keyState)
    this.keyMap.get(keyCode)(keyState)
  }

  listenTo(window) {
    const keyStates = ['keydown', 'keyup']
    keyStates.forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        // console.log(event.code, eventName)
        this.handleEvent(event)
      })
    })
  }
}
