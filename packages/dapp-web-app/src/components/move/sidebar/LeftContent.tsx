'use client'

import {
  Box,
  Fade,
  Flex,
  SkeletonText,
  Text,
  UseQueryProps,
} from '@chakra-ui/react'

import { useMoveContext } from 'contexts/MoveContext'
import { useMemo } from 'react'
import ChakraNextImageLoader from 'components/chakraNextImageLoader'
import { GridSize, ImageSizes, generateImage } from 'types/grid'

export function LeftContent({ token }: { token: any }) {
  const { gridItemsState, selectedGridItem, highlightGridItem } =
    useMoveContext()

  const highlightItems = useMemo(
    () => [
      selectedGridItem,
      ...highlightGridItem
        .map((item) => gridItemsState[item])
        .filter((item) => item),
    ],
    [gridItemsState, highlightGridItem, selectedGridItem],
  )

  const posId = useMemo(() => {
    if (!selectedGridItem) return 0
    return selectedGridItem?.col + selectedGridItem?.row * GridSize
  }, [selectedGridItem])

  return (
    <Fade in={selectedGridItem && token} unmountOnExit>
      <Flex as="header" alignItems={'center'} mb={4}>
        <SkeletonText
          noOfLines={1}
          skeletonHeight="8"
          fontWeight={'bold'}
          textColor={'gray.900'}
          fontSize={'2xl'}
          textTransform={'uppercase'}
          isLoaded={!!token.name}
        >
          {token.name}
        </SkeletonText>
        <Text fontSize={'md'} textColor={'gray.500'} ml={2}>
          ({selectedGridItem?.col},{selectedGridItem?.row})
        </Text>
      </Flex>
      <ChakraNextImageLoader
        src={generateImage(posId, ImageSizes.LARGE)}
        alt={token.name}
        width={858}
        height={1298}
        style={{ maxWidth: '100%' }}
      />
      {highlightItems.length > 0 && (
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          mt={2}
          flexWrap={highlightItems.length > 6 ? 'wrap' : 'nowrap'}
        >
          {highlightItems.map((item) => {
            return (
              <Box
                key={item!.index}
                textAlign={'center'}
                w={
                  highlightItems.length > 6
                    ? '23%'
                    : `${Math.floor(100 / highlightItems.length) - 1}%`
                }
              >
                <ChakraNextImageLoader
                  src={item!.image}
                  alt={`Token ${item!.index}`}
                  width={104}
                  height={157}
                />
                <Text fontSize={'11px'} mt={1}>
                  ({item!.index.replace('-', ',')})
                </Text>
              </Box>
            )
          })}
        </Box>
      )}
    </Fade>
  )
}
