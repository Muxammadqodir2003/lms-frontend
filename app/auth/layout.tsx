"use client";

import ChakraProvider from "@/components/providers/chakra-provider";
import { ChildProps } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: ChildProps) => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/");
    }
  }, []);

  return <ChakraProvider>{children}</ChakraProvider>;
};

export default Layout;
