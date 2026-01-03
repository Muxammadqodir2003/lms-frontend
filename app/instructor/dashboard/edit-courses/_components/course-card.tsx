"use client";

import { Text } from "@chakra-ui/react/text";
import { Button } from "@chakra-ui/react/button";
import { Card } from "@chakra-ui/react/card";
import { HStack } from "@chakra-ui/react/stack";
import {
  MdDelete,
  MdEdit,
  MdOutlineSchool,
  MdPlayLesson,
} from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import { SiBetterstack } from "react-icons/si";
import { Separator } from "@chakra-ui/react/separator";
import { FcViewDetails } from "react-icons/fc";
import Image from "next/image";
import { Box } from "@chakra-ui/react/box";
import { ICourse } from "@/types";
import { useRouter } from "next/navigation";
import { useDeleteCourseMutation } from "@/services/instructor/instructorApi";
import { useEditedCourse } from "@/hooks/useEditedCourse";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const router = useRouter();
  const { setEditedCourse } = useEditedCourse();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse(`${course.id}`).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`http://localhost:4000${course.image.split("public")[1]}`);
  return (
    <Card.Root width="49.5%" p={"3"}>
      <Card.Body gap="2">
        <Box w={"100%"} h={"250px"} position={"relative"} p={"2"}>
          <Image
            src={`http://localhost:4000/uploads/images/1767186277035-593739871.jpg`}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Text fontSize={"sm"} color={"blue.500"}>
          {course.level}
        </Text>
        <Card.Title mt="2" fontSize={"2xl"}>
          {course.title}
        </Card.Title>
        <Card.Description>
          <HStack mt={"2"}>
            <HStack>
              <MdPlayLesson />
              <Text> lessons</Text>
            </HStack>
            <HStack>
              <CiClock1 />
              <Text>13.6 hours</Text>
            </HStack>
            <HStack>
              <SiBetterstack />
              <Text>{course.level}</Text>
            </HStack>
          </HStack>
          <Separator w={"full"} my={"3"} />
        </Card.Description>
      </Card.Body>
      <Card.Footer flexWrap={"wrap"}>
        <Button variant="subtle" size={"xs"} p={"2"} disabled={isDeleting}>
          Ko'rib chiqish <FcViewDetails />
        </Button>
        <Button
          variant="subtle"
          size={"xs"}
          p={"2"}
          onClick={() => {
            setEditedCourse(course);
            router.push(`/instructor/dashboard/edit-courses/${course.slug}`);
          }}
        >
          Tahrirlash <MdEdit />
        </Button>
        <Button
          variant="subtle"
          size={"xs"}
          p={"2"}
          disabled={isDeleting}
          onClick={handleDeleteCourse}
        >
          O'chirish <MdDelete />
        </Button>
        <Button variant="subtle" size={"xs"} p={"2"} disabled={isDeleting}>
          O'quv dasturi <MdOutlineSchool />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default CourseCard;
