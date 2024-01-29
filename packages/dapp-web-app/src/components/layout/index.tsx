'use client'

import React from 'react'
import { Container, Flex, VStack } from '@chakra-ui/react'
import Header from 'components/header'
import Footer from 'components/footer'

export default function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <Container maxW={'8xl'}>
      <Flex pos={'relative'} justifyContent={'center'}>
        <Flex
          p={2}
          bgColor={'white'}
          h={'95vh'}
          mt={'1vh'}
          flexShrink={'0'}
          w={'50vw'}
          justifyContent={'right'}
        >
          {children}
        </Flex>
        <VStack
          bg="white"
          px={4}
          alignItems="stretch"
          maxH={'100vh'}
          minW={'30vw'}
          w={'50vw'}
          pos={'relative'}
        >
          <Header />
          <Flex
            height={'100%'}
            // w={'100%'}
            overflow={'auto'}
            flexDir={'column'}
            justifyContent={'space-between'}
            mt={'92px'}
            mr={'-20px'}
            pr={'20px'}
            w={'100%'}
          >
            {sidebar}
            <Footer />
          </Flex>
        </VStack>
      </Flex>
    </Container>
  )
}
