import { Container } from "@chakra-ui/react/container";
import CourseView from "./_components/course-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Courses",
};

const Page = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} mt={"16"} bg={"gray.900"}>
      <CourseView />
    </Container>
  );
};

export default Page;
