export const createAnime = (state, frames, frameLen = 10) => {
  return function resolveFrame(distance) {
    const frameIndex = Math.floor((distance / frameLen) % frames.length)
    return [state, frameIndex]
  }
}
