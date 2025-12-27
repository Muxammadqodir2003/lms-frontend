"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
      router.push("/");
    }
  }, []);

  return <div>Loading...</div>;
};

export default Page;
