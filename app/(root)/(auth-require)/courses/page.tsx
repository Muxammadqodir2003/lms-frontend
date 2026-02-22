import { Box } from "@chakra-ui/react/box";
import Filter from "./_components/filter";
import { Container } from "@chakra-ui/react/container";
import CoursesView from "./_components/courses-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Courses",
};

const Page = () => {
  return (
    <Container
      maxWidth={"6xl"}
      mx={"auto"}
      mt={"24"}
      p={"2"}
      display={"flex"}
      flexDirection={{ base: "column", md: "column", lg: "row", xl: "row" }}
      spaceX={{ base: "0", md: "0", lg: "4", xl: "4" }}
      bg={"bg.muted/70"}
    >
      <Box w={{ base: "full", md: "full", lg: "1/5", xl: "1/5" }}>
        <Filter />
      </Box>
      <Box w={{ base: "full", md: "full", lg: "4/5", xl: "4/5" }}>
        <CoursesView />
      </Box>
    </Container>
  );
};

export default Page;
