import {
  HStack,
  Heading,
  IconButton,
  Link,
  Tooltip,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { FiCommand } from 'react-icons/fi';

import { CmdPaletteContext } from 'src/providers/cmd-palette-provider';

const Header = () => {
  const { open: openCommandPalette } = useContext(CmdPaletteContext);

  return (
    <HStack
      as='nav'
      position='sticky'
      top={0}
      insetX={0}
      zIndex='popover'
      justifyContent='space-between'
      alignItems='center'
      w='full'
      py={3}
      bg={useColorModeValue('white', 'gray.800')}
      transitionProperty='background'
      transitionDuration='normal'
      mb={16}
    >
      <Container
        display='flex'
        maxW='container.md'
        alignItems='center'
        justifyContent='space-between'
        px={{ base: 4, lg: 0 }}
      >
        <NextLink href='/' passHref>
          <Link>
            <Heading size='sm'>Lazar.</Heading>
          </Link>
        </NextLink>
        <HStack alignItems='center' spacing={{ base: 0, md: 2 }}>
          <Tooltip label='Command Palette (Cmd + K)'>
            <IconButton
              aria-label='toggle theme'
              icon={<FiCommand />}
              variant='ghost'
              size='sm'
              onClick={openCommandPalette}
            />
          </Tooltip>
        </HStack>
      </Container>
    </HStack>
  );
};

export default Header;
