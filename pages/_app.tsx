import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import "cal-sans";

import theme from "../src/theme";
import Layout from "@/components/layout";
import CmdPalette from "@/components/cmd-palette";
import CmdPaletteProvider from "src/providers/cmd-palette-provider";

import "../style.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title="Lazar Nikolov - Developer, designer, course creator."
        description="Full-stack Engineer, UI Designer, and Open Source Advocate."
        twitter={{
          cardType: "summary_large_image",
          handle: "@NikolovLazar",
        }}
        openGraph={{
          url: "https://nikolovlazar.com",
          title: "Lazar Nikolov - Developer, designer, course creator.",
          description:
            "Full-stack Engineer, UI Designer, and Open Source Advocate.",
          locale: "en_US",
          images: [
            {
              url: "https://nikolovlazar.com/assets/images/social.png",
              width: 1200,
              height: 630,
              alt: "Lazar Nikolov",
              type: "image/png",
            },
          ],
        }}
      />
      <CmdPaletteProvider>
        <Layout>
          <CmdPalette />
          <Component {...pageProps} />
        </Layout>
      </CmdPaletteProvider>
    </ChakraProvider>
  );
};

export default App;
