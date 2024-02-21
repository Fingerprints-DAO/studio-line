import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Fade,
  SimpleGrid,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react'
import PlaygroundGridItem from './PlaygroundGridItem'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'
import { GridItemsTotal, GridSize, GridSpace } from 'types/grid'
import useGridSizes from 'hooks/useGridSizes'
import { useHasReachedEnd } from 'hooks/use-has-reached-end'

const PlaygroundGrid: React.FC = () => {
  const { ref, height, itemHeight, itemWidth, gridSpaceX } = useGridSizes()
  const [showGrid, setShowGrid] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const {
    gridItemsState,
    toggleGridItem,
    highlightGridItem,
    lastSelectedGridItem,
    isFixed,
    resetGrid,
  } = usePlaygroundContext()
  const hasReachedEnd = useHasReachedEnd({
    row: lastSelectedGridItem?.row,
    direction: lastSelectedGridItem?.direction,
  })

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
          gridId={gridItemsState[id].id}
          width={itemWidth}
          height={itemHeight}
          moveDirection={lastSelectedGridItem?.direction}
          isHighlighted={highlightGridItem.includes(id)}
          onlyHighlightedClick={highlightGridItem.length > 0}
          toggleGridItem={toggleGridItem}
          lineWidth={Math.round(itemWidth + gridSpaceX)}
          lineHeight={Math.round(itemHeight + GridSpace)}
          hasReachedEnd={hasReachedEnd}
          isFixed={isFixed}
          {...gridItemsState[id]}
        />,
      )
    }
    return items
  }, [
    gridItemsState,
    itemWidth,
    itemHeight,
    lastSelectedGridItem?.direction,
    highlightGridItem,
    toggleGridItem,
    gridSpaceX,
    hasReachedEnd,
    isFixed,
  ])

  useEffect(() => {
    setTimeout(() => {
      setShowGrid(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (hasReachedEnd) {
      onOpen()
    }
  }, [hasReachedEnd, onOpen])

  return (
    <>
      <Box
        ref={ref}
        h={'100%'}
        w={height > 0 ? height : 'auto'}
        minW={ref.current ? 'none' : '50vw'}
        maxH={'1000px'}
        pos={'relative'}
      >
        <Box mb={3} zIndex={5} pos={'absolute'} top={'-55px'} left={0}>
          <Button
            variant={'outline'}
            onClick={resetGrid}
            isDisabled={!lastSelectedGridItem}
          >
            RESTART
          </Button>
        </Box>
        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          leastDestructiveRef={cancelRef}
          isCentered
        >
          <AlertDialogOverlay rounded={'0'}>
            <AlertDialogContent rounded={'0'}>
              <AlertDialogHeader fontSize="lg" fontWeight="bold" />

              <AlertDialogBody>
                You have reached the end of the map. Keep exploring, or relocate
                anywhere you want on the grid. If you choose to do so, this will
                be your final move.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose} ml={3}>
                  ok
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
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
    </>
  )
}

export default PlaygroundGrid
