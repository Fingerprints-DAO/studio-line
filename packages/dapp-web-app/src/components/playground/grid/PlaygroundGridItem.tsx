import React, { memo, useMemo, useState } from 'react'
import { Box, Flex, Tooltip, Image as ChackraImage } from '@chakra-ui/react'
import { GridItemProperties } from 'contexts/PlaygroundContext'
import Image from 'next/image'
import { Direction, GridSize } from 'types/grid'
import GridNumber from 'components/gridNumber'
import ChakraNextImageLoader from 'components/chakraNextImageLoader'

interface GridItemProps extends GridItemProperties {
  width: number
  height: number
  moveDirection?: Direction
  lineWidth: number
  lineHeight: number
  isHighlighted: boolean
  onlyHighlightedClick: boolean
  toggleGridItem: (index: string) => void
  // id: number
}

const lineStyle = ({
  isRow = false,
  width = '100%',
  height = '100%',
  startFrom = '50%',
}) => ({
  content: '""',
  position: 'absolute',
  bgColor: 'gray.200',
  ...(isRow
    ? {
        // up and down line
        left: '50%',
        top: startFrom,
        transform: `translateX(-50%)`,
        width: '1px',
        height,
      }
    : {
        // left and right line
        top: '50%',
        left: startFrom,
        transform: `translateY(-50%)`,
        height: '1px',
        width,
      }),
})

const PlaygroundGridItemComponent: React.FC<GridItemProps> = ({
  width,
  height,
  moveDirection,
  lineWidth,
  lineHeight,
  isOpened,
  isBlocked,
  image,
  index,
  row,
  col,
  isHighlighted,
  toggleGridItem,
  onlyHighlightedClick,
}) => {
  const [isFirstRow, isLastRow, isFirstCol, isLastCol] = [
    row === GridSize - 1,
    row === 0,
    col === 0,
    col === GridSize - 1,
  ]
  const widthPx = `${width}px`
  const heightPx = `${height}px`

  const disableClick =
    isFirstCol ||
    isLastCol ||
    isBlocked ||
    (onlyHighlightedClick && !isHighlighted) ||
    (isHighlighted && (isLastRow || isFirstRow))
  const isBorder = isFirstRow || isFirstCol || isLastRow || isLastCol
  const isOdd = col % 2 === 0

  const handleClick = () => {
    toggleGridItem(index)
  }

  const bgColor = useMemo(() => {
    if (isHighlighted) {
      return moveDirection === Direction.UP || moveDirection === Direction.ALL
        ? 'red.100'
        : 'cyan.200'
    }
    if (isBorder) {
      return 'gray.300'
    }
    if (isOdd) {
      return 'gray.400'
    }
    return 'gray.500'
  }, [isBorder, isHighlighted, isOdd, moveDirection])

  return (
    <Box
      pos={'relative'}
      w={widthPx}
      h={heightPx}
      onClick={disableClick ? undefined : handleClick}
      cursor={disableClick ? 'not-allowed' : isOpened ? 'grabbing' : 'pointer'}
      _after={
        !isLastRow
          ? lineStyle({
              isRow: true,
              height: `${lineHeight}px`,
              startFrom: `${Math.round(height / 2)}px`,
            })
          : {}
      }
      _before={
        !isLastCol
          ? lineStyle({
              isRow: false,
              width: `${lineWidth}px`,
              startFrom: `${Math.round(width / 2)}px`,
            })
          : {}
      }
    >
      {isFirstCol && (
        <GridNumber number={row} isColumn w={widthPx} h={heightPx} />
      )}
      {isLastRow && <GridNumber number={col} w={widthPx} h={heightPx} />}
      <Box
        w={'100%'}
        h={'100%'}
        backgroundSize="cover"
        pos={'relative'}
        zIndex={2}
        _hover={
          (onlyHighlightedClick && !isHighlighted) || disableClick
            ? {}
            : {
                width: `${width * 1.4}px`,
                height: `${height * 1.4}px`,
                transition:
                  'width 0.2s, height 0.2s, transform 0.2s, filter 2s',
                transform: 'translate(-15%, -15%)',
                filter: 'none',
                zIndex: 3,
              }
        }
      >
        <Box
          pos={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={isOpened || isBlocked ? 1 : 0}
          _hover={{
            transition: 'filter 2s',
          }}
          filter={isBlocked ? 'grayscale(100%)' : 'none'}
          border={isHighlighted ? '2px solid red' : `none`}
          borderColor={isHighlighted ? bgColor : `none`}
        >
          <Image
            src={image}
            alt="placeholder"
            width={width * 2}
            height={height * 2}
          />
        </Box>

        <Tooltip
          hasArrow
          arrowSize={6}
          gutter={6}
          borderRadius={0}
          p={'8px'}
          bgColor={'rgba(45, 55, 72, 1)'}
          backdropFilter={'blur(4px)'}
          isDisabled={disableClick}
          openDelay={500}
          label={
            <Flex
              flexDir={'column'}
              alignItems={'center'}
              minW={'100px'}
              minH={'150px'}
            >
              <ChakraNextImageLoader
                src={image}
                width={100}
                height={150}
                alt="Token image"
              />
            </Flex>
          }
          placement="auto"
        >
          <Box
            bgColor={bgColor}
            pos={'absolute'}
            w={'100%'}
            h={'100%'}
            zIndex={isBlocked || isOpened ? 0 : 1}
            fontSize={'xx-small'}
          />
        </Tooltip>
      </Box>
    </Box>
  )
}

const PlaygroundGridItem = memo(PlaygroundGridItemComponent)
PlaygroundGridItem.displayName = 'PlaygroundGridItem'

export default PlaygroundGridItem
