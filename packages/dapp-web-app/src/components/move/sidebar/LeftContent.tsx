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
        src={token.image}
        alt={token.name}
        width={400}
        height={600}
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
                  width={60}
                  height={180}
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
