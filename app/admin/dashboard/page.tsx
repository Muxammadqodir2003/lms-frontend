import { Container } from "@chakra-ui/react/container";
import InstructorsView from "./_components/instructors-view";

const Page = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} py={"2"} mt={"16"}>
      <InstructorsView />
    </Container>
  );
};

export default Page;
