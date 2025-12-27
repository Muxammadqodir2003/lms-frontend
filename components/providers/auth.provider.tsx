"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "@/store/user/user.slice";
import { ChildProps } from "@/types";
import { usePathname, useRouter } from "next/navigation";

const AuthProvider = ({ children }: ChildProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(setCredentials(data));
    } catch (error) {
      localStorage.removeItem("accessToken");
    }
  };

  useEffect(() => {
    if (
      !localStorage.getItem("accessToken") &&
      !pathname.includes("recovery-account")
    ) {
      router.push("/auth");
      return;
    }
    if (localStorage.getItem("accessToken")) {
      refresh();
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthProvider;
