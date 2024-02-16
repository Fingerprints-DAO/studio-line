import { Box, BoxProps, Text } from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/chakraNextImageLoader'
import { GridItemProperties } from 'contexts/PlaygroundContext'
import { generateImage, ImageSizes } from 'types/grid'
import { coordinatesToText } from 'utils/handleCoordinates'

export type TokenPreviewProps = BoxProps & {
  itemId: number
  thumbnailsItems?: Partial<GridItemProperties>[]
  isFixed?: boolean
}
export const TokenPreview = ({
  itemId,
  thumbnailsItems = [],
  isFixed = false,
  ...boxProps
}: TokenPreviewProps) => (
  <Box {...boxProps}>
    <ChakraNextImageLoader
      src={generateImage(itemId, ImageSizes.LARGE)}
      alt={`Token ${itemId}`}
      // maxH={'80%'}
      imageWidth={858}
      imageHeight={1298}
      style={{ maxWidth: '100%' }}
    />
    {thumbnailsItems.length > 0 && (
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        mt={2}
        flexWrap={thumbnailsItems.length > 5 ? 'wrap' : 'nowrap'}
        h={'20%'}
      >
        {thumbnailsItems.map((item) => {
          return (
            item.image && (
              <Box
                key={item.index}
                textAlign={'center'}
                w={
                  thumbnailsItems.length > 5
                    ? '19%'
                    : `${Math.floor(100 / thumbnailsItems.length) - 1}%`
                }
              >
                <ChakraNextImageLoader
                  src={item.image}
                  alt={`Token ${item.index}`}
                  imageWidth={104}
                  imageHeight={157}
                  style={{ width: '100%' }}
                />
                <Text fontSize={'11px'} mt={1} mb={isFixed ? 2 : 0}>
                  ({coordinatesToText(item.index)})
                </Text>
              </Box>
            )
          )
        })}
      </Box>
    )}
  </Box>
)
