import React, { createContext, useState, useContext } from 'react'
import {
  Direction,
  GridItemBaseProperties,
  GridSize,
  generateImage,
  getDirection,
} from 'types/grid'

export interface GridItemProperties extends GridItemBaseProperties {
  isOpened: boolean
  isBlocked: boolean
  id: number
}

export type GridItemState = {
  [key: string]: GridItemProperties
}

export const gridItemDefaultState = {
  isOpened: false,
  isBlocked: false,
  image: '',
  index: '',
  row: 0,
  col: 0,
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
        direction: getDirection(row),
        image: generateImage(row + 1 + col + 1),
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
  originPoint: string
  lastSelectedGridItem?: {
    direction: Direction
  } & GridItemProperties
}>({
  gridItemsState: {},
  highlightGridItem: [],
  toggleGridItem: () => {},
  resetGrid: () => {},
  movements: 0,
  originPoint: '',
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
  const [originPoint, setOriginPoint] = useState('')

  const toggleGridItem = (index: string) => {
    if (!lastSelectedGridItem) {
      setOriginPoint(index)
    } else {
      setMovements(movements + 1)
    }
    setGridItemsState((prevState) => {
      const direction =
        lastSelectedGridItem?.direction ?? prevState[index].direction
      setLastSelectedGridItem({
        ...prevState[index],
        direction,
      })
      const [row, col] = index.split('-').map((n) => Number(n))
      const nextRow = direction !== Direction.UP ? row - 1 : row + 1
      // TODO: if all, order should be different
      const newHighlightGridItem = [
        `${row}-${col - 1}`,
        `${nextRow}-${col - 1}`,
        `${nextRow}-${col}`,
        `${nextRow}-${col + 1}`,
        `${row}-${col + 1}`,
      ]

      // if (direction === Direction.ALL) {
      //   newHighlightGridItem.push(
      //     `${row + 1}-${col}`,
      //     `${row + 1}-${col - 1}`,
      //     `${row + 1}-${col + 1}`
      //   )
      // }

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
    setOriginPoint('')
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
        originPoint,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
