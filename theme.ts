import { extendTheme } from '@chakra-ui/react'
import { Noto_Sans_JP } from '@next/font/google'

const font = Noto_Sans_JP({
  weight: ['400', '700'],
  preload: false,
})

const fontFamily = `${font.style.fontFamily}, "Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif`

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
      variants: {
        unstyled: {
          color: 'default',
          _hover: {
            textDecoration: 'none',
          },
        },
      },
    },
  },
  styles: {
    global: {
      table: {
        borderRadius: 'xl',
        overflow: 'hidden',
        thead: {
          th: {
            bg: 'blue.200',
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
    heading: fontFamily,
    body: fontFamily,
  },
})
