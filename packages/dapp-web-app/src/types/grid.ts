export const GridSize = 25
export const GridItemsTotal = GridSize * GridSize
export const GridSpace = 6

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  ALL = 'all',
}

export function getDirection(row: number): Direction {
  return row >= 13 ? Direction.UP : Direction.DOWN
}

export interface GridItemBaseProperties {
  image: string
  index: string
  row: number
  col: number
  direction: Direction
}

export const generateImage = (index: number) =>
  `https://picsum.photos/id/${index}/200/300`
