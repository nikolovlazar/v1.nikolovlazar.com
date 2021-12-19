import { Heading, VStack, List, ListItem, Icon, Box } from '@chakra-ui/react';
import { CgArrowRight } from 'react-icons/cg';

import { BlogPost } from '@/types/blog-post';
import BlogPostCard from '../blog-post-card';
import Link from '../link';

type Props = {
  posts: BlogPost[];
};

const BlogpostsSection = ({ posts }: Props) => {
  return (
    <VStack w='full' alignItems='flex-start' spacing={4} as='section'>
      <Heading size='md'>Recent blog posts.</Heading>
      <List spacing={{ base: 8, md: 2 }} w='full'>
        {posts.map((post) => (
          <ListItem key={post.slug}>
            <BlogPostCard {...post} />
          </ListItem>
        ))}
      </List>
      <Box>
        <Link href='/blog' ml={{ base: 0, md: 4 }} role='group'>
          Read all articles
          <Icon
            as={CgArrowRight}
            ml={1}
            _groupHover={{ ml: 3 }}
            transitionProperty='margin-left'
            transitionDuration='slow'
            transitionTimingFunction='ease-out'
            color='purple.500'
          />
        </Link>
      </Box>
    </VStack>
  );
};

export default BlogpostsSection;
