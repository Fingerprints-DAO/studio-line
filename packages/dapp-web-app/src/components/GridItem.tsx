import React, { memo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useGridItemContext } from 'contexts/GridItemContext'
import Image from 'next/image'

interface GridItemProps {
  width: number
  height: number
  row: number
  col: number
}

const lineStyle = {
  content: '""',
  position: 'absolute',
  bgColor: 'blackAlpha.600',
}

const GridItemComponent: React.FC<GridItemProps> = ({
  width,
  height,
  row,
  col,
}) => {
  const { gridItemsState, toggleGridItem } = useGridItemContext()
  // const placeholderImage = 'https://via.placeholder.com/150'
  // const placeholderImage = `https://picsum.photos/id/${row + 1}${col}/200/300`
  const placeholderImage = `https://picsum.photos/200/300?random=${row + 1}${
    col + 1
  }`
  const [isFirstRow, isLastRow, isFirstCol, isLastCol] = [
    row === 0,
    row === 23,
    col === 0,
    col === 23,
  ]
  const index = `${row}-${col}`
  const isClicked = gridItemsState[index]

  const handleClick = () => {
    toggleGridItem(index)
  }

  return (
    <Box
      pos={'relative'}
      w={`${width}px`}
      h={`${height}px`} // Usa a altura calculada
      onClick={handleClick}
      _after={
        !isLastRow
          ? {
              ...lineStyle,
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
              ...lineStyle,
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
      >
        <Box
          pos={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={isClicked ? 1 : 0}
        >
          <Image
            src={placeholderImage}
            alt="placeholder"
            width={width}
            height={height}
          />
        </Box>
        <Box
          border={'1px solid white'}
          bgColor={
            isFirstRow || isFirstCol || isLastRow || isLastCol
              ? 'gray.200'
              : 'gray.500'
          }
          pos={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={isClicked ? 0 : 1}
        />
      </Box>
    </Box>
  )
}

const GridItem = memo(GridItemComponent)
GridItem.displayName = 'GridItem'

export default GridItem
