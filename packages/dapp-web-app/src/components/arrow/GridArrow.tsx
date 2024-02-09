import { Box, useTheme } from '@chakra-ui/react'
import { ArrowProps, useHexColor } from './utils'
import { Direction } from 'types/grid'
import { ArrowDirections } from 'types/movements'

export function Arrow({
  isSelected,
  isAvailable,
  direction,
  disableArrows = [],
  displayCircle,
  hasMouseOver,
  ...props
}: ArrowProps) {
  const theme = useTheme()
  const hexColor = useHexColor({
    isAvailable,
    isSelected,
    direction,
  })
  const handleFillColor = (arrowDirection: ArrowDirections) => {
    if (disableArrows.includes(arrowDirection) && isSelected)
      return theme.colors['gray'][400]
    if (disableArrows.includes(arrowDirection)) return theme.colors['gray'][200]

    // if (hovered === arrowDirection) return hoverHex
    return hexColor
  }

  if (!direction) return null

  return (
    <Box
      {...props}
      transform={direction === Direction.DOWN ? `scaleY(-1)` : ''}
      pos={'relative'}
    >
      <Box
        as="svg"
        width={props.w || '48'}
        height={props.h || '47'}
        viewBox="0 0 48 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* LEFT */}

          <Box
            as="path"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.70376 26.3801L0.730957 23.8971L4.70376 21.4141L3.91056 23.3971H24.5678C24.8439 23.3971 25.0678 23.6209 25.0678 23.8971C25.0678 24.1732 24.8439 24.3971 24.5678 24.3971H3.91056L4.70376 26.3801Z"
            fill={handleFillColor(ArrowDirections.LEFT)}
          />

          {/* DIAGONAL LEFT */}
          <Box
            as="path"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.06494 1.05345L0.5 0L1.55345 4.56494L2.40513 2.57768L24.0778 24.2504C24.2731 24.4456 24.5897 24.4456 24.7849 24.2504C24.9802 24.0551 24.9802 23.7385 24.7849 23.5433L3.12606 1.8844L5.06494 1.05345Z"
            fill={handleFillColor(ArrowDirections.DIAGONAL_LEFT)}
          />

          {/* CENTER */}
          <Box
            as="path"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.0847 4.0331L24.5677 0.0603027L27.0507 4.0331L25.0677 3.2399L25.0677 23.8971C25.0677 24.1733 24.8439 24.3971 24.5677 24.3971C24.2916 24.3971 24.0677 24.1733 24.0677 23.8971L24.0677 3.2399L22.0847 4.0331Z"
            fill={handleFillColor(ArrowDirections.CENTER)}
          />

          {/* DIAGONAL RIGHT */}
          <Box
            as="path"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M43.935 1.05345L48.5 0L47.4465 4.56494L46.5948 2.57768L24.9222 24.2504C24.7269 24.4456 24.4103 24.4456 24.2151 24.2504C24.0198 24.0551 24.0198 23.7385 24.2151 23.5433L45.8739 1.88439L43.935 1.05345Z"
            fill={handleFillColor(ArrowDirections.DIAGONAL_RIGHT)}
          />

          {/* RIGHT */}
          <Box
            as="path"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M44.4316 26.3801L48.4044 23.8971L44.4316 21.4141L45.2248 23.3971H24.5676C24.2915 23.3971 24.0676 23.6209 24.0676 23.8971C24.0676 24.1732 24.2915 24.3971 24.5676 24.3971H45.2248L44.4316 26.3801Z"
            fill={handleFillColor(ArrowDirections.RIGHT)}
          />

          {/* CIRCLE */}
          {displayCircle && (
            <circle cx="24.5677" cy="24.3971" r="2.9796" fill={hexColor} />
          )}
        </g>
      </Box>
    </Box>
  )
}
