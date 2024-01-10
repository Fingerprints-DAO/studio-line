import React, { createContext, useState, useContext } from 'react'

export enum Direction {
  UP = 'up',
  DOWN = 'down',
}

export interface GridItemProperties {
  isOpened: boolean
  isBlocked: boolean
  isHighlighted: boolean
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
  isHighlighted: false,
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
  toggleGridItem: (index: string) => void
}>({
  gridItemsState: {},
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

  const toggleGridItem = (index: string) => {
    // const [col, row] = index.split('-').map((n) => Number(n))
    // const newState = {} as any
    // if (row >= 12) {
    //   newState[`${row + 1}-${col}`] = true
    //   newState[`${row + 1}-${col - 1}`] = true
    //   newState[`${row + 1}-${col + 1}`] = true
    //   newState[`${row}-${col + 1}`] = true
    //   newState[`${row}-${col - 1}`] = true
    // } else {
    //   newState[`${row - 1}-${col}`] = true
    //   newState[`${row - 1}-${col - 1}`] = true
    //   newState[`${row - 1}-${col + 1}`] = true
    //   newState[`${row}-${col + 1}`] = true
    //   newState[`${row}-${col - 1}`] = true
    // }

    setGridItemsState((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        isOpened: !prevState[index].isOpened,
      },
    }))
  }

  return (
    <GridItemContext.Provider value={{ gridItemsState, toggleGridItem }}>
      {children}
    </GridItemContext.Provider>
  )
}
