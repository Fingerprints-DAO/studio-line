'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, Icon, Text } from '@chakra-ui/react'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'
import { useState } from 'react'

export function Sidebar({
  toggleSidebar,
  sidebarIsFloating,
}: {
  toggleSidebar: () => void
  sidebarIsFloating: boolean
}) {
  const { gridItemsState, toggleGridItem } = usePlaygroundContext()

  return (
    <Box>
      <Box as={'button'} onClick={toggleSidebar}>
        <Text
          as={'span'}
          fontStyle={'italic'}
          fontSize={'sm'}
          color={'blue.400'}
        >
          Set {sidebarIsFloating ? 'fixed sidebar' : 'floating sidebar'}
        </Text>
      </Box>

      <Box>
        <Text fontWeight={'bold'}>Tokens Selection</Text>
        <Box
          as={'ul'}
          listStyleType={'none'}
          display={'flex'}
          flexDirection={'column'}
          gap={2}
        >
          {Object.keys(gridItemsState)
            .filter((item) => gridItemsState[item].isOpened)
            .map((key) => {
              const [row, col] = key.split('-').map((number) => Number(number))
              return (
                <li key={key}>
                  <Text as={'span'}>
                    Line {row * 24 + col + 1} ({col + 1}, {row + 1}) -{' '}
                  </Text>
                  <Text as={'span'}>{row <= 12 ? '⬇️' : '⬆️'}</Text>
                  {/* Button to remove the item */}
                  <Text
                    as={'span'}
                    fontStyle={'italic'}
                    ml={2}
                    fontSize={'sm'}
                    color={'blue.400'}
                  >
                    <button onClick={() => toggleGridItem(key)}>Remove</button>
                  </Text>
                </li>
              )
            })}
        </Box>
      </Box>
    </Box>
  )
}
