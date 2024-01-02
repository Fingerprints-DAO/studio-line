'use client'

import React from 'react'
import { useNetwork } from 'wagmi'
import { getContractsDataForChainOrThrow } from '@dapp/sdk'
import { Box, Container, Flex, VStack } from '@chakra-ui/react'
import Grid from 'components/Grid'
import { GridItemProvider } from 'contexts/GridItemContext'
import { Sidebar } from 'components/Sidebar'

export default function Home() {
  const { chain } = useNetwork()
  if (chain?.id) {
    getContractsDataForChainOrThrow(chain?.id).then((a) =>
      console.log('log', a)
    )
  }

  return (
    <Box as={'main'}>
      <Container maxW={'6xl'}>
        <GridItemProvider>
          <Flex>
            <Box flex="7" p={2} bgColor={'white'}>
              <Grid />
            </Box>
            <VStack flex="3" bg="black" p={4} alignItems="stretch">
              <Sidebar />
            </VStack>
          </Flex>
        </GridItemProvider>
      </Container>
    </Box>
  )
}
