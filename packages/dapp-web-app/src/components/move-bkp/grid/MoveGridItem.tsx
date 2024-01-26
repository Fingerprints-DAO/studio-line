import React, { memo, useMemo, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { GridItemProperties } from 'contexts/AuctionContext'
import Image from 'next/image'
// import blueArrows from 'public/blueArrows.png'

interface GridItemProps extends GridItemProperties {
  width: number
  height: number
  toggleGridItem: (index: string) => void
}

const lineStyle = (isHighlighted = false) => ({
  content: '""',
  position: 'absolute',
  bgColor: isHighlighted ? 'red' : 'blackAlpha.600',
})

const MoveGridItemComponent: React.FC<GridItemProps> = ({
  width,
  height,
  image,
  index,
  row,
  col,
  direction,
  toggleGridItem,
}) => {
  const [isFirstRow, isLastRow, isFirstCol, isLastCol] = [
    row === 24,
    row === 0,
    col === 0,
    col === 24,
  ]

  const handleClick = () => {
    toggleGridItem(index)
  }

  const disableClick = isLastRow || isFirstRow
  const isBorder = isFirstRow || isFirstCol || isLastRow || isLastCol
  const isOdd = col % 2 === 0

  const bgColor = useMemo(() => {
    // if (isHighlighted) {
    //   return 'red.300'
    // }
    if (isBorder) {
      return '#d2d2d2'
    }
    if (isOdd) {
      return '#737373'
    }
    return '#191919'
  }, [isBorder, isOdd])

  return (
    <Box
      id={index}
      pos={'relative'}
      w={`${width}px`}
      h={`${height}px`}
      onClick={disableClick ? undefined : handleClick}
      cursor={disableClick ? 'not-allowed' : 'pointer'}
      // _after={
      //   !isLastRow
      //     ? {
      //         ...lineStyle(),
      //         bgColor: 'red',
      //         left: '50%',
      //         bottom: '-10%', // Ajustado para estender para fora do quadrado
      //         top: '-10%', // Ajustado para estender para fora do quadrado
      //         transform: 'translateX(-50%)',
      //         width: '1px',
      //       }
      //     : {}
      // }
      // _before={
      //   !isLastCol
      //     ? {
      //         ...lineStyle(),
      //         top: '50%',
      //         right: '-50%', // Ajustado para estender para fora do quadrado
      //         transform: 'translateY(-50%)',
      //         height: '1px',
      //         width: '100%', // Ajustado para cobrir a distância entre os quadrados
      //       }
      //     : {}
      // }
    >
      <Box pos={'absolute'} top={0} left={0} right={0} bottom={0}>
        {/* central point: small circle box in the middle of the grid item */}
        <Box
          pos={'absolute'}
          top={'50%'}
          left={'50%'}
          w={'10px'}
          h={'10px'}
          borderRadius={'full'}
          transform={'translate(-50%, -50%)'}
          bgColor={bgColor}
          zIndex={4}
        />
        {/* left line */}
        {!isFirstCol && (
          <Box
            pos={'absolute'}
            top={'50%'}
            right={'50%'}
            w={'calc(100% + 11px)'}
            transform={'translate(0, -50%)'}
            h={'1px'}
            bgColor={'black'}
          />
        )}
        {/* right line */}
        {!isLastCol && (
          <Box
            pos={'absolute'}
            top={'50%'}
            left={'50%'}
            w={'calc(100% + 11px)'}
            transform={'translate(0%, -50%)'}
            h={'1px'}
            bgColor={'black'}
          />
        )}

        {/* bottom line */}
        {!isLastRow && (
          <Box
            pos={'absolute'}
            top={'50%'}
            left={'50%'}
            w={'1px'}
            h={'calc(100% + 11px)'}
            transform={'translate(-50%, 0%)'}
            bgColor={'black'}
          />
        )}
        {/* top line */}
        {!isFirstRow && (
          <Box
            pos={'absolute'}
            bottom={'50%'}
            left={'50%'}
            w={'1px'}
            h={'calc(100% + 11px)'}
            transform={'translate(-50%, 0%)'}
            bgColor={'black'}
          />
        )}
        {/* diagonal left line */}
        {/* {!isFirstRow && !isFirstCol && (
              <Box
                pos={'absolute'}
                top={'5%'}
                left={'-74%'}
                w={`150%`}
                h={'1px'}
                style={{ rotate: '-126deg' }}
                bgColor={'purple'}
              >
                <Box
                  pos={'absolute'}
                  width="0"
                  height="0"
                  borderTopWidth="10px"
                  borderRightWidth="10px"
                  borderBottomWidth="0"
                  borderLeftWidth="10px"
                  borderTopColor="transparent"
                  borderRightColor="transparent"
                  borderBottomColor="transparent"
                  borderLeftColor="red"
                  top={'-8px'}
                  right={'-5px'}
                  style={{ rotate: '-135deg' }}
                />
              </Box>
            )} */}
        {/* diagonal right line */}
        {/* {!isFirstRow && !isLastCol && (
              <Box
                pos={'absolute'}
                top={'5%'}
                left={'24%'}
                w={`150%`}
                h={'1px'}
                style={{ rotate: '126deg' }}
                bgColor={'pink'}
                zIndex={12}
              >
                <Box
                  pos={'absolute'}
                  width="0"
                  height="0"
                  borderTopWidth="10px"
                  borderRightWidth="10px"
                  borderBottomWidth="0"
                  borderLeftWidth="10px"
                  borderTopColor="transparent"
                  borderRightColor="transparent"
                  borderBottomColor="transparent"
                  borderLeftColor="red"
                  top={'0px'}
                  left={'-5px'}
                  style={{ rotate: '50deg' }}
                />
              </Box>
            )} */}
      </Box>

      {index === '22-4' && (
        <Box
          pos={'absolute'}
          top={'42%'}
          left={'-50%'}
          w={'200%'}
          h={'100%'}
          zIndex={6}
          bgImage={'/blue-arrows.png'}
          bgPos={'center'}
          bgSize={'contain'}
          bgRepeat={'no-repeat'}
        />
      )}
      <Box
        w={'100%'}
        h={'100%'}
        backgroundSize="cover"
        pos={'relative'}
        zIndex={2}
        _hover={
          disableClick
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
          zIndex={0}
          _hover={{
            transition: 'filter 2s',
          }}
          // filter={isBlocked ? 'grayscale(100%)' : 'none'}
          // border={isHighlighted ? '2px solid red' : `none`}
          // borderColor={isHighlighted ? bgColor : `none`}
        >
          {/* <Image
            src={image}
            alt="placeholder"
            width={width * 2}
            height={height * 2}
          /> */}
        </Box>
        <Box
          // bgColor={'blackAlpha.300'}
          // bgColor={bgColor}
          pos={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
          color={'black'}
        />
      </Box>
    </Box>
  )
}

const AuctionGridItem = memo(MoveGridItemComponent)
AuctionGridItem.displayName = 'AuctionGridItem'

export default AuctionGridItem
