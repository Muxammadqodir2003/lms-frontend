import { Text } from "@chakra-ui/react/text";
import { Box } from "@chakra-ui/react/box";
import Image from "next/image";
import { Carousel } from "@chakra-ui/react/carousel";
import { Center } from "@chakra-ui/react/center";

const logos = [
  {
    src: "/logos/location.png",
    alt: "Arrow icon",
    label: "Shaxsiy rivojlanish",
  },
  {
    src: "/logos/financial-analysis.png",
    alt: "Arrow icon",
    label: "Moliyaviy hisob",
  },
  { src: "/logos/survey.png", alt: "Arrow icon", label: "Ro'yxatdan o'ting" },
  { src: "/logos/right-arrow.png", alt: "Arrow icon", label: "" },
  { src: "/logos/survey.png", alt: "Arrow icon", label: "Maqul kursni toping" },
  { src: "/logos/right-arrow.png", alt: "Arrow icon", label: "" },
  {
    src: "/logos/developer.png",
    alt: "Developer icon",
    label: "To'liq o'rganing",
  },
];

export default function LogoCarousel() {
  return (
    <>
      <Box mb={"8"}>
        <Text
          fontSize={"2xl"}
          mt={"10"}
          color={"gray.400"}
          textAlign={"center"}
        >
          Dunyoning eng yaxshilari tomonidan ishoniladi
        </Text>
        <Carousel.Root
          autoplay={{ delay: 1200 }}
          loop
          slideCount={7}
          slidesPerPage={5}
          slidesPerMove={1}
          w={"full"}
          mx={"auto"}
          mb={"6"}
        >
          <Carousel.ItemGroup>
            {logos.map((item, idx) => (
              <Carousel.Item key={idx} index={idx} flexBasis={"1/5"} mt={"5"}>
                <Center display={"flex"} flexDirection={"column"}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={50}
                    height={50}
                    objectFit="object-contain"
                  />
                </Center>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
        </Carousel.Root>
      </Box>
    </>
  );
}
