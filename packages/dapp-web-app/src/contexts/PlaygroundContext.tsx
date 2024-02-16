import { useHasReachedEnd } from 'hooks/use-has-reached-end'
import React, { createContext, useState, useContext } from 'react'
import {
  Direction,
  GridItemBaseProperties,
  GridSize,
  ImageSizes,
  generateImage,
  getDirection,
} from 'types/grid'

export interface GridItemProperties extends GridItemBaseProperties {
  isOpened: boolean
  id: number
}

export type GridItemState = {
  [key: string]: GridItemProperties
}

export const gridItemDefaultState = {
  isOpened: false,
  image: '',
  index: '',
  row: 0,
  col: 0,
  isLocked: false,
  direction: Direction.UP,
}

const generateFullGridDefaultState = () => {
  const grid = {} as GridItemState
  for (let row = GridSize - 1; row >= 0; row--) {
    for (let col = 0; col < GridSize; col++) {
      const index = `${row}-${col}`
      grid[index] = {
        ...gridItemDefaultState,
        id: col + row * GridSize,
        // id: GridSize - col + row * GridSize - 1,
        index,
        row,
        col,
        isLocked: false,
        direction: getDirection(row),
        image: generateImage(col + row * GridSize, ImageSizes.SMALL),
      }
    }
  }
  return grid
}

const PlaygroundContext = createContext<{
  gridItemsState: GridItemState
  highlightGridItem: string[]
  toggleGridItem: (index: string) => void
  resetGrid: () => void
  movements: number
  startingPoint: string
  isFixed: boolean
  lastSelectedGridItem?: {
    direction: Direction | null
  } & GridItemProperties
}>({
  gridItemsState: {},
  highlightGridItem: [],
  toggleGridItem: () => {},
  resetGrid: () => {},
  movements: 0,
  startingPoint: '',
  isFixed: false,
  lastSelectedGridItem: undefined,
})

export const usePlaygroundContext = () => useContext(PlaygroundContext)

export const PlaygroundProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>(
    generateFullGridDefaultState(),
  )
  const [highlightGridItem, setHighlightGridItem] = useState<string[]>([])
  const [lastSelectedGridItem, setLastSelectedGridItem] =
    useState<GridItemProperties>()
  const [movements, setMovements] = useState(0)
  const [startingPoint, setStartingPoint] = useState('')
  const hasReachedEnd = useHasReachedEnd({
    row: lastSelectedGridItem?.row,
    direction: lastSelectedGridItem?.direction,
  })
  const [isFixed, setIsFixed] = useState(false)

  const toggleGridItem = (index: string) => {
    if (!lastSelectedGridItem) {
      setStartingPoint(index)
    } else {
      setMovements(movements + 1)
    }
    setGridItemsState((prevState) => {
      const isMovementToFix =
        hasReachedEnd &&
        (prevState[index].row !== lastSelectedGridItem?.row ||
          prevState[index].col - lastSelectedGridItem?.col > 1)
      const direction =
        lastSelectedGridItem?.direction ?? prevState[index].direction

      setLastSelectedGridItem({
        ...prevState[index],
        direction,
      })
      const [row, col] = index.split('-').map((n) => Number(n))
      const nextRow =
        isMovementToFix || direction !== Direction.UP ? row - 1 : row + 1

      const newHighlightGridItem = [
        `${row}-${col - 1}`,
        `${nextRow}-${col - 1}`,
        `${nextRow}-${col}`,
        `${nextRow}-${col + 1}`,
        `${row}-${col + 1}`,
      ]

      if (isMovementToFix) {
        newHighlightGridItem.push(
          `${row + 1}-${col}`,
          `${row + 1}-${col - 1}`,
          `${row + 1}-${col + 1}`,
        )
      }
      if (isMovementToFix) {
        setIsFixed(true)
      }

      setHighlightGridItem(newHighlightGridItem)
      return {
        ...prevState,
        [index]: {
          ...prevState[index],
          isOpened: true,
        },
      }
    })
  }

  const resetGrid = () => {
    setGridItemsState(generateFullGridDefaultState())
    setHighlightGridItem([])
    setLastSelectedGridItem(undefined)
    setMovements(0)
    setStartingPoint('')
    setIsFixed(false)
  }

  return (
    <PlaygroundContext.Provider
      value={{
        gridItemsState,
        toggleGridItem,
        highlightGridItem,
        lastSelectedGridItem,
        resetGrid,
        movements,
        startingPoint: startingPoint,
        isFixed,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
