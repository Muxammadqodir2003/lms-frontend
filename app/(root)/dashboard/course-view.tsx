"use client";

import { useGetEnrolledCoursesQuery } from "@/services/user/userApi";
import { Loader } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react/flex";
import CourseCard from "./course-card";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";

const CourseView = () => {
  const { data, isLoading, isError } = useGetEnrolledCoursesQuery();
  console.log(data);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return (
    <Flex w={"full"} flexDirection={"column"}>
      <Heading>Dashboard</Heading>
      {data?.length === 0 ? (
        <Text>No courses in cart</Text>
      ) : (
        data?.map((enrollment) => (
          <Flex w={"full"} key={enrollment.id}>
            <CourseCard enrollment={enrollment} />
          </Flex>
        ))
      )}
    </Flex>
  );
};

export default CourseView;
