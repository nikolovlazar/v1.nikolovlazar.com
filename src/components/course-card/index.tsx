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

type Props = Course;

const CourseCard = ({ title, description, url }: Props) => {
  const courseDomain = url.split('/')[2];
  return (
    <LinkBox as='article'>
      <VStack
        p={4}
        spacing={3}
        bg={mode('gray.100', 'gray.700')}
        rounded='md'
        alignItems='flex-start'
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
          <LinkOverlay as={ExternalLink} href={url} target='_blank'>
            <Text color='inherit' fontSize='sm'>
              {courseDomain}
            </Text>
          </LinkOverlay>
        </Stack>
        <Text fontSize='sm'>{description}</Text>
      </VStack>
    </LinkBox>
  );
};

export default CourseCard;
