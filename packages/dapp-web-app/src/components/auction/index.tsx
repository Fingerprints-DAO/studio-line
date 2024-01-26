'use client'

import React from 'react'
import { Container, Flex, VStack } from '@chakra-ui/react'
import { AuctionProvider } from 'contexts/AuctionContext'
import Header from 'components/header'
import Footer from 'components/footer'
import AuctionGrid from './grid/AuctionGrid'
import { SidebarDetailed } from './sidebar/SidebarDetailed'

export default function Auction() {
  return (
    <AuctionProvider>
      <Container maxW={'6xl'}>
        <Flex pos={'relative'} justifyContent={'center'}>
          <Flex
            p={2}
            bgColor={'white'}
            h={'95vh'}
            mt={'2vh'}
            flexShrink={'0'}
            maxW={'50vw'}
            justifyContent={'right'}
          >
            <AuctionGrid />
          </Flex>
          <VStack
            bg="white"
            px={4}
            alignItems="stretch"
            maxH={'100vh'}
            minW={'30vw'}
            maxW={'50vw'}
            pos={'relative'}
          >
            <Header />
            <Flex
              height={'100%'}
              overflow={'auto'}
              flexDir={'column'}
              justifyContent={'space-between'}
              mt={'60px'}
              mr={'-20px'}
              pr={'20px'}
            >
              <SidebarDetailed />
              <Footer />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </AuctionProvider>
  )
}
