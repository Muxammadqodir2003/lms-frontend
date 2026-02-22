import { Box } from "@chakra-ui/react/box";
import { Container } from "@chakra-ui/react/container";
import { Grid, GridItem } from "@chakra-ui/react/grid";
import Sidebar from "./_components/sidebar";
import State from "./_components/state";
import Navbar from "@/components/shared/navbar";
import RatingModal from "@/components/shared/rating-modal";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Student Dashboard ${slug}`,
  };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <>
      <Navbar />
      <Box w={"full"} h={"full"}>
        <Container w={"full"} mx={"auto"} p={"2rem"}>
          <Grid gridTemplateColumns={"repeat(7, 1fr)"} mx={"auto"}>
            <GridItem
              display={{ base: "none", md: "none", lg: "block", xl: "block" }}
              colSpan={{ base: 0, md: 0, lg: 2, xl: 2 }}
            >
              <Sidebar slug={slug} />
            </GridItem>
            <GridItem colSpan={{ base: 7, md: 7, lg: 5, xl: 5 }} mt={"7.5vh"}>
              <Suspense fallback={<div>Loading...</div>}>
                <State slug={slug} />
              </Suspense>
              <RatingModal slug={slug} />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
