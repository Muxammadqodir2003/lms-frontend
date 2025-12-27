import { Center } from "@chakra-ui/react/center";
import { Heading } from "@chakra-ui/react/heading";
import { Carousel } from "@chakra-ui/react/carousel";
import { Text } from "@chakra-ui/react/text";
import { IconButton } from "@chakra-ui/react/button";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export default function CommentsCarousel() {
  return (
    <Center
      display={"flex"}
      flexDirection={"column"}
      w={"full"}
      mt={"16"}
      mb={"8"}
    >
      <Heading size={"6xl"}>Izohlar</Heading>
      <Heading size={"6xl"}>Odamlar platformamiz haqida nima deydi</Heading>
      <Carousel.Root slidesPerMove={1} loop slideCount={10} mx="auto" gap="4">
        <Carousel.Control>
          <Carousel.PrevTrigger asChild>
            <IconButton size="xs" variant="outline">
              <LuArrowLeft />
            </IconButton>
          </Carousel.PrevTrigger>
          <Carousel.ItemGroup>
            {Array.from({ length: 5 }).map((_, index) => (
              <Carousel.Item key={index} index={index}>
                <Center display={"flex"} flexDirection={"column"}>
                  <Heading size={"7xl"}>"</Heading>
                  <Heading size={"2xl"} fontWeight={"semibold"}>
                    Samar badriddinov
                  </Heading>
                  <Text textAlign={"center"} fontSize={"xl"}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat error labore perferendis atque expedita itaque modi
                    sunt dolor, laboriosam unde beatae commodi maiores mollitia
                    reprehenderit fugit veniam harum deleniti, voluptas debitis
                    doloremque laborum dignissimos omnis. Vero quae ratione
                    cupiditate tempore.
                  </Text>
                </Center>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
          <Carousel.NextTrigger asChild>
            <IconButton size="xs" variant="outline">
              <LuArrowRight />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>
    </Center>
  );
}
