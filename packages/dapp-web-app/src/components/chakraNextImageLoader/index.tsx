import { FC, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Box, Skeleton } from '@chakra-ui/react'

// Define props type
export interface ChakraNextImageLoaderProps {
  src: string
  alt: string
  width: number
  height?: number
  imageProps?: Partial<ImageProps>
}

export const ChakraNextImageLoader: FC<ChakraNextImageLoaderProps> = ({
  src,
  alt,
  width,
  height,
  imageProps,
  ...rest
}) => {
  const [isLoading, setLoading] = useState(true)

  return (
    <Box
      position="relative"
      width={width}
      height={'auto'}
      maxW={'100%'}
      maxH={'100%'}
      {...rest}
    >
      {isLoading && (
        <Skeleton
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
        width={width}
        height={height}
        onLoadingComplete={() => setLoading(false)}
        style={{
          width: '100%',
        }}
        {...imageProps}
      />
    </Box>
  )
}

export default ChakraNextImageLoader
