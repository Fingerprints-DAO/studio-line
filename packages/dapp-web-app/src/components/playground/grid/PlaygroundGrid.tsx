import React, { useMemo, useRef } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import PlaygroundGridItem from './PlaygroundGridItem'
import useContainerSizes from 'hooks/useContainerSizes'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'
import { GridItemsTotal, GridSize, GridSpace } from 'types/grid'
import useGridSizes from 'hooks/useGridSizes'

const PlaygroundGrid: React.FC = () => {
  const { ref, height, itemHeight, itemWidth, gridSpaceX } = useGridSizes()
  const {
    gridItemsState,
    toggleGridItem,
    highlightGridItem,
    lastSelectedGridItem,
  } = usePlaygroundContext()

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
        <PlaygroundGridItem
          key={index}
          width={itemWidth}
          height={itemHeight}
          moveDirection={lastSelectedGridItem?.direction}
          isHighlighted={highlightGridItem.includes(id)}
          onlyHighlightedClick={highlightGridItem.length > 0}
          toggleGridItem={toggleGridItem}
          lineWidth={Math.round(itemWidth + gridSpaceX)}
          lineHeight={Math.round(itemHeight + GridSpace)}
          {...gridItemsState[id]}
        />,
      )
    }
    return items
  }, [
    itemWidth,
    itemHeight,
    lastSelectedGridItem?.direction,
    highlightGridItem,
    toggleGridItem,
    gridSpaceX,
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

export default PlaygroundGrid
