import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Wallet from 'components/wallet'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLineCanMove } from 'services/web3/generated'

const navLinks = [
  { href: '/', label: 'playground', isDisabled: false },
  { href: '/move', label: '', isDisabled: false },
  { href: '/about', label: 'about', isDisabled: false },
]

const Header = ({ isDrawer = false }) => {
  const pathname = usePathname()
  const [nav, setNav] = useState(navLinks)
  const { data: canMove, isSuccess: isCanMoveSuccess } = useLineCanMove({
    watch: true,
  })

  useEffect(() => {
    if (!isCanMoveSuccess) return
    const newNav = [...navLinks]
    if (!canMove) {
      newNav[1] = { href: '/auction', label: 'auction', isDisabled: false }
    } else {
      newNav[1].label = 'move'
    }
    setNav(newNav)
  }, [canMove, isCanMoveSuccess])

  return (
    <Grid
      as="header"
      pt={3}
      pb={2}
      position="relative"
      zIndex={1}
      justifyContent={isDrawer ? 'center' : 'right'}
      my={isDrawer ? 8 : 0}
      pos={isDrawer ? 'static' : 'absolute'}
      bgColor={'white'}
      right={4}
      left={0}
    >
      <GridItem colSpan={isDrawer ? 1 : 10}>
        <Flex
          as="nav"
          display="flex"
          flexDir={isDrawer ? 'column' : 'row'}
          alignItems="center"
          justifyContent="flex-start"
          gap={isDrawer ? 6 : 0}
          h="full"
        >
          {nav.map((item, index) => {
            const isActive = !item.isDisabled && pathname === item.href
            if (item.label === '') return

            return (
              <Box
                key={index}
                as={Link}
                href={item.href}
                title={item.label}
                mr={0}
                ml={6}
                _hover={{
                  color: item.isDisabled ? 'gray.300' : 'gray.900',
                  cursor: item.isDisabled ? 'not-allowed' : 'pointer',
                }}
                color={
                  item.isDisabled
                    ? 'gray.300'
                    : isActive
                      ? 'gray.900'
                      : 'gray.500'
                }
                transition="ease"
                transitionProperty="color"
                transitionDuration="0.2s"
              >
                <Text
                  as="strong"
                  fontSize="14px"
                  lineHeight={'14px'}
                  textTransform={'uppercase'}
                >
                  {item.label}
                </Text>
              </Box>
            )
          })}
          <Wallet ml={6} isDrawer={isDrawer} />
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Header
