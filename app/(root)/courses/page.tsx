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
      flexDirection={"row"}
      spaceX={"4"}
      bg={"bg.muted/70"}
    >
      <Box w={"1/5"}>
        <Filter />
      </Box>
      <Box w={"4/5"}>
        <CoursesView />
      </Box>
    </Container>
  );
};

export default Page;
