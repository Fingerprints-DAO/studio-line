import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Fade, SimpleGrid, Skeleton } from '@chakra-ui/react'
import AuctionGridItem from './AuctionGridItem'
import { useTokensContext } from 'contexts/TokensContext'
import { GridItemsTotal, GridSize, GridSpace } from 'types/grid'
import useGridSizes from 'hooks/useGridSizes'

const AuctionGrid: React.FC = () => {
  const { ref, height, itemHeight, itemWidth, gridSpaceX } = useGridSizes()
  const {
    gridItemsState,
    toggleSelectedItem,
    mintedItems,
    availableItems,
    selectedItems,
  } = useTokensContext()
  const [showGrid, setShowGrid] = useState(false)

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
          gridId={gridItemsState[id]?.id}
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

  useEffect(() => {
    setTimeout(() => {
      setShowGrid(true)
    }, 1000)
  }, [])

  return (
    <Box
      ref={ref}
      height={'100%'}
      w={!showGrid ? '100%' : height > 0 ? height - 20 : 'auto'}
      minW={ref.current ? 'none' : '50vw'}
      pos={'relative'}
    >
      <Box
        hidden={showGrid}
        pos={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={5}
      >
        <Skeleton h={'100%'} w={'100%'} />
      </Box>

      <Fade in={showGrid}>
        <SimpleGrid
          columns={GridSize}
          spacingY={`${GridSpace}px`}
          spacingX={`${gridSpaceX}px`}
        >
          {gridItems}
        </SimpleGrid>
      </Fade>
    </Box>
  )
}

export default AuctionGrid
