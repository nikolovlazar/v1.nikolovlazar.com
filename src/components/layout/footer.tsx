import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { chakra, Stack, VStack, Divider, Link, Text } from '@chakra-ui/react';

import {
  TWITTER_PROFILE,
  GITHUB_PROFILE,
  YOUTUBE_CHANNEL,
  POLYWORK_PROFILE,
  TWITCH_CHANNEL,
  NEWSLETTER_URL,
} from '../../constants';
import { Link as LinkType } from '@/types/link';

const firstGroup: LinkType[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: '/colophon',
    label: 'Colophon',
  },
  {
    href: '/talks',
    label: 'Talks',
  },
  {
    href: 'https://plausible.io/nikolovlazar.com',
    label: 'Analytics',
  },
];

const secondGroup = [
  {
    href: TWITTER_PROFILE,
    label: 'Twitter',
  },
  {
    href: GITHUB_PROFILE,
    label: 'GitHub',
  },
  {
    href: YOUTUBE_CHANNEL,
    label: 'YouTube',
  },
  {
    href: POLYWORK_PROFILE,
    label: 'Polywork',
  },
  {
    href: TWITCH_CHANNEL,
    label: 'Twitch',
  },
];

const thirdGroup = [
  {
    href: '/uses',
    label: 'Uses',
  },
  {
    href: '/gear',
    label: 'Gear',
  },
  {
    href: '/bookmarks',
    label: 'Bookmarks',
  },
  {
    href: '/books',
    label: 'Books',
  },
  {
    href: NEWSLETTER_URL,
    label: 'Newsletter',
  },
];

const Footer = () => {
  const { pathname } = useRouter();

  return (
    <VStack pb={8} spacing={8} as='footer' alignItems='flex-start'>
      <Divider />
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        w='full'
        spacing={8}
      >
        <VStack alignItems='flex-start'>
          {firstGroup.map(({ href, label }) => (
            <NextLink key={href} href={href} passHref>
              <Link
                isExternal={href.startsWith('http')}
                color={pathname === href ? 'purple.500' : 'gray.500'}
              >
                {label}
              </Link>
            </NextLink>
          ))}
        </VStack>
        <VStack alignItems='flex-start'>
          {secondGroup.map(({ href, label }) => (
            <NextLink key={href} href={href} passHref>
              <Link
                isExternal={href.startsWith('http')}
                target='_blank'
                color='gray.500'
              >
                {label}
              </Link>
            </NextLink>
          ))}
        </VStack>
        <VStack alignItems='flex-start'>
          {thirdGroup.map(({ href, label }) => (
            <NextLink key={href} href={href} passHref>
              <Link
                isExternal={href.startsWith('http')}
                color={pathname === href ? 'purple.500' : 'gray.500'}
              >
                {label}
              </Link>
            </NextLink>
          ))}
        </VStack>
      </Stack>
      <Text color='gray.500'>
        ©{' '}
        <chakra.span as='time' color='purple.500'>
          {new Date().getFullYear()}
        </chakra.span>{' '}
        Lazar Nikolov
      </Text>
    </VStack>
  );
};

export default Footer;
