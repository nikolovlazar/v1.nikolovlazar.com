import Link from 'next/link';
import {
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';

import { BlogPost } from '@/types/blog-post';

const BlogPostCard = ({ title, description, slug, date }: BlogPost) => (
  <LinkBox as='article'>
    <VStack w='full' alignItems='stretch'>
      <HStack justify='space-between'>
        <Link href={`/blog/${slug}`} passHref>
          <LinkOverlay>
            <Heading size='sm'>{title}</Heading>
          </LinkOverlay>
        </Link>
        <Text fontSize='sm' color='gray.500'>
          {date}
        </Text>
      </HStack>
      <Text fontSize='sm' color='gray.500'>
        {description}
      </Text>
    </VStack>
  </LinkBox>
);

export default BlogPostCard;
