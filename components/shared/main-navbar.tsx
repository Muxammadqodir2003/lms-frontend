"use client";

import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Separator,
} from "@chakra-ui/react";
import Link from "next/link";
import { Suspense } from "react";
import RatingModalOpener from "./rating-modal-opener";
import ProfileButton from "./profile-button";
import { CgShoppingCart } from "react-icons/cg";
import SidebarOpener from "./sidebar-opener";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Container
      maxW={"full"}
      h={"7.5vh"}
      top={0}
      left={0}
      position={"fixed"}
      bg={{ _light: "gray.50", _dark: "gray.950" }}
      pt={"4"}
      zIndex={1}
    >
      <Container maxW={"80%"} mx={"auto"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Flex alignItems={"center"} gap={"2"}>
            <Flex
              display={{ base: "block", md: "block", lg: "none", xl: "none" }}
            >
              <SidebarOpener />
            </Flex>
            <Heading size={"4xl"}>Logo</Heading>
          </Flex>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            spaceX={"4"}
          >
            {/* <ThemeToggle /> */}
            {!user ? (
              <>
                <Box p={2} bg={"blue.500"} color={"white"} borderRadius={"md"}>
                  <Link href="/auth">Login</Link>
                </Box>
              </>
            ) : (
              <Center display={"flex"} flexDirection={"row"} spaceX={"4"}>
                <Suspense fallback={<div>Loading...</div>}>
                  <RatingModalOpener />
                </Suspense>
                <Link href={"/cart"}>
                  <Button cursor={"pointer"}>
                    <CgShoppingCart />
                  </Button>
                </Link>
                {/* <ThemeToggle /> */}
                <ProfileButton />
              </Center>
            )}
          </Box>
        </Box>
      </Container>
      <Separator
        position={"absolute"}
        left={0}
        bottom={0}
        w={"full"}
        h={"1px"}
        color={"#fff"}
      />
    </Container>
  );
};

export default Navbar;
