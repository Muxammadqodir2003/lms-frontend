"use client";

import { Box, Group, Input, Loader, Text } from "@chakra-ui/react";
import CourseCard from "./course-card";
import { useGetAllCoursesQuery } from "@/services/user/userApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IFilters } from "@/types";
import { getApiErrorMessage } from "@/lib/helper/error-handler";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { filterBySearch } from "@/store/filters/filters.slice";

const CoursesView = () => {
  const [query, setQuery] = useState("");
  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const clean = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== null),
  );
  const { data, isLoading, error, isError } = useGetAllCoursesQuery(
    clean as IFilters,
  );

  if (isLoading) return <Loader />;
  if (isError) return <Text>{getApiErrorMessage(error)}</Text>;

  return (
    <Box w={"full"} mx={"auto"}>
      <Group attached w="full" minW="full" mb={"2"}>
        <Input
          p={"2"}
          flex="1"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={() => dispatch(filterBySearch(query))} px={"2"}>
          Search
        </Button>
      </Group>
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
