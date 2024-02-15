'use client'

import React from 'react'
import { Container, Flex, VStack } from '@chakra-ui/react'
import Header from 'components/header'
import Footer from 'components/footer'
import { AuctionProvider } from 'contexts/AuctionContext'
import { useDisplayConfig } from 'hooks/useDisplayConfig'
import SidebarIcons from 'components/sidebarIcons'

export default function Layout({
  children,
  sidebar,
  sidebarIcons,
  sidebarProvider: SidebarProvider,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  sidebarIcons?: React.ReactNode
  sidebarProvider?: typeof AuctionProvider
}) {
  const { isRegularScreen, isMediumScreen } = useDisplayConfig()

  const renderSidebars = () => (
    <>
      {isRegularScreen && (
        <VStack
          bg="white"
          px={4}
          alignItems="stretch"
          maxH={'100vh'}
          minW={'30vw'}
          pos={'relative'}
          flex={4}
        >
          <Header />
          <Flex
            height={'100%'}
            overflow={'auto'}
            flexDir={'column'}
            justifyContent={'space-between'}
            mt={'92px'}
            mr={'-20px'}
            pr={'20px'}
            w={'100%'}
          >
            {sidebar}
            {/* <Footer /> */}
          </Flex>
        </VStack>
      )}
      {isMediumScreen && <SidebarIcons additionalNav={sidebarIcons} />}
    </>
  )

  const renderSidebarWithProvider = () => {
    if (SidebarProvider) {
      return <SidebarProvider>{renderSidebars()}</SidebarProvider>
    }
    return <>{renderSidebars()}</>
  }

  return (
    <Container maxW={'8xl'}>
      <Flex
        pos={'relative'}
        justifyContent={{ base: 'space-between', md: 'center' }}
      >
        <Flex
          p={2}
          mt={'1vh'}
          bgColor={'white'}
          h={'95vh'}
          maxW={
            isRegularScreen
              ? 'none'
              : { base: 'calc(100vw - 80px)', md: 'calc(100vw - 100px)' }
          }
          justifyContent={'center'}
          flex={isRegularScreen ? 6 : 9}
        >
          {children}
        </Flex>
        {renderSidebarWithProvider()}
      </Flex>
    </Container>
  )
}
