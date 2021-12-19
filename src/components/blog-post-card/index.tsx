import Link from 'next/link';
import {
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  VStack,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import { BlogPost } from '@/types/blog-post';

const BlogPostCard = ({ title, description, slug, date }: BlogPost) => {
  const hoverBg = useColorModeValue('gray.100', 'gray.900');

  return (
    <LinkBox as='article'>
      <VStack
        w='full'
        p={{ base: 0, md: 4 }}
        rounded='md'
        alignItems='stretch'
        transitionProperty='all'
        transitionDuration='slow'
        transitionTimingFunction='ease-out'
        _hover={{
          bg: hoverBg,
          transform: 'scale(1.025, 1.025)',
        }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
        >
          <Link href={`/blog/${slug}`} passHref>
            <LinkOverlay>
              <Heading size='sm'>{title}</Heading>
            </LinkOverlay>
          </Link>
          <Text fontSize='sm' color='gray.500'>
            {date}
          </Text>
        </Stack>
        <Text fontSize='sm' color='gray.500'>
          {description}
        </Text>
      </VStack>
    </LinkBox>
  );
};

export default BlogPostCard;
