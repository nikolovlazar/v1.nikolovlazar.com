import {
  Stack,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Link,
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';

import {
  GITHUB_PROFILE,
  POLYWORK_PROFILE,
  TWITCH_CHANNEL,
  TWITTER_PROFILE,
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
  },
  {
    href: TWITCH_CHANNEL,
    label: 'Twitch',
    color: 'purple.500',
  },
];

const Hero = () => {
  return (
    <Stack
      alignItems='center'
      spacing={12}
      w='full'
      direction={{ base: 'column-reverse', md: 'row' }}
      as='section'
    >
      <VStack spacing={3} alignItems='flex-start' w='full'>
        <Stack
          spacing={3}
          w='full'
          direction={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          alignItems='center'
        >
          <Heading size='lg' as='h1'>
            Hi, I’m Lazar Nikolov.
          </Heading>
          <HeroPlay />
        </Stack>
        <Text lineHeight='175%' as='h2'>
          I’m a full-stack engineer, a designer, and a content creator. I work
          at <ExternalLink href='https://codechem.com'>CodeChem</ExternalLink>{' '}
          as a <strong>developer/designer</strong>, and I’m a{' '}
          <strong>core member</strong> at{' '}
          <ExternalLink href='https://chakra-ui.com'>Chakra UI</ExternalLink>,
          contributing as a <strong>Developer Advocate</strong>. I’m also an{' '}
          <ExternalLink href='https://egghead.io'>egghead.io</ExternalLink>{' '}
          <strong>instructor</strong>.
        </Text>
        <Stack spacing={3} direction={{ base: 'column', md: 'row' }}>
          {socialLinks.map(({ href, label, color }) => (
            <Button
              key={href}
              as={Link}
              variant='ghost'
              color={color}
              href={href}
              target='_blank'
              px={{ base: 0, md: 4 }}
              justifyContent={{ base: 'flex-start', md: 'center' }}
              rightIcon={<Icon as={FiArrowUpRight} />}
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
