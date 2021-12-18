import { Heading, VStack, List, ListItem } from '@chakra-ui/react';

import { BlogPost } from '@/types/blog-post';
import BlogPostCard from '../blog-post-card';

type Props = {
  posts: BlogPost[];
};

const BlogpostsSection = ({ posts }: Props) => {
  return (
    <VStack w='full' alignItems='flex-start' spacing={4} as='section'>
      <Heading size='md'>Recent blog posts.</Heading>
      <List spacing={12} w='full'>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <BlogPostCard {...post} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default BlogpostsSection;
