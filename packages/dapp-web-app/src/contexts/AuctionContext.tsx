import dayjs from 'dayjs'
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react'
import useAuctionGetConfig from 'services/web3/auction/use-auction-get-config'
import useAuctionData from 'services/web3/auction/use-auction-get-data'
import { AuctionConfig, AuctionData, AuctionState } from 'types/auction'
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

const AuctionContext = createContext<{
  gridItemsState: GridItemState
  selectedItems: string[]
  availableItems: string[]
  mintedItems: string[]
  toggleSelectedItem: (index: string) => void
  resetSelection: () => void
  auctionConfig: AuctionConfig
  auctionData: AuctionData
  auctionState: AuctionState
}>({
  gridItemsState: {},
  selectedItems: [],
  availableItems: [],
  mintedItems: [],
  toggleSelectedItem: () => {},
  resetSelection: () => {},
  auctionConfig: { startTime: 0n, endTime: 0n, startPrice: 0n, endPrice: 0n },
  auctionData: {
    price: 0n,
    minted: 0n,
    maxSupply: 0n,
  },
  auctionState: AuctionState.NOT_STARTED,
})

export const useAuctionContext = () => useContext(AuctionContext)

const getCurrentState = (startTime?: number, endTime?: number) => {
  if (!startTime || !endTime) {
    return AuctionState.NOT_STARTED
  }

  const now = dayjs()
  const start = dayjs.unix(startTime)
  const end = dayjs.unix(endTime)

  if (now.isAfter(end)) {
    return AuctionState.ENDED
  }

  if (now.isAfter(start)) {
    return AuctionState.STARTED
  }

  return AuctionState.NOT_STARTED
}

export const AuctionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const auctionConfig = useAuctionGetConfig()
  const auctionData = useAuctionData()
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [availableItems, setAvailableItems] = useState<string[]>([])
  const [mintedItems, setMintedItems] = useState<string[]>([])
  const [price, setPrice] = useState(auctionData.price)
  const [minted, setMinted] = useState(auctionData.minted)
  const [maxSupply, setMaxSupply] = useState(auctionData.maxSupply)

  // Add useState for auctionState
  const [auctionState, setAuctionState] = useState<AuctionState>(
    getCurrentState(
      Number(auctionConfig.startTime),
      Number(auctionConfig.endTime),
    ),
  )

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

  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const checkAndUpdateState = () => {
      const now = dayjs().unix()
      const ONE_MINUTE = 60 // in seconds

      const isCloseToStartOrEnd =
        Math.abs(now - Number(auctionConfig.startTime)) <= ONE_MINUTE ||
        Math.abs(now - Number(auctionConfig.endTime)) <= ONE_MINUTE

      setAuctionState(
        getCurrentState(
          Number(auctionConfig.startTime),
          Number(auctionConfig.endTime),
        ),
      )

      // If past endTime, clear interval and exit
      if (now > Number(auctionConfig.endTime)) {
        clearInterval(intervalRef.current!)
        return
      }

      if (isCloseToStartOrEnd) {
        clearInterval(intervalRef.current!)
        intervalRef.current = setInterval(checkAndUpdateState, 1000)
      }
    }

    intervalRef.current = setInterval(checkAndUpdateState, 30000)
    checkAndUpdateState()

    checkAndUpdateState()

    return () => clearInterval(intervalRef.current!)
  }, [auctionConfig.startTime, auctionConfig.endTime])

  useEffect(() => {
    if (auctionData.price) {
      setPrice(auctionData.price)
    }
  }, [auctionData.price])

  useEffect(() => {
    if (auctionData.minted) {
      setMinted(auctionData.minted)
    }
  }, [auctionData.minted])

  useEffect(() => {
    if (auctionData.maxSupply) {
      setMaxSupply(auctionData.maxSupply)
    }
  }, [auctionData.maxSupply])

  return (
    <AuctionContext.Provider
      value={{
        gridItemsState,
        selectedItems,
        availableItems,
        mintedItems,
        toggleSelectedItem,
        resetSelection,
        auctionConfig,
        auctionData: {
          price,
          minted,
          maxSupply,
        },
        auctionState,
      }}
    >
      {children}
    </AuctionContext.Provider>
  )
}
