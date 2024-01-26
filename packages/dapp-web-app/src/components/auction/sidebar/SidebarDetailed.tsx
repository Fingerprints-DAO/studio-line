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
} from '@chakra-ui/react'
import { BsX } from 'react-icons/bs'

import { useAuctionContext } from 'contexts/AuctionContext'
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
  const { selectedItems, gridItemsState, toggleSelectedItem } =
    useAuctionContext()
  const [counter, setCounter] = useState(1)

  return (
    <Box {...props}>
      <Box as={'section'}>
        <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
          Select tokens on the grid
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
              <Flex alignItems={'flex-start'} mt={2} mb={1}>
                <Checkbox colorScheme="gray" mt={'2px'} mr={1} />
                <Text fontSize={'xs'}>
                  I agree to mint available tokens and be refunded for
                  unavailable ones.
                </Text>
              </Flex>
              <Button variant={'solid'} w={'full'}>
                Mint
              </Button>
            </Box>
          </Flex>
        )}
      </Box>
      <Text fontSize={'md'} fontWeight={'bold'} mt={4}>
        or
      </Text>
      <Box as={'section'}>
        <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
          Random mint
        </Text>
        <Flex mt={4} justifyContent={'space-between'} shrink={0} flex={1}>
          <Box>
            <Text fontSize={'xs'} fontWeight={'bold'} mb={2}>
              Quantity
            </Text>
            <Flex>
              <Button
                variant={'outline'}
                mr={2}
                onClick={() => setCounter(counter - 1)}
              >
                -
              </Button>
              <Input
                htmlSize={4}
                w={'40px'}
                p={1}
                textAlign={'center'}
                mr={2}
                colorScheme="blackAlpha"
                focusBorderColor={'gray.900'}
                _hover={{ borderColor: 'gray.900' }}
                color={'gray.700'}
                fontWeight={'bold'}
                fontSize={'md'}
                borderColor={'gray.900'}
                borderRadius={'none'}
                borderWidth={'2px'}
                value={counter}
                onChange={(e) => setCounter(Number(e.target.value))}
              />
              <Button
                variant={'outline'}
                mr={2}
                onClick={() => setCounter(counter + 1)}
              >
                +
              </Button>
            </Flex>
          </Box>
          <Box ml={4} flex={2}>
            <Text fontSize={'xs'} fontWeight={'bold'} mb={2}>
              Total: 1.69 ETH
            </Text>
            <Button variant={'solid'} w={'full'}>
              Random Mint
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
