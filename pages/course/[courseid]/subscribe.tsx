import type { GetStaticPaths, GetStaticProps } from "next";
import { VStack, Heading, Text } from "@chakra-ui/react";

import courses from "@/data/courses";
import CourseForm from "@/components/course-form";
import { Course } from "@/types/course";

type Props = {
  course: Course;
};

const CourseSubscribe = ({ course }: Props) => {
  return (
    <>
      <VStack as="section" alignItems="flex-start" w="full" spacing={3}>
        <Heading size="md">{course.title}</Heading>
        <Text alignSelf="flex-start" color="gray.500" fontSize="sm">
          Expected launch: {course.expectedLaunch}
        </Text>
        <Text>{course.description}</Text>
      </VStack>
      <CourseForm course={course} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: courses
      .filter((course) => !course.live)
      .map(({ id: courseid }) => ({ params: { courseid } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const courseId = ctx.params.courseid as string;

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      course,
    },
  };
};

export default CourseSubscribe;
