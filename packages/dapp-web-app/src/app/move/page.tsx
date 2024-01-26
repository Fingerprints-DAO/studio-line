'use client'
import React from 'react'
import { Box } from '@chakra-ui/react'
import Move from 'components/move'

export default function MovePage() {
  // const { chain } = useNetwork()
  // if (chain?.id) {
  //   getContractsDataForChainOrThrow(chain?.id).then((a) =>
  //     console.log('log', a)
  //   )
  // }

  return (
    <Box as={'main'}>
      <Move />
    </Box>
  )
}
