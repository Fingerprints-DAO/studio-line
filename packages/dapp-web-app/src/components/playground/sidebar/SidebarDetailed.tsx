'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Icon, Text } from '@chakra-ui/react'
import { useGridItemContext } from 'contexts/GridItemContext'
import Image from 'next/image'
import { useState } from 'react'

export function SidebarDetailed({
  toggleSidebar,
  sidebarIsFloating,
}: {
  toggleSidebar: () => void
  sidebarIsFloating: boolean
}) {
  const { lastSelectedGridItem, resetGrid, highlightGridItem, gridItemsState } =
    useGridItemContext()

  return (
    <Box>
      <Box as={'button'} onClick={toggleSidebar}>
        <Text
          as={'span'}
          fontStyle={'italic'}
          fontSize={'sm'}
          color={'blue.700'}
        >
          Set {sidebarIsFloating ? 'fixed sidebar' : 'floating sidebar'}
        </Text>
      </Box>

      <Box>
        {!lastSelectedGridItem && (
          <Text fontWeight={'bold'} my={4}>
            &lt; Please, select a token from the side.
          </Text>
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
            <Box mb={10}>
              <Image
                src={lastSelectedGridItem.image}
                alt={`Token ${lastSelectedGridItem.index}`}
                width={500}
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
