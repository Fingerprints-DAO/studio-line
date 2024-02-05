import React, { createContext, useState, useContext, useEffect } from 'react'
import {
  useLineGetGrid,
  useLineGetTokens,
  useLineTokensOfOwner,
} from 'services/web3/generated'
import {
  Direction,
  GridItemBaseProperties,
  GridSize,
  generateImage,
  getDirection,
  handleDirectionFromContract,
} from 'types/grid'
import { ArrowDirections } from 'types/movements'
import { useAccount } from 'wagmi'

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
        id: null,
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
  unavailableDirections: ArrowDirections[]
  myItems: (string | null)[]
  mintedItems: ({ id: number; index: string } | null)[]
  toggleSelectedItem: (index: string) => void
  resetSelection: () => void
  refreshAfterMove: () => void
  selectedGridItem?: {
    direction: Direction
  } & GridItemProperties
}>({
  gridItemsState: {},
  highlightGridItem: [],
  unavailableDirections: [],
  myItems: [],
  mintedItems: [],
  toggleSelectedItem: () => {},
  resetSelection: () => {},
  refreshAfterMove: () => {},
  selectedGridItem: undefined,
})

export const useMoveContext = () => useContext(MoveContext)

export const MoveProvider = ({ children }: { children: React.ReactNode }) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})
  const [myItems, setMyItems] = useState<(string | null)[]>([])
  const [highlightGridItem, setHighlightGridItem] = useState<string[]>([])
  const [unavailableDirections, setUnavailableDirections] = useState<
    ArrowDirections[]
  >([])
  const [mintedItems, setMintedItems] = useState<
    ({ id: number; index: string } | null)[]
  >([])
  const [selectedGridItem, setSelectedGridItem] = useState<GridItemProperties>()
  const [tokensDirection, setTokensDirection] = useState<Record<string, any>>(
    [],
  )
  const [tokensDiretionHandled, setTokensDirectionHandled] = useState(false)
  const { address } = useAccount()
  const getGrid = useLineGetGrid({ watch: true })
  const ownedTokens = useLineTokensOfOwner({
    args: [address!],
    enabled: !!address,
    watch: true,
  })
  const getTokens = useLineGetTokens()

  const toggleSelectedItem = (index: string) => {
    setSelectedGridItem({
      ...gridItemsState[index],
      id: mintedItems.find((item) => item?.index === index)?.id ?? null,
    })
    const [row, col] = index.split('-').map((n) => Number(n))
    const nextRow =
      gridItemsState[index].direction !== Direction.UP ? row - 1 : row + 1
    const unavailableDirections = [] as ArrowDirections[]

    const [leftPos, diagonalLeftPos, centerPos, diagonalRightPos, rightPos] = [
      `${row}-${col - 1}`,
      `${nextRow}-${col - 1}`,
      `${nextRow}-${col}`,
      `${nextRow}-${col + 1}`,
      `${row}-${col + 1}`,
    ]
    const mintedIndexes = mintedItems.map((item) => item?.index)

    if (mintedIndexes.includes(leftPos))
      unavailableDirections.push(ArrowDirections.LEFT)
    if (mintedIndexes.includes(diagonalLeftPos))
      unavailableDirections.push(ArrowDirections.DIAGONAL_LEFT)
    if (mintedIndexes.includes(centerPos))
      unavailableDirections.push(ArrowDirections.CENTER)
    if (mintedIndexes.includes(diagonalRightPos))
      unavailableDirections.push(ArrowDirections.DIAGONAL_RIGHT)
    if (mintedIndexes.includes(rightPos))
      unavailableDirections.push(ArrowDirections.RIGHT)

    setHighlightGridItem([
      leftPos,
      diagonalLeftPos,
      centerPos,
      diagonalRightPos,
      rightPos,
    ])

    setUnavailableDirections(unavailableDirections)
  }
  const resetSelection = () => {
    setSelectedGridItem(undefined)
    setHighlightGridItem([])
    setUnavailableDirections([])
  }

  const refreshAfterMove = () => {
    getGrid.refetch()
    ownedTokens.refetch()
  }

  useEffect(() => {
    if (getGrid.data && getGrid.data.length > 0) {
      const transformedArray = getGrid.data
        .flatMap((row, rowIndex) =>
          row.map((value: bigint, colIndex) => {
            if (value > 0n) {
              return {
                index: `${GridSize - 1 - rowIndex}-${colIndex}`,
                id: Number(value),
              }
            }
            return null
          }),
        )
        .filter(Boolean)
      setMintedItems(transformedArray)
    }
  }, [getGrid.data])

  useEffect(() => {
    if (typeof ownedTokens.data === 'object') {
      const ownedTokensIds = ownedTokens.data.map(Number)
      setMyItems(
        mintedItems
          .filter((item) => item && ownedTokensIds.includes(item.id))
          .map((item) => item!.index),
      )
    }
  }, [mintedItems, ownedTokens.data])

  useEffect(() => {
    setGridItemsState(generateFullGridDefaultState())
  }, [])

  useEffect(() => {
    if (getTokens.isSuccess) {
      const handledGetTokens: Record<string, any> =
        getTokens.data?.reduce(
          (acc, item) => ({
            ...acc,
            [item.current.y + '-' + item.current.x]: item,
          }),
          {},
        ) ?? {}
      setTokensDirection(handledGetTokens)
      setTokensDirectionHandled(false)
    }
  }, [getTokens.data, getTokens.isSuccess])

  useEffect(() => {
    const gridItemStateValues = Object.values(gridItemsState)
    if (
      !tokensDiretionHandled &&
      tokensDirection &&
      gridItemStateValues.length > 0
    ) {
      const newGrid = gridItemStateValues.reduce((acc, item) => {
        if (!tokensDirection[item.index]) return { ...acc, [item.index]: item }
        return {
          ...acc,
          [item.index]: {
            ...item,
            direction: handleDirectionFromContract(
              tokensDirection[item.index]?.direction,
            ),
          },
        }
      }, {})
      setGridItemsState(newGrid)
      setTokensDirectionHandled(true)
    }
  }, [gridItemsState, tokensDirection, tokensDiretionHandled])

  // console.log(myItems, mintedItems)
  return (
    <MoveContext.Provider
      value={{
        gridItemsState,
        selectedGridItem,
        highlightGridItem,
        myItems,
        mintedItems,
        toggleSelectedItem,
        unavailableDirections,
        resetSelection,
        refreshAfterMove,
      }}
    >
      {children}
    </MoveContext.Provider>
  )
}
