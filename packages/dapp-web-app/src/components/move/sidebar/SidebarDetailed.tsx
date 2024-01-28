'use client'

import { Box, Button, Flex, Link, Text } from '@chakra-ui/react'
import { SidebarArrow } from 'components/arrow/SidebarArrow'
import { ArrowDirections } from 'components/arrow/utils'

import { useMoveContext } from 'contexts/MoveContext'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

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
  const { gridItemsState, selectedGridItem, highlightGridItem, myItems } =
    useMoveContext()
  const [arrowHover, setArrowHover] = useState<ArrowDirections | undefined>()
  const [arrowSelected, setArrowSelected] = useState<
    ArrowDirections | undefined
  >()

  const handleArrowMouseOver = (direction?: ArrowDirections) => {
    setArrowHover(direction)
  }
  const handleArrorOnClick = (direction: ArrowDirections) => {
    setArrowSelected(direction)
  }

  const highlightItems = useMemo(
    () => [
      selectedGridItem,
      ...highlightGridItem
        .map((item) => gridItemsState[item])
        .filter((item) => item),
    ],
    [gridItemsState, highlightGridItem, selectedGridItem]
  )

  useEffect(() => {
    setArrowHover(undefined)
    setArrowSelected(undefined)
  }, [selectedGridItem])

  return (
    <Box {...props}>
      <Box as={'section'}>
        {!selectedGridItem && (
          <>
            <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
              Select a token to move
            </Text>
            <Text fontSize={'xs'}>
              Your tokens and move possibilities are highlighted on the grid.
            </Text>
          </>
        )}
        {selectedGridItem && (
          <Box as="section" mt={4}>
            <Flex justifyContent={'space-between'}>
              <Box maxW={'60%'}>
                <Flex as="header" alignItems={'center'} mb={4}>
                  <Text
                    fontWeight={'bold'}
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
              <Box ml={8} mt={2} flexShrink={0}>
                {myItems.includes(selectedGridItem.index) ? (
                  <>
                    <Box pos={'relative'} w={'full'} h={'45px'}>
                      <SidebarArrow
                        displayCircle
                        direction={selectedGridItem.direction}
                        isAvailable
                        handleOnClick={handleArrorOnClick}
                        handleMouseOver={handleArrowMouseOver}
                        selected={arrowSelected}
                        hovered={arrowHover}
                      />
                    </Box>
                    {arrowSelected && (
                      <Flex alignItems={'flex-end'} mt={1}>
                        <Box>
                          <Text fontSize={'xs'} fontWeight={'bold'}>
                            From
                          </Text>
                          <Text fontSize={'xs'}>(10,18)</Text>
                        </Box>
                        <Box mx={1}>
                          <Image
                            src={'/move-to.svg'}
                            width={16}
                            height={16}
                            alt={'Illustrate movement'}
                          />
                        </Box>
                        <Box>
                          <Text fontSize={'xs'} fontWeight={'bold'}>
                            To
                          </Text>
                          <Text fontSize={'xs'}>(10,18)</Text>
                        </Box>
                      </Flex>
                    )}
                    <Button
                      variant={'solid'}
                      w={'full'}
                      mt={4}
                      mb={6}
                      isDisabled={!arrowSelected}
                    >
                      Move
                    </Button>
                  </>
                ) : (
                  <Box w={'full'} h={'45px'} />
                )}

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
                <TextLine title={'Owner'}>0x00000</TextLine>
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
