import { theme } from '@chakra-ui/react'

const colors = {
  ...theme.colors,
  secondary: {
    100: '#ffeef2',
    500: '#F76B8B',
    900: '#F76B8B',
  },
  links: {
    500: '#6ECCDD',
  },
  red: {
    100: '#d89595',
    200: '#d89595', // Lighter red variant
    500: '#e50000', // Primary red color
    600: '#e50000',
  },
  cyan: {
    100: '#8db3ff',
    200: '#8db3ff', // Lighter cyan variant
    500: '#003dff', // Primary cyan color
    600: '#003dff',
  },
  purple: {
    100: '#ba73ff',
    200: '#ba73ff',
    500: '#8f00ff',
    600: '#8f00ff',
  },
}

export default colors

// Blue
// #003dff
// light blue: #5787ff

// Red
// #e50000
// lighter red: #e06868

// Purple
// #8f00ff
// lighter purple: #d68bd6
