import React, { useEffect, useMemo, useState } from 'react'
import { Box, Fade, SimpleGrid, Skeleton } from '@chakra-ui/react'
import MoveGridItem from './MoveGridItem'
import { useMoveContext } from 'contexts/MoveContext'
import { GridItemsTotal, GridSize, GridSpace } from 'types/grid'
import useGridSizes from 'hooks/useGridSizes'

type MoveGridProps = {}

const MoveGrid: React.FC<MoveGridProps> = ({}) => {
  const { ref, height, itemHeight, itemWidth, gridSpaceX } = useGridSizes()
  const [showGrid, setShowGrid] = useState(false)
  const {
    gridItemsState,
    toggleSelectedItem,
    mintedItems,
    myItems,
    selectedGridItem,
  } = useMoveContext()

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
      const mintedItem = mintedItems.find((minted) => minted?.index === id)

      items.push(
        <MoveGridItem
          key={index}
          width={itemWidth}
          height={itemHeight}
          toggleGridItem={toggleSelectedItem}
          lineWidth={Math.round(itemWidth + gridSpaceX)}
          lineHeight={Math.round(itemHeight + GridSpace)}
          mintedItems={mintedItems.map((item) => item?.index)}
          isMinted={!!mintedItem}
          isAvailable={myItems.includes(id)}
          isSelected={selectedGridItem?.index === id}
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
    myItems,
    selectedGridItem,
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
      w={height > 0 ? height : 'auto'}
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
        // bgColor={'whiteAlpha.800'}
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

export default MoveGrid
