import React, { useMemo } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import PlaygroundGridItem from './PlaygroundGridItem'
import useContainerSizes from 'hooks/useContainerSizes'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'

const gridSize = 24
const spacing = 6
const PlaygroundGrid: React.FC = () => {
  const { ref, height } = useContainerSizes()
  const { gridItemsState, toggleGridItem, highlightGridItem } =
    usePlaygroundContext()

  const itemHeight = useMemo(() => {
    const totalSpacing = gridSize * spacing
    const availableHeight = height - totalSpacing
    return availableHeight / gridSize
  }, [height])

  const itemWidth = useMemo(() => {
    return itemHeight / (3 / 2)
  }, [itemHeight])

  // const itemSize = useMemo(() => {
  //   const totalSpacing = gridSize * 10
  //   const availableWidth = width - totalSpacing
  //   return availableWidth / gridSize
  // }, [width])

  // const itemHeight = useMemo(() => itemSize * (3 / 2), [itemSize])

  const gridItems = useMemo(() => {
    const items = []
    for (let index = 0; index < gridSize * gridSize; index++) {
      const row = Math.floor(index / gridSize)
      const col = index % gridSize
      items.push(
        <PlaygroundGridItem
          key={index}
          width={itemWidth}
          height={itemHeight}
          isHighlighted={highlightGridItem.includes(`${row}-${col}`)}
          onlyHighlightedClick={highlightGridItem.length > 0}
          toggleGridItem={toggleGridItem}
          {...gridItemsState[`${row}-${col}`]}
        />
      )
    }
    return items
  }, [itemWidth, itemHeight, highlightGridItem, toggleGridItem, gridItemsState])

  return (
    <Box
      ref={ref}
      height={'100%'}
      w={height > 0 ? height : 'auto'}
      // minH={'700px'}
    >
      <SimpleGrid columns={gridSize} spacing={`${spacing}px`}>
        {gridItems}
      </SimpleGrid>
    </Box>
  )
}

export default PlaygroundGrid
