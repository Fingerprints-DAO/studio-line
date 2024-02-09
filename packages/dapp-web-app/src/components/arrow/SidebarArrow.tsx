import { Box, useTheme } from '@chakra-ui/react'
import { Direction } from 'types/grid'
import { ArrowProps, useArrowColors, useHexColor } from './utils'
import { ArrowDirections } from 'types/movements'

type SidebarArrowProp = ArrowProps & {
  hovered?: ArrowDirections
  selected?: ArrowDirections
  handleOnClick: (dir: ArrowDirections) => void
  handleMouseOver: (dir?: ArrowDirections) => void
}

export function SidebarArrow({
  isSelected,
  isAvailable,
  direction,
  disableArrows = [],
  displayCircle,
  hasMouseOver,
  hovered,
  selected,
  handleOnClick,
  handleMouseOver,
  ...props
}: SidebarArrowProp) {
  const theme = useTheme()
  const hexColor = useHexColor({
    isAvailable,
    isSelected,
    direction,
  })
  const [hoverHex, selectedHex] = useArrowColors({ direction })
  const handleFillColor = (arrowDirection: ArrowDirections) => {
    if (disableArrows.includes(arrowDirection)) return theme.colors['gray'][200]
    if (selected === arrowDirection) return selectedHex

    if (hovered === arrowDirection) return hoverHex
    return hexColor
  }

  if (!direction) return null

  return (
    <Box
      {...props}
      transform={direction === Direction.DOWN ? `scaleY(-1)` : ''}
      pos={'relative'}
    >
      <svg
        width="80"
        height="46"
        viewBox="0 0 80 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        cursor={'pointer'}
      >
        <g>
          {/* LEFT */}
          <>
            <Box
              as="path"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.78061 36.0332L0.15921 40.1715L6.78061 44.3098L5.32521 40.6715L39.8872 40.6715C40.1634 40.6715 40.3872 40.4476 40.3872 40.1715C40.3872 39.8953 40.1634 39.6715 39.8872 39.6715L5.32521 39.6715L6.78061 36.0332Z"
              transition={'fill 0.3s'}
              fill={handleFillColor(ArrowDirections.LEFT)}
            />
            {disableArrows.includes(ArrowDirections.LEFT) ? null : (
              <rect
                x="0"
                y="30"
                width="23"
                height="15"
                onClick={() => handleOnClick(ArrowDirections.LEFT)}
                onMouseOver={() => handleMouseOver(ArrowDirections.LEFT)}
                onMouseLeave={() => handleMouseOver()}
                fill="transparent"
              />
            )}
          </>

          {/* DIAGONAL LEFT */}
          <>
            <Box
              as="path"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40.2393 40.1738C40.4345 40.369 40.4345 40.6856 40.2393 40.8809C40.044 41.0762 39.7274 41.0762 39.5322 40.8809L3.31674 4.6655L1.75584 8.3075L0.000141144 0.699299L7.60834 2.4551L4.04694 3.9814L40.2393 40.1738Z"
              transition={'fill 0.3s'}
              fill={handleFillColor(ArrowDirections.DIAGONAL_LEFT)}
            />
            {disableArrows.includes(ArrowDirections.DIAGONAL_LEFT) ? null : (
              <rect
                x="4"
                y="-2"
                width="30"
                height="15"
                transform="rotate(45 7 0)"
                onClick={() => handleOnClick(ArrowDirections.DIAGONAL_LEFT)}
                onMouseOver={() =>
                  handleMouseOver(ArrowDirections.DIAGONAL_LEFT)
                }
                onMouseLeave={() => handleMouseOver()}
                fill="transparent"
              />
            )}
          </>

          {/* CENTER */}
          <>
            <Box
              as="path"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.387 40.1716C39.387 40.4478 39.6109 40.6716 39.887 40.6716C40.1632 40.6716 40.387 40.4478 40.387 40.1716L40.387 5.6096L44.0254 7.065L39.887 0.4436L35.7487 7.065L39.387 5.6096L39.387 40.1716Z"
              transition={'fill 0.3s'}
              fill={handleFillColor(ArrowDirections.CENTER)}
            />
            {disableArrows.includes(ArrowDirections.CENTER) ? null : (
              <rect
                x="42"
                y="20"
                width="23"
                height="15"
                transform="rotate(-90 39 26)"
                onClick={() => handleOnClick(ArrowDirections.CENTER)}
                onMouseOver={() => handleMouseOver(ArrowDirections.CENTER)}
                onMouseLeave={() => handleMouseOver()}
                fill="transparent"
              />
            )}
          </>

          {/* DIAGONAL RIGHT */}
          <>
            <Box
              as="path"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.7608 40.1738C39.5656 40.369 39.5656 40.6856 39.7608 40.8809C39.9561 41.0762 40.2727 41.0762 40.4679 40.8809L76.6834 4.6655L78.2443 8.3075L80 0.699299L72.3918 2.4551L75.9532 3.9814L39.7608 40.1738Z"
              transition={'fill 0.3s'}
              fill={handleFillColor(ArrowDirections.DIAGONAL_RIGHT)}
            />
            {disableArrows.includes(ArrowDirections.DIAGONAL_RIGHT) ? null : (
              <rect
                x="88"
                y="8"
                width="30"
                height="15"
                transform="rotate(135 87 7)"
                onClick={() => handleOnClick(ArrowDirections.DIAGONAL_RIGHT)}
                onMouseOver={() =>
                  handleMouseOver(ArrowDirections.DIAGONAL_RIGHT)
                }
                onMouseLeave={() => handleMouseOver()}
                fill="transparent"
              />
            )}
          </>

          {/* RIGHT */}
          <>
            <Box
              as="path"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M72.9939 36.0332L79.6152 40.1715L72.9939 44.3098L74.4492 40.6715L39.8872 40.6715C39.6111 40.6715 39.3872 40.4476 39.3872 40.1715C39.3872 39.8953 39.6111 39.6715 39.8872 39.6715L74.4492 39.6715L72.9939 36.0332Z"
              transition={'fill 0.3s'}
              fill={handleFillColor(ArrowDirections.RIGHT)}
            />
            {disableArrows.includes(ArrowDirections.RIGHT) ? null : (
              <rect
                x="80"
                y="45"
                width="23"
                height="15"
                transform="rotate(-180 80 45)"
                onClick={() => handleOnClick(ArrowDirections.RIGHT)}
                onMouseOver={() => handleMouseOver(ArrowDirections.RIGHT)}
                onMouseLeave={() => handleMouseOver()}
                fill="transparent"
              />
            )}
          </>
          {/* CIRCLE */}
          {displayCircle && (
            <circle
              cx="40"
              cy="40"
              r="5"
              fill={selected ? selectedHex : hexColor}
            />
          )}
        </g>
      </svg>
    </Box>
  )
}
