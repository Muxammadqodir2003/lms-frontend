import { Box } from "@chakra-ui/react/box";
import Filter from "./_components/filter";
import { Container } from "@chakra-ui/react/container";
import CoursesView from "./_components/courses-view";

const Page = () => {
  return (
    <Container
      maxWidth={"6xl"}
      mx={"auto"}
      mt={"24"}
      p={"2"}
      display={"flex"}
      flexDirection={{ base: "column", md: "column", lg: "row", xl: "row" }}
      spaceX={"4"}
      bg={"bg.muted/70"}
    >
      <Box w={{ base: "full", md: "full", lg: "1/5", xl: "1/5" }}>
        <Filter />
      </Box>
      <Box>
        <CoursesView />
      </Box>
    </Container>
  );
};

export default Page;
