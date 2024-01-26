import React, { useMemo } from 'react'
import { SimpleGrid, Text } from '@chakra-ui/react'
import AuctionGridItem from './AuctionGridItem'
import useContainerSizes from 'hooks/useContainerSizes'
import { useAuctionContext } from 'contexts/AuctionContext_bkp'
import { GridItemsTotal, GridSize } from 'types/grid'

const AuctionGrid: React.FC = () => {
  const { ref, width } = useContainerSizes()
  const {
    gridItemsState,
    toggleSelectedItem,
    selectedItems,
    availableItems,
    mintedItems,
  } = useAuctionContext()

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

      const id = `${row}-${col}`

      items.push(
        <AuctionGridItem
          key={index === 0 ? 'id0' : index}
          width={itemSize}
          height={itemHeight}
          toggleGridItem={toggleSelectedItem}
          isSelected={selectedItems.includes(id)}
          isAvailable={availableItems.includes(id)}
          isMinted={mintedItems.includes(id)}
          {...gridItemsState[id]}
        />
      )
    }
    // console.log(items.length)
    return items
  }, [
    itemSize,
    itemHeight,
    toggleSelectedItem,
    selectedItems,
    availableItems,
    mintedItems,
    gridItemsState,
  ])

  return (
    <div ref={ref}>
      <Text fontSize={'2xl'}>Please, select a token from the grid.</Text>
      <Text fontSize={'md'}>
        Only revealed tokens are available to be selected.
      </Text>
      <Text fontSize={'sm'} mb={5} color={'red'}>
        Minted tokens can not be selected and have a red border.
      </Text>
      <SimpleGrid columns={GridSize} spacing="10px">
        {gridItems}
      </SimpleGrid>
    </div>
  )
}

export default AuctionGrid
