// import ThemeToggle from "@/components/shared/theme.toggle";
import ProfileButton from "./profile-button";
import { Button } from "@chakra-ui/react/button";
import { CgShoppingCart } from "react-icons/cg";
import { Container } from "@chakra-ui/react/container";
import { Flex } from "@chakra-ui/react/flex";
import { Heading } from "@chakra-ui/react/heading";
import { Center } from "@chakra-ui/react/center";
import { Separator } from "@chakra-ui/react/separator";
import Link from "next/link";
import SidebarOpener from "./sidebar-opener";

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
            <Flex alignItems={"center"} gap={"2"}>
              <Flex
                display={{ base: "flex", md: "flex", lg: "none", xl: "none" }}
              >
                <SidebarOpener />
              </Flex>
              <Heading size={"4xl"}>Logo</Heading>
            </Flex>

            <Center display={"flex"} flexDirection={"row"} spaceX={"4"}>
              <Link href={"/cart"}>
                <Button cursor={"pointer"}>
                  <CgShoppingCart />
                </Button>
              </Link>
              {/* <ThemeToggle /> */}
              <ProfileButton />
            </Center>
          </Flex>
        </Container>
        <Separator color="white" position={"absolute"} bottom={0} w={"full"} />
      </Container>
    </>
  );
};

export default Navbar;
