import CourseForm from "@/components/shared/course-form";
import { Container } from "@chakra-ui/react/container";

const Page = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} mt={"16"} bg={"gray.900"}>
      <CourseForm />
    </Container>
  );
};

export default Page;
