import { Theme } from '@chakra-ui/react'

const styles: Theme['styles'] = {
  global: ({ theme }) => ({
    body: {
      background: 'white',
      color: theme.colors.gray[500],
    },
    h1: {
      color: theme.colors.gray[700],
    },
    h2: {
      color: theme.colors.gray[700],
    },
    h3: {
      color: theme.colors.gray[700],
    },
    h4: {
      color: theme.colors.gray[700],
    },
    h5: {
      color: theme.colors.gray[700],
    },
    h6: {
      color: theme.colors.gray[700],
    },
  }),
}

export default styles
