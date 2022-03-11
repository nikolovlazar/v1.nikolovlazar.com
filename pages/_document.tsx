import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';

import theme from '../src/theme';

const Doc = () => (
  <Html lang="en">
    <Head>
      <script
        defer
        data-domain="nikolovlazar.com"
        src="https://plausible.io/js/plausible.js"
      />
      <meta name="monetization" content="$ilp.uphold.com/nZ4DF39aHkrm" />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥐</text></svg>"
      />
    </Head>
    <body>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Doc;
