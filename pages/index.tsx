import { GetStaticProps } from 'next';

import { VStack, Heading, List, ListItem } from '@chakra-ui/react';

import { Course } from '@/types/course';
import CourseCard from '@/components/course-card';
import Hero from '@/components/hero';
import CoursesSection from '@/components/courses-section';
import { readData } from 'src/utils/read-data';
import { Video } from '@/types/video';
import VideosSection from '@/components/videos-section';

type Props = {
  courses: Course[];
  videos: Video[];
};

const IndexPage = ({ courses, videos }: Props) => {
  return (
    <VStack spacing={20} w='full'>
      <Hero />
      <CoursesSection courses={courses} />
      <VideosSection videos={videos} />
    </VStack>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { courses } = await readData<{ courses: Course[] }>(
    'data/courses.json'
  );

  const { videos } = await readData<{ videos: Video[] }>('data/videos.json');

  const props: Props = {
    courses,
    videos,
  };

  return {
    props,
  };
};

export default IndexPage;
