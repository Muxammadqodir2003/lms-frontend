import ChakraProvider from "@/components/providers/chakra-provider";
import InstructorProvider from "@/components/providers/instructor.provider";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import { ChildProps } from "@/types";
import { Container } from "@chakra-ui/react/container";
import { Box } from "@chakra-ui/react/box";
import { Grid, GridItem } from "@chakra-ui/react/grid";
import InstructorSidebar from "@/components/shared/instructor-sidebar";
import { Flex, Heading, Text } from "@chakra-ui/react";

const InstructorLayout = ({ children }: ChildProps) => {
  return (
    <InstructorProvider>
      <ChakraProvider>
        <Toaster />
        <Navbar />
        <Box w={"full"} h={"full"}>
          <Container w={"full"} mx={"auto"} p={"2rem"}>
            <Grid gridTemplateColumns={"repeat(5, 1fr)"} mx={"auto"}>
              {window.innerWidth < 768 ? (
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDir={"column"}
                  h={"full"}
                  display={{
                    base: "block",
                    md: "block",
                    lg: "none",
                    xl: "none",
                  }}
                >
                  <Heading>
                    You cannot use this layout on mobile devices.
                  </Heading>
                  <Text>Use a desktop or laptop to access this layout.</Text>
                </Flex>
              ) : (
                <>
                  <GridItem
                    display={{
                      base: "none",
                      md: "none",
                      lg: "block",
                      xl: "block",
                    }}
                    colSpan={{ base: 0, md: 0, lg: 1, xl: 1 }}
                  >
                    <InstructorSidebar />
                  </GridItem>
                  <GridItem colSpan={{ base: 5, md: 5, lg: 4, xl: 4 }}>
                    {children}
                  </GridItem>
                </>
              )}
            </Grid>
          </Container>
        </Box>
      </ChakraProvider>
    </InstructorProvider>
  );
};

export default InstructorLayout;
