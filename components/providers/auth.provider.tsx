"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "@/store/user/user.slice";
import { ChildProps } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useRefreshMutation } from "@/services/auth/authApi";

const AuthProvider = ({ children }: ChildProps) => {
  const [refresh] = useRefreshMutation();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
    try {
      // const { data } = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
      //   {},
      //   {
      //     withCredentials: true,
      //   },
      // );
      const data = await refresh().unwrap();

      dispatch(setCredentials(data));
    } catch (error) {
      localStorage.removeItem("accessToken");
    }
  };

  useEffect(() => {
    // if (
    //   !localStorage.getItem("accessToken") &&
    //   !pathname.includes("recovery-account")
    // ) {
    //   router.push("/auth");
    //   return;
    // }
    if (localStorage.getItem("accessToken")) {
      refreshAccessToken();
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthProvider;
