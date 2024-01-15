import React, { createContext, useState, useContext } from 'react'

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  ALL = 'all',
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

const generateImage = (index: number) =>
  `https://picsum.photos/id/${index}/200/300`

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
  lastSelectedGridItem?: {
    direction: Direction
  } & GridItemProperties
}>({
  gridItemsState: {},
  highlightGridItem: [],
  toggleGridItem: () => {},
  resetGrid: () => {},
  lastSelectedGridItem: undefined,
})

export const usePlaygroundContext = () => useContext(PlaygroundContext)

export const PlaygroundProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>(
    generateFullGridDefaultState()
  )
  const [highlightGridItem, setHighlightGridItem] = useState<string[]>([])
  const [lastSelectedGridItem, setLastSelectedGridItem] =
    useState<GridItemProperties>()

  const toggleGridItem = (index: string) => {
    setGridItemsState((prevState) => {
      const direction =
        prevState[index].row === 0 || prevState[index].row === 23
          ? Direction.ALL
          : lastSelectedGridItem?.direction ?? prevState[index].direction
      setLastSelectedGridItem({
        ...prevState[index],
        direction,
      })
      const [row, col] = index.split('-').map((n) => Number(n))
      const nextRow = direction === Direction.DOWN ? row + 1 : row - 1
      // TODO: if all, order should be different
      const newHighlightGridItem = [
        `${row}-${col - 1}`,
        `${nextRow}-${col - 1}`,
        `${nextRow}-${col}`,
        `${nextRow}-${col + 1}`,
        `${row}-${col + 1}`,
      ]

      if (direction === Direction.ALL) {
        newHighlightGridItem.push(
          `${row + 1}-${col}`,
          `${row + 1}-${col - 1}`,
          `${row + 1}-${col + 1}`
        )
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
    // const toggleGridItem = (index: string) => {
    //   setGridItemsState((prevState) => {
    //     const newIsOpened = !prevState[index].isOpened
    //     const direction =
    //       prevState[index].row === 0 || prevState[index].row === 23
    //         ? Direction.ALL
    //         : lastSelectedGridItem?.direction ?? prevState[index].direction
    //     setLastSelectedGridItem(
    //       newIsOpened
    //         ? {
    //             ...prevState[index],
    //             direction,
    //           }
    //         : undefined
    //     )
    //     if (newIsOpened) {
    //       const [row, col] = index.split('-').map((n) => Number(n))
    //       const highlightRow = direction === Direction.DOWN ? row + 1 : row - 1
    //       const newHighlightGridItem = [
    //         `${highlightRow}-${col}`,
    //         `${highlightRow}-${col - 1}`,
    //         `${highlightRow}-${col + 1}`,
    //         `${row}-${col + 1}`,
    //         `${row}-${col - 1}`,
    //       ]

    //       if (direction === Direction.ALL) {
    //         newHighlightGridItem.push(
    //           `${row + 1}-${col}`,
    //           `${row + 1}-${col - 1}`,
    //           `${row + 1}-${col + 1}`
    //         )
    //       }

    //       setHighlightGridItem(newHighlightGridItem)
    //     } else {
    //       setHighlightGridItem([])
    //     }
    //     return {
    //       ...prevState,
    //       [index]: {
    //         ...prevState[index],
    //         isOpened: newIsOpened,
    //       },
    //     }
    //   })
  }

  const resetGrid = () => {
    setGridItemsState(generateFullGridDefaultState())
    setHighlightGridItem([])
    setLastSelectedGridItem(undefined)
  }

  return (
    <PlaygroundContext.Provider
      value={{
        gridItemsState,
        toggleGridItem,
        highlightGridItem,
        lastSelectedGridItem,
        resetGrid,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
