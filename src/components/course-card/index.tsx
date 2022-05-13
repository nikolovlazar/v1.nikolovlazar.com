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
    <LinkBox as="article">
      <Stack
        alignItems="center"
        direction={{ base: 'column', md: 'row' }}
        p={6}
        bg={mode('gray.100', 'gray.700')}
        _hover={{ transform: 'scale(1.025, 1.025)' }}
        rounded="md"
        spacing={{ base: 8, md: 5 }}
        transitionDuration="slow"
        transitionProperty="transform"
        transitionTimingFunction="ease-out"
      >
        <AspectRatio flexShrink={0} w={{ base: 32, md: 20 }} ratio={1}>
          <>
            {image && <Image src={image} alt={title} layout="fill" />}
            {!live && progress && (
              <CircularProgress
                color="purple.500"
                size={progressSize}
                trackColor={progressTrackColor}
                value={progress}
              >
                <CircularProgressLabel fontSize="lg">
                  {progress}%
                </CircularProgressLabel>
              </CircularProgress>
            )}
          </>
        </AspectRatio>
        <VStack spacing={3}>
          <VStack w="full" spacing={1}>
            <Stack
              alignItems={{ base: 'flex-start', md: 'center' }}
              justifyContent={{ base: 'flex-start', md: 'space-between' }}
              direction={{ base: 'column', md: 'row' }}
              w="full"
            >
              <Heading fontWeight="semibold" size="md">
                {title}
              </Heading>
              {courseDomain && (
                <LinkOverlay as={ExternalLink} href={url}>
                  <Text color="inherit" fontSize="sm">
                    {courseDomain}
                  </Text>
                </LinkOverlay>
              )}
              {!live && (
                <LinkOverlay href={`/course/${id}/subscribe`}>
                  <HStack>
                    <Text color="purple.500" fontSize="sm">
                      Get notified
                    </Text>
                    <Icon
                      as={FiArrowUpRight}
                      display="inline"
                      color={mode('gray.700', 'white')}
                    />
                  </HStack>
                </LinkOverlay>
              )}
            </Stack>
            {expectedLaunch && (
              <Text alignSelf="flex-start" color="gray.500" fontSize="sm">
                Expected launch: {expectedLaunch}
              </Text>
            )}
          </VStack>
          <Text fontSize="sm">{description}</Text>
        </VStack>
      </Stack>
    </LinkBox>
  );
};

export default CourseCard;
