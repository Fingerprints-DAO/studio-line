'use client'

import React, { useState } from 'react'
import { Box, Button, Container, Flex, Icon, VStack } from '@chakra-ui/react'
import PlaygroundGrid from 'components/playground/grid/PlaygroundGrid'
import {
  PlaygroundProvider,
  usePlaygroundContext,
} from 'contexts/PlaygroundContext'
import { SidebarDetailed } from 'components/playground/sidebar/SidebarDetailed'
import Header from 'components/header'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export default function Playground() {
  const [sidebarIsFloating, setSidebarIsFloating] = useState(false)
  // const [isOpen, setIsOpen] = useState(false)
  const { gridItemsState } = usePlaygroundContext()
  // const [itemsCount, setItemsCount] = useState(0)

  // const handleToggleSidebar = () => {
  //   setIsOpen(!isOpen)
  // }

  // const toggleSidebar = () => {
  //   if (sidebarIsFloating) {
  //     handleToggleSidebar()
  //   }
  //   setSidebarIsFloating(!sidebarIsFloating)
  // }

  // useEffect(() => {
  //   setItemsCount(
  //     Object.keys(gridItemsState).filter((item) => gridItemsState[item]).length
  //   )
  // }, [gridItemsState])

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
            p={4}
            alignItems="stretch"
            maxH={'100vh'}
            minW={'30vw'}
            maxW={'50vw'}
          >
            <Header />
            <Box maxH={'90vh'} overflow={'auto'}>
              <SidebarDetailed />
            </Box>
          </VStack>
        </Flex>
      </Container>
    </PlaygroundProvider>
  )
}
