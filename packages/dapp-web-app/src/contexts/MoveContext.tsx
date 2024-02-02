import { ArrowDirections } from 'components/arrow/utils'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { useLineGetGrid, useLineTokensOfOwner } from 'services/web3/generated'
import {
  Direction,
  GridItemBaseProperties,
  GridSize,
  generateImage,
  getDirection,
} from 'types/grid'
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
  unavailableDirections: ArrowDirections[]
  myItems: (string | null)[]
  mintedItems: (string | null)[]
  toggleSelectedItem: (index: string) => void
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
  const [mintedItems, setMintedItems] = useState<(string | null)[]>([])
  const [selectedGridItem, setSelectedGridItem] = useState<GridItemProperties>()
  const { address } = useAccount()
  const getGrid = useLineGetGrid({ watch: true })
  // const ownedTokens = useLineTokensOfOwner({
  //   args: [address!],
  //   enabled: !!address,
  //   watch: true,
  // })

  const toggleSelectedItem = (index: string) => {
    const [y, x] = index.split('-').map((n) => Number(n))
    setSelectedGridItem({
      ...gridItemsState[index],
      id: getGrid.data ? Number(getGrid?.data[x][y]) : gridItemsState[index].id,
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

    if (mintedItems.includes(leftPos))
      unavailableDirections.push(ArrowDirections.LEFT)
    if (mintedItems.includes(diagonalLeftPos))
      unavailableDirections.push(ArrowDirections.DIAGONAL_LEFT)
    if (mintedItems.includes(centerPos))
      unavailableDirections.push(ArrowDirections.CENTER)
    if (mintedItems.includes(diagonalRightPos))
      unavailableDirections.push(ArrowDirections.DIAGONAL_RIGHT)
    if (mintedItems.includes(rightPos))
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

  // useEffect(() => {
  //   console.log(ownedTokens)
  //   // setMyItems()
  // }, [ownedTokens])

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
        unavailableDirections,
      }}
    >
      {children}
    </MoveContext.Provider>
  )
}
