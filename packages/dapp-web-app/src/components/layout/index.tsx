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
          pl={4}
          pt={4}
          alignItems="stretch"
          maxH={'100vh'}
          minW={'30vw'}
          pos={'relative'}
          flex={1}
          w={'100%'}
          h={'100%'}
        >
          <Flex
            w={'100%'}
            h={'100%'}
            overflow={'auto'}
            flexDir={'column'}
            justifyContent={'space-between'}
            // mt={'62px'}
            // mr={'-20px'}
            // pr={'20px'}
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
      <Header />
      <Flex
        pos={'relative'}
        justifyContent={{ base: 'space-between', md: 'center' }}
        w={'100%'}
      >
        <Flex
          p={2}
          mt={'1vh'}
          bgColor={'white'}
          h={'92vh'}
          maxW={
            isRegularScreen
              ? 'none'
              : { base: 'calc(100vw - 80px)', md: 'calc(100vw - 100px)' }
          }
          justifyContent={'center'}
          // flex={isRegularScreen ? 6 : 9}
        >
          {children}
        </Flex>
        {renderSidebarWithProvider()}
      </Flex>
    </Container>
  )
}
