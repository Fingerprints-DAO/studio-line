'use client'

import { Box, Button, List, ListItem, Text } from '@chakra-ui/react'
import { useAuctionContext } from 'contexts/AuctionContext'

export function SidebarDetailed({}: {}) {
  const { selectedItems, resetSelection, gridItemsState } = useAuctionContext()

  return (
    <Box>
      <Box>
        {selectedItems.length < 1 && (
          <Text fontWeight={'bold'} my={4}>
            &lt; Please, select a token from the side.
          </Text>
        )}
        {selectedItems.length > 0 && (
          <Button variant={'outline'} my={4} onClick={resetSelection}>
            Reset selection
          </Button>
        )}
        {selectedItems.length > 0 && (
          <>
            <Text fontWeight={'bold'} my={4}>
              Tokens selected
            </Text>
            <List>
              {selectedItems.map((index) => (
                <ListItem key={index}>
                  <Text>
                    Line
                    {/* {gridItemsState[index].row * 24 +
                      1 * (gridItemsState[index].col + 1)}{' '}
                    ({gridItemsState[index].row},{gridItemsState[index].col}) */}
                  </Text>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Box>
  )
}
