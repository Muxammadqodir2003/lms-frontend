import { Text } from "@chakra-ui/react/text";
import { Box } from "@chakra-ui/react/box";
import { HStack, VStack } from "@chakra-ui/react/stack";
import Image from "next/image";
import { Heading } from "@chakra-ui/react/heading";
import { MdPlayLesson, MdPreview } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { SiBetterstack } from "react-icons/si";
import { Separator } from "@chakra-ui/react/separator";
import { Button } from "@chakra-ui/react/button";
import { ICourse } from "@/types";
import { getDuration, getLessons } from "@/lib/helper/getCourseData";
import {
  useActiveCourseMutation,
  useDeactiveCourseMutation,
} from "@/services/courses/courseApi";
import { Loader } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

const CourseCard = ({ course }: { course: ICourse }) => {
  const [activeCourse, { isLoading }] = useActiveCourseMutation();
  const [deactiveCourse, { isLoading: isLoadingDeactived }] =
    useDeactiveCourseMutation();

  const handleCourseActive = async () => {
    try {
      await activeCourse(course.slug).unwrap();
      toaster.success({
        title: "Muvoffaqiyatli",
        description: "Kurs muvofaqqiyatli faollashtirildi",
      });
    } catch (error: any) {
      toaster.error({ title: "Error", description: error?.data?.message });
    }
  };

  const handleCourseDeactive = async () => {
    try {
      await deactiveCourse(course.slug).unwrap();
      toaster.success({
        title: "Muvoffaqiyatli",
        description: "Kurs muvofaqqiyatli faolsizlantirildi",
      });
    } catch (error: any) {
      toaster.error({ title: "Error", description: error?.data?.message });
    }
  };

  return (
    <HStack w={"full"} h={"250px"} bg={"gray.900"} p={"4"}>
      <VStack
        w={"3/4"}
        h={"full"}
        alignItems={"start"}
        justifyContent={"center"}
      >
        <Text color={"blue.500"}>{course.level}</Text>
        <Heading size={"4xl"}>{course.title}</Heading>
        <HStack mt={"2"}>
          <HStack>
            <MdPlayLesson />
            <Text>{getLessons(course)}</Text>
          </HStack>
          <HStack>
            <CiClock1 />
            <Text>{getDuration(course)}</Text>
          </HStack>
          <HStack>
            <SiBetterstack />
            <Text>{course.level}</Text>
          </HStack>
        </HStack>
        <Separator w={"full"} />
        {course.isPublished ? (
          <Button
            onClick={() => handleCourseDeactive()}
            disabled={isLoadingDeactived}
            w={"full"}
            bg={"gray.400"}
          >
            {"Faolsizlantirish"} {isLoadingDeactived ? <Loader /> : null}
          </Button>
        ) : (
          <Button
            onClick={() => handleCourseActive()}
            disabled={isLoading}
            w={"full"}
            bg={"gray.400"}
          >
            {"Faollashtirish"} {isLoading ? <Loader /> : null}
          </Button>
        )}
      </VStack>
      <Box position={"relative"} w={"1/4"} h={"full"}>
        <Image src={course.image} alt="" fill />
      </Box>
    </HStack>
  );
};

export default CourseCard;
