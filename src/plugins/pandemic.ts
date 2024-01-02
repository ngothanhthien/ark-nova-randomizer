import { random } from "./random"
export function getImagePath(pandemic: string, id: number) {
  return `/img/${pandemic}/pandemic/${id}_small.webp`
}

export function setupActionCard(totalAction: number, totalEruption: number) {
  const totalEachPart = Math.ceil(totalAction / totalEruption)
  const totalRemain = totalAction % totalEruption
  const output = []
  const randomExtra = []
  for(let i = 0; i < totalEruption; i++) {
    if (i < totalRemain) {
      randomExtra.push(totalEachPart)
    } else {
      randomExtra.push('x')
    }
  }
  random.shuffle(randomExtra)
  for(let i = 0; i < totalEruption; i++) {
    const part = Array.from(Array(totalEachPart - 1).keys()) as Array<number | string>
    if (randomExtra[i] !== 'x') {
      part.push(randomExtra[i])
    }
    part.push('p')
    random.shuffle(part)
    output.push(part)
  }
  return output.flat()
}