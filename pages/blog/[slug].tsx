import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import CountUp from 'react-countup';
import { VStack, Heading, HStack, Text } from '@chakra-ui/react';

import { BlogPost } from '@/types/blog-post';
import { getBlogPosts } from '@/utils/get-blog-posts';
import { readBlogPost } from '@/utils/read-blog-post';
import MDXComponents from '@/components/mdx-components';

type Props = BlogPost & {
  source: MDXRemoteSerializeResult;
};

const BlogPostPage = ({ title, date, source }: Props) => {
  return (
    <VStack spacing={8} w='full' alignItems='stretch'>
      <VStack spacing={3} alignItems='flex-start'>
        <Heading size='lg'>{title}</Heading>
        <HStack
          divider={
            <Text color='gray.500' mx={2}>
              •
            </Text>
          }
        >
          <Text color='gray.500' fontSize='sm'>
            {date}
          </Text>
          <Text color='gray.500' fontSize='sm'>
            <CountUp
              start={0}
              end={432}
              suffix=' views'
              useEasing
              delay={0}
              duration={3}
            />
          </Text>
        </HStack>
      </VStack>
      <MDXRemote {...source} components={MDXComponents} />
    </VStack>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getBlogPosts();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = ctx.params.slug as string;

  const postContent = await readBlogPost(slug);
  const {
    content,
    data: { title, description, date },
  } = matter(postContent);

  return {
    props: {
      source: await serialize(content),
      title,
      description,
      date,
      slug,
    },
  };
};

export default BlogPostPage;
