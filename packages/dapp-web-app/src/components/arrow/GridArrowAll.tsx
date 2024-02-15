import { Box, Fade, useTheme } from '@chakra-ui/react'
import { ArrowProps } from './utils'

type ArrowAllProps = ArrowProps & {
  isLocked: boolean
}

export function ArrowAll({
  isOwner,
  isSelected,
  isLocked,
  ...props
}: ArrowAllProps) {
  const theme = useTheme()
  // const handleFillColor = () => {
  //   return theme.colors['purple'][500]
  // }
  const handleFillColor = () => {
    if (!isOwner && isSelected) return theme.colors['gray'][400]
    if (!isOwner) return theme.colors['gray'][200]
    if (isLocked && !isSelected) return theme.colors['purple'][200]
    if (isOwner || isSelected) return theme.colors['purple'][500]

    return theme.colors['gray'][200]
  }

  return (
    <Fade in>
      <Box {...props} pos={'relative'}>
        <Box
          as="svg"
          width={props.w || '49'}
          height={props.h || '49'}
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M44.4316 26.8801L48.4044 24.3971L44.4316 21.9141L45.2248 23.8971H24.5676C24.2915 23.8971 24.0676 24.1209 24.0676 24.3971C24.0676 24.6732 24.2915 24.8971 24.5676 24.8971H45.2248L44.4316 26.8801Z"
            fill={handleFillColor()}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.70376 26.8801L0.730957 24.3971L4.70376 21.9141L3.91056 23.8971H24.5678C24.8439 23.8971 25.0678 24.1209 25.0678 24.3971C25.0678 24.6732 24.8439 24.8971 24.5678 24.8971H3.91056L4.70376 26.8801Z"
            fill={handleFillColor()}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M25.0677 24.3971C25.0677 24.121 24.8439 23.8971 24.5677 23.8971C24.2916 23.8971 24.0677 24.121 24.0677 24.3971L24.0677 45.0543L22.0847 44.2611L24.5677 48.2339L27.0507 44.2611L25.0677 45.0543L25.0677 24.3971Z"
            fill={handleFillColor()}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.0847 4.5331L24.5677 0.560303L27.0507 4.5331L25.0677 3.7399L25.0677 24.3971C25.0677 24.6733 24.8439 24.8971 24.5677 24.8971C24.2916 24.8971 24.0677 24.6733 24.0677 24.3971L24.0677 3.7399L22.0847 4.5331Z"
            fill={handleFillColor()}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M43.935 1.55345L48.5 0.5L47.4465 5.06494L46.5948 3.07768L24.9222 24.7504C24.7269 24.9456 24.4103 24.9456 24.2151 24.7504C24.0198 24.5551 24.0198 24.2385 24.2151 24.0433L45.8739 2.38439L43.935 1.55345Z"
            fill={handleFillColor()}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.06494 1.55346L0.499998 0.500008L1.55345 5.06495L2.40513 3.07769L24.0778 24.7504C24.2731 24.9456 24.5897 24.9456 24.7849 24.7504C24.9802 24.5551 24.9802 24.2385 24.7849 24.0433L3.12606 2.3844L5.06494 1.55346Z"
            fill={handleFillColor()}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.7849 24.5373C24.9802 24.342 24.9802 24.0254 24.7849 23.8302C24.5897 23.6349 24.2731 23.6349 24.0778 23.8302L2.40513 45.5028L1.55345 43.5156L0.5 48.0805L5.06494 47.0271L3.12606 46.1961L24.7849 24.5373Z"
            fill={handleFillColor()}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.2151 24.5373C24.0198 24.342 24.0198 24.0254 24.2151 23.8302C24.4103 23.6349 24.7269 23.6349 24.9222 23.8302L46.5948 45.5029L47.4465 43.5156L48.5 48.0805L43.935 47.0271L45.8739 46.1961L24.2151 24.5373Z"
            fill={handleFillColor()}
          />
          <circle
            cx="24.5677"
            cy="24.3971"
            r="2.9796"
            fill={handleFillColor()}
          />
        </Box>
      </Box>
    </Fade>
  )
}
