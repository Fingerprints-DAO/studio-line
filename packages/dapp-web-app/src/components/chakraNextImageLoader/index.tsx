import {
  FC,
  PropsWithRef,
  RefObject,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import Image, { ImageProps } from 'next/image'
import { Box, BoxProps, Skeleton } from '@chakra-ui/react'

// Define props type
export interface ChakraNextImageLoaderProps extends PropsWithRef<BoxProps> {
  src: string
  alt: string
  imageWidth: number
  imageHeight?: number
  imageProps?: Partial<ImageProps>
}

export const ChakraNextImageLoader = (
  {
    src,
    alt,
    imageWidth,
    imageHeight,
    imageProps,
    ...rest
  }: ChakraNextImageLoaderProps,
  ref?: any,
) => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
  }, [src])

  return (
    <Box as={'span'} display={'inline-block'} position="relative" {...rest}>
      {isLoading && (
        <Skeleton
          as={'span'}
          display={'inline-block'}
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
        ref={ref}
        style={{
          width: 'auto',
          maxHeight: '60vh',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.2s',
          objectFit: 'contain',
        }}
        {...imageProps}
      />
    </Box>
  )
}

export default forwardRef(ChakraNextImageLoader)
