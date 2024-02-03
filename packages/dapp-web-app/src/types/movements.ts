export enum ArrowDirections {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
  DIAGONAL_LEFT = 'diagonal-left',
  DIAGONAL_RIGHT = 'diagonal-right',
}

export enum ArrowMoveDirections {
  NORTH = 'north',
  SOUTH = 'south',
  EAST = 'east',
  WEST = 'west',
  NORTH_EAST = 'north-east',
  NORTH_WEST = 'north-west',
  SOUTH_EAST = 'south-east',
  SOUTH_WEST = 'south-west',
}

export const movementContractMap = {
  [ArrowMoveDirections.NORTH]: 'moveNorth',
  [ArrowMoveDirections.SOUTH]: 'moveSouth',
  [ArrowMoveDirections.EAST]: 'moveEast',
  [ArrowMoveDirections.WEST]: 'moveWest',
  [ArrowMoveDirections.NORTH_EAST]: 'moveNortheast',
  [ArrowMoveDirections.NORTH_WEST]: 'moveNorthwest',
  [ArrowMoveDirections.SOUTH_EAST]: 'moveSoutheast',
  [ArrowMoveDirections.SOUTH_WEST]: 'moveSouthwest',
}
