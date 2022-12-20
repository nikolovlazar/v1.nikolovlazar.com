import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { chakra, Stack, VStack, Divider, Link, Text } from '@chakra-ui/react';

import {
  TWITTER_PROFILE,
  GITHUB_PROFILE,
  YOUTUBE_CHANNEL,
  POLYWORK_PROFILE,
  MASTODON_PROFILE,
} from '../../constants';
import { Link as LinkType } from '@/types/link';
import VercelCallout from '../vercel-callout';

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
];

const Footer = () => {
  const { pathname } = useRouter();

  return (
    <VStack as='footer' alignItems='flex-start' pb={8} spacing={8}>
      <Divider />
      <Stack
        justifyContent='space-between'
        direction={{ base: 'column', md: 'row' }}
        w='full'
        spacing={{ base: 2, md: 8 }}
      >
        <VStack alignItems='flex-start'>
          {firstGroup.map(({ href, label }) => (
            <Link
              key={href}
              as={NextLink}
              color={pathname === href ? 'purple.500' : 'gray.500'}
              href={href}
              isExternal={href.startsWith('http')}
            >
              {label}
            </Link>
          ))}
        </VStack>
        <VStack alignItems='flex-start'>
          {secondGroup.map(({ href, label }) => (
            <Link
              key={href}
              as={NextLink}
              color='gray.500'
              href={href}
              isExternal={href.startsWith('http')}
              target='_blank'
            >
              {label}
            </Link>
          ))}
          <Link
            as={NextLink}
            color='gray.500'
            href={MASTODON_PROFILE}
            rel='me'
            isExternal
            target='_blank'
          >
            Mastodon
          </Link>
        </VStack>
        <VStack alignItems='flex-start'>
          {thirdGroup.map(({ href, label }) => (
            <Link
              key={href}
              as={NextLink}
              color={pathname === href ? 'purple.500' : 'gray.500'}
              href={href}
              isExternal={href.startsWith('http')}
            >
              {label}
            </Link>
          ))}
        </VStack>
      </Stack>
      <Stack
        alignItems='center'
        justifyContent={{ base: 'center', md: 'space-between' }}
        direction={{ base: 'column', md: 'row' }}
        gridRowGap={4}
        w='full'
        spacing={0}
      >
        <Text color='gray.500' fontSize='sm'>
          ©{' '}
          <chakra.span as='time' color='purple.500'>
            {new Date().getFullYear()}
          </chakra.span>{' '}
          Lazar Nikolov
        </Text>
        <VercelCallout />
      </Stack>
    </VStack>
  );
};

export default Footer;
