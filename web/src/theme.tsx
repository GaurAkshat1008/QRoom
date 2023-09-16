import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const config:ThemeConfig = {
  initialColorMode: 'light',
  // useSystemColorMode: true,
}

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  config, 
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
})

export default theme
