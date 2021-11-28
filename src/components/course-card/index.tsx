import {
  VStack,
  HStack,
  Stack,
  AspectRatio,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { Course } from '@/types/course';
import ExternalLink from '../external-link';
import { FiArrowUpRight } from 'react-icons/fi';
import Image from '../image';

type Props = Course;

const CourseCard = ({
  title,
  description,
  url,
  live,
  image,
  progress,
}: Props) => {
  let courseDomain: string;
  if (url && url.length > 0) {
    courseDomain = new URL(url).host;
  }

  const progressTrackColor = mode('blackAlpha.100', 'whiteAlpha.200');

  return (
    <LinkBox as='article'>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        p={4}
        spacing={3}
        bg={mode('gray.100', 'gray.700')}
        rounded='md'
        alignItems='center'
        transitionProperty='transform'
        transitionDuration='slow'
        transitionTimingFunction='ease-out'
        _hover={{ transform: 'scale(1.025, 1.025)' }}
      >
        <AspectRatio ratio={1} w={{ base: 40, md: 20 }} flexShrink={0}>
          <>
            {image && <Image src={image} alt={title} layout='fill' />}
            {!live && progress && (
              <CircularProgress
                value={progress}
                color='purple.500'
                trackColor={progressTrackColor}
                size='80px'
              >
                <CircularProgressLabel>{progress}%</CircularProgressLabel>
              </CircularProgress>
            )}
          </>
        </AspectRatio>
        <VStack>
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
              <LinkOverlay as={ExternalLink} href={url}>
                <Text color='inherit' fontSize='sm'>
                  {courseDomain}
                </Text>
              </LinkOverlay>
            )}
            {!live && (
              <LinkOverlay href='/newsletter'>
                <HStack>
                  <Text color='purple.500' fontSize='sm'>
                    Get notified
                  </Text>
                  <Icon
                    as={FiArrowUpRight}
                    color={mode('gray.700', 'white')}
                    display='inline'
                  />
                </HStack>
              </LinkOverlay>
            )}
          </Stack>
          <Text fontSize='sm'>{description}</Text>
        </VStack>
      </Stack>
    </LinkBox>
  );
};

export default CourseCard;
