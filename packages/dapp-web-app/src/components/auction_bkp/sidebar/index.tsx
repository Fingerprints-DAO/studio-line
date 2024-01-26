'use client'

import { Box, Text } from '@chakra-ui/react'
import { useAuctionContext } from 'contexts/AuctionContext_bkp'

export function Sidebar() {
  const { gridItemsState, toggleSelectedItem, selectedItems } =
    useAuctionContext()

  return (
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
          .filter((item) => selectedItems.includes(item))
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
                  <button onClick={() => toggleSelectedItem(key)}>
                    Remove
                  </button>
                </Text>
              </li>
            )
          })}
      </Box>
    </Box>
  )
}
