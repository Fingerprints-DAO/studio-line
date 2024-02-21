export function handleCoordinates(index?: string) {
  if (!index) return { x: 0, y: 0 }

  const [y, x] = index.split('-')
  return { x: Number(x), y: Number(y) }
}

export function coordinatesToText(index?: string) {
  if (!index) return '0, 0'

  const [y, x] = index.split('-')
  return `${Number(x)}, ${Number(y)}`
}
