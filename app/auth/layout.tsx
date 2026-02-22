"use client";

import { useAppSelector } from "@/store/hooks";
import { ChildProps } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: ChildProps) => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return <div>{children}</div>;
};

export default Layout;
