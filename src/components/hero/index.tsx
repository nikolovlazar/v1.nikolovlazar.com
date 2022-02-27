import {
  Stack,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { age } from '@/utils/time';
import { useState, useEffect } from "react";

import {
  GITHUB_PROFILE,
  SPOTIFY_PROFILE,
  TWITTER_PROFILE
} from 'src/constants';
import { Link as LinkType } from '@/types/link';
import ExternalLink from '../external-link';
import HeroImage from '../hero-image';
import HeroPlay from '../hero-play';

type SocialLink = LinkType & { color?: string };

const socialLinks: SocialLink[] = [
  {
    href: TWITTER_PROFILE,
    label: 'Twitter',
    color: 'twitter',
  },
  {
    href: GITHUB_PROFILE,
    label: 'GitHub',
    color: 'github',
  },
  {
    href: SPOTIFY_PROFILE,
    label: 'Spotify',
    color: 'spotify',
  },
];

const Hero = () => {
  return (
    <Stack
      as='section'
      alignItems='center'
      direction={{ base: 'column-reverse', md: 'row' }}
      w='full'
      spacing={12}
    >
      <VStack alignItems='flex-start' w='full' spacing={3}>
        <Stack
          alignItems='center'
          justifyContent={{ base: 'center', md: 'flex-start' }}
          direction={{ base: 'column', md: 'row' }}
          w='full'
          spacing={3}
        >
          <Heading as='h1' size='lg'>
            Hi, I’m Nawrasse Dahman.
          </Heading>
          <HeroPlay />
        </Stack>
        <Text as='h2' lineHeight='175%'>
          I&apos;m <strong>( {age.toPrecision(5)} Years Old )</strong>, With{' '} <ExternalLink 
          href='https://www.16personalities.com/intj-personality#:~:text=An%20Architect%20(INTJ)%20is%20a,often%20a%20private%2C%20complex%20one.'>
          <strong>INTJ </strong>
          </ExternalLink> <span>&nbsp;</span>
          As My Personality Type, 
          Based In <strong>Tangier</strong> With Passion For Building Digital Services / Stuff I Wants
          Or Needs. I Knows A Lot Of <strong>Programming Languages</strong>, Which Makes Me An Expert At Doing
          My Thing. <strong>When Not Online</strong>, I Loves Hanging Out With My Family & Animals Currently,
          I&apos;m Focusing On My Passion For <strong>Movies & Tv Shows</strong> And Everything In Between.
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>
          {socialLinks.map(({ href, label, color }) => (
            <Button
              key={href}
              as={Link}
              justifyContent={{ base: 'flex-start', md: 'center' }}
              px={4}
              color={color}
              href={href}
              rightIcon={<Icon as={FiExternalLink} />}
              target='_blank'
              variant='ghost'
            >
              {label}
            </Button>
          ))}
        </Stack>
      </VStack>
      <HeroImage />
    </Stack>
  );
};

export default Hero;
