"use client";

import { useAuthState } from "@/hooks/useAuthState";
import Login from "./login";
import Register from "./register";
import Social from "./social";
import Verify from "./verify";
import Recovery from "./recovery";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

const State = () => {
  const { state } = useAuthState();

  return (
    <>
      <GridItem colSpan={{ base: 6, md: 6, xl: 4, lg: 4 }} w={"full"} px={"10"}>
        <Box
          w={{ lg: "85%", md: "full" }}
          mx={"auto"}
          p={"6"}
          bg={{ _dark: "gray.800" }}
          rounded={"2xl"}
        >
          {state === "login" && <Login />}
          {state === "register" && <Register />}
          {state === "verify" && <Verify />}
          {state === "recovery" && <Recovery />}
          <Box
            display={"flex"}
            flexDirection={"row"}
            w={"full"}
            alignItems={"center"}
            mt={"2"}
          >
            <Box w={"1/2"} h={"1px"} bg={"red.950"} />
            <Text m={"2"}>YOKI</Text>
            <Box w={"1/2"} h={"1px"} bg={"red.950"} />
          </Box>
          <Social />
        </Box>
      </GridItem>
    </>
  );
};

export default State;
