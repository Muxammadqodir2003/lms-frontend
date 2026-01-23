"use client";

import { RatingGroup } from "@chakra-ui/react/rating-group";
import { Box } from "@chakra-ui/react/box";
import Image from "next/image";
import { HStack, VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/text";
import { Heading } from "@chakra-ui/react/heading";
import { Avatar } from "@chakra-ui/react/avatar";
import { CiClock1 } from "react-icons/ci";
import { SiBetterstack } from "react-icons/si";
import { MdPlayLesson } from "react-icons/md";
import { Button, Flex, Loader, Separator } from "@chakra-ui/react";
import { BiCard } from "react-icons/bi";
import { ICourse } from "@/types";
import { useRouter } from "next/navigation";
import { getDuration, getLessons } from "@/lib/helper/getCourseData";
import {
  useEnrollCourseMutation,
  useGetEnrolledCoursesQuery,
} from "@/services/user/userApi";
import { toaster } from "@/components/ui/toaster";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const [enrollCourse, { isLoading }] = useEnrollCourseMutation();
  const { data } = useGetEnrolledCoursesQuery();

  const handleEnrollCourse = async () => {
    try {
      await enrollCourse(course.id).unwrap();
      toaster.success({
        title: "Success",
        description: "Course enrolled successfully",
      });
    } catch (error) {
      // @ts-ignore
      toaster.error({ title: "Error", description: error?.data?.message });
    }
  };
  const router = useRouter();

  const isEnrolled = data?.some(
    (enrollment) => enrollment.courseId === course.id,
  );

  return (
    <>
      <Box
        w={"full"}
        h={{ base: "full", md: "full", lg: "300px", xl: "300px" }}
        p={"4"}
        display={"flex"}
        flexDirection={{ base: "column", md: "column", lg: "row", xl: "row" }}
        spaceX={{ base: "0", md: "0", lg: "3", xl: "3" }}
      >
        <Box
          h={{ base: "200px", md: "350px", lg: "full", xl: "full" }}
          w={{ base: "full", md: "full", lg: "40%", xl: "40%" }}
          position={"relative"}
        >
          <Image
            src={course.image}
            alt={`course image ${course.title}`}
            fill
            objectFit="object-contain"
          />
        </Box>

        <Box
          h={"full"}
          w={{ base: "full", md: "full", lg: "60%", xl: "60%" }}
          display={"flex"}
          flexDirection={"column"}
          mx={"auto"}
        >
          <HStack>
            <RatingGroup.Root
              readOnly
              allowHalf
              count={5}
              defaultValue={course.rating}
              size="sm"
              colorPalette={"orange"}
              mt={"2"}
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>

            <Text color={"gray.400"}>(200)</Text>
          </HStack>
          <VStack alignItems={"start"}>
            <Heading size={"2xl"} mt={"2"}>
              {course.title}
            </Heading>
            <Text color={"gray.400"}>{course.subTitle}</Text>
          </VStack>
          <HStack mt={"2"} flexWrap={"wrap"}>
            <Avatar.Root size={"xl"}>
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
            <Text>Samar B.</Text>
            <HStack>
              <MdPlayLesson />
              <Text>{getLessons(course)} lessons</Text>
            </HStack>
            <HStack>
              <CiClock1 />
              <Text>{getDuration(course)} hours</Text>
            </HStack>
            <HStack>
              <SiBetterstack />
              <Text>{course.level}</Text>
            </HStack>
          </HStack>
          <Separator w={"full"} mt={"2"} />

          <Flex justifyContent={"space-between"} mt={"2"}>
            <Heading size={"2xl"}>
              {course.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Heading>

            <HStack>
              <Button
                onClick={
                  isEnrolled
                    ? () => router.push(`/courses/${course.slug}`)
                    : handleEnrollCourse
                }
                disabled={isLoading}
                p={"4"}
                color={"#fff"}
                bg={"green.800"}
              >
                {isLoading ? (
                  <Loader />
                ) : isEnrolled ? (
                  "Go to course"
                ) : (
                  "Add to cart"
                )}{" "}
                <BiCard />
              </Button>
              <Button
                p={"4"}
                onClick={() => router.push(`/courses/${course.slug}`)}
                disabled={isLoading}
              >
                Detail
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Box>
      <Separator my={"3"} />
    </>
  );
};

export default CourseCard;
