"use client";

import { Box } from "@chakra-ui/react/box";
import CourseCard from "./course-card";
import { useGetAllCoursesQuery } from "@/services/instructor/instructorApi";
import { Loader } from "@chakra-ui/react";

const CourseView = () => {
  const { data, isLoading, error } = useGetAllCoursesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <Box w={"full"} spaceY={"4"}>
      {data?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Box>
  );
};

export default CourseView;
