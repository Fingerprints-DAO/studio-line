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
  ImageSizes,
  generateImage,
  handleDirectionFromContract,
} from 'types/grid'
import { ArrowDirections } from 'types/movements'
import { getArrowsAvailability } from 'utils/getArrowsAvailability'
import { useAccount } from 'wagmi'

export interface GridItemProperties extends GridItemBaseProperties {
  id: number | null
  isLocked: boolean
  hasReachedEnd: boolean
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
  isLocked: false,
  hasReachedEnd: false,
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
        direction: null,
        isLocked: false,
        hasReachedEnd: false,
        image: generateImage(col + row * GridSize, ImageSizes.SMALL),
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
  toggleFixMyToken: () => void
  fixTokenState: boolean
  fixTokenSelected: string | null
  selectedGridItem?: GridItemProperties
}>({
  gridItemsState: {},
  highlightGridItem: [],
  unavailableDirections: [],
  myItems: [],
  mintedItems: [],
  toggleSelectedItem: () => {},
  resetSelection: () => {},
  refreshAfterMove: () => {},
  toggleFixMyToken: () => {},
  fixTokenState: false,
  fixTokenSelected: null,
  selectedGridItem: undefined,
})

export const useMoveContext = () => useContext(MoveContext)

export const MoveProvider = ({ children }: { children: React.ReactNode }) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})
  const [myItems, setMyItems] = useState<(string | null)[]>([])
  const [fixTokenState, setFixTokenState] = useState(false)
  const [fixTokenSelected, setFixTokenSelected] = useState<string | null>(null)
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
  const [tokensDirectionHandled, setTokensDirectionHandled] = useState(false)
  const { address } = useAccount()
  const getGrid = useLineGetGrid({ watch: false, scopeKey: 'getGrid' })
  const ownedTokens = useLineTokensOfOwner({
    args: [address!],
    enabled: !!address,
  })
  const getTokens = useLineGetTokens({ watch: false })

  const toggleSelectedItem = (index: string) => {
    const selected = gridItemsState[index]
    if (fixTokenState) {
      setFixTokenSelected(index)
      return
    }
    setSelectedGridItem({
      ...selected,
      id: mintedItems.find((item) => item?.index === index)?.id ?? null,
    })
    const {
      leftPos,
      diagonalLeftPos,
      diagonalLeftPosReversed,
      centerPos,
      centerPosReversed,
      diagonalRightPos,
      diagonalRightPosReversed,
      rightPos,
      disableArrows,
    } = getArrowsAvailability({
      index: selected.index,
      direction: selected.direction,
      mintedPositions: mintedItems?.map((item) => item?.index ?? '') ?? [],
      isStar: selected.isLocked,
    })

    setHighlightGridItem([
      leftPos,
      diagonalLeftPos,
      diagonalLeftPosReversed,
      centerPos,
      centerPosReversed,
      diagonalRightPos,
      diagonalRightPosReversed,
      rightPos,
    ])

    setUnavailableDirections(disableArrows)
  }
  const resetSelection = () => {
    setSelectedGridItem(undefined)
    setHighlightGridItem([])
    setUnavailableDirections([])
    setFixTokenState(false)
    setFixTokenSelected(null)
  }

  const refreshAfterMove = () => {
    getGrid.refetch()
    ownedTokens.refetch()
  }

  const toggleFixMyToken = () => {
    if (fixTokenState) {
      setFixTokenSelected(null)
    }
    setFixTokenState(!fixTokenState)
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
      !tokensDirectionHandled &&
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
            isLocked: tokensDirection[item.index]?.isStar,
            hasReachedEnd: tokensDirection[item.index]?.hasReachedEnd,
          },
        }
      }, {})
      setGridItemsState(newGrid)
      setTokensDirectionHandled(true)
    }
  }, [gridItemsState, tokensDirection, tokensDirectionHandled])

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
        toggleFixMyToken,
        fixTokenState,
        fixTokenSelected,
      }}
    >
      {children}
    </MoveContext.Provider>
  )
}
