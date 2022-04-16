import { PropsWithChildren } from 'react';
import { VStack, Container } from '@chakra-ui/react';

import Header from './header';
import Footer from './footer';

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Container
        display="flex"
        maxW="container.md"
        minH={{ base: 'auto', md: '100vh' }}
        px={{ base: 4, lg: 0 }}
        centerContent
      >
        <VStack alignItems="stretch" flex={1} w="full" spacing={16}>
          <VStack as="main" flex={1} w="full" spacing={16}>
            {children}
          </VStack>
          <Footer />
        </VStack>
      </Container>
    </>
  );
};

export default Layout;
