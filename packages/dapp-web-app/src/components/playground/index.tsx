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
  const [isOpen, setIsOpen] = useState(false)
  const { gridItemsState } = usePlaygroundContext()
  // const [itemsCount, setItemsCount] = useState(0)

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleSidebar = () => {
    if (sidebarIsFloating) {
      handleToggleSidebar()
    }
    setSidebarIsFloating(!sidebarIsFloating)
  }

  // useEffect(() => {
  //   setItemsCount(
  //     Object.keys(gridItemsState).filter((item) => gridItemsState[item]).length
  //   )
  // }, [gridItemsState])

  return (
    <PlaygroundProvider>
      <Container maxW={'6xl'} overflow={'hidden'}>
        <Header />
        <Flex pos={'relative'}>
          <Box flex="7" p={2} bgColor={'white'}>
            <PlaygroundGrid />
          </Box>
          <VStack
            flex="3"
            bg="white"
            p={4}
            alignItems="stretch"
            transition="transform 0.3s ease-in-out"
            transform={
              !sidebarIsFloating
                ? ''
                : isOpen
                ? 'translateX(8%)'
                : 'translateX(108%)'
            }
            style={
              sidebarIsFloating
                ? {
                    position: 'absolute',
                    right: 0,
                    left: '70%',
                    top: 0,
                    bottom: 0,
                    zIndex: 2,
                  }
                : {}
            }
          >
            {sidebarIsFloating && (
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
                {/* {itemsCount > 0 && <Text mb={2}>({itemsCount})</Text>} */}
              </Box>
            )}
            <SidebarDetailed
              sidebarIsFloating={sidebarIsFloating}
              toggleSidebar={toggleSidebar}
            />
          </VStack>
        </Flex>
      </Container>
    </PlaygroundProvider>
  )
}
