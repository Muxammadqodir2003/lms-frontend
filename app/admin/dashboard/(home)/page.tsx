import { Container } from "@chakra-ui/react/container";
import InstructorsView from "./_components/instructors-view";
import { Heading } from "@chakra-ui/react/heading";

const Page = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} py={"2"} mt={"16"}>
      <Heading size={"4xl"}>O'qituvchilar</Heading>
      <InstructorsView />
    </Container>
  );
};

export default Page;
