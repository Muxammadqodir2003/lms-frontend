import { Container } from "@chakra-ui/react/container";

const Page = async ({ route }: { route: Promise<{ slug: string }> }) => {
  const { slug } = await route;

  return (
    <Container maxWidth={"6xl"} mx={"auto"} mt={"16"} bg={"gray.700"}>
      Page
    </Container>
  );
};

export default Page;
