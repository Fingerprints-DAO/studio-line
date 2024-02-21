import { useMemo } from 'react'
import { Direction } from 'types/grid'

type UseHasReachedEndProps = {
  row?: number
  direction?: Direction | null
}
export function useHasReachedEnd({
  row = 0,
  direction,
}: UseHasReachedEndProps) {
  const [isLastLine, isFirstLine] = [row === 23, row === 1]

  const hasReachedEnd = useMemo(() => {
    if (!direction) return false

    return (
      (direction === Direction.UP && isLastLine) ||
      (direction === Direction.DOWN && isFirstLine)
    )
  }, [direction, isFirstLine, isLastLine])

  return hasReachedEnd
}
