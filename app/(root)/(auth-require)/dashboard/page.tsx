import { Metadata } from "next";
import { Flex } from "@chakra-ui/react/flex";
import CourseView from "./_components/course-view";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Page = () => {
  return (
    <Flex w={"full"} mt={"16"}>
      <CourseView />
    </Flex>
  );
};

export default Page;
