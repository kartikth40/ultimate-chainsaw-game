export const loadImage = (url) => {
  return new Promise((resolve) => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}
export const loadMap = async (name) => {
  return await import(`../maps/${name}.json`)
}
