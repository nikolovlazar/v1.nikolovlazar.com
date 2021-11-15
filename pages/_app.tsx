import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import theme from '../src/theme';
import Layout from '../src/components/layout';

import '../style.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title='Lazar Nikolov - Developer, Designer, DevRel, Content Creator.'
        description='Full-stack Engineer, UI Designer, Course Creator.'
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
