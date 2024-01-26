'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useAuctionContext } from 'contexts/AuctionContext_bkp'
import Header from 'components/header'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import AuctionGrid from './grid/AuctionGrid'
import { SidebarDetailed } from './sidebar/SidebarDetailed'

export default function Auction() {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedItems } = useAuctionContext()
  const itemsCount = selectedItems.length
  console.log('selectedItems', selectedItems)

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Container maxW={'6xl'} overflow={'hidden'}>
      <Header />
      <Flex pos={'relative'}>
        <Box flex="7" p={2} bgColor={'white'}>
          <AuctionGrid />
        </Box>
        <VStack
          flex="3"
          bg="white"
          p={4}
          alignItems="stretch"
          transition="transform 0.3s ease-in-out"
          transform={isOpen ? 'translateX(8%)' : 'translateX(108%)'}
          boxShadow={'lg'}
          style={{
            position: 'fixed',
            right: 0,
            left: '70%',
            top: 0,
            bottom: 0,
            zIndex: 2,
          }}
        >
          {/* <Box
            pos={'fixed'}
            top={'20%'}
            right={'0'}
            zIndex={2}
            textColor={'black'}
            textAlign={'center'}
            border={'2px solid black'}
            hidden={isOpen}
          >
            <Button
              variant={'link'}
              onClick={handleToggleSidebar}
              w={'40px'}
              mt={2}
              color={'black'}
            >
              <Icon
                w={'40px'}
                as={isOpen ? ChevronRightIcon : ChevronLeftIcon}
                boxSize={6}
              />
            </Button>
            {itemsCount > 0 && (
              <Text mb={2} fontSize={'sm'}>
                ({itemsCount})
              </Text>
            )}
          </Box> */}
          <Box
            bgColor={'white'}
            pos={'fixed'}
            top={'20%'}
            left={'-79px'}
            zIndex={3}
            textColor={'black'}
            textAlign={'center'}
            border={'2px solid black'}
            hidden={itemsCount < 1 || isOpen}
          >
            <Button
              variant={'link'}
              onClick={handleToggleSidebar}
              w={'40px'}
              mt={2}
              color={'black'}
            >
              <Icon
                w={'40px'}
                as={isOpen ? ChevronRightIcon : ChevronLeftIcon}
                boxSize={6}
              />
            </Button>
            {itemsCount > 0 && (
              <Text mb={2} fontSize={'sm'}>
                ({itemsCount})
              </Text>
            )}
          </Box>
          <SidebarDetailed closeSidebar={handleToggleSidebar} />
        </VStack>
      </Flex>
    </Container>
  )
}
