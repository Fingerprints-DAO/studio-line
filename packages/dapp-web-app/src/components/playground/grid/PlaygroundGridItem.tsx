import React, { memo, useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import {
  usePlaygroundContext,
  GridItemProperties,
} from 'contexts/PlaygroundContext'
import Image from 'next/image'

interface GridItemProps extends GridItemProperties {
  width: number
  height: number
  isHighlighted: boolean
  onlyHighlightedClick: boolean
  toggleGridItem: (index: string) => void
}

const lineStyle = (isHighlighted = false) => ({
  content: '""',
  position: 'absolute',
  bgColor: isHighlighted ? 'red' : 'blackAlpha.600',
})

const PlaygroundGridItemComponent: React.FC<GridItemProps> = ({
  width,
  height,
  isOpened,
  isBlocked,
  image,
  index,
  row,
  col,
  isHighlighted,
  direction,
  toggleGridItem,
  onlyHighlightedClick,
}) => {
  // const placeholderImage = 'https://via.placeholder.com/150'
  // const placeholderImage = `https://picsum.photos/id/${row + 1}${col}/200/300`
  // const placeholderImage = `https://picsum.photos/200/300?random=${row + 1}${
  //   col + 1
  // }`
  const [isFirstRow, isLastRow, isFirstCol, isLastCol] = [
    row === 0,
    row === 23,
    col === 0,
    col === 23,
  ]

  const handleClick = () => {
    toggleGridItem(index)
  }

  const disableClick =
    isBlocked ||
    (onlyHighlightedClick && !isHighlighted) ||
    (!isHighlighted && (isLastRow || isFirstRow))
  const isBorder = isFirstRow || isFirstCol || isLastRow || isLastCol
  const isOdd = col % 2 === 0

  const bgColor = useMemo(() => {
    if (isHighlighted) {
      return 'red.300'
    }
    if (isBorder) {
      return '#d2d2d2'
    }
    if (isOdd) {
      return '#737373'
    }
    return '#191919'
  }, [isBorder, isHighlighted, isOdd])

  return (
    <Box
      pos={'relative'}
      w={`${width}px`}
      h={`${height}px`}
      onClick={disableClick ? undefined : handleClick}
      cursor={disableClick ? 'not-allowed' : isOpened ? 'grabbing' : 'pointer'}
      _after={
        !isLastRow
          ? {
              ...lineStyle(),
              left: '50%',
              bottom: '-50%', // Ajustado para estender para fora do quadrado
              transform: 'translateX(-50%)',
              width: '1px',
              height: '100%', // Ajustado para cobrir a distância entre os quadrados
            }
          : {}
      }
      _before={
        !isLastCol
          ? {
              ...lineStyle(),
              top: '50%',
              right: '-50%', // Ajustado para estender para fora do quadrado
              transform: 'translateY(-50%)',
              height: '1px',
              width: '100%', // Ajustado para cobrir a distância entre os quadrados
            }
          : {}
      }
    >
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
                width: `${width * 2}px`,
                height: `${height * 2}px`,
                transition:
                  'width 0.2s, height 0.2s, transform 0.2s, filter 2s',
                transform: 'translate(-25%, -25%)',
                filter: 'none',
                zIndex: 3,
              }
        }
        // border={isSold ? '2px solid red' : 'none'}
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
        <Box
          bgColor={bgColor}
          pos={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={isBlocked || isOpened ? 0 : 1}
        />
      </Box>
    </Box>
  )
}

const PlaygroundGridItem = memo(PlaygroundGridItemComponent)
PlaygroundGridItem.displayName = 'PlaygroundGridItem'

export default PlaygroundGridItem
