"use client";

import { Text } from "@chakra-ui/react/text";
import { Box } from "@chakra-ui/react/box";
import { HStack } from "@chakra-ui/react/stack";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome } from "react-icons/bi";
import { PiList } from "react-icons/pi";
import { FcAbout, FcContacts } from "react-icons/fc";
import { MdPriceCheck } from "react-icons/md";
import { FaQ } from "react-icons/fa6";

const items = [
  {
    title: "Bosh sahifa",
    url: "/",
    icon: BiHome,
  },
  {
    title: "Kurslar",
    url: "/courses",
    icon: PiList,
  },
];

const navItems = [
  { label: "Biz haqimizda", path: "/about", icon: FcAbout },
  { label: "Kontakt", path: "/contact", icon: FcContacts },
  { label: "Narxlar", path: "/prices", icon: MdPriceCheck },
  { label: "FAQ", path: "/faq", icon: FaQ },
];

const RootSidebar = () => {
  const pathname = usePathname();

  return (
    <Box
      h={"92.5vh"}
      mt={"7.5vh"}
      pos={"fixed"}
      bottom={0}
      left={0}
      zIndex={"10"}
      w={"1/5"}
      bg={"gray.900"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        justifyContent={"start"}
        textAlign={"start"}
        w={"full"}
      >
        <Text color={"gray.400"} mt={"2"} mb={"3"}>
          Asosiy
        </Text>
        {items.map((item) => (
          <Box w={"full"} key={item.url}>
            <Link href={item.url}>
              <HStack
                w={"full"}
                p={"2"}
                fontSize={"xl"}
                h={"12"}
                bg={pathname === item.url ? "green.600" : ""}
                _hover={{ bg: "gray.600" }}
              >
                <item.icon />
                <Text>{item.title}</Text>
              </HStack>
            </Link>
          </Box>
        ))}

        <Text color={"gray.400"} mt={"2"} mb={"3"}>
          Sahifalar
        </Text>
        {navItems.map((item) => (
          <Box w={"full"} key={item.path}>
            <Link href={item.path}>
              <HStack
                w={"full"}
                p={"2"}
                fontSize={"xl"}
                h={"12"}
                bg={pathname === item.path ? "green.600" : ""}
                _hover={{ bg: "gray.600" }}
              >
                <item.icon />
                <Text>{item.label}</Text>
              </HStack>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RootSidebar;
