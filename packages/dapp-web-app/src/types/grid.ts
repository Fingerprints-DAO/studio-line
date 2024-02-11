export const GridSize = 25
export const GridItemsTotal = GridSize * GridSize
export const GridSpace = 6

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  ALL = 'all',
}

export function handleDirectionFromContract(direction: number): Direction {
  if (direction === 0) return Direction.UP
  if (direction === 1) return Direction.DOWN
  return Direction.ALL
}

export function getDirection(row: number): Direction {
  return row >= 13 ? Direction.DOWN : Direction.UP
}

export interface GridItemBaseProperties {
  image: string
  index: string
  row: number
  col: number
  direction: Direction | null
}

export const generateImage = (index: number) =>
  `https://picsum.photos/id/${index}/200/300`
