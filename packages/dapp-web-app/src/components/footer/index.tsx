import { Box, Container, Flex, Icon, Text } from '@chakra-ui/react'
import { getContractsDataForChainOrThrow } from '@dapp/sdk'
import { TextToltip } from 'components/textTooltip'
import { useEffect, useState } from 'react'
import { BsDiscord, BsTwitterX } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import { SiOpensea } from 'react-icons/si'
import { SiEthereum } from 'react-icons/si'
import { lineAddress } from 'services/web3/generated'
import { getExternalEtherscanUrl, getExternalOpenseaUrl } from 'utils/getLink'
import { Address, useNetwork } from 'wagmi'

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
              By{' '}
              <Box
                as="a"
                href="https://www.figure31.com/"
                target="_blank"
                _hover={{ textDecor: 'underline' }}
              >
                Figure31
              </Box>
              {' & '}
              <Box
                as="a"
                href="https://fingerprintsdao.xyz/"
                target="_blank"
                _hover={{ textDecor: 'underline' }}
              >
                Fingerprints DAO
              </Box>
            </Text>{' '}
            <Text fontSize="xs" flex={1} mb={[2, 0]} mt={2}>
              Developed by{' '}
              <Text
                as="a"
                color={'links.500'}
                title="arod.studio"
                href="https://arod.studio"
                target="_blank"
                _hover={{ textDecor: 'underline' }}
              >
                arod.studio
              </Text>
            </Text>
          </Box>

          <Flex flex={1} justifyContent={'flex-end'} alignItems={'center'}>
            <TextToltip label="Check out on Etherscan!" placement="top">
              <Box
                as="a"
                href={getExternalEtherscanUrl(lineAddress)}
                title="OpenSea"
                target="_blank"
                p={2}
                color="gray.300"
                _hover={{ color: 'gray.200' }}
                transition="ease"
                transitionProperty="color"
                transitionDuration="0.2s"
              >
                <Icon as={SiEthereum} w={6} h={6} display="block" />
              </Box>
            </TextToltip>
            <TextToltip
              label="Check out the collection on Opensea!"
              placement="top"
            >
              <Box
                as="a"
                href={getExternalOpenseaUrl(lineAddress)}
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
            </TextToltip>
            <TextToltip label="Join us on Discord!" placement="top">
              <Box
                as="a"
                href={
                  'https://discord.com/invite/Mg7wx36upM?utm_content=bufferbaa79&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer'
                }
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
            </TextToltip>
            <TextToltip label="Check out on X!" placement="top">
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
                <Icon as={BsTwitterX} w={6} h={6} display="block" />
              </Box>
            </TextToltip>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
