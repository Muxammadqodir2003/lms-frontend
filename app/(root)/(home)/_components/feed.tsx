"use client";

import { Heading } from "@chakra-ui/react/heading";
import { Box } from "@chakra-ui/react/box";
import Image from "next/image";
import { Text } from "@chakra-ui/react/text";
import { Button } from "@chakra-ui/react/button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

const Feed = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

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
          O'zingizga mos kursni toping
        </Heading>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
          maiores animi? Illo odit eum aperiam.
        </Text>
        <Box display={"flex"} w={"full"} spaceX={"2"}>
          <Button
            cursor={"pointer"}
            w={"1/2"}
            p={"6"}
            fontSize={"md"}
            onClick={() => router.push("/courses")}
          >
            O'rganishni boshlang
          </Button>
          {user?.role === "STUDENT" && (
            <Button
              variant={"outline"}
              cursor={"pointer"}
              w={"1/2"}
              p={"6"}
              fontSize={"md"}
              onClick={() => router.push("/become-instructor")}
            >
              O'qituvchi bo'ling
            </Button>
          )}
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
