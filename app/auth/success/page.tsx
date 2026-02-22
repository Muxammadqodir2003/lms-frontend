"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const TokenHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", token);
        router.push("/");
      }
    }
  }, [token, router]);

  return <div>Loading...</div>;
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TokenHandler />
    </Suspense>
  );
};

export default Page;
