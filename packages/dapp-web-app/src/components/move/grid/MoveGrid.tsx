import React, { useMemo } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import AuctionGridItem from './MoveGridItem'
import useContainerSizes from 'hooks/useContainerSizes'
import { useAuctionContext } from 'contexts/AuctionContext'
import { GridItemsTotal, GridSize } from 'types/grid'

const MoveGrid: React.FC = () => {
  const { ref, width } = useContainerSizes()
  const { gridItemsState, toggleSelectedItem } = useAuctionContext()

  const itemSize = useMemo(() => {
    const totalSpacing = GridSize * 10
    const availableWidth = width - totalSpacing
    return availableWidth / GridSize
  }, [width])

  const itemHeight = useMemo(() => itemSize * (3 / 2), [itemSize])

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

      // if (index > 615) {
      //   console.log(index, row, col)
      // }

      items.push(
        <AuctionGridItem
          key={index === 0 ? 'id0' : index}
          width={itemSize}
          height={itemHeight}
          // isHighlighted={highlightGridItem.includes(`${row}-${col}`)}
          // onlyHighlightedClick={highlightGridItem.length > 0}
          toggleGridItem={toggleSelectedItem}
          {...gridItemsState[`${row}-${col}`]}
        />
      )
    }
    // console.log(items.length)
    return items
  }, [itemSize, itemHeight, toggleSelectedItem, gridItemsState])

  return (
    <div ref={ref}>
      <SimpleGrid columns={GridSize} spacing="10px">
        {gridItems}
      </SimpleGrid>
    </div>
  )
}

export default MoveGrid
