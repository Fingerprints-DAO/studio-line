import React, { useMemo, useRef } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import AuctionGridItem from './AuctionGridItem'
import useContainerSizes from 'hooks/useContainerSizes'
import { useAuctionContext } from 'contexts/AuctionContext'
import { GridItemsTotal, GridSize, GridSpace } from 'types/grid'

const AuctionGrid: React.FC = () => {
  const { ref, height, width } = useContainerSizes()
  const {
    gridItemsState,
    toggleSelectedItem,
    mintedItems,
    availableItems,
    selectedItems,
  } = useAuctionContext()

  const { itemHeight, itemWidth, gridSpaceX } = useMemo(() => {
    const totalSpacing = GridSize * GridSpace
    const availableHeight = height - totalSpacing
    const calculatedItemHeight = availableHeight / GridSize
    const calculatedItemWidth = calculatedItemHeight / (3 / 2)
    const calculatedGridSpaceX =
      (width - Math.round(calculatedItemWidth) * (GridSize - 1)) /
      (GridSize - 1)
    return {
      itemHeight: calculatedItemHeight,
      itemWidth: calculatedItemWidth,
      gridSpaceX: calculatedGridSpaceX,
    }
  }, [height, width])

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
        />
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
