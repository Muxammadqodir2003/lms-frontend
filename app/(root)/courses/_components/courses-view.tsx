import { Box } from "@chakra-ui/react";
import CourseCard from "./course-card";

const CoursesView = () => {
  return (
    <Box w={"full"}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <CourseCard key={idx} />
      ))}
    </Box>
  );
};

export default CoursesView;
