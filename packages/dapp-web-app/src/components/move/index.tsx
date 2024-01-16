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
import { AuctionProvider, useAuctionContext } from 'contexts/AuctionContext'
import Header from 'components/header'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import MoveGrid from './grid/MoveGrid'
import { SidebarDetailed } from './sidebar/SidebarDetailed'

export default function Move() {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedItems } = useAuctionContext()
  const itemsCount = selectedItems.length

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <AuctionProvider>
      <Container maxW={'6xl'} overflow={'hidden'}>
        <Header />
        <Flex pos={'relative'}>
          <Box flex="7" p={2} bgColor={'white'}>
            <MoveGrid />
          </Box>
          <VStack
            flex="3"
            bg="white"
            p={4}
            alignItems="stretch"
            transition="transform 0.3s ease-in-out"
            transform={isOpen ? 'translateX(8%)' : 'translateX(108%)'}
            style={{
              position: 'absolute',
              right: 0,
              left: '70%',
              top: 0,
              bottom: 0,
              zIndex: 2,
            }}
          >
            <Box
              pos={'fixed'}
              top={2}
              left={'-40px'}
              zIndex={2}
              textColor={'black'}
              textAlign={'center'}
            >
              <Button
                variant={'outline'}
                onClick={handleToggleSidebar}
                w={'40px'}
              >
                <Icon
                  w={'40px'}
                  as={isOpen ? ChevronRightIcon : ChevronLeftIcon}
                  boxSize={6}
                />
              </Button>
              {itemsCount > 0 && <Text mb={2}>({itemsCount})</Text>}
            </Box>
            <SidebarDetailed />
          </VStack>
        </Flex>
      </Container>
    </AuctionProvider>
  )
}
