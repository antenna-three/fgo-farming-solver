import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    item: {
      bronze: '#dd6b20',
      silver: '#a0aec0',
      gold: '#d69e2e',
      blue: '#3182ce',
      red: '#e53e3e',
    },
  },
  components: {
    Link: {
      baseStyle: {
        color: 'blue.500',
      },
    },
    Button: {
      baseStyle: {
        padding: 8,
      },
    },
  },
  styles: {
    global: {
      table: {
        thead: {
          th: {
            bg: 'gray.200',
          },
        },
        tbody: {
          th: {
            bg: 'gray.100',
          },
        },
      },
    },
  },
  fonts: {
    heading: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif',
    body: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif',
  },
})
