import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#f0f4ff',
      100: '#e0e9ff',
      200: '#c7d7fe',
      300: '#a5b8fc',
      400: '#8b93f8',
      500: '#667eea',
      600: '#5a67d8',
      700: '#4c51bf',
      800: '#434190',
      900: '#3c366b',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b46c1',
      900: '#764ba2',
    }
  },
  fonts: {
    heading: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    body: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
      },
      variants: {
        solid: {
          bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'xl',
          bg: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: 'none',
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            borderRadius: 'lg',
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px #667eea',
            },
          },
        },
      },
    },
  },
});

export default theme;
