export const createAnime = (frames, frameLen = 10) => {
  return function resolveFrame(distance) {
    const frameIndex = Math.floor((distance / frameLen) % frames.length)
    return ['run', frameIndex]
  }
}
