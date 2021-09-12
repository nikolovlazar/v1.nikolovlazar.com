import {
  VStack,
  HStack,
  Stack,
  Heading,
  IconButton,
  Icon,
  Text,
  Button,
  Link,
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiPlay, HiPause } from 'react-icons/hi';

import ExternalLink from '@/components/external-link';
import { Link as LinkType } from '@/types/link';
import {
  GITHUB_PROFILE,
  POLYWORK_PROFILE,
  TWITTER_PROFILE,
} from 'src/constants';
import HeroImage from '@/components/hero-image';
import HeroPlay from '@/components/hero-play';

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
    href: POLYWORK_PROFILE,
    label: 'Polywork',
    color: 'purple.600',
  },
];

const IndexPage = () => (
  <VStack spacing={20}>
    <Stack
      alignItems='center'
      spacing={12}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <VStack spacing={3} alignItems='flex-start'>
        <HStack spacing={3}>
          <Heading size='lg'>Hi, I’m Lazar Nikolov.</Heading>
          <HeroPlay />
        </HStack>
        <Text lineHeight='175%'>
          I’m a full-stack engineer, a designer, and a content creator. I work
          at <ExternalLink href='https://codechem.com'>CodeChem</ExternalLink>{' '}
          as a <strong>developer/designer</strong>, and I’m a{' '}
          <strong>core member</strong> at{' '}
          <ExternalLink href='https://chakra-ui.com'>Chakra UI</ExternalLink>,
          contributing as a <strong>Developer Advocate</strong>. I’m also an{' '}
          <ExternalLink href='https://egghead.io'>egghead.io</ExternalLink>{' '}
          <strong>instructor</strong>.
        </Text>
        <HStack spacing={3}>
          {socialLinks.map(({ href, label, color }) => (
            <Button
              key={href}
              as={Link}
              variant='ghost'
              color={color}
              href={href}
              target='_blank'
              rightIcon={<Icon as={FiArrowUpRight} />}
            >
              {label}
            </Button>
          ))}
        </HStack>
      </VStack>
      <HeroImage />
    </Stack>
  </VStack>
);

export default IndexPage;
