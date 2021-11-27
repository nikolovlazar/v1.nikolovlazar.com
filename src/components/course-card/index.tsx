import {
  VStack,
  Stack,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { Course } from '@/types/course';
import ExternalLink from '../external-link';
import { NEWSLETTER_URL } from 'src/constants';

type Props = Course;

const CourseCard = ({ title, description, url, live }: Props) => {
  let courseDomain: string;
  if (url && url.length > 0) {
    courseDomain = new URL(url).host;
  }
  return (
    <LinkBox as='article'>
      <VStack
        p={4}
        spacing={3}
        bg={mode('gray.100', 'gray.700')}
        rounded='md'
        alignItems='flex-start'
        transitionProperty='transform'
        transitionDuration='slow'
        transitionTimingFunction='ease-out'
        _hover={{ transform: 'scale(1.025, 1.025)' }}
      >
        <Stack
          w='full'
          direction={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'flex-start', md: 'space-between' }}
          alignItems={{ base: 'flex-start', md: 'center' }}
        >
          <Heading size='sm' weight='semibold'>
            {title}
          </Heading>
          {courseDomain && (
            <LinkOverlay as={ExternalLink} href={url} target='_blank'>
              <Text color='inherit' fontSize='sm'>
                {courseDomain}
              </Text>
            </LinkOverlay>
          )}
          {!live && (
            <LinkOverlay
              as={ExternalLink}
              href={NEWSLETTER_URL}
              target='_blank'
            >
              <Text color='inherit' fontSize='sm'>
                Get notified
              </Text>
            </LinkOverlay>
          )}
        </Stack>
        <Text fontSize='sm'>{description}</Text>
      </VStack>
    </LinkBox>
  );
};

export default CourseCard;
