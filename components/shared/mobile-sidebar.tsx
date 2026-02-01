"use client";

import {
  Box,
  Button,
  CloseButton,
  Drawer,
  HStack,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useSidebarStore } from "@/hooks/useSidebar";
import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { PiList } from "react-icons/pi";
import { usePathname } from "next/navigation";

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

const MobileSidebar = () => {
  const pathname = usePathname();

  const { open, onOpenChange } = useSidebarStore();
  return (
    <Drawer.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                justifyContent={"start"}
                textAlign={"start"}
                w={"full"}
              >
                <Text color={"gray.400"} mt={"2"} mb={"3"} pl={"2"}>
                  Sahifalar
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
              </Box>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild top={0} mr={"2"}>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default MobileSidebar;
