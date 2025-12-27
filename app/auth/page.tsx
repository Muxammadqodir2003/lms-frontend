import Navbar from "./_components/navbar";
import State from "./_components/state";

import { Box, Container, Grid, GridItem, Heading } from "@chakra-ui/react";

const Page = () => {
  return (
    <>
      <Box w={"full"} h={"full"}>
        <Container w={"85%"} mt={"2rem"} mx={"auto"} p={"2rem"}>
          <Navbar />
          <Grid gridTemplateColumns={"repeat(6, 1fr)"} gapX={"4"} mt={"20"}>
            <GridItem
              display={{ base: "none", md: "none", lg: "block", xl: "block" }}
              colSpan={2}
            >
              <Heading size={"6xl"}>
                Senior web dizaynerlar & Full-Stack Dasturchilar
              </Heading>
            </GridItem>
            <State />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
