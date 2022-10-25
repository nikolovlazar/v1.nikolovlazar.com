import { extendTheme, theme as base, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const purpleRing = {
  _focus: {
    ringColor: 'purple.300',
    ring: 3,
    _dark: {
      ringColor: 'purple.600',
    },
  },
};

const inputBorder = () => ({
  _focus: {
    borderColor: 'purple.300',
    _dark: {
      borderColor: 'purple.600',
    },
  },
});

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        fontFeatureSettings: '"ss02"',
      },
    },
  },
  sizes: {
    18: '4.5rem',
  },
  components: {
    Heading: {
      baseStyle: {
        color: 'gray.700',
        letterSpacing: '1px',

        _dark: {
          color: 'white',
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'gray.700',
        _dark: {
          color: 'white',
        },
      },
    },
    Link: {
      baseStyle: {
        ...purpleRing,
      },
    },
    Button: {
      baseStyle: {
        ...purpleRing,
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            ...inputBorder,
          },
        },
      },
    },
    Textarea: {
      variants: {
        filled: {
          ...inputBorder,
        },
      },
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
      letterSpacing: '1px',
    },
    h2: {
      fontSize: 'xl',
      letterSpacing: '0.8px',
    },
    h3: {
      fontSize: 'md',
      letterSpacing: '0.6px',
    },
    h4: {
      fontSize: 'xs',
      letterSpacing: '0.5px',
    },
  },
});

export default theme;
