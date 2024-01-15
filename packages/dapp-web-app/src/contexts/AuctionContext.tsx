import React, { createContext, useState, useContext, useEffect } from 'react'
import {
  Direction,
  GridItemBaseProperties,
  GridSize,
  generateImage,
} from 'types/grid'

export interface GridItemProperties extends GridItemBaseProperties {}

// Tipo para o estado dos itens
export type GridItemState = {
  [key: string]: GridItemProperties
}

export const gridItemDefaultState = {
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
        index,
        row,
        col,
        direction: row <= 12 ? Direction.UP : Direction.DOWN,
        image: generateImage(row + 1 + col + 1),
      }
    }
  }
  return grid
}

const AuctionContext = createContext<{
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

export const useAuctionContext = () => useContext(AuctionContext)

export const AuctionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [availableItems, setAvailableItems] = useState<string[]>([])
  const [mintedItems, setMintedItems] = useState<string[]>([])

  const toggleSelectedItem = (index: string) => {
    setSelectedItems(
      selectedItems.includes(index)
        ? selectedItems.filter((i) => i !== index)
        : [...selectedItems, index]
    )
  }

  const resetSelection = () => {
    setSelectedItems([])
  }

  // TODO: load contract states
  useEffect(() => {
    setGridItemsState(generateFullGridDefaultState())
    setAvailableItems(['1-10', '2-15', '3-20', '4-21', '5-23', '6-22'])
    setMintedItems(['2-15', '4-21'])
  }, [])

  return (
    <AuctionContext.Provider
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
    </AuctionContext.Provider>
  )
}
