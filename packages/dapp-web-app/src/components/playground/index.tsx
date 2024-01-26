'use client'

import React from 'react'
import { Container, Flex, VStack } from '@chakra-ui/react'
import PlaygroundGrid from 'components/playground/grid/PlaygroundGrid'
import { PlaygroundProvider } from 'contexts/PlaygroundContext'
import { SidebarDetailed } from 'components/playground/sidebar/SidebarDetailed'
import Header from 'components/header'
import Footer from 'components/footer'

export default function Playground() {
  return (
    <PlaygroundProvider>
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
            <PlaygroundGrid />
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
    </PlaygroundProvider>
  )
}
