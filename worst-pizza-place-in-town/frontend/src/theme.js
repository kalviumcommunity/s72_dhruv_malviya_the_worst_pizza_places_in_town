import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ 
  config,
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
  colors: {
    brand: {
      50: '#ffe5e5',
      100: '#fbb8b8',
      200: '#f58a8a',
      300: '#f05c5c',
      400: '#eb2e2e',
      500: '#d21515',
      600: '#a40e0e',
      700: '#760808',
      800: '#470303',
      900: '#1d0000',
    },
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          bg: 'gray.800',
          color: 'white',
        },
      },
    },
    Button: {
      variants: {
        solid: {
          bg: 'red.500',
          color: 'white',
          _hover: {
            bg: 'red.600',
          },
        },
      },
    },
  },
});

export default theme; 