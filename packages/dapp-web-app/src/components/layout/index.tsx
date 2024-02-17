'use client'

import React, { useEffect, useState } from 'react'
import { Box, Container, Flex, VStack } from '@chakra-ui/react'
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
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowSidebar(true), 500)
  }, [])

  const renderSidebars = () => (
    <>
      {isRegularScreen && (
        <Box
          alignItems="stretch"
          flex={'1'}
          h={'100%'}
          maxH={'100vh'}
          // maxW={'calc(100% - 400px)'}
          overflow={'hidden'}
          pos={'relative'}
          bg="white"
          minW={'30%'}
          pl={4}
          pt={4}
          opacity={showSidebar ? 1 : 0}
          transition={'opacity 0.5s ease'}
        >
          <Flex
            w={'100%'}
            h={'100%'}
            minH={'90vh'}
            maxH={'90vh'}
            // maxW={{ base: '40vw', md: '' }}
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
        </Box>
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
    <Container maxW={'8xl'} maxH={'100vh'} overflow={'hidden'}>
      {isRegularScreen && <Header />}
      <Flex pos={'relative'} justifyContent={'center'} w={'100%'}>
        <Flex
          p={2}
          mt={'1vh'}
          ml={'1vw'}
          bgColor={'white'}
          h={'90vh'}
          // maxW={
          //   isRegularScreen
          //     ? 'none'
          //     : { base: 'calc(100vw - 80px)', md: 'calc(100vw - 100px)' }
          // }
          justifyContent={'center'}
          flex={'0 0 auto'}
          maxW={isMediumScreen ? '90%' : ''}
        >
          {children}
        </Flex>
        {renderSidebarWithProvider()}
      </Flex>
    </Container>
  )
}
