import React, { createContext, useState, useContext, useEffect } from 'react'
import { useLineGetGrid } from 'services/web3/generated'
import {
  Direction,
  GridItemBaseProperties,
  GridSize,
  generateImage,
  getDirection,
} from 'types/grid'

export interface GridItemProperties extends GridItemBaseProperties {
  id: number | null
}

export type GridItemState = {
  [key: string]: GridItemProperties
}

export const gridItemDefaultState = {
  id: null,
  image: '',
  index: '',
  row: 0,
  col: 0,
  direction: Direction.UP,
}

const generateAvailableItems = (size = 200) => {
  const array: string[] = []
  for (let i = 0; i < size; i++) {
    let row: number
    let col: number
    row = Math.floor(Math.random() * 25)
    col = Math.floor(Math.random() * 25)
    array.push(`${row}-${col}`)
  }
  return array
}
const getRandomItems = (
  array: (string | null)[],
  count: number,
): (string | null)[] => {
  const shuffled = array.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const generateFullGridDefaultState = () => {
  const grid = {} as GridItemState
  for (let row = GridSize - 1; row >= 0; row--) {
    for (let col = 0; col < GridSize; col++) {
      const index = `${row}-${col}`
      grid[index] = {
        ...gridItemDefaultState,
        id: col + row * GridSize,
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

const MoveContext = createContext<{
  gridItemsState: GridItemState
  highlightGridItem: string[]
  myItems: (string | null)[]
  mintedItems: (string | null)[]
  toggleSelectedItem: (index: string) => void
  selectedGridItem?: {
    direction: Direction
  } & GridItemProperties
}>({
  gridItemsState: {},
  highlightGridItem: [],
  myItems: [],
  mintedItems: [],
  toggleSelectedItem: () => {},
  selectedGridItem: undefined,
})

export const useMoveContext = () => useContext(MoveContext)

export const MoveProvider = ({ children }: { children: React.ReactNode }) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})
  const [myItems, setMyItems] = useState<(string | null)[]>([])
  const [highlightGridItem, setHighlightGridItem] = useState<string[]>([])
  const [mintedItems, setMintedItems] = useState<(string | null)[]>([])
  const [selectedGridItem, setSelectedGridItem] = useState<GridItemProperties>()
  const getGrid = useLineGetGrid({ watch: true })

  const toggleSelectedItem = (index: string) => {
    const [y, x] = index.split('-').map((n) => Number(n))
    setSelectedGridItem({
      ...gridItemsState[index],
      id: getGrid.data ? Number(getGrid?.data[x][y]) : gridItemsState[index].id,
    })

    const [row, col] = index.split('-').map((n) => Number(n))
    const nextRow =
      gridItemsState[index].direction !== Direction.UP ? row - 1 : row + 1
    // TODO: if all, order should be different
    const newHighlightGridItem = [
      `${row}-${col - 1}`,
      `${nextRow}-${col - 1}`,
      `${nextRow}-${col}`,
      `${nextRow}-${col + 1}`,
      `${row}-${col + 1}`,
    ]

    // if (gridItemsState[index].direction === Direction.ALL) {
    //   newHighlightGridItem.push(
    //     `${row + 1}-${col}`,
    //     `${row + 1}-${col - 1}`,
    //     `${row + 1}-${col + 1}`,
    //   )
    // }

    setHighlightGridItem(newHighlightGridItem)
  }

  useEffect(() => {
    if (getGrid.data && getGrid.data.length > 0) {
      const transformedArray = getGrid.data
        .flatMap((row, rowIndex) =>
          row.map((value, colIndex) => {
            if (value > 0) {
              return `${colIndex}-${rowIndex}`
            }
            return null
          }),
        )
        .filter(Boolean)
      setMintedItems(transformedArray)
    }
  }, [getGrid.data])

  // TODO: load contract states
  useEffect(() => {
    setGridItemsState(generateFullGridDefaultState())
    setMyItems(getRandomItems(mintedItems, 10))
  }, [mintedItems])

  return (
    <MoveContext.Provider
      value={{
        gridItemsState,
        selectedGridItem,
        highlightGridItem,
        myItems,
        mintedItems,
        toggleSelectedItem,
      }}
    >
      {children}
    </MoveContext.Provider>
  )
}
