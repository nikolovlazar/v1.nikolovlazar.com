import { AppProps } from 'next/app';
import { Center, ChakraProvider, chakra } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import 'cal-sans';

import theme from '../src/theme';
import Layout from '@/components/layout';
import CmdPalette from '@/components/cmd-palette';
import CmdPaletteProvider from 'src/providers/cmd-palette-provider';

import '../style.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title='Lazar Nikolov - Developer, designer, course creator.'
        description='Full-stack Engineer, UI Designer, and Open Source Advocate.'
        twitter={{
          cardType: 'summary_large_image',
          handle: '@NikolovLazar',
        }}
        openGraph={{
          url: 'https://v1.nikolovlazar.com',
          title: 'Lazar Nikolov - Developer, designer, course creator.',
          description:
            'Full-stack Engineer, UI Designer, and Open Source Advocate.',
          locale: 'en_US',
          images: [
            {
              url: 'https://v1.nikolovlazar.com/assets/images/social.png',
              width: 1200,
              height: 630,
              alt: 'Lazar Nikolov',
              type: 'image/png',
            },
          ],
        }}
      />
      <CmdPaletteProvider>
        <chakra.a
          href='https://nikolovlazar.com'
          __css={{
            height: '60px',
            position: 'fixed',
            bottom: 0,
            insetX: 0,
            zIndex: 'tooltip',
            backgroundImage:
              'repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '2xl',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textShadow: '0 0 10px #000',
          }}
        >
          {' '}
          NOT MAINTAINED ANYMORE. Please visit my new website at:
          nikolovlazar.com
        </chakra.a>
        <Layout>
          <CmdPalette />
          <Component {...pageProps} />
        </Layout>
      </CmdPaletteProvider>
    </ChakraProvider>
  );
};

export default App;
