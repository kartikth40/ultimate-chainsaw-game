export class InputHandler {
  constructor() {
    this.keys = []
    window.addEventListener('keydown', (e) => {
      // if (e.repeat) {
      //   this.remove('Space')
      //   return
      // }
      if (
        (e.code === 'Space' ||
          e.code === 'KeyS' ||
          e.code === 'KeyA' ||
          e.code === 'KeyD') &&
        this.keys.indexOf(e.code) === -1
      ) {
        this.keys.push(e.code)
      }
      console.log(this.keys)
    })

    window.addEventListener('keyup', (e) => {
      if (
        e.code === 'Space' ||
        e.code === 'KeyS' ||
        e.code === 'KeyA' ||
        e.code === 'KeyD'
      ) {
        this.keys.splice(this.keys.indexOf(e.code), 1)
      }
    })
  }

  remove(code) {
    this.keys.splice(this.keys.indexOf(code), 1)
  }
}
