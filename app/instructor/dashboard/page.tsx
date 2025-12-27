import Table from "@/components/shared/table";
import { Container } from "@chakra-ui/react/container";

const Page = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} p={"4"} mt={"8"}>
      <Table />
    </Container>
  );
};

export default Page;
