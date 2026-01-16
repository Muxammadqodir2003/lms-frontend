import { Flex } from "@chakra-ui/react/flex";
import CourseView from "./course-view";

const Page = () => {
  return (
    <Flex w={"full"} mt={"16"}>
      <CourseView />
    </Flex>
  );
};

export default Page;
