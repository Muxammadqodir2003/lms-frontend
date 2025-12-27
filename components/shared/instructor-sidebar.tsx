"use client";

import { Text } from "@chakra-ui/react/text";
import { Box } from "@chakra-ui/react/box";
import { HStack, VStack } from "@chakra-ui/react/stack";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiStudentFill } from "react-icons/pi";
import { MdGolfCourse } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";

const items = [
  {
    title: "Students",
    url: "/instructor/dashboard",
    icon: PiStudentFill,
  },
  {
    title: "Kurslar",
    url: "/instructor/dashboard/courses",
    icon: MdGolfCourse,
  },
  {
    title: "Kurs yaratish",
    url: "/instructor/dashboard/create-course",
    icon: FaCloudUploadAlt,
  },
  {
    title: "Kurslarni tahrirlash",
    url: "/instructor/dashboard/edit-courses",
    icon: BiEdit,
  },
];

const InstructorSidebar = () => {
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
      </Box>
    </Box>
  );
};

export default InstructorSidebar;
