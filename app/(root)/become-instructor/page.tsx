import { Container } from "@chakra-ui/react";
import Feed from "./_components/feed";
import FormModal from "./_components/form-modal";

const Page = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} mt={"24"} p={"2"} mb={"6"}>
      <Feed />
      <FormModal />
    </Container>
  );
};

export default Page;
