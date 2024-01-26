'use client'

import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  Image as ChackraImage,
  List,
  ListItem,
  Checkbox,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { BsX } from 'react-icons/bs'

import { useMoveContext } from 'contexts/MoveContext'
import { Direction } from 'types/grid'
import { useState } from 'react'

const TextLine = ({ children, title = '', direction, ...props }: any) => (
  <ListItem
    mb={1}
    bgColor={'gray.100'}
    px={1}
    display={'flex'}
    justifyContent={'space-between'}
    w={'100%'}
    {...props}
  >
    <Flex alignItems={'center'} gap={1}>
      <Text
        as={'span'}
        fontWeight={'bold'}
        textColor={direction === Direction.DOWN ? 'cyan.500' : 'red.500'}
        textTransform={'uppercase'}
        fontSize={'md'}
      >
        LINE #{title}
      </Text>{' '}
      <Text as={'span'} fontSize={'xs'} color={'gray.500'}>
        ({children})
      </Text>
    </Flex>
    <Button variant={'link'} onClick={() => {}} minW={'none'} ml={2}>
      <BsX size={16} color="gray.700" />
    </Button>
  </ListItem>
)

export function SidebarDetailed({ ...props }: any) {
  const { selectedItems, gridItemsState, toggleSelectedItem } = useMoveContext()

  return (
    <Box {...props}>
      <Box as={'section'}>
        <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
          Select a token to move
        </Text>
        <Text fontSize={'xx-small'}>
          Your tokens and move possibilities are highlighted on the grid.
        </Text>
        {selectedItems.length > 0 && (
          <Flex mt={4} justifyContent={'space-between'} shrink={0} flex={1}>
            <Box>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                Selected tokens
              </Text>
              <List spacing={2} mt={2}>
                {selectedItems
                  .map((item) => gridItemsState[item])
                  .map((item) => (
                    <TextLine
                      key={item.id}
                      title={item.id}
                      direction={item.direction}
                      onClick={() => toggleSelectedItem(item.index)}
                    >
                      {item.index.replace('-', ',')}
                    </TextLine>
                  ))}
              </List>
            </Box>
            <Box ml={4} flex={2}>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                Total: 1.69 ETH
              </Text>
              <FormControl
                alignItems={'flex-start'}
                mt={2}
                mb={1}
                display={'flex'}
              >
                <Checkbox
                  colorScheme="gray"
                  mt={'2px'}
                  mr={2}
                  borderRadius={0}
                  rounded={'none'}
                  style={{ borderRadius: 0 }}
                  variant={'solid'}
                />
                <FormLabel
                  fontSize={'xs'}
                  fontWeight={'normal'}
                  cursor={'pointer'}
                >
                  I agree to mint available tokens and be refunded for
                  unavailable ones.
                </FormLabel>
              </FormControl>
              <Button variant={'solid'} w={'full'}>
                Mint selected tokens
              </Button>
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  )
}
