import {
  HStack,
  Heading,
  IconButton,
  Link,
  Tooltip,
  Container,
  chakra,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FiCommand } from 'react-icons/fi';

import { CmdPaletteContext } from 'src/providers/cmd-palette-provider';

const Header = () => {
  const { open: openCommandPalette } = useContext(CmdPaletteContext);
  const [shortcut, setShortcut] = useState<string>();

  useEffect(() => {
    setShortcut(
      navigator.userAgent.indexOf('Mac OS X') != -1 ? 'Cmd + K' : 'Ctrl + K'
    );
  }, [setShortcut]);

  return (
    <HStack
      as='nav'
      position='sticky'
      zIndex='popover'
      top={0}
      alignItems='center'
      justifyContent='space-between'
      w='full'
      mb={16}
      py={3}
      bg='white'
      _dark={{
        bg: 'gray.800',
      }}
      insetX={0}
      transitionDuration='normal'
      transitionProperty='background'
    >
      <Container
        alignItems='center'
        justifyContent='space-between'
        display='flex'
        maxW='container.md'
        px={{ base: 4, lg: 0 }}
      >
        <Heading size='sm'>
          <Link as={NextLink} href='/'>
            <chakra.svg
              width={10}
              height={10}
              viewBox='0 0 640 577'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M309.493 90.3561L90.4279 486.459H549.572L309.493 90.3561Z'
                fill='#805AD5'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M307.698 0.0178706C339.963 -0.622139 370.124 15.9673 386.841 43.5492L626.921 439.652C643.832 467.554 644.38 502.397 628.354 530.815C612.328 559.234 582.217 576.815 549.572 576.815H90.4279C58.4239 576.815 28.8036 559.912 12.5424 532.369C-3.71875 504.826 -4.1985 470.746 11.2809 442.757L230.346 46.6534C245.954 18.4304 275.433 0.65788 307.698 0.0178706ZM313.075 270.691L243.716 396.103H389.088L313.075 270.691Z'
                fill='#805AD5'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M318.481 58.6209C333.477 63.3871 343.038 78.1035 341.328 93.7885L315.997 326.19L370.419 227.625C379.254 211.625 399.346 205.838 415.298 214.698C431.249 223.559 437.019 243.712 428.185 259.712L294.215 502.348C286.597 516.146 270.333 522.64 255.345 517.869C240.356 513.097 230.803 498.385 232.512 482.706L257.8 250.693L118.99 502.64C110.17 518.648 90.083 524.454 74.1234 515.608C58.1637 506.762 52.3755 486.614 61.195 470.606L279.61 74.1724C287.219 60.3624 303.485 53.8546 318.481 58.6209ZM480.635 323.565C496.605 332.392 502.417 352.533 493.616 368.551L446.94 453.507H547.875C566.11 453.507 580.892 468.334 580.892 486.623C580.892 504.912 566.11 519.739 547.875 519.739H391.048C379.37 519.739 368.561 513.551 362.621 503.466C356.682 493.381 356.496 480.899 362.132 470.64L435.784 336.585C444.584 320.567 464.665 314.738 480.635 323.565Z'
                fill='white'
              />
            </chakra.svg>
          </Link>
        </Heading>
        <HStack alignItems='center' spacing={{ base: 0, md: 2 }}>
          <Tooltip label={`Command Palette (${shortcut})`}>
            <IconButton
              aria-label='toggle theme'
              icon={<FiCommand />}
              onClick={openCommandPalette}
              size='sm'
              variant='ghost'
            />
          </Tooltip>
        </HStack>
      </Container>
    </HStack>
  );
};

export default Header;
