"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ILesson } from "@/types";
import { HStack } from "@chakra-ui/react/stack";
import { Flex } from "@chakra-ui/react/flex";
import { FaEdit } from "react-icons/fa";
import { Text } from "@chakra-ui/react";
import { FaDeleteLeft } from "react-icons/fa6";
import { useEditedCourse } from "@/hooks/useEditedCourse";
import { useDeleteLessonMutation } from "@/services/lesson/lessonApi";
import { toaster } from "@/components/ui/toaster";
import { getApiErrorMessage } from "@/lib/helper/error-handler";

interface LessonItemProps {
  lesson: ILesson;
  setShowForm: (show: boolean) => void;
}

const LessonItem = ({ lesson, setShowForm }: LessonItemProps) => {
  const [deleteLesson, { isLoading }] = useDeleteLessonMutation();

  const { setEditedLesson } = useEditedCourse();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });

  const handleDeleteLesson = () => {
    try {
      deleteLesson(lesson.id);
    } catch (error: unknown) {
      toaster.error({
        title: "Xatolik",
        description: getApiErrorMessage(error),
      });
    }
  };

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <Flex
      display={isLoading ? "none" : "flex"}
      w={"96%"}
      mx={"auto"}
      p={"3"}
      alignItems={"center"}
      justifyContent={"space-between"}
      ref={setNodeRef}
      style={style}
    >
      <HStack>
        <FaEdit
          cursor={"pointer"}
          onClick={() => {
            setShowForm(true);
            setEditedLesson(lesson);
          }}
        />
        <Text {...attributes} {...listeners} cursor={"pointer"}>
          {lesson.name}
        </Text>
      </HStack>
      <HStack>
        <FaDeleteLeft cursor={"pointer"} onClick={handleDeleteLesson} />
      </HStack>
    </Flex>
  );
};

export default LessonItem;
