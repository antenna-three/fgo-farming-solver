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
  styles: {
    global: {
      a: {
        color: 'blue.500',
      },
      table: {
        borderRadius: 10,
        overflow: 'hidden',
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
