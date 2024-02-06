'use client'

import React, { useEffect, useRef } from 'react'
import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  VStack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import Header from 'components/header'
import Footer from 'components/footer'
import { AuctionProvider } from 'contexts/AuctionContext'
import { useDisplayConfig } from 'hooks/useDisplayConfig'

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
  const {
    isOpen: navIsOpen,
    onOpen: navOnOpen,
    onClose: navOnClose,
  } = useDisclosure()
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
            <Footer />
          </Flex>
        </VStack>
      )}
      {isMediumScreen && (
        <>
          <VStack
            bg="white"
            // px={4}
            // alignItems="stretch"
            maxH={'100%'}
            minW={{ base: '30px', md: '44px' }}
            pos={'relative'}
            flex={0}
            alignItems={'flex-end'}
          >
            <Flex
              height={'100%'}
              overflow={'auto'}
              flexDir={'column'}
              mt={'16px'}
              w={'100%'}
              gap={4}
            >
              <IconButton
                variant="outline"
                aria-label="Open Navbar"
                icon={<GiHamburgerMenu size={'12px'} />}
                onClick={navOnOpen}
                minW={'auto'}
                w={{ base: '30px', md: '44px' }}
                h={{ base: '30px', md: '44px' }}
              />
              {sidebarIcons}
            </Flex>
          </VStack>
          {/* NAVBAR */}
          <Drawer
            isOpen={navIsOpen}
            placement="right"
            onClose={navOnClose}
            size={'md'}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton rounded={'0'} textColor={'black'} />
              <DrawerBody>
                <Header isDrawer />
              </DrawerBody>

              <DrawerFooter as={'div'}>
                <Footer isDrawer />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
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
          maxW={isRegularScreen ? 'none' : 'calc(100vw - 100px)'}
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
