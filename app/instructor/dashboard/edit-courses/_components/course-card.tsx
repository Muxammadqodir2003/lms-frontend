import { Flex } from "@chakra-ui/react/flex";

const CourseCard = () => {
  return (
    <Flex
      flexDirection={{ base: "row", md: "column", lg: "column", xl: "column" }}
      w={"full"}
    ></Flex>
  );
};

export default CourseCard;
