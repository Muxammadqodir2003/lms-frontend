import { Container } from "@chakra-ui/react/container";
import CartView from "./_components/cart-view";

const Page = () => {
  return (
    <Container
      maxWidth={"6xl"}
      mx={"auto"}
      mt={"24"}
      p={"2"}
      display={"flex"}
      flexDirection={{ base: "column", md: "column", lg: "row", xl: "row" }}
      spaceX={{ base: "0", md: "0", lg: "4", xl: "4" }}
      bg={"bg.muted/70"}
    >
      <CartView />
    </Container>
  );
};

export default Page;
