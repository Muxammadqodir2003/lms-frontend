import ThemeToggle from "@/components/shared/theme.toggle";
import { Box, Container, Heading, Separator } from "@chakra-ui/react";
import Link from "next/link";

const navItems = [
  { label: "Biz haqimizda", path: "/about" },
  { label: "Kontakt", path: "/contact" },
  { label: "Narxlar", path: "/prices" },
  { label: "FAQ", path: "/faq" },
];

const Navbar = () => {
  return (
    <Container
      maxW={"full"}
      h={"7.5vh"}
      top={0}
      left={0}
      position={"fixed"}
      bg={{ _light: "gray.50", _dark: "gray.950" }}
      pt={"4"}
    >
      <Container maxW={"80%"} mx={"auto"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <div>
            <Heading size={"4xl"}>Logo</Heading>
          </div>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            spaceX={"4"}
          >
            {navItems.map((item) => (
              <Link href={item.path} key={item.label}>
                {item.label}
              </Link>
            ))}
            {/* <ThemeToggle /> */}
          </Box>
        </Box>
      </Container>
      <Separator
        position={"absolute"}
        left={0}
        bottom={0}
        w={"full"}
        h={"1px"}
        color={"#fff"}
      />
    </Container>
  );
};

export default Navbar;
