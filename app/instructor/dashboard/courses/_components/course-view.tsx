"use client";

import { Box } from "@chakra-ui/react/box";
import CourseCard from "./course-card";
import { useGetAllCoursesQuery } from "@/services/instructor/instructorApi";
import { Button, Flex, Loader } from "@chakra-ui/react";
import { useMemo, useState } from "react";

const CourseView = () => {
  const [isActive, setIsActive] = useState(false);
  const { data, isLoading, error } = useGetAllCoursesQuery();
  const isPublished = useMemo(
    () => data?.filter((course) => course.isPublished),
    [data],
  );
  const isNotPublished = useMemo(
    () => data?.filter((course) => !course.isPublished),
    [data],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <Box w={"full"} spaceY={"4"}>
      <Flex w={"full"} justifyContent={"center"} gap={"2"}>
        <Button
          onClick={() => setIsActive((prev) => !prev)}
          variant={isActive ? "outline" : "solid"}
          w={"50%"}
        >
          Active courses
        </Button>
        <Button
          onClick={() => setIsActive((prev) => !prev)}
          variant={isActive ? "solid" : "outline"}
          w={"50%"}
        >
          Not active courses
        </Button>
      </Flex>

      {(!isActive ? isPublished : isNotPublished)?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Box>
  );
};

export default CourseView;
