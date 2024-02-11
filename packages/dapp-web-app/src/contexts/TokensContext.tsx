import React, { createContext, useState, useContext, useEffect } from 'react'
import {
  useLineGetAvailableCoordinates,
  useLineGetGrid,
} from 'services/web3/generated'
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
  mintedItems: (string | null)[]
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
  const [mintedItems, setMintedItems] = useState<(string | null)[]>([])
  const getAvailableTokens = useLineGetAvailableCoordinates({ watch: true })
  const getGrid = useLineGetGrid({ watch: true })

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

  useEffect(() => {
    setGridItemsState(generateFullGridDefaultState())
  }, [])

  useEffect(() => {
    if (getAvailableTokens.data && getAvailableTokens.data.length > 0) {
      setAvailableItems(
        getAvailableTokens.data.map((item) => `${item.y}-${item.x}`),
      )
    }
  }, [getAvailableTokens.data, gridItemsState])

  useEffect(() => {
    if (getGrid.data && getGrid.data.length > 0) {
      const transformedArray = getGrid.data
        .flatMap((row, rowIndex) =>
          row.map((value, colIndex) => {
            if (value > 0) {
              return `${GridSize - 1 - rowIndex}-${colIndex}`
            }
            return null
          }),
        )
        .filter(Boolean)
      setMintedItems(transformedArray)
    }
  }, [getGrid.data])

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
