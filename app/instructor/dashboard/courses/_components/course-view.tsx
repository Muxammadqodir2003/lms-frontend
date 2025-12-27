import { Box } from "@chakra-ui/react/box";
import CourseCard from "./course-card";

const CourseView = () => {
  return (
    <Box w={"full"} spaceY={"4"}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <CourseCard key={idx} />
      ))}
    </Box>
  );
};

export default CourseView;
