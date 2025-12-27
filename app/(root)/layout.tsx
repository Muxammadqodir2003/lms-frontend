import Navbar from "@/components/shared/navbar";
import { ChildProps } from "../../types";
import RootSidebar from "@/components/shared/root-sidebar";
import { Grid, GridItem } from "@chakra-ui/react/grid";
import { Box } from "@chakra-ui/react/box";
import { Container } from "@chakra-ui/react/container";
import { Toaster } from "@/components/ui/toaster";
import ChakraProvider from "@/components/providers/chakra-provider";

const Layout = ({ children }: ChildProps) => {
  return (
    <>
      <ChakraProvider>
        <Toaster />
        <Navbar />
        <Box w={"full"} h={"full"}>
          <Container w={"full"} mx={"auto"} p={"2rem"}>
            <Grid gridTemplateColumns={"repeat(5, 1fr)"} mx={"auto"}>
              <GridItem
                display={{ base: "none", md: "none", lg: "block", xl: "block" }}
                colSpan={{ base: 0, md: 0, lg: 1, xl: 1 }}
              >
                <RootSidebar />
              </GridItem>
              <GridItem colSpan={{ base: 5, md: 5, lg: 4, xl: 4 }}>
                {children}
              </GridItem>
            </Grid>
          </Container>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Layout;
