// import ThemeToggle from "@/components/shared/theme.toggle";
import ProfileButton from "./profile-button";
import { Button } from "@chakra-ui/react/button";
import { CgShoppingCart } from "react-icons/cg";
import { Container } from "@chakra-ui/react/container";
import { Flex } from "@chakra-ui/react/flex";
import { Heading } from "@chakra-ui/react/heading";
import { Center } from "@chakra-ui/react/center";

const Navbar = () => {
  return (
    <>
      <Container
        maxW={"full"}
        pos={"fixed"}
        display={"flex"}
        h={"7.5vh"}
        alignItems={"center"}
        zIndex={"10"}
        bg={"blue.950"}
      >
        <Container w={"85%"} mx={"auto"}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Heading size={"4xl"}>Logo</Heading>

            <Center display={"flex"} flexDirection={"row"} spaceX={"4"}>
              <Button cursor={"pointer"}>
                <CgShoppingCart />
              </Button>
              {/* <ThemeToggle /> */}
              <ProfileButton />
            </Center>
          </Flex>
        </Container>
        {/* <Separator color="white" pos={"absolute"} bottom={0} /> */}
      </Container>
    </>
  );
};

export default Navbar;
