import { Direction, GridSize } from 'types/grid'
import { ArrowDirections } from 'types/movements'

export type getArrowsAvailabilityProps = {
  index?: string
  direction?: Direction | null
  mintedPositions?: (string | undefined)[]
  isStar?: boolean
}
export const getArrowsAvailability = ({
  index = '0-0',
  direction,
  mintedPositions = [],
  isStar,
}: getArrowsAvailabilityProps) => {
  const [row, col] = index.split('-').map((n) => Number(n))
  const [
    isFirstAvailableCol,
    isLastAvailableCol,
    isFirstAvailableRow,
    isLastAvailableRow,
  ] = [col === 1, col === GridSize - 2, row === 1, row === GridSize - 2]

  let disableArrows = [] as ArrowDirections[]
  let [
    leftPos,
    diagonalLeftPos,
    diagonalLeftPosReversed,
    centerPos,
    centerPosReversed,
    diagonalRightPos,
    rightPos,
    diagonalRightPosReversed,
  ] = ['', '', '', '', '', '', '', '']
  if (direction) {
    const nextRow = direction !== Direction.UP ? row - 1 : row + 1
    leftPos = `${row}-${col - 1}`
    diagonalLeftPos = `${nextRow}-${col - 1}`
    centerPos = `${nextRow}-${col}`
    diagonalRightPos = `${nextRow}-${col + 1}`
    rightPos = `${row}-${col + 1}`

    if (mintedPositions.includes(leftPos) || isFirstAvailableCol)
      disableArrows.push(ArrowDirections.LEFT)
    if (
      mintedPositions.includes(diagonalLeftPos) ||
      isFirstAvailableCol ||
      isFirstAvailableRow ||
      isLastAvailableRow
    )
      disableArrows.push(ArrowDirections.DIAGONAL_LEFT)
    if (
      mintedPositions.includes(centerPos) ||
      isFirstAvailableRow ||
      isLastAvailableRow
    )
      disableArrows.push(ArrowDirections.CENTER)
    if (
      mintedPositions.includes(diagonalRightPos) ||
      isLastAvailableCol ||
      isFirstAvailableRow ||
      isLastAvailableRow
    )
      disableArrows.push(ArrowDirections.DIAGONAL_RIGHT)
    if (mintedPositions.includes(rightPos) || isLastAvailableCol)
      disableArrows.push(ArrowDirections.RIGHT)

    if (isStar) {
      const previousRow = direction !== Direction.UP ? row + 1 : row - 1
      diagonalLeftPosReversed = `${previousRow}-${col - 1}`
      diagonalRightPosReversed = `${previousRow}-${col + 1}`
      centerPosReversed = `${previousRow}-${col}`
    }
  }

  return {
    disableArrows,
    leftPos,
    diagonalLeftPos,
    diagonalLeftPosReversed,
    centerPos,
    centerPosReversed,
    diagonalRightPos,
    diagonalRightPosReversed,
    rightPos,
  }
}
