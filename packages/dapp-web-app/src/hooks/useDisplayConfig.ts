import { useMediaQuery } from '@chakra-ui/react'

export const useDisplayConfig = () => {
  const [isLargerThan1280, isDisplayingInBrowser] = useMediaQuery(
    ['(min-width: 1280px)', '(display-mode: browser)'],
    {
      ssr: true,
      fallback: true, // return false on the server, and re-evaluate on the client side
    },
  )
  return {
    isRegularScreen: isLargerThan1280,
    isBrowser: isDisplayingInBrowser,
    isMediumScreen: !isLargerThan1280,
  }
}
