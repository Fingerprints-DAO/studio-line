'use client'

import { Box, Button, Text } from '@chakra-ui/react'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'
import Image from 'next/image'

export function SidebarDetailed({}: {}) {
  const { lastSelectedGridItem, resetGrid, highlightGridItem, gridItemsState } =
    usePlaygroundContext()

  return (
    <Box>
      <Box>
        {!lastSelectedGridItem && (
          <>
            <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
              Select a token to get started
            </Text>
            <Text mb={4} fontSize={'md'}>
              Here is the LINE playground, preview token images and plan your
              moves on the board.
            </Text>
          </>
        )}
        {lastSelectedGridItem && (
          <Button variant={'outline'} my={4} onClick={resetGrid}>
            Reset selection
          </Button>
        )}
        {lastSelectedGridItem && (
          <>
            <Text fontWeight={'bold'} my={4}>
              Token Selected {lastSelectedGridItem.row + 1}-
              {lastSelectedGridItem.col + 1}
            </Text>
            <Box
              mb={10}
              display={'flex'}
              alignItems={'center'}
              flexDir={'column'}
            >
              <Image
                src={lastSelectedGridItem.image}
                alt={`Token ${lastSelectedGridItem.index}`}
                width={200}
                height={100}
              />
            </Box>
            {highlightGridItem.length > 0 && (
              <Box display={'flex'} flexWrap={'wrap'}>
                {highlightGridItem.map((itemIndex) => {
                  const item = gridItemsState[itemIndex]
                  if (!item) return
                  return (
                    <Box key={itemIndex} textAlign={'center'}>
                      <Image
                        src={item.image}
                        alt={`Token ${item.index}`}
                        width={78}
                        height={20}
                      />
                      ({item.row + 1}-{item.col + 1})
                    </Box>
                  )
                })}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}
