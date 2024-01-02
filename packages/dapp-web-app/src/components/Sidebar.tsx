'use client'

import { Box } from '@chakra-ui/react'
import { useGridItemContext } from 'contexts/GridItemContext'

export function Sidebar() {
  const { gridItemsState } = useGridItemContext()
  return (
    <>
      <Box
        as={'ul'}
        listStyleType={'none'}
        display={'flex'}
        flexDirection={'column'}
        gap={2}
      >
        {Object.keys(gridItemsState)
          .filter((key) => gridItemsState[key])
          .map((key) => (
            <Box
              as={'li'}
              key={key}
              display={'flex'}
              justifyContent={'space-between'}
            >
              {key}
              <Box as={'span'}>{gridItemsState[key] ? '✅' : '❌'}</Box>
            </Box>
          ))}
      </Box>
    </>
  )
}
