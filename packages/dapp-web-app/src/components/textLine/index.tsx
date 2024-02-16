import { Text, TextProps } from '@chakra-ui/react'

export type TextLineProps = TextProps & {
  valueProps?: TextProps
}
export const TextLine = ({
  children,
  title = '',
  valueProps = {},
  ...props
}: TextLineProps) => (
  <Text
    fontSize={'md'}
    color={'gray.500'}
    mb={1}
    textTransform={'lowercase'}
    {...props}
  >
    <Text as={'span'} fontWeight={'bold'} textColor={'gray.700'}>
      {title}:
    </Text>{' '}
    <Text as={'span'} textTransform={'lowercase'} {...valueProps}>
      {children}
    </Text>
  </Text>
)
