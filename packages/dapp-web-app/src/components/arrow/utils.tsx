import { Box, useTheme } from '@chakra-ui/react'
import { Direction } from 'types/grid'
import { ArrowDirections, ArrowMoveDirections } from 'types/movements'

export function getSpecificArrowMoveDirection(
  direction: Direction,
  arrowDirection: ArrowDirections,
) {
  if (arrowDirection === ArrowDirections.LEFT) return ArrowMoveDirections.WEST
  if (arrowDirection === ArrowDirections.RIGHT) return ArrowMoveDirections.EAST
  if (arrowDirection === ArrowDirections.DIAGONAL_LEFT) {
    if (direction === Direction.UP) return ArrowMoveDirections.NORTH_WEST
    if (direction === Direction.DOWN) return ArrowMoveDirections.SOUTH_EAST
  }
  if (arrowDirection === ArrowDirections.DIAGONAL_RIGHT) {
    if (direction === Direction.UP) return ArrowMoveDirections.NORTH_EAST
    if (direction === Direction.DOWN) return ArrowMoveDirections.SOUTH_WEST
  }
  if (arrowDirection === ArrowDirections.CENTER) {
    if (direction === Direction.UP) return ArrowMoveDirections.NORTH
    if (direction === Direction.DOWN) return ArrowMoveDirections.SOUTH
  }
  return null
}

export type ArrowProps = React.ComponentProps<typeof Box> & {
  isAvailable?: boolean
  isSelected?: boolean
  disableArrows?: ArrowDirections[]
  hideArrows?: ArrowDirections[]
  displayCircle?: boolean
  hasMouseOver?: boolean
  direction: Direction
}

export const useArrowColors = ({ direction }: { direction?: Direction }) => {
  const theme = useTheme()

  if (direction === Direction.UP)
    return [theme.colors['red'][300], theme.colors['red'][600]]
  if (direction === Direction.DOWN)
    return [theme.colors['cyan'][300], theme.colors['cyan'][600]]

  return theme.colors['gray'][200]
}

export const useHexColor = ({
  isAvailable,
  isSelected,
  direction,
}: ArrowProps) => {
  const theme = useTheme()

  if (isSelected) {
    if (!isAvailable) return theme.colors['gray'][400]
    if (direction === Direction.UP) return theme.colors['red'][600]
    if (direction === Direction.DOWN) return theme.colors['cyan'][600]
  }
  if (!isAvailable) return theme.colors['gray'][200]
  if (direction === Direction.UP) return theme.colors['red'][100]
  if (direction === Direction.DOWN) return theme.colors['cyan'][100]
  return theme.colors['gray'][200]
}
