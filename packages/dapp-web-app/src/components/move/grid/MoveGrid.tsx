import React, { useEffect, useMemo, useState } from 'react'
import { Box, Fade, SimpleGrid, Skeleton } from '@chakra-ui/react'
import MoveGridItem from './MoveGridItem'
import { useMoveContext } from 'contexts/MoveContext'
import { GridItemsTotal, GridSize, GridSpace } from 'types/grid'
import useGridSizes from 'hooks/useGridSizes'
import { useLineMaxStarTokens } from 'services/web3/generated'
import useStarTokenMinted from 'hooks/use-star-token-minted'

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
    fixTokenState,
    fixTokenSelected,
  } = useMoveContext()
  const { data: starTokenSupply = 25n } = useLineMaxStarTokens({
    scopeKey: 'starTokenSupply',
  })
  const { data: starTokenMinted = 0n } = useStarTokenMinted()

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
          // gridId={gridItemsState[id]?.id}
          width={itemWidth}
          height={itemHeight}
          toggleGridItem={toggleSelectedItem}
          lineWidth={Math.round(itemWidth + gridSpaceX)}
          lineHeight={Math.round(itemHeight + GridSpace)}
          mintedItems={mintedItems.map((item) => item?.index)}
          isMinted={!!mintedItem}
          isAvailable={myItems.includes(id)}
          isSelected={selectedGridItem?.index === id}
          isSelectable={fixTokenState}
          isFixedSelected={fixTokenSelected === id}
          {...gridItemsState[id]}
        />,
      )
    }
    return items
  }, [
    mintedItems,
    itemWidth,
    itemHeight,
    toggleSelectedItem,
    gridSpaceX,
    myItems,
    selectedGridItem?.index,
    fixTokenState,
    fixTokenSelected,
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
      w={!showGrid ? '45vw' : height > 0 ? height - 20 : 'auto'}
      minW={ref.current ? 'none' : '50vw'}
      maxH={'1000px'}
      pos={'relative'}
    >
      <Box mb={3} zIndex={5} pos={'absolute'} top={'-30px'} left={0}>
        star tokens: {Number(starTokenMinted)}/{Number(starTokenSupply)}
      </Box>
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
