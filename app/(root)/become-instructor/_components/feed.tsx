"use client";

import { Box } from "@chakra-ui/react/box";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { Button } from "@chakra-ui/react/button";
import Image from "next/image";
import { useInstructorModalStore } from "@/hooks/use-instructor-modal";

const Feed = () => {
  const { open, setOpen } = useInstructorModalStore();

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"75vh"}
      w={"full"}
      bg={"gray.900"}
    >
      <Box w={"1/2"} p={"4"} spaceY={"4"}>
        <Heading size={"4xl"} fontWeight={"bold"}>
          Become an instructor
        </Heading>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
          maiores animi? Illo odit eum aperiam.
        </Text>
        <Box display={"flex"} w={"full"} spaceX={"2"}>
          <Button
            variant={"outline"}
            cursor={"pointer"}
            w={"1/2"}
            p={"6"}
            fontSize={"md"}
            onClick={() => setOpen(true)}
          >
            Get started
          </Button>
        </Box>
      </Box>
      <Box
        w={"1/2"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box position={"relative"} w={"52"} h={"52"}>
          <Image
            src={"/community.png"}
            alt="Right logo"
            fill
            objectFit="object-contain"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;
