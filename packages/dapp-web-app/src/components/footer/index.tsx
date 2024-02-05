import { Box, Container, Flex, Icon, Text } from '@chakra-ui/react'
import { BsDiscord } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import { SiOpensea } from 'react-icons/si'
import { Link } from '@chakra-ui/react'

const Footer = ({ isDrawer = false }) => {
  return (
    <Box
      as="footer"
      pb={0}
      pt={isDrawer ? 0 : 8}
      w={isDrawer ? '100%' : 'auto'}
    >
      <Flex flexDir={'column'} mx="auto">
        <Flex
          flexDir={isDrawer ? 'column-reverse' : 'row'}
          justifyContent={isDrawer ? 'center' : 'space-between'}
          alignItems={isDrawer ? 'center' : 'stretch'}
          gap={isDrawer ? 2 : 0}
        >
          <Box textAlign={isDrawer ? 'center' : 'left'}>
            <Text fontWeight={'bold'} fontSize={'md'}>
              By Figure31 & Fingerprints DAO
            </Text>{' '}
            <Text fontSize="xs" flex={1} mb={[2, 0]} mt={2}>
              Developed by{' '}
              <Text
                as="a"
                color={'cyan.500'}
                title="arod.studio"
                href="https://arod.studio"
                target="_blank"
                style={{ textDecoration: 'none' }}
                transition="opacity 0.2s"
                _hover={{ opacity: 0.8 }}
              >
                arod.studio
              </Text>
            </Text>
          </Box>

          <Flex flex={1} justifyContent={'flex-end'} alignItems={'center'}>
            <Box
              as="a"
              href="https://twitter.com/FingerprintsDAO"
              title="Twitter"
              target="_blank"
              p={2}
              color="gray.300"
              _hover={{ color: 'gray.200' }}
              transition="ease"
              transitionProperty="color"
              transitionDuration="0.2s"
            >
              <Icon as={BsTwitter} w={6} h={6} display="block" />
            </Box>
            <Box
              as="a"
              href="https://discord.gg/aePw7mqz6U"
              title="Discord"
              target="_blank"
              p={2}
              color="gray.300"
              _hover={{ color: 'gray.200' }}
              transition="ease"
              transitionProperty="color"
              transitionDuration="0.2s"
            >
              <Icon as={BsDiscord} w={6} h={6} display="block" />
            </Box>
            <Box
              as="a"
              href="https://opensea.io/collection/maschine"
              title="OpenSea"
              target="_blank"
              p={2}
              color="gray.300"
              _hover={{ color: 'gray.200' }}
              transition="ease"
              transitionProperty="color"
              transitionDuration="0.2s"
            >
              <Icon as={SiOpensea} w={6} h={6} display="block" />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
