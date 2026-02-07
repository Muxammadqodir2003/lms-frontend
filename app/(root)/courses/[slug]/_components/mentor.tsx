"use client";

import { Loader } from "@chakra-ui/react/loader";
import { useGetInstructorByIdQuery } from "@/services/user/userApi";
import { Flex } from "@chakra-ui/react/flex";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { Avatar } from "@chakra-ui/react/avatar";
import { BiPlayCircle } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import { BsFillStarFill } from "react-icons/bs";
interface Props {
  instructorId: string;
}

const Mentor = ({ instructorId }: Props) => {
  const { data, isLoading, isError } = useGetInstructorByIdQuery(instructorId);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return (
    <Flex flexDirection={"column"} mt={"2"}>
      <Heading size={"2xl"}>Mentor</Heading>
      <Flex flexDirection={"row"} gap={"2"} mt={"2"}>
        <Flex w={"100px"} h={"100px"}>
          <Avatar.Root size={"full"}>
            <Avatar.Fallback
              fontSize={"3xl"}
              name={
                data?.instructor.firstName + " " + data?.instructor.lastName
              }
            />
          </Avatar.Root>
        </Flex>
        <Flex flexDirection={"column"} justifyContent={"center"}>
          <Heading size={"lg"}>
            {data?.instructor.firstName + " " + data?.instructor.lastName}
          </Heading>
          <Text>{data?.instructor.job}</Text>
          <Flex flexDirection={"row"} gap={"2"}>
            <Flex flexDirection={"row"} alignItems={"center"} gap={"1"}>
              <BsFillStarFill color="blue" />
              <Text>{data?.instructor.rating}</Text>
            </Flex>
            <Flex flexDirection={"row"} alignItems={"center"} gap={"1"}>
              <PiStudentFill color="blue" />
              <Text>+{data?.studentCount} O'quvchilar</Text>
            </Flex>
            <Flex flexDirection={"row"} alignItems={"center"} gap={"1"}>
              <BiPlayCircle color="blue" />
              <Text>{data?.coursesCount} kurslar</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Text mt={"3"}>{data?.instructor.firstName}</Text>
      <Text mt={"3"}>{data?.instructor.lastName}</Text>
    </Flex>
  );
};

export default Mentor;
