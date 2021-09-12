import { PropsWithChildren } from 'react';
import { VStack, Container, Box } from '@chakra-ui/react';

import Header from './header';
import Footer from './footer';

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <Container
      display='flex'
      maxW='container.md'
      minH={{ base: 'auto', md: '100vh' }}
      px={{ base: 4, md: 0 }}
    >
      <VStack flex={1} spacing={16} alignItems='stretch'>
        <Header />
        <Box flex={1}>{children}</Box>
        <Footer />
      </VStack>
    </Container>
  );
};

export default Layout;
