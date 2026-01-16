import { Box } from "@chakra-ui/react/box";
import { Container } from "@chakra-ui/react/container";
import { Grid, GridItem } from "@chakra-ui/react/grid";
import Sidebar from "./_components/sidebar";
import State from "./_components/state";
import ChakraProvider from "@/components/providers/chakra-provider";
import Navbar from "@/components/shared/navbar";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <ChakraProvider>
      <Navbar />
      <Box w={"full"} h={"full"}>
        <Container w={"full"} mx={"auto"} p={"2rem"}>
          <Grid gridTemplateColumns={"repeat(5, 1fr)"} mx={"auto"}>
            <GridItem
              display={{ base: "none", md: "none", lg: "block", xl: "block" }}
              colSpan={{ base: 0, md: 0, lg: 1, xl: 1 }}
            >
              <Sidebar slug={slug} />
            </GridItem>
            <GridItem colSpan={{ base: 5, md: 5, lg: 4, xl: 4 }} mt={"7.5vh"}>
              <State />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default Page;
