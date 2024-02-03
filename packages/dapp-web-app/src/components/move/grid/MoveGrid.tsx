import React, { useMemo, useRef } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import MoveGridItem from './MoveGridItem'
import useContainerSizes from 'hooks/useContainerSizes'
import { useMoveContext } from 'contexts/MoveContext'
import { GridItemsTotal, GridSize, GridSpace } from 'types/grid'

const MoveGrid: React.FC = () => {
  const { ref, height, width } = useContainerSizes()
  const {
    gridItemsState,
    toggleSelectedItem,
    mintedItems,
    myItems,
    selectedGridItem,
  } = useMoveContext()
  const gridSquareSize = useMemo(() => {
    // return the smallest size between width and height
    if (width < height) {
      return width
    }
    return height
  }, [height, width])

  const { itemHeight, itemWidth, gridSpaceX } = useMemo(() => {
    const totalSpacing = GridSize * GridSpace
    const availableHeight = gridSquareSize - totalSpacing
    const calculatedItemHeight = availableHeight / GridSize
    const calculatedItemWidth = calculatedItemHeight / (3 / 2)
    const calculatedGridSpaceX =
      (gridSquareSize - Math.round(calculatedItemWidth) * (GridSize - 1)) /
      (GridSize - 1)
    return {
      itemHeight: calculatedItemHeight,
      itemWidth: calculatedItemWidth,
      gridSpaceX: calculatedGridSpaceX,
    }
  }, [gridSquareSize])

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

export default MoveGrid
