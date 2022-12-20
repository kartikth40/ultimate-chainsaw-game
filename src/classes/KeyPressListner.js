export class inputHandler {
  constructor() {
    this.keys = []
    window.addEventListener('keydown', (e) => {
      if (
        (e.code === 'KeyW' ||
          e.code === 'KeyS' ||
          e.code === 'KeyA' ||
          e.code === 'KeyD') &&
        this.keys.indexOf(e.code) === -1
      ) {
        this.keys.push(e.code)
      }
    })

    window.addEventListener('keyup', (e) => {
      if (
        e.code === 'KeyW' ||
        e.code === 'KeyS' ||
        e.code === 'KeyA' ||
        e.code === 'KeyD'
      ) {
        this.keys.splice(this.keys.indexOf(e.code), 1)
      }
    })
  }
}
