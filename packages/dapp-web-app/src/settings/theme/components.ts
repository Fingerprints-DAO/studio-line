import { Checkbox, defineStyle, defineStyleConfig } from '@chakra-ui/react'

const customColor = (colorScheme: any) => {
  if (colorScheme === 'black') {
    return 'gray.50'
  }

  if (colorScheme === 'white') {
    return 'gray.900'
  }

  return `${colorScheme}.500`
}

const components = {
  // Container: {
  //   baseStyle: {
  //     maxWidth: {
  //       base: '100%',
  //       sm: '100%',
  //       lg: '1440px',
  //     },
  //     paddingLeft: '32px',
  //     paddingRight: '32px',
  //   },
  // },
  Input: defineStyleConfig({
    baseStyle: {
      borderRadius: 0,
      rounded: 'none',
      borderColor: 'gray.900',
    },
  }),
  Button: defineStyleConfig({
    sizes: {
      md: {
        // fontWeight: 'bold',
        height: 6,
        fontSize: 12,
        px: 4,
        py: 0,
      },
    },
    variants: {
      solid: defineStyle(({ colorScheme }) => ({
        bgColor: `${colorScheme}.900`,
        color: 'gray.50',
        borderWidth: 2,
        borderColor: `${colorScheme}.900`,
        _hover: {
          bgColor: `gray.50`,
          color: `${colorScheme}.900`,
          borderWidth: '2px',
          borderColor: `${colorScheme}.900`,
          borderStyle: 'solid',
          _disabled: {
            bgColor: `${colorScheme}.900`,
            color: 'gray.50',
            borderWidth: '2px',
            borderColor: `${colorScheme}.900`,
            borderStyle: 'solid',
          },
        },
        _active: {
          background: ``,
        },
      })),
      outline: defineStyle(({ colorScheme }) => ({
        borderWidth: 2,
        borderColor: `${colorScheme}.900`,
        rounded: 'none',
      })),
    },
    baseStyle: {
      borderRadius: 0,
      _disabled: {
        transition: 'none',
      },
    },
  }),
  Link: defineStyleConfig({
    baseStyle: {
      color: 'links.500',
      _hover: {
        color: 'cyan.400',
        textDecoration: 'underline',
      },
    },
  }),
  Checkbox: defineStyleConfig({
    baseStyle: {
      control: {
        rounde: 'none',
        borderRadius: 0,
      },
    },
    // variants: {
    //   solid: defineStyle(() => ({
    //     control: {
    //       rounde: 'none',
    //       borderRadius: 0,
    //     },
    //   })),
    // },
  }),
  // Input: {
  //   sizes: {
  //     lg: {
  //       field: {
  //         borderRadius: '8px',
  //       },
  //     },
  //   },
  //   variants: {
  //     outline: defineStyle(({ colorScheme = 'gray' }) => ({
  //       field: {
  //         background: `${colorScheme}.50`,
  //         borderColor: `${colorScheme}.100`,
  //         color: `${colorScheme}.900`,
  //         borderWidth: 2,
  //         _placeholder: { color: 'gray.400' },
  //       },
  //     })),
  //   },
  // },
}

export default components
