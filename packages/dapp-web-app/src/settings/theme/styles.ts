import { Theme } from '@chakra-ui/react'

const styles: Theme['styles'] = {
  global: ({ theme }) => ({
    body: {
      background: 'white',
      color: theme.colors.gray[700],
    },
  }),
}

export default styles
