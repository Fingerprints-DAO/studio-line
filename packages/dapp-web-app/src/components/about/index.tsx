'use client'

import React, { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Box,
  Collapse,
  Container,
  Fade,
  Flex,
  Slide,
  SlideFade,
  Text,
  VStack,
} from '@chakra-ui/react'
import Header from 'components/header'
import Footer from 'components/footer'
import { useDisplayConfig } from 'hooks/useDisplayConfig'
import questions from './_questions'
import SidebarIcons from 'components/sidebarIcons'
import { useAccount } from 'wagmi'
import { fetcher } from 'utils/fetcher'
import { GetDiscountResponse } from 'pages/api/getDiscount'

export default function About() {
  const { isRegularScreen, isMediumScreen } = useDisplayConfig()
  const [discountValue, setDiscountValue] = useState<number | null>(null)
  const { address } = useAccount()

  useEffect(() => {
    const checkDiscount = async (address: string) => {
      try {
        const response = await fetcher<GetDiscountResponse>(
          '/api/getDiscount',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
          },
        )
        setDiscountValue(response.discountPercentage)
      } catch (error) {
        console.error('Error checking discounts:', error)
        setDiscountValue(null)
      }
    }

    if (address) checkDiscount(address)
  }, [address])

  return (
    <Container maxW={'6xl'}>
      <Flex pos={'relative'} justifyContent={'center'}>
        <VStack
          bg="white"
          px={4}
          alignItems="stretch"
          minH={'100vh'}
          w={'100vw'}
          pos={'relative'}
        >
          {isRegularScreen && <Header />}
          {isMediumScreen && <SidebarIcons alignItems={'flex-end'} />}
          <Box
            as={'main'}
            mt={isRegularScreen ? '92px' : '0'}
            textColor={'gray.500'}
          >
            <Collapse
              in={discountValue !== null && discountValue > 0}
              animateOpacity
              unmountOnExit
            >
              <Box pb={10}>
                <Alert status="success" bgColor={'gray.200'}>
                  <AlertIcon color={'gray.500'} />
                  {`You are eligible for a ${discountValue}% discount on Mint.`}
                </Alert>
              </Box>
            </Collapse>
            <Text as={'h1'} fontSize={'3xl'} textColor={'gray.700'} mb={10}>
              About Line
            </Text>
            <Text>
              Long text about Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque consequat egestas risus ac consequat. Mauris
              pulvinar neque et tellus suscipit dictum. Suspendisse nec dui
              aliquet, dignissim ligula nec, blandit enim. Pellentesque nec nunc
              dapibus, vehicula felis et, tempor lacus. Morbi ultrices eget
              magna at n urpis, nec tristique risus. In pulvina Curabitur at
              ligula eu metus tincidunt ultricies. Maecenas nulla quam, eleifend
              vitae lectus ac, placerat feugiat justo. Curabitur semper, neque
              interdum auctor elementum, sapien urna blandit lacus, id
              scelerisque mauris nunc ut libero. Sed accumsan nisi condimentum
              aliquet volutpat. Mauris tempor euismod imperdiet. Pellentesque
              sit amet ligula vitae augue elementum lobortis nec id orci.
              Quisque finibus felis arcu, eu imperdiet augue tincidunt quis.
            </Text>
          </Box>
          <Box as={'section'} mt={16}>
            <Text as={'h1'} fontSize={'3xl'} textColor={'gray.700'} mb={10}>
              Frequently asked questions
            </Text>
            <Box>
              {questions.map((item, index) => {
                const isLastChild = questions.length - 1 === index

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
          <Flex
            height={'100%'}
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
