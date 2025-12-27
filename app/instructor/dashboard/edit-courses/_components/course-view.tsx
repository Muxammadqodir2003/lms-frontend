import { Container } from "@chakra-ui/react/container";
import CourseCard from "./course-card";

const CourseView = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} mt={"16"} bg={"gray.700"}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <CourseCard />
      ))}
    </Container>
  );
};

export default CourseView;
