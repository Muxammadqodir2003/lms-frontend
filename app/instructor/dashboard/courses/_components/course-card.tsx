import { Text } from "@chakra-ui/react/text";
import { Box } from "@chakra-ui/react/box";
import { HStack, VStack } from "@chakra-ui/react/stack";
import Image from "next/image";
import { Heading } from "@chakra-ui/react/heading";
import { MdPlayLesson, MdPreview } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { SiBetterstack } from "react-icons/si";
import { Separator } from "@chakra-ui/react/separator";
import { Button } from "@chakra-ui/react/button";

const CourseCard = () => {
  return (
    <HStack w={"full"} h={"250px"} bg={"gray.900"} p={"4"}>
      <VStack
        w={"3/4"}
        h={"full"}
        alignItems={"start"}
        justifyContent={"center"}
      >
        <Text color={"blue.500"}>Beginner</Text>
        <Heading size={"4xl"}>JavaScript asoslari</Heading>
        <HStack mt={"2"}>
          <HStack>
            <MdPlayLesson />
            <Text>96 lessons</Text>
          </HStack>
          <HStack>
            <CiClock1 />
            <Text>13.6 hours</Text>
          </HStack>
          <HStack>
            <SiBetterstack />
            <Text>Beginner</Text>
          </HStack>
        </HStack>
        <Separator w={"full"} />
        <Button w={"full"} bg={"gray.400"}>
          Ko'rib chiqish <MdPreview />
        </Button>
      </VStack>
      <Box position={"relative"} w={"1/4"} h={"full"}>
        <Image src={"/community.png"} alt="" fill />
      </Box>
    </HStack>
  );
};

export default CourseCard;
