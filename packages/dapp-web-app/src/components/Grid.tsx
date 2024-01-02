import React, { useMemo } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import GridItem from './GridItem'
import useContainerWidth from 'hooks/useContainerWidth'

const Grid: React.FC = () => {
  const gridSize = 24
  const { ref, width } = useContainerWidth()

  const itemSize = useMemo(() => {
    const totalSpacing = gridSize * 10
    const availableWidth = width - totalSpacing
    return availableWidth / gridSize
  }, [width])

  const itemHeight = useMemo(() => itemSize * (3 / 2), [itemSize])

  const gridItems = useMemo(() => {
    const items = []
    for (let index = 0; index < gridSize * gridSize; index++) {
      const row = Math.floor(index / gridSize)
      const col = index % gridSize
      items.push(
        <GridItem
          key={index}
          width={itemSize}
          height={itemHeight}
          row={row}
          col={col}
        />
      )
    }
    return items
  }, [itemSize, itemHeight])

  return (
    <div ref={ref}>
      <SimpleGrid columns={gridSize} spacing="10px">
        {gridItems}
      </SimpleGrid>
    </div>
  )
}

export default Grid
