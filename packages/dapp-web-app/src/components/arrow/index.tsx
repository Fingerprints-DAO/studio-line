import { Box, Theme, theme, useTheme } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Direction } from 'types/grid'

export enum ArrowDirections {
  CENTER = 'CENTER',
  LEFT = 'left',
  RIGHT = 'right',
  DIAGONAL_LEFT = 'diagonal-left',
  DIAGONAL_RIGHT = 'diagonal-right',
}

type ArrowProps = {
  isAvailable: boolean
  isSelected: boolean
  hide?: ArrowDirections[]
  direction: Direction
}

export function Arrow({
  isSelected,
  isAvailable,
  direction,
  hide = [],
  ...props
}: ArrowProps) {
  const theme = useTheme()
  const hexColor = useMemo(() => {
    if (!isAvailable) return theme.colors['gray'][200]
    if (isSelected) {
      if (direction === Direction.UP) return theme.colors['red'][600]
      if (direction === Direction.DOWN) return theme.colors['cyan'][600]
    }
    if (direction === Direction.UP) return theme.colors['red'][100]
    if (direction === Direction.DOWN) return theme.colors['cyan'][100]
    return theme.colors['gray'][200]
  }, [direction, isAvailable, isSelected, theme.colors])

  return (
    <Box
      {...props}
      transform={direction === Direction.DOWN ? `scaleY(-1)` : ''}
    >
      <svg
        width="49"
        height="48"
        viewBox="0 0 49 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* LEFT */}
          {hide.includes(ArrowDirections.LEFT) ? null : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.70376 26.3801L0.730957 23.8971L4.70376 21.4141L3.91056 23.3971H24.5678C24.8439 23.3971 25.0678 23.6209 25.0678 23.8971C25.0678 24.1732 24.8439 24.3971 24.5678 24.3971H3.91056L4.70376 26.3801Z"
              fill={hexColor}
            />
          )}
          {/* DIAGONAL LEFT */}
          {hide.includes(ArrowDirections.DIAGONAL_LEFT) ? null : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.06494 1.05345L0.5 0L1.55345 4.56494L2.40513 2.57768L24.0778 24.2504C24.2731 24.4456 24.5897 24.4456 24.7849 24.2504C24.9802 24.0551 24.9802 23.7385 24.7849 23.5433L3.12606 1.8844L5.06494 1.05345Z"
              fill={hexColor}
            />
          )}
          {/* CENTER */}
          {hide.includes(ArrowDirections.CENTER) ? null : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.0847 4.0331L24.5677 0.0603027L27.0507 4.0331L25.0677 3.2399L25.0677 23.8971C25.0677 24.1733 24.8439 24.3971 24.5677 24.3971C24.2916 24.3971 24.0677 24.1733 24.0677 23.8971L24.0677 3.2399L22.0847 4.0331Z"
              fill={hexColor}
            />
          )}
          {/* DIAGONAL RIGHT */}
          {hide.includes(ArrowDirections.DIAGONAL_RIGHT) ? null : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M43.935 1.05345L48.5 0L47.4465 4.56494L46.5948 2.57768L24.9222 24.2504C24.7269 24.4456 24.4103 24.4456 24.2151 24.2504C24.0198 24.0551 24.0198 23.7385 24.2151 23.5433L45.8739 1.88439L43.935 1.05345Z"
              fill={hexColor}
            />
          )}
          {/* RIGHT */}
          {hide.includes(ArrowDirections.RIGHT) ? null : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M44.4316 26.3801L48.4044 23.8971L44.4316 21.4141L45.2248 23.3971H24.5676C24.2915 23.3971 24.0676 23.6209 24.0676 23.8971C24.0676 24.1732 24.2915 24.3971 24.5676 24.3971H45.2248L44.4316 26.3801Z"
              fill={hexColor}
            />
          )}
        </g>
      </svg>
    </Box>
  )
}
