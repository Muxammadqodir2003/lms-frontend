"use client";

import { useGetCurrentLessonBySlugQuery } from "@/services/lesson/lessonApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectProps {
  slug: string;
}

const Redirect = ({ slug }: RedirectProps) => {
  const { data, isLoading, isError } = useGetCurrentLessonBySlugQuery(slug);
  const router = useRouter();

  useEffect(() => {
    if (data?.id) {
      router.push(`?lessonId=${data?.id}`);
    }
  }, [data, router]);

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Xatolik yuz berdi</div>;

  return null;
};

export default Redirect;
