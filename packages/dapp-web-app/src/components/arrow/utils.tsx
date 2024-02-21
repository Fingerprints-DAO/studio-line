import { Box, useTheme } from '@chakra-ui/react'
import { Direction } from 'types/grid'
import { ArrowDirections, ArrowMoveDirections } from 'types/movements'

export function getSpecificArrowMoveDirection(
  direction: Direction | null,
  arrowDirection: ArrowDirections,
) {
  if (arrowDirection === ArrowDirections.LEFT) return ArrowMoveDirections.WEST
  if (arrowDirection === ArrowDirections.RIGHT) return ArrowMoveDirections.EAST
  if (arrowDirection === ArrowDirections.DIAGONAL_LEFT) {
    if (direction === Direction.UP) return ArrowMoveDirections.NORTH_WEST
    if (direction === Direction.DOWN) return ArrowMoveDirections.SOUTH_WEST
  }
  if (arrowDirection === ArrowDirections.DIAGONAL_RIGHT) {
    if (direction === Direction.UP) return ArrowMoveDirections.NORTH_EAST
    if (direction === Direction.DOWN) return ArrowMoveDirections.SOUTH_EAST
  }
  if (arrowDirection === ArrowDirections.CENTER) {
    if (direction === Direction.UP) return ArrowMoveDirections.NORTH
    if (direction === Direction.DOWN) return ArrowMoveDirections.SOUTH
  }
  return null
}

export function getNextPoint(
  col: number,
  row: number,
  direction: Direction | null,
  arrowDirection: ArrowDirections,
) {
  if (arrowDirection === ArrowDirections.LEFT) return { col: col - 1, row }
  if (arrowDirection === ArrowDirections.RIGHT) return { col: col + 1, row }
  if (arrowDirection === ArrowDirections.DIAGONAL_LEFT) {
    if (direction === Direction.UP) return { col: col - 1, row: row + 1 }
    if (direction === Direction.DOWN) return { col: col - 1, row: row - 1 }
  }
  if (arrowDirection === ArrowDirections.DIAGONAL_RIGHT) {
    if (direction === Direction.UP) return { col: col + 1, row: row + 1 }
    if (direction === Direction.DOWN) return { col: col + 1, row: row - 1 }
  }
  if (arrowDirection === ArrowDirections.CENTER) {
    if (direction === Direction.UP) return { col, row: row + 1 }
    if (direction === Direction.DOWN) return { col, row: row - 1 }
  }
  return { col: null, row: null }
}

export type ArrowProps = React.ComponentProps<typeof Box> & {
  isAvailable?: boolean
  isSelected?: boolean
  isOwner?: boolean
  disableArrows?: ArrowDirections[]
  hideArrows?: ArrowDirections[]
  displayCircle?: boolean
  hasMouseOver?: boolean
  direction: Direction | null
}

export const useArrowColors = ({
  direction,
}: {
  direction?: Direction | null
}) => {
  const theme = useTheme()

  if (direction === Direction.UP)
    return [theme.colors['red'][500], theme.colors['red'][600]]
  if (direction === Direction.DOWN)
    return [theme.colors['cyan'][500], theme.colors['cyan'][600]]

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

export const useHexColorDot = ({
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
  if (!isAvailable) return theme.colors['gray'][300]
  if (direction === Direction.UP) return theme.colors['red'][100]
  if (direction === Direction.DOWN) return theme.colors['cyan'][100]
  return theme.colors['gray'][200]
}
