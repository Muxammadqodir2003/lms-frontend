"use client";

import { getApiErrorMessage } from "@/lib/helper/error-handler";
import { useGetCurrentLessonBySlugQuery } from "@/services/lesson/lessonApi";
import { Flex, Loader } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectProps {
  slug: string;
}

const Redirect = ({ slug }: RedirectProps) => {
  const { data, isLoading, isError, error } =
    useGetCurrentLessonBySlugQuery(slug);
  const router = useRouter();

  useEffect(() => {
    if (data?.id) {
      router.push(`?lessonId=${data?.id}`);
    }
  }, [data, router]);

  if (isLoading)
    return (
      <Flex w="full" h="full" justifyContent="center" alignItems="center">
        <Loader />
      </Flex>
    );
  if (isError) return <div>{getApiErrorMessage(error)}</div>;

  return null;
};

export default Redirect;
