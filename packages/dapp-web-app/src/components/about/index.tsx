'use client'

import React, { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Box,
  Collapse,
  Container,
  Flex,
  Text,
  VStack,
  Link as ChakraLink,
  TextProps,
  BoxProps,
} from '@chakra-ui/react'
import Header from 'components/header'
import Footer from 'components/footer'
import { useDisplayConfig } from 'hooks/useDisplayConfig'
import { questions, auctionQuestions } from './_questions'
import SidebarIcons from 'components/sidebarIcons'
import { useAccount } from 'wagmi'
import { fetcher } from 'utils/fetcher'
import { GetDiscountResponse } from 'app/getDiscount/api/route'
import Link from 'next/link'
import ChakraNextImageLoaderFull from 'components/chakraNextImageLoaderFull'

const textProps: TextProps = {
  my: 4,
}

const titleProps: TextProps = {
  mt: 10,
  mb: 5,
  as: 'h1',
  fontSize: '3xl',
  textColor: 'gray.700',
}

const imagesProps: BoxProps = {
  // maxW: '6xl',
  my: 5,
}

export default function About() {
  const { isRegularScreen, isMediumScreen } = useDisplayConfig()

  return (
    <Container maxW={'8xl'}>
      <Flex pos={'relative'} justifyContent={'center'}>
        <VStack
          bg="white"
          px={4}
          alignItems="stretch"
          minH={'100vh'}
          w={'100%'}
          pos={'relative'}
        >
          {isRegularScreen && <Header />}
          {isMediumScreen && <SidebarIcons alignItems={'flex-end'} />}
          <Box
            as={'main'}
            // mt={isRegularScreen ? '62px' : '0'}
            // mt={isRegularScreen ? '92px' : '0'}
            // mt={10}
            textColor={'gray.500'}
          >
            <Box {...imagesProps} mt={0}>
              <ChakraNextImageLoaderFull
                src={'/about/header.jpg'}
                imageWidth={5200}
                imageHeight={1966}
                w={'full'}
                alt="Header image"
                imageProps={{ priority: true }}
              />
            </Box>
            <Text {...titleProps} mt={4}>
              LINE by Figure31
            </Text>
            <Text {...textProps}>
              <b>Discovery Phase:</b> Begins on Monday, February 19 (more info
              below)
              <br />
              <b>Auction Date:</b> 60-minute Dutch auction on Wednesday,
              February 21 at 10 AM PT / 1 PM ET / 7 PM CET{' - '}
              <ChakraLink
                as={Link}
                href={'https://www.addevent.com/event/VX20075579'}
                isExternal
              >
                add to calendar
              </ChakraLink>
              <br />
              <b>Starting/Resting price:</b> 1.0 ETH → 0.15 ETH <br />
              <b>Supply:</b> 250 tokens; only available to mint through desktop,
              not mobile.
            </Text>
            <Text {...textProps}>
              LINE is a photographic series of 250 tokens placed within a
              synthetic landscape. Using photographic and post-production
              techniques similar to Figure31&apos;s SALT, the images in LINE are
              captured using a digital camera combined with ultra-telephoto
              lenses. All photographs are taken in remote empty landscapes at
              sundown or night. There is no artificial light, only indirect
              natural light hitting the camera sensor. Photographs are arranged
              as panoramas to recreate a unified landscape.
            </Text>
            <Text {...textProps}>
              The landscape is made up of a grid with distinct coordinates.
              Every token has an origin point which defines a unique “field of
              view.” The origin point determines a token&apos;s dynamism — and
              potential movements on the grid. They can be moved to new
              coordinates through the project&apos;s website or the smart
              contract.
            </Text>
            <Text {...textProps}>
              Tokens act like camera lenses, where location also influences
              perception. Each token&apos;s position on the grid defines what
              image it perceives. The metadata of a token is dynamic; images and
              attributes travel back and forth between the different points
              within the reach of its field of view. Most tokens will have a
              180-degree view, and only 25 “star” tokens will have a 360-degree
              view. Images cycle daily.
            </Text>
            <Text {...titleProps}>About Figure31</Text>
            <Text>
              Loucas Braconnier, otherwise known as{' '}
              <ChakraLink
                as={Link}
                href="https://twitter.com/figure31_"
                isExternal
              >
                Figure31
              </ChakraLink>{' '}
              or just Figure, is a visual artist working out of Montreal,
              Canada. He studied Visual and Media Arts at L&apos;Université du
              Québec à Montréal. In 2023, his work was exhibited in Singapore
              for Proof of Concept, in Tokyo for Proof of X, and more recently
              in New Orleans for Material. His work explores the specificity of
              the blockchain as a dynamic medium and the conceptual implications
              of collecting such artworks while repurposing photographic
              techniques to highlight how technology can influence alternative
              modes of perception.
            </Text>
          </Box>
          <Box {...imagesProps}>
            <ChakraNextImageLoaderFull
              src={'/about/faq.jpg'}
              imageWidth={3900}
              imageHeight={1966}
              alt="FAQ image"
            />
          </Box>
          <Box as={'section'}>
            <Text {...titleProps}>Frequently asked questions</Text>
            <Box>
              {questions.map((item, index) => {
                const isLastChild = false // questions.length - 1 === index

                return (
                  <Box
                    as={'article'}
                    mb={!isLastChild ? 6 : 0}
                    pb={!isLastChild ? 6 : 0}
                    borderBottomColor="gray.100"
                    borderBottomWidth={!isLastChild ? 1 : 0}
                    key={index}
                  >
                    <Text
                      as="h2"
                      fontSize="lg"
                      display="block"
                      mb={4}
                      fontWeight={'bold'}
                      color="gray.700"
                    >
                      {item.question}
                    </Text>
                    <Text color="gray.500">{item.answer}</Text>
                  </Box>
                )
              })}
              <Text
                as={'h2'}
                fontSize={'2xl'}
                textColor={'gray.700'}
                // fontWeight={'bold'}
                mt={10}
                mb={5}
              >
                How the auction works
              </Text>
              {auctionQuestions.map((item, index) => {
                const isLastChild = false //auctionQuestions.length - 1 === index

                return (
                  <Box
                    as={'article'}
                    mb={!isLastChild ? 6 : 0}
                    pb={!isLastChild ? 6 : 0}
                    borderBottomColor="gray.100"
                    borderBottomWidth={!isLastChild ? 1 : 0}
                    key={index}
                  >
                    <Text
                      as="h2"
                      fontSize="lg"
                      display="block"
                      mb={4}
                      fontWeight={'bold'}
                      color="gray.700"
                    >
                      {item.question}
                    </Text>
                    <Text color="gray.500">{item.answer}</Text>
                  </Box>
                )
              })}
            </Box>
          </Box>

          <Box {...imagesProps} mb={0}>
            <ChakraNextImageLoaderFull
              src={'/about/footer.jpg'}
              imageWidth={3900}
              imageHeight={1966}
              alt="FAQ image"
            />
          </Box>
          <Flex
            h={'100%'}
            w={'100%'}
            overflow={'auto'}
            flexDir={'column'}
            justifyContent={'flex-end'}
            mb={4}
          >
            <Footer />
          </Flex>
        </VStack>
      </Flex>
    </Container>
  )
}
