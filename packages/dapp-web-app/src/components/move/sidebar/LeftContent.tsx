'use client'

import { Fade, Flex, SkeletonText, Text } from '@chakra-ui/react'

import { GridItemProperties, useMoveContext } from 'contexts/MoveContext'
import { useMemo } from 'react'
import { GridSize } from 'types/grid'
import { TokenPreview } from 'components/tokenPreview'

type LeftContentProps = {
  token: {
    name: string
  }
  isDrawer?: boolean
}

export function LeftContent({ token, isDrawer = false }: LeftContentProps) {
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
    // <Fade
    //   in={selectedGridItem && !!token}
    //   unmountOnExit
    //   style={{ width: '100%', height: 'auto' }}
    // >
    <>
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

      <TokenPreview
        minW={'200px'}
        h={isDrawer ? 'auto' : '100%'}
        itemId={posId}
        thumbnailsItems={highlightItems as GridItemProperties[]}
        maxW={'100%'}
      />
    </>
    // </Fade>
  )
}
