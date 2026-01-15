import { Box } from "@chakra-ui/react/box";
import { Flex } from "@chakra-ui/react/flex";
import Image from "next/image";
import { Text } from "@chakra-ui/react/text";
import { Button } from "@chakra-ui/react/button";

interface RightSideProps {
  image: string;
  lessons: number;
  duration: number;
  level: string;
  language: string;
  price: number;
}

const RightSide = ({
  image,
  lessons,
  duration,
  level,
  language,
  price,
}: RightSideProps) => {
  return (
    <Flex
      rounded={"md"}
      shadow={"2xl"}
      w={{ base: "full", md: "40%", lg: "40%", xl: "40%" }}
      flexDirection={"column"}
      bg={"gray.800"}
      mt={{ base: "2" }}
      p={"3"}
      position={{
        base: "relative",
        md: "absolute",
        lg: "absolute",
        xl: "absolute",
      }}
      right={{ base: "0", md: "4", lg: "4", xl: "4" }}
      top={{ base: "0", md: "6", lg: "6", xl: "6" }}
    >
      <Box position={"relative"} w={"96%"} h={"200px"}>
        <Image src={image} alt="Course Image" fill />
      </Box>
      <Flex flexDirection={"column"} w={"full"} gap={"2"}>
        <Text>
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
        <Button>Enroll Now</Button>
        <Flex
          flexDirection={"row"}
          w={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text>Darslik</Text>
          <Text>{lessons}</Text>
        </Flex>
        <Flex
          flexDirection={"row"}
          w={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text>Umumiy soat</Text>
          <Text>{duration}</Text>
        </Flex>
        <Flex
          flexDirection={"row"}
          w={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text>Daraja</Text>
          <Text>{level}</Text>
        </Flex>
        <Flex
          flexDirection={"row"}
          w={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text>Til</Text>
          <Text>{language}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RightSide;
