import { Box, useTheme } from '@chakra-ui/react'
import { Direction } from 'types/grid'

export enum ArrowDirections {
  CENTER = 'CENTER',
  LEFT = 'left',
  RIGHT = 'right',
  DIAGONAL_LEFT = 'diagonal-left',
  DIAGONAL_RIGHT = 'diagonal-right',
}

export type ArrowProps = React.ComponentProps<typeof Box> & {
  isAvailable?: boolean
  isSelected?: boolean
  hide?: ArrowDirections[]
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
