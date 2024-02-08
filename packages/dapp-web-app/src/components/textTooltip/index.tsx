import { Tooltip, TooltipProps } from '@chakra-ui/react'

export const TextToltip = (props: TooltipProps) => (
  <Tooltip
    hasArrow
    arrowSize={6}
    gutter={0}
    borderRadius={0}
    p={'6px'}
    bgColor={'rgba(45, 55, 72, 1)'}
    backdropFilter={'blur(4px)'}
    openDelay={300}
    placement="auto"
    opacity={0.6}
    {...props}
  />
)
