import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import CountUp from 'react-countup';
import { VStack, Heading, HStack, Text, Icon } from '@chakra-ui/react';
import { HiHeart } from 'react-icons/hi';

import { BlogPost } from '@/types/blog-post';
import { getBlogPosts } from '@/utils/get-blog-posts';
import { readBlogPost } from '@/utils/read-blog-post';
import MDXComponents from '@/components/mdx-components';
import { useRouter } from 'next/router';
import usePostViews from 'src/hooks/use-post-views';
import { useEffect } from 'react';
import LikeButton from '@/components/like-button';
import usePostLikes from 'src/hooks/use-post-likes';

type Props = BlogPost & {
  source: MDXRemoteSerializeResult;
};

const BlogPostPage = ({ title, date, source }: Props) => {
  const { query } = useRouter();
  const slug = query.slug as string;

  const { views, increment: incrementViews } = usePostViews(slug);
  const { likes, increment: incrementLikes } = usePostLikes(slug);

  useEffect(() => {
    if (slug) {
      incrementViews();
    }
  }, [slug, incrementViews]);

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
              end={views}
              suffix=' views'
              useEasing
              delay={0}
              duration={3}
            />
          </Text>
        </HStack>
      </VStack>
      <MDXRemote {...source} components={MDXComponents} />
      <HStack justifyContent='center' alignItems='center'>
        <LikeButton onLike={incrementLikes} likes={likes} />
      </HStack>
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
