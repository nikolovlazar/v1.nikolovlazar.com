import { extendTheme, theme as base, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  sizes: {
    18: '4.5rem',
  },
  components: {
    Heading: {
      baseStyle: (props) => ({
        color: mode('gray.700', 'white')(props),
        letterSpacing: '1px',
      }),
    },
    Text: {
      baseStyle: (props) => ({
        color: mode('gray.700', 'white')(props),
      }),
    },
  },
  colors: {
    twitter: '#1EA1F1',
  },
  fonts: {
    heading: `Cal Sans, ${base.fonts.heading}`,
    body: `Inter, ${base.fonts.body}`,
  },
  mdx: {
    h1: {
      fontSize: '3xl',
    },
    h2: {
      fontSize: 'xl',
    },
    h3: {
      fontSize: 'md',
    },
    h4: {
      fontSize: 'xs',
    },
  },
});

export default theme;
