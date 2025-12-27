import { Heading } from "@chakra-ui/react/heading";
import { Box } from "@chakra-ui/react/box";
import { Center } from "@chakra-ui/react/center";
import { Text } from "@chakra-ui/react/text";
import { Input } from "@chakra-ui/react/input";
import { Button } from "@chakra-ui/react/button";

const Subscribe = () => {
  return (
    <Center
      display={"flex"}
      flexDirection={"column"}
      w={"full"}
      h={"45vh"}
      mt={"16"}
      p={"6"}
      bg={"gray.600"}
    >
      <Box w={"60%"} textAlign={"center"}>
        <Heading size={"4xl"}>
          Bizning ahborot byullitenimizga obuna bo'ling
        </Heading>
        <Text color={"gray.400"}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure
          explicabo recusandae unde esse ut deserunt facilis, laboriosam culpa.
        </Text>
        <Box position={"relative"}>
          <Input
            h={"12"}
            p={"2"}
            placeholder="Email manzilingiz"
            variant={"outline"}
            outlineColor={"gray.400"}
          />
          <Button
            pos={"absolute"}
            right={"2"}
            bottom={"1"}
            translateY={"-0.5"}
            px={"2"}
          >
            Yuborish
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default Subscribe;
