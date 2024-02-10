import { Box } from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/chakraNextImageLoader'

export const questions = [
  {
    question: 'When is the auction?',
    answer: (
      <>
        The <b>60-minute Dutch auction</b> for LINE begins on{' '}
        <b>Wednesday, February 21st at 10AM PT / 1PM ET / 7PM CET</b>. The
        auction will take place on this website. If works are still available at
        the end of the Dutch auction, minting will be open for 48 hours at the
        resting price.
      </>
    ),
  },
  {
    question: 'How much will it cost to mint one?',
    answer: (
      <>
        The Dutch auction will have a{' '}
        <b>starting price of 1.0 ETH, going down to 0.15 ETH.</b>
      </>
    ),
  },
  {
    question: 'How will the auction work?',
    answer: (
      <>
        The Dutch auction is first come, first served. Collectors can choose to
        mint specific tokens or mint random ones. Tokens will be minted as soon
        as a bid is placed. However, allowlisted wallets will be eligible for a
        discount at the time of mint.
      </>
    ),
  },
  {
    question: 'What is the collection size?',
    answer: (
      <>
        A total of <b>200 tokens</b> will be available for mint. If the
        collection does not mint out after the auction or 48-hour minting
        period, the remaining tokens will not get minted.
      </>
    ),
  },
  {
    question: 'What chain is LINE on?',
    answer: 'LINE will live on Ethereum Mainnet.',
  },
]
export const auctionQuestions = [
  {
    question: 'How is the grid structured?',
    answer: (
      <>
        The collection is structured on a grid with coordinates. There is an
        image for every coordinate on the grid.
        <Box
          as={'span'}
          display={'block'}
          w={'100%'}
          maxW={'xl'}
          textAlign={'center'}
          mx="auto"
        >
          <ChakraNextImageLoader
            src={'/about/grid-tokens.jpg'}
            width={3000}
            height={3000}
            alt="Grid with tokens"
          />
        </Box>
      </>
    ),
  },
  {
    question: 'What is a token and how do they function on the grid?',
    answer: (
      <>
        Tokens consist of an origin point and images in its “field of view.”
        Their placement on the grid determines what they can see. The artist
        hand-picked all initial origin points. Note that there are fewer tokens
        than coordinates.
        <Box
          as={'span'}
          display={'block'}
          w={'100%'}
          maxW={'xl'}
          textAlign={'center'}
          mx="auto"
        >
          <ChakraNextImageLoader
            src={'/about/tokens-image.gif'}
            width={1500}
            height={1500}
            alt="Images illustrating day by day token view"
          />
        </Box>
      </>
    ),
  },
  {
    question: `What should I do during the Discovery phase before the auction?`,
    answer:
      'There will be a Discovery period where you can view the tokens on the grid and “like” specific tokens/coordinates. Once you like a token, it will appear on the auction page.',
  },
  {
    question:
      'If I liked a token/coordinate, does that guarantee I will mint it?',
    answer:
      'No, the Dutch auction is first come, first serve. Collectors are encouraged to choose and mint the tokens they want immediately.',
  },
  {
    question: 'Can I move a token to a new coordinate during the auction?',
    answer:
      'You will not be able to move the token to a new coordinate until the end of the auction.',
  },
  {
    question: 'Can I mint multiple tokens at a time?',
    answer:
      'Yes, if you like multiple tokens/coordinates they will appear on your auction page and you can mint all of them.',
  },
  {
    question: 'What happens at the end of the auction?',
    answer: (
      <>
        Once all tokens are minted, collectors can move their tokens to new
        coordinates on the grid. A token&apos;s origin point is the anchor of
        its field of view. When a collector moves a token, they move the origin
        point. Collectors can move around and discover the entire grid of
        images/the synthetic landscape.
      </>
    ),
  },
  {
    question: 'What determines the movements a token can make on the grid?',
    answer: (
      <>
        Tokens are pieces; they can go up or down, diagonally or laterally; they
        simulate a 180-degree field of view. Depending on their initial
        placement at the time of mint, some tokens face up, others down.
        <Box
          as={'span'}
          display={'block'}
          w={'100%'}
          maxW={'xl'}
          textAlign={'center'}
          mx="auto"
        >
          <ChakraNextImageLoader
            src={'/about/movement.gif'}
            width={1510}
            height={1510}
            alt="Images illustrating token movements"
          />
        </Box>
      </>
    ),
  },
  {
    question: 'How can I move my token to a new coordinate?',
    answer:
      'Tokens can be moved on the grid, on this website, or by using simple smart-contract functions; their movements are limited, and they cannot move on a coordinate that is already used by another.',
  },
  {
    question: 'Do I have to pay anything to move my token?',
    answer:
      'Movements are free. You only have to pay the transaction costs associated with the move function.',
  },
  {
    question:
      'How can I get a special “star” token with a 360-degree field of view?',
    answer: (
      <>
        After mint, collectors can move their tokens to new coordinates on the
        grid. The first 20 tokens to reach the borders of the grid can use a
        special function that will allow them to choose to relocate to any
        coordinate on the grid they want. Their token&apos;s field of view will
        change to become a full 360-degree. If they decide to do so, their
        position will be locked down, and they cannot move anymore.
        <Box
          as={'span'}
          display={'block'}
          w={'100%'}
          maxW={'md'}
          textAlign={'center'}
          mx="auto"
        >
          <ChakraNextImageLoader
            src={'/about/token-types.jpg'}
            width={3349}
            height={1874}
            alt="All token types"
          />
        </Box>
      </>
    ),
  },
]

export default questions
