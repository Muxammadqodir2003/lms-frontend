"use client";

import { useGetCurrentLessonBySlugQuery } from "@/services/lesson/lessonApi";
import { useRouter } from "next/navigation";

interface RedirectProps {
  slug: string;
}

const Redirect = ({ slug }: RedirectProps) => {
  const { data, isLoading, isError } = useGetCurrentLessonBySlugQuery(slug);
  const router = useRouter();

  router.push(`?lessonId=${data?.id}`);

  return <div>Redirect</div>;
};

export default Redirect;
