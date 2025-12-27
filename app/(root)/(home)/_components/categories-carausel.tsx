import { Text } from "@chakra-ui/react/text";
import { Box } from "@chakra-ui/react/box";
import { Carousel } from "@chakra-ui/react/carousel";
import Image from "next/image";
import { Heading } from "@chakra-ui/react/heading";

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

export default function CategoriesCarousel() {
  return (
    <>
      <Heading size={"4xl"} my={"4"}>
        Yuqori toifalar
      </Heading>
      <Text color={""}>Kurslarni yuqori toifada o'rganing</Text>
      <Carousel.Root
        slidesPerMove={1}
        autoplay={{ delay: 1000 }}
        loop
        slidesPerPage={5}
        slideCount={logos.length}
        mx="auto"
        gap="4"
      >
        <Carousel.Control justifyContent="center" gap="4" width="full">
          <Carousel.ItemGroup width="full">
            {[...logos, ...logos].map((_src, index) => (
              <Carousel.Item
                w={"full"}
                h={"52"}
                bg={"bg.muted"}
                key={index}
                index={index}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"full"}
                  h={"full"}
                >
                  <Image src={_src.src} alt={_src.alt} width={80} height={80} />
                  <Text>{_src.label}</Text>
                </Box>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
        </Carousel.Control>
      </Carousel.Root>
    </>
  );
}
