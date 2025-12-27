import { Flex } from "@chakra-ui/react/flex";
import { Carousel } from "@chakra-ui/react/carousel";
import { Heading } from "@chakra-ui/react/heading";
import { Center } from "@chakra-ui/react/center";
import { Text } from "@chakra-ui/react/text";

export default function CoursesCarousel() {
  return (
    <>
      <Heading mt={"5"} size={"2xl"}>
        Platformamizdagi o'qituvchilar
      </Heading>
      <Carousel.Root slideCount={5} loop={true} w={"full"} mt={"6"} mx={"auto"}>
        <Carousel.Control>
          <Carousel.ItemGroup flexBasis={"1/4"}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Carousel.Item key={index} index={index}>
                <Flex
                  h={"400px"}
                  bg={"gray.700"}
                  flexDirection={"column"}
                  rounded={"md"}
                  p={"2"}
                >
                  <Center display={"flex"} flexDirection={"column"} mt={"2"}>
                    <Heading>Ali Osman</Heading>
                    <Text>Web developer</Text>
                  </Center>
                  <Flex
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    mt={"3"}
                  >
                    <Text>200 students</Text>
                    <Text>10 courses</Text>
                  </Flex>
                </Flex>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
        </Carousel.Control>
      </Carousel.Root>
    </>
  );
}
