"use client";

import { FaHamburger } from "react-icons/fa";
import { useSidebarStore } from "@/hooks/useSidebar";
import { Button } from "@chakra-ui/react";

const SidebarOpener = () => {
  const { onOpenChange } = useSidebarStore();
  return (
    <Button variant={"ghost"}>
      <FaHamburger onClick={() => onOpenChange(true)} />
    </Button>
  );
};

export default SidebarOpener;
