import { Container } from "@chakra-ui/react/container";
import CourseView from "./_components/course-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
};

const Page = () => {
  return (
    <Container maxWidth={"4xl"} mx={"auto"} mt={"16"}>
      <CourseView />
    </Container>
  );
};

export default Page;
