import { RatingGroup } from "@chakra-ui/react/rating-group";
import { Box } from "@chakra-ui/react/box";
import Image from "next/image";
import { HStack, VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/text";
import { Heading } from "@chakra-ui/react/heading";
import { Avatar } from "@chakra-ui/react/avatar";
import { CiClock1 } from "react-icons/ci";
import { SiBetterstack } from "react-icons/si";
import { MdPlayLesson } from "react-icons/md";
import { Button, Flex, Separator } from "@chakra-ui/react";
import { BiCard } from "react-icons/bi";

const CourseCard = () => {
  return (
    <>
      <Box
        w={"full"}
        h={"300px"}
        p={"4"}
        display={"flex"}
        flexDirection={"row"}
        spaceX={"3"}
      >
        <Box h={"full"} w={"40%"} position={"relative"}>
          <Image
            src={"/community.png"}
            alt="Course image"
            fill
            objectFit="object-contain"
          />
        </Box>

        <Box h={"full"} w={"60%"}>
          <HStack>
            <RatingGroup.Root
              readOnly
              allowHalf
              count={5}
              defaultValue={5}
              size="sm"
              colorPalette={"orange"}
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>

            <Text color={"gray.400"}>(200)</Text>
          </HStack>
          <VStack alignItems={"start"}>
            <Heading size={"2xl"} mt={"2"}>
              Javascript asoslari
            </Heading>
            <Text color={"gray.400"}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
              assumenda, minima voluptate dolorem dicta at alias expedita animi
              illum esse?
            </Text>
          </VStack>
          <HStack mt={"2"}>
            <Avatar.Root size={"xl"}>
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
            <Text>Samar B.</Text>
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
          <Separator w={"full"} mt={"2"} />

          <Flex justifyContent={"space-between"} mt={"2"}>
            <Heading size={"2xl"}>$20.00</Heading>

            <HStack>
              <Button p={"4"} color={"#fff"} bg={"green.800"}>
                Add to cart <BiCard />
              </Button>
              <Button p={"4"}>Detail</Button>
            </HStack>
          </Flex>
        </Box>
      </Box>
      <Separator my={"3"} />
    </>
  );
};

export default CourseCard;
