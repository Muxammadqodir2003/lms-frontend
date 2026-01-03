"use client";

import CourseCard from "./course-card";
import { Box, Heading, Loader } from "@chakra-ui/react";
import { useGetAllCoursesQuery } from "@/services/instructor/instructorApi";

const CourseView = () => {
  const { data, isLoading, isError } = useGetAllCoursesQuery();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return (
    <Box display="flex" flexWrap="wrap" gap="2">
      {data && data.length > 0 ? (
        data.map((course) => <CourseCard key={course.id} course={course} />)
      ) : (
        <Heading size="xl" textAlign="center" mt="16">
          Course not found
        </Heading>
      )}
    </Box>
  );
};

export default CourseView;
