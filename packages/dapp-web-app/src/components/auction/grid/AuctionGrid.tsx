import React, { useMemo, useRef } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import AuctionGridItem from './AuctionGridItem'
import { useTokensContext } from 'contexts/TokensContext'
import { GridItemsTotal, GridSize, GridSpace } from 'types/grid'
import useGridSizes from 'hooks/useGridSizes'

const AuctionGrid: React.FC = () => {
  const { ref, height, itemHeight, itemWidth, gridSpaceX, gridSquareSize } =
    useGridSizes()
  const {
    gridItemsState,
    toggleSelectedItem,
    mintedItems,
    availableItems,
    selectedItems,
  } = useTokensContext()

  const gridItems = useMemo(() => {
    const items = []
    for (let index = GridItemsTotal; index > 0; index--) {
      let row = Math.floor(index / GridSize)
      let col = index % GridSize

      if (col === 0) {
        row = row - 1
      }
      if (col > 0) {
        col = GridSize - col
      }
      const id = `${row}-${col}`

      items.push(
        <AuctionGridItem
          key={index}
          width={itemWidth}
          height={itemHeight}
          toggleGridItem={toggleSelectedItem}
          lineWidth={Math.round(itemWidth + gridSpaceX)}
          lineHeight={Math.round(itemHeight + GridSpace)}
          isMinted={mintedItems.includes(id)}
          isAvailable={availableItems.includes(id)}
          isSelected={selectedItems.includes(id)}
          {...gridItemsState[id]}
        />,
      )
    }
    return items
  }, [
    itemWidth,
    itemHeight,
    toggleSelectedItem,
    gridSpaceX,
    mintedItems,
    availableItems,
    selectedItems,
    gridItemsState,
  ])

  return (
    <Box
      ref={ref}
      height={'100%'}
      w={height > 0 ? height : 'auto'}
      minW={ref.current ? 'none' : '50vw'}
    >
      <SimpleGrid
        columns={GridSize}
        spacingY={`${GridSpace}px`}
        spacingX={`${gridSpaceX}px`}
      >
        {gridItems}
      </SimpleGrid>
    </Box>
  )
}

export default AuctionGrid
