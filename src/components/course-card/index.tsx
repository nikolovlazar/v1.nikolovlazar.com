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
  useBreakpointValue,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { Course } from '@/types/course';
import ExternalLink from '../external-link';
import { FiArrowUpRight } from 'react-icons/fi';
import Image from '../image';

type Props = Course;

const CourseCard = ({
  id,
  title,
  description,
  url,
  live,
  image,
  progress,
  expectedLaunch,
}: Props) => {
  let courseDomain: string;
  if (url && url.length > 0) {
    courseDomain = new URL(url).host;
  }

  const progressTrackColor = mode('blackAlpha.100', 'whiteAlpha.200');
  const progressSize = useBreakpointValue({ base: '120px', md: '80px' });

  return (
    <LinkBox as='article'>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        p={6}
        spacing={{ base: 8, md: 5 }}
        bg={mode('gray.100', 'gray.700')}
        rounded='md'
        alignItems='center'
        transitionProperty='transform'
        transitionDuration='slow'
        transitionTimingFunction='ease-out'
        _hover={{ transform: 'scale(1.025, 1.025)' }}
      >
        <AspectRatio ratio={1} w={{ base: 32, md: 20 }} flexShrink={0}>
          <>
            {image && <Image src={image} alt={title} layout='fill' />}
            {!live && progress && (
              <CircularProgress
                value={progress}
                color='purple.500'
                trackColor={progressTrackColor}
                size={progressSize}
              >
                <CircularProgressLabel>{progress}%</CircularProgressLabel>
              </CircularProgress>
            )}
          </>
        </AspectRatio>
        <VStack spacing={3}>
          <VStack w='full' spacing={1}>
            <Stack
              w='full'
              direction={{ base: 'column', md: 'row' }}
              justifyContent={{ base: 'flex-start', md: 'space-between' }}
              alignItems={{ base: 'flex-start', md: 'center' }}
            >
              <Heading size='md' weight='semibold'>
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
                <LinkOverlay href={`/course/${id}/subscribe`}>
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
            {expectedLaunch && (
              <Text fontSize='sm' alignSelf='flex-start' color='gray.500'>
                Expected launch: {expectedLaunch}
              </Text>
            )}
          </VStack>
          <Text fontSize='sm'>{description}</Text>
        </VStack>
      </Stack>
    </LinkBox>
  );
};

export default CourseCard;
