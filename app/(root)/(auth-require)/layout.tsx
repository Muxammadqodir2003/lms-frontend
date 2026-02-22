"use client";

import { useAppSelector } from "@/store/hooks";
import { ChildProps } from "@/types";
import { useRouter } from "next/navigation";

const Layout = ({ children }: ChildProps) => {
  const { user } = useAppSelector((state) => state.user);

  const router = useRouter();

  if (!user) {
    router.push("/auth");
  } else if (user.role === "INSTRUCTOR") {
    router.push("/instructor/dashboard");
  } else if (user.role === "ADMIN") {
    router.push("/admin/dashboard");
  }

  return <>{children}</>;
};

export default Layout;
