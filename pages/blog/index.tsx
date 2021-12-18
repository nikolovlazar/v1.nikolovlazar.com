import { ChangeEventHandler, useState } from 'react';
import { GetStaticProps } from 'next';
import {
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Icon,
  List,
  ListItem,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { HiOutlineSearch } from 'react-icons/hi';

import { BlogPost } from '@/types/blog-post';
import { getBlogPosts } from '@/utils/get-blog-posts';
import BlogPostCard from '@/components/blog-post-card';

type Props = {
  posts: BlogPost[];
};

const Blog = ({ posts }: Props) => {
  const [displayPosts, setDisplayPosts] = useState<BlogPost[]>(posts);

  const onSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    const query = event.currentTarget.value;

    const filteredPosts = posts.filter((post) => post.title.includes(query));

    setDisplayPosts(filteredPosts);
  };

  return (
    <>
      <NextSeo title='Blog - Lazar Nikolov' />
      <VStack spacing={3} alignItems='flex-start' w='full' as='section'>
        <Heading size='md'>Blog.</Heading>
        <Text fontSize='md'>
          Web development, with a focus on the React ecosystem. I’ve written a
          total of {posts.length} article{posts.length > 1 && 's'}.
        </Text>
        {posts.length > 1 && (
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <Icon as={HiOutlineSearch} color='gray.400' />
            </InputLeftElement>
            <Input
              placeholder='Search blog posts'
              variant='filled'
              onChange={onSearch}
            />
          </InputGroup>
        )}
      </VStack>
      <List spacing={12} w='full'>
        {displayPosts.map((post) => (
          <ListItem key={post.slug}>
            <BlogPostCard {...post} />
          </ListItem>
        ))}
      </List>
      {displayPosts.length === 0 && <Text>No articles for that query</Text>}
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getBlogPosts();

  const props: Props = {
    posts,
  };

  return {
    props,
  };
};

export default Blog;
