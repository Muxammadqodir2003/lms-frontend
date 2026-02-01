import { Container, Heading } from "@chakra-ui/react";
import LogsView from "./_components/logs-view";

const Page = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} py={"2"} mt={"16"}>
      <Heading size={"4xl"}>Logs</Heading>
      <LogsView />
    </Container>
  );
};

export default Page;
