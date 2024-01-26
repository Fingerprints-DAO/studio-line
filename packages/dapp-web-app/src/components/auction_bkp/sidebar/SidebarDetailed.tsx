'use client'

import { Box, Button, List, ListItem, Text } from '@chakra-ui/react'
import { useAuctionContext } from 'contexts/AuctionContext_bkp'
import { Direction } from 'types/grid'

export function SidebarDetailed({
  closeSidebar = () => {},
}: {
  closeSidebar?: () => void
}) {
  const { selectedItems, resetSelection, gridItemsState } = useAuctionContext()

  return (
    <Box>
      <Button variant={'link'} my={4} onClick={closeSidebar} color={'red.500'}>
        Close
      </Button>
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
                  <Text
                    color={
                      gridItemsState[index].direction === Direction.UP
                        ? 'red'
                        : 'blue'
                    }
                  >
                    Line {gridItemsState[index].id} ({gridItemsState[index].col}
                    , {gridItemsState[index].row})
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
