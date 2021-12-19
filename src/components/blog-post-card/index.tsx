import Link from 'next/link';
import {
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  VStack,
  Stack,
} from '@chakra-ui/react';

import { BlogPost } from '@/types/blog-post';

const BlogPostCard = ({ title, description, slug, date }: BlogPost) => (
  <LinkBox as='article'>
    <VStack w='full' alignItems='stretch'>
      <Stack direction={{ base: 'column', md: 'row' }} justify='space-between'>
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

export default BlogPostCard;
