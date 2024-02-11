'use client'

import { useMemo } from 'react'
import { GridSize, GridSpace } from 'types/grid'
import useContainerSizes from './useContainerSizes'

function useGridSizes() {
  const { ref, height, width } = useContainerSizes()
  const gridSquareSize = useMemo(() => {
    // return the smallest size between width and height
    if (width < height) {
      return width
    }
    return height
  }, [height, width])

  const { itemHeight, itemWidth, gridSpaceX } = useMemo(() => {
    const totalSpacing = GridSize * GridSpace
    const availableHeight = gridSquareSize - totalSpacing
    const calculatedItemHeight = availableHeight / GridSize
    const calculatedItemWidth = calculatedItemHeight / (3 / 2)
    const calculatedGridSpaceX =
      (gridSquareSize - Math.round(calculatedItemWidth) * (GridSize - 1)) /
      (GridSize - 1)
    return {
      itemHeight: calculatedItemHeight,
      itemWidth: calculatedItemWidth,
      gridSpaceX: calculatedGridSpaceX,
    }
  }, [gridSquareSize])

  return {
    width,
    height,
    ref,
    itemHeight,
    itemWidth,
    gridSpaceX,
    gridSquareSize,
  }
}

export default useGridSizes
