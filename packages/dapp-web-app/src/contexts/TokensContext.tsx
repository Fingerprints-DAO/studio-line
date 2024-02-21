import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import useCurrentTokenId from 'hooks/use-current-token-id'
import {
  useLineGetAvailableCoordinates,
  useLineGetGrid,
  useLineMaxMintPerTx,
  useLineMaxSupply,
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
        index,
        row,
        col,
        direction: getDirection(row),
        isLocked: false,
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
  limitPerTx: number
  reachedLimit: boolean
  toggleSelectedItem: (index: string) => void
  resetSelection: () => void
  handleIsMinting: (value: boolean) => void
  isMinting: boolean
}>({
  gridItemsState: {},
  selectedItems: [],
  availableItems: [],
  mintedItems: [],
  limitPerTx: 0,
  reachedLimit: false,
  toggleSelectedItem: () => {},
  resetSelection: () => {},
  handleIsMinting: () => {},
  isMinting: false,
})

export const useTokensContext = () => useContext(TokensContext)

export const TokensProvider = ({ children }: { children: React.ReactNode }) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [availableItems, setAvailableItems] = useState<string[]>([])
  const [mintedItems, setMintedItems] = useState<(string | null)[]>([])
  const [limitPerTx, setLimitPerTx] = useState(5)
  const [reachedLimit, setReachedLimit] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const maxMintPerTx = useLineMaxMintPerTx()
  const { data: currentTokenId = 1n } = useCurrentTokenId()
  const { data: maxSupply = 0n } = useLineMaxSupply()
  const { refetch: refetchAvailableTokens, ...getAvailableTokens } =
    useLineGetAvailableCoordinates()
  const { refetch: refetchGrid, ...getGrid } = useLineGetGrid({
    scopeKey: 'getGrid',
  })

  const availableToMint = useMemo(() => {
    const available = Number(maxSupply - (currentTokenId - 1n))
    return available > limitPerTx ? limitPerTx : available
  }, [currentTokenId, limitPerTx, maxSupply])

  const toggleSelectedItem = (index: string) => {
    const willRemove = selectedItems.includes(index)

    if (!willRemove && selectedItems.length + 1 > availableToMint) {
      setReachedLimit(true)
      return
    }

    if (reachedLimit && willRemove) {
      setReachedLimit(false)
    }

    setSelectedItems(
      willRemove
        ? selectedItems.filter((i) => i !== index)
        : [...selectedItems, index],
    )
  }

  const resetSelection = () => {
    setReachedLimit(false)
    setSelectedItems([])
  }

  const handleIsMinting = (value: boolean) => {
    setIsMinting(value)
  }

  useEffect(() => {
    if (currentTokenId) {
      refetchAvailableTokens()
      refetchGrid()
    }
  }, [currentTokenId, refetchAvailableTokens, refetchGrid])

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
    setLimitPerTx(Number(maxMintPerTx?.data) ?? 5)
  }, [maxMintPerTx?.data])

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
        limitPerTx: availableToMint,
        reachedLimit,
        toggleSelectedItem,
        resetSelection,
        handleIsMinting,
        isMinting,
      }}
    >
      {children}
    </TokensContext.Provider>
  )
}
