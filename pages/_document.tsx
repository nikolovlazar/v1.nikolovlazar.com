import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import theme from '../src/theme';

// extending classes in Javascript?! The official suggestion from the Next.js team:
// https://github.com/zeit/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
class Doc extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            defer
            data-domain='nikolovlazar.com'
            src='https://plausible.io/js/plausible.js'
          />
          ;
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Doc;
