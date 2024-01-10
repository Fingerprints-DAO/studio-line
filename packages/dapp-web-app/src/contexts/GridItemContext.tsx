import React, { createContext, useState, useContext } from 'react'

export enum Direction {
  UP = 'up',
  DOWN = 'down',
}

export interface GridItemProperties {
  isOpened: boolean
  isBlocked: boolean
  image: string
  index: string
  row: number
  col: number
  direction: Direction
}

// Tipo para o estado dos itens
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
  for (let row = 0; row < 24; row++) {
    for (let col = 0; col < 24; col++) {
      const index = `${row}-${col}`
      grid[index] = {
        ...gridItemDefaultState,
        index,
        row,
        col,
        direction: row >= 12 ? Direction.UP : Direction.DOWN,
        image: `https://picsum.photos/200/300?random=${row + 1}${col + 1}`,
      }
    }
  }
  return grid
}

const GridItemContext = createContext<{
  gridItemsState: GridItemState
  highlightGridItem: string[]
  toggleGridItem: (index: string) => void
}>({
  gridItemsState: {},
  highlightGridItem: [],
  toggleGridItem: () => {},
})

export const useGridItemContext = () => useContext(GridItemContext)

export const GridItemProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>(
    generateFullGridDefaultState()
  )
  const [highlightGridItem, setHighlightGridItem] = useState<string[]>([])
  const toggleGridItem = (index: string) => {
    setGridItemsState((prevState) => {
      const newIsOpened = !prevState[index].isOpened
      if (newIsOpened) {
        const [row, col] = index.split('-').map((n) => Number(n))
        const highlightRow =
          prevState[index].direction === Direction.DOWN ? row + 1 : row - 1

        setHighlightGridItem([
          `${highlightRow}-${col}`,
          `${highlightRow}-${col - 1}`,
          `${highlightRow}-${col + 1}`,
          `${row}-${col + 1}`,
          `${row}-${col - 1}`,
        ])
      } else {
        setHighlightGridItem([])
      }
      return {
        ...prevState,
        [index]: {
          ...prevState[index],
          isOpened: newIsOpened,
        },
      }
    })
  }

  return (
    <GridItemContext.Provider
      value={{ gridItemsState, toggleGridItem, highlightGridItem }}
    >
      {children}
    </GridItemContext.Provider>
  )
}
