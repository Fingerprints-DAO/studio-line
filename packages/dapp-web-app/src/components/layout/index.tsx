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
  const [isLargerThan1280, isDisplayingInBrowser] = useMediaQuery(
    ['(min-width: 1280px)', '(display-mode: browser)'],
    {
      ssr: true,
      fallback: true, // return false on the server, and re-evaluate on the client side
    },
  )
  const renderSidebars = () => (
    <>
      {isLargerThan1280 && (
        <VStack
          bg="white"
          px={4}
          alignItems="stretch"
          maxH={'100vh'}
          minW={'30vw'}
          // w={'50vw'}
          pos={'relative'}
          flex={4}
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
      )}
      {!isLargerThan1280 && (
        <>
          <VStack
            bg="white"
            px={4}
            alignItems="stretch"
            maxH={'100vh'}
            // w={'10vw'}
            w={'44px'}
            pos={'relative'}
            flex={1}
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
                icon={<GiHamburgerMenu />}
                onClick={navOnOpen}
                w="44px"
                h="44px"
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
      <Flex pos={'relative'} justifyContent={'center'}>
        <Flex
          p={2}
          mt={'1vh'}
          bgColor={'white'}
          h={'95vh'}
          // flexShrink={0}
          // w={isLargerThan1280 ? '50vw' : '90vw'}
          maxW={isLargerThan1280 ? 'none' : 'calc(100vw - 44px)'}
          justifyContent={'center'}
          flex={isLargerThan1280 ? 6 : 9}
        >
          {children}
        </Flex>
        {renderSidebarWithProvider()}
      </Flex>
    </Container>
  )
}
