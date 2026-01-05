import { Container } from "@chakra-ui/react/container";
import Curriculum from "../_components/curriculum";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <Container maxWidth={"6xl"} mx={"auto"} mt={"16"} bg={"gray.700"}>
      <Curriculum slug={slug} />
    </Container>
  );
};

export default Page;
