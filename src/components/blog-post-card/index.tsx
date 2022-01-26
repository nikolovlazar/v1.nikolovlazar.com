import Link from 'next/link';
import {
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  VStack,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { format } from 'timeago.js';

import { BlogPost } from '@/types/blog-post';

const BlogPostCard = ({
  title,
  description,
  slug,
  date,
  readingTime,
}: BlogPost) => {
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <LinkBox as="article">
      <VStack
        w="full"
        p={{ base: 0, md: 4 }}
        rounded="md"
        alignItems="stretch"
        transitionProperty="all"
        transitionDuration="slow"
        transitionTimingFunction="ease-out"
        _hover={{
          bg: hoverBg,
          transform: 'scale(1.025, 1.025)',
        }}
      >
        <VStack alignItems="flex-start">
          <Link href={`/blog/${slug}`} passHref>
            <LinkOverlay>
              <Heading size="md">{title}</Heading>
            </LinkOverlay>
          </Link>
          <HStack
            divider={
              <Text color="gray.500" mx={2}>
                •
              </Text>
            }
          >
            <Text color="gray.500" fontSize="sm">
              {format(date)}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {readingTime}
            </Text>
          </HStack>
        </VStack>
        <Text fontSize="sm" color="gray.500">
          {description}
        </Text>
      </VStack>
    </LinkBox>
  );
};

export default BlogPostCard;
