export enum Direction {
  UP = 'up',
  DOWN = 'down',
  ALL = 'all',
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
