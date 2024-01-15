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
import {
  PlaygroundProvider,
  usePlaygroundContext,
} from 'contexts/PlaygroundContext'
import { SidebarDetailed } from 'components/playground/sidebar/SidebarDetailed'
import Header from 'components/header'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Playground from 'components/playground'

export default function Home() {
  // const { chain } = useNetwork()
  // if (chain?.id) {
  //   getContractsDataForChainOrThrow(chain?.id).then((a) =>
  //     console.log('log', a)
  //   )
  // }

  return (
    <Box as={'main'}>
      <Playground />
    </Box>
  )
}
