import ChakraProvider from "@/components/providers/chakra-provider";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import { ChildProps } from "@/types";
import { Container } from "@chakra-ui/react/container";
import { Box } from "@chakra-ui/react/box";
import { Grid, GridItem } from "@chakra-ui/react/grid";

const AdminLayout = ({ children }: ChildProps) => {
  return (
    <ChakraProvider>
      <Toaster />
      <Navbar />
      <Box w={"full"} h={"full"}>
        <Container w={"full"} mx={"auto"} p={"2rem"}>
          <Grid gridTemplateColumns={"repeat(5, 1fr)"} mx={"auto"}>
            <GridItem
              display={{ base: "none", md: "none", lg: "block", xl: "block" }}
              colSpan={{ base: 0, md: 0, lg: 1, xl: 1 }}
            ></GridItem>
            <GridItem colSpan={{ base: 5, md: 5, lg: 4, xl: 4 }}>
              {children}
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default AdminLayout;
