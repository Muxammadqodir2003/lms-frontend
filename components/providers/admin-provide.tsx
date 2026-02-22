"use client";

import { useAppSelector } from "@/store/hooks";
import { ChildProps } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminProvider = ({ children }: ChildProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      router.push("/");
    }
  }, []);

  return <div>{children}</div>;
};

export default AdminProvider;
