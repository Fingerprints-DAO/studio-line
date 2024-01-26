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
import Image from 'next/image'

const TextLine = ({ children, title = '', ...props }: any) => (
  <Text fontSize={'md'} color={'gray.500'} mb={1} {...props}>
    <Text as={'span'} fontWeight={'bold'} textColor={'gray.700'}>
      {title}:
    </Text>{' '}
    <Text as={'span'} textTransform={'capitalize'}>
      {children}
    </Text>
  </Text>
)

export function SidebarDetailed({ ...props }: any) {
  const { gridItemsState, selectedGridItem, highlightGridItem } =
    useMoveContext()

  const highlightItems = [
    selectedGridItem,
    ...highlightGridItem
      .map((item) => gridItemsState[item])
      .filter((item) => item),
  ]

  return (
    <Box {...props}>
      <Box as={'section'}>
        {!selectedGridItem && (
          <>
            <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
              Select a token to move
            </Text>
            <Text fontSize={'xx-small'}>
              Your tokens and move possibilities are highlighted on the grid.
            </Text>
          </>
        )}
        {selectedGridItem && (
          <Box as="section">
            <Flex as="header" alignItems={'center'}>
              <Text
                fontWeight={'bold'}
                my={4}
                textColor={'gray.900'}
                fontSize={'2xl'}
                textTransform={'uppercase'}
              >
                LINE #{selectedGridItem.id}
              </Text>
              <Text fontSize={'md'} textColor={'gray.500'} ml={2}>
                ({selectedGridItem.index.replace('-', ',')})
              </Text>
            </Flex>
            <Flex justifyContent={'space-between'}>
              <Box maxW={'60%'}>
                <Image
                  src={selectedGridItem.image}
                  alt={`Token ${selectedGridItem.index}`}
                  width={400}
                  height={200}
                  style={{ maxWidth: '100%' }}
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
                              : `${
                                  Math.floor(100 / highlightItems.length) - 1
                                }%`
                          }
                        >
                          <Image
                            src={item!.image}
                            alt={`Token ${item!.index}`}
                            width={78}
                            height={20}
                            style={{ maxWidth: '100%' }}
                          />
                          <Text fontSize={'11px'} mt={1}>
                            ({item!.index.replace('-', ',')})
                          </Text>
                        </Box>
                      )
                    })}
                  </Box>
                )}
              </Box>
              <Box ml={8} flexShrink={0}>
                <Button variant={'solid'} w={'full'}>
                  Move
                </Button>
                <TextLine title={'Origin point'}>
                  {selectedGridItem.index.replace('-', ',')}
                </TextLine>
                <TextLine title={'Image point'}>
                  {selectedGridItem.index.replace('-', ',')}
                </TextLine>
                <TextLine title={'Type'}>{selectedGridItem.direction}</TextLine>
                <TextLine title={'Limit'}>No</TextLine>
                <TextLine title={'Starting point'}>
                  {selectedGridItem.index.replace('-', ',')}
                </TextLine>
                <TextLine title={'Movements'}>-</TextLine>
                <Link
                  href={selectedGridItem.image}
                  isExternal
                  display={'block'}
                >
                  View on Opensea
                </Link>
                <Link
                  href={selectedGridItem.image}
                  isExternal
                  display={'block'}
                >
                  Preview in new tab
                </Link>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  )
}
