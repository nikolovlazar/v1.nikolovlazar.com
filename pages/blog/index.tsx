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
import NewsletterForm from '@/components/newsletter-form';

type Props = {
  posts: BlogPost[];
};

const Blog = ({ posts }: Props) => {
  const [displayPosts, setDisplayPosts] = useState<BlogPost[]>(posts);

  const onSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    const query = event.currentTarget.value;

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    setDisplayPosts(filteredPosts);
  };

  return (
    <>
      <NextSeo title='Blog - Lazar Nikolov' />
      <VStack as='section' alignItems='flex-start' w='full' spacing={3}>
        <Heading size='md'>Blog.</Heading>
        <Text fontSize='md'>
          Web development, with a focus on the React ecosystem. I’ve written a
          total of {posts.length} articles.
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Icon as={HiOutlineSearch} color='gray.400' />
          </InputLeftElement>
          <Input
            onChange={onSearch}
            placeholder='Search blog posts'
            variant='filled'
          />
        </InputGroup>
      </VStack>
      <List w='full' spacing={2}>
        {displayPosts.map((post) => (
          <ListItem key={post.slug}>
            <BlogPostCard {...post} />
          </ListItem>
        ))}
      </List>
      {displayPosts.length === 0 && <Text>No articles for that query</Text>}
      <NewsletterForm />
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
