"use client";

import { Box, Loader, Text } from "@chakra-ui/react";
import CourseCard from "./course-card";
import { useGetAllCoursesQuery } from "@/services/user/userApi";
import { useAppSelector } from "@/store/hooks";
import { IFilters } from "@/types";

const CoursesView = () => {
  const filters = useAppSelector((state) => state.filters);
  const clean = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== null),
  );
  const { data, isLoading, error, isError } = useGetAllCoursesQuery(
    clean as IFilters,
  );

  if (isLoading) return <Loader />;
  if (isError) return <Text>{error?.data?.message}</Text>;

  return (
    <Box w={"full"} mx={"auto"}>
      {data?.courses.length === 0 && (
        <Text textAlign="center">No courses found</Text>
      )}
      {data?.courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Box>
  );
};

export default CoursesView;
