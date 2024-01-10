'use client'

import React, { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import { getContractsDataForChainOrThrow } from '@dapp/sdk'
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import Grid from 'components/Grid'
import { GridItemProvider, useGridItemContext } from 'contexts/GridItemContext'
import { Sidebar } from 'components/Sidebar'
import Header from 'components/header'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export default function Home() {
  // const { chain } = useNetwork()
  // if (chain?.id) {
  //   getContractsDataForChainOrThrow(chain?.id).then((a) =>
  //     console.log('log', a)
  //   )
  // }
  const [sidebarIsFloating, setSidebarIsFloating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { gridItemsState } = useGridItemContext()
  const [itemsCount, setItemsCount] = useState(0)

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleSidebar = () => {
    if (sidebarIsFloating) {
      handleToggleSidebar()
    }
    setSidebarIsFloating(!sidebarIsFloating)
  }

  useEffect(() => {
    setItemsCount(
      Object.keys(gridItemsState).filter((item) => gridItemsState[item]).length
    )
  }, [gridItemsState])

  return (
    <Box as={'main'}>
      <Container maxW={'6xl'} overflow={'hidden'}>
        <Header />
        <Flex pos={'relative'}>
          <Box flex="7" p={2} bgColor={'white'}>
            <Grid />
          </Box>
          <VStack
            flex="3"
            bg="black"
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
                bgColor={'black'}
                textAlign={'center'}
              >
                <Button
                  variant="ghost"
                  onClick={handleToggleSidebar}
                  w={'40px'}
                >
                  <Icon
                    w={'40px'}
                    as={isOpen ? ChevronRightIcon : ChevronLeftIcon}
                    boxSize={6}
                  />
                </Button>
                {itemsCount > 0 && <Text mb={2}>({itemsCount})</Text>}
              </Box>
            )}
            <Sidebar
              sidebarIsFloating={sidebarIsFloating}
              toggleSidebar={toggleSidebar}
            />
          </VStack>
        </Flex>
      </Container>
    </Box>
  )
}
