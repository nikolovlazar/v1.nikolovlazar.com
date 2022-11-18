import { GetStaticProps } from 'next';
import Head from 'next/head';

import Hero from '@/components/hero';
import CoursesSection from '@/components/courses-section';
import { readData } from '@/utils/read-data';
import { Video } from '@/types/video';
import VideosSection from '@/components/videos-section';
import courses from '@/data/courses';
import { getRecentBlogPosts } from '@/utils/get-blog-posts';
import { BlogPost } from '@/types/blog-post';
import BlogpostsSection from '@/components/blogposts-section';

type Props = {
  videos: Video[];
  posts: BlogPost[];
};

const IndexPage = ({ videos, posts }: Props) => {
  return (
    <>
      <Head>
        <link rel='me' href='https://fosstodon.org/@nikolovlazar' />
      </Head>
      <Hero />
      <CoursesSection courses={courses} />
      <BlogpostsSection posts={posts} />
      <VideosSection videos={videos} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { videos } = await readData<{ videos: Video[] }>('data/videos.json');
  const posts = await getRecentBlogPosts(3);

  const props: Props = {
    videos,
    posts,
  };

  return {
    props,
  };
};

export default IndexPage;
