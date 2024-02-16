import { FC, useEffect, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Box, BoxProps, Skeleton } from '@chakra-ui/react'

// Define props type
export interface ChakraNextImageLoaderProps extends BoxProps {
  src: string
  alt: string
  imageWidth: number
  imageHeight?: number
  imageProps?: Partial<ImageProps>
}

export const ChakraNextImageLoader: FC<ChakraNextImageLoaderProps> = ({
  src,
  alt,
  imageWidth,
  imageHeight,
  imageProps,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [src])

  return (
    <Box
      as={'span'}
      display={'block'}
      position="relative"
      width={imageWidth}
      height={'auto'}
      maxW={'100%'}
      maxH={'100%'}
      {...rest}
    >
      {isLoading && (
        <Skeleton
          as={'span'}
          display={'block'}
          left={0}
          top={0}
          bottom={0}
          right={0}
          pos={'absolute'}
          zIndex={2}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        onLoadingComplete={() => setLoading(false)}
        style={{
          width: '100%',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.2s',
          // objectFit: 'contain',
        }}
        {...imageProps}
      />
    </Box>
  )
}

export default ChakraNextImageLoader
