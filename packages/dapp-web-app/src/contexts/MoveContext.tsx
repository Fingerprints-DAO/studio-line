import React, { createContext, useState, useContext, useEffect } from 'react'
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
const getRandomItems = (array: string[], count: number): string[] => {
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
  myItems: string[]
  mintedItems: string[]
  toggleSelectedItem: (index: string) => void
  selectedGridItem?: {
    direction: Direction
  } & GridItemProperties
}>({
  gridItemsState: {},
  myItems: [],
  mintedItems: [],
  toggleSelectedItem: () => {},
  selectedGridItem: undefined,
})

export const useMoveContext = () => useContext(MoveContext)

export const MoveProvider = ({ children }: { children: React.ReactNode }) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})
  const [myItems, setMyItems] = useState<string[]>([])
  const [mintedItems, setMintedItems] = useState<string[]>([])
  const [selectedGridItem, setSelectedGridItem] = useState<GridItemProperties>()

  const toggleSelectedItem = (index: string) => {
    setSelectedGridItem(gridItemsState[index])
  }

  // TODO: load contract states
  useEffect(() => {
    const availableItemsGenerated = generateAvailableItems()
    const mintedTokens = getRandomItems(availableItemsGenerated, 200)
    setGridItemsState(generateFullGridDefaultState())
    setMintedItems(mintedTokens)
    setMyItems(getRandomItems(mintedTokens, 10))
  }, [])

  return (
    <MoveContext.Provider
      value={{
        gridItemsState,
        selectedGridItem,
        myItems,
        mintedItems,
        toggleSelectedItem,
      }}
    >
      {children}
    </MoveContext.Provider>
  )
}
