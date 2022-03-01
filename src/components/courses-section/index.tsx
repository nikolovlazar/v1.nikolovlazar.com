import { Course } from "@/types/course";
import { VStack, Heading, List, ListItem } from "@chakra-ui/react";
import CourseCard from "../course-card";

type Props = {
  courses: Course[];
};

const CoursesSection = ({ courses }: Props) => {
  return (
    <VStack as="section" alignItems="flex-start" w="full" spacing={4}>
      <Heading size="md">Courses.</Heading>
      <List spacing={6}>
        {courses.map((course) => (
          <ListItem key={course.url}>
            <CourseCard {...course} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default CoursesSection;
