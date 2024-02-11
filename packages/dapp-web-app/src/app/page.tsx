'use client'

import React from 'react'
import { Box } from '@chakra-ui/react'
import Playground from 'components/playground'

export default function HomePage() {
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
