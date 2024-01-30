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
    do {
      row = Math.floor(Math.random() * 25) + 1
      col = Math.floor(Math.random() * 25) + 1
    } while (row === 0 || row === 24)
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

const TokensContext = createContext<{
  gridItemsState: GridItemState
  selectedItems: string[]
  availableItems: string[]
  mintedItems: string[]
  toggleSelectedItem: (index: string) => void
  resetSelection: () => void
}>({
  gridItemsState: {},
  selectedItems: [],
  availableItems: [],
  mintedItems: [],
  toggleSelectedItem: () => {},
  resetSelection: () => {},
})

export const useTokensContext = () => useContext(TokensContext)

export const TokensProvider = ({ children }: { children: React.ReactNode }) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [availableItems, setAvailableItems] = useState<string[]>([])
  const [mintedItems, setMintedItems] = useState<string[]>([])

  const toggleSelectedItem = (index: string) => {
    setSelectedItems(
      selectedItems.includes(index)
        ? selectedItems.filter((i) => i !== index)
        : [...selectedItems, index],
    )
  }

  const resetSelection = () => {
    setSelectedItems([])
  }

  // TODO: load contract states
  useEffect(() => {
    const availableItemsGenerated = generateAvailableItems()
    setGridItemsState(generateFullGridDefaultState())
    setAvailableItems(availableItemsGenerated)
    setMintedItems(getRandomItems(availableItemsGenerated, 100))
  }, [])

  return (
    <TokensContext.Provider
      value={{
        gridItemsState,
        selectedItems,
        availableItems,
        mintedItems,
        toggleSelectedItem,
        resetSelection,
      }}
    >
      {children}
    </TokensContext.Provider>
  )
}
