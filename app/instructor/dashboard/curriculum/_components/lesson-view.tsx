"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useGetLessonsQuery,
  useReorderLessonMutation,
} from "@/services/lesson/lessonApi";
import { Flex } from "@chakra-ui/react/flex";
import { Loader } from "@chakra-ui/react/loader";
import { toaster } from "@/components/ui/toaster";
import LessonItem from "./lesson-item";
import { Text } from "@chakra-ui/react/text";
import LessonForm from "./lesson-form";
import { useState } from "react";

const LessonView = ({ sectionId }: { sectionId: number }) => {
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading, error } = useGetLessonsQuery(sectionId.toString());
  const [reorderLesson] = useReorderLessonMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  if (isLoading) return <Loader />;

  if (error) return <p>Error</p>;

  return (
    <Flex w={"full"} flexDirection={"column"}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {data && (
          <SortableContext
            items={data?.map((lesson) => lesson.id) || []}
            strategy={verticalListSortingStrategy}
          >
            {data?.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                setShowForm={setShowForm}
              />
            ))}
          </SortableContext>
        )}
      </DndContext>

      <Flex flex={1} mt={"3"} alignItems={"center"} justifyContent={"center"}>
        <Text
          cursor={"pointer"}
          color={"blue.500"}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Yopish" : "Dars qo'shish"}
        </Text>
      </Flex>

      <Flex flex={1} mt={"3"} alignItems={"center"} justifyContent={"center"}>
        {showForm && (
          <LessonForm
            sectionId={sectionId}
            onClose={() => setShowForm(false)}
          />
        )}
      </Flex>
    </Flex>
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = data?.findIndex((lesson) => lesson.id === active.id);
    const newIndex = data?.findIndex((lesson) => lesson.id === over.id);

    const newLessons = arrayMove(data!, oldIndex!, newIndex!);
    try {
      await reorderLesson({
        lessons: newLessons,
        sectionId: sectionId.toString(),
      });
    } catch (error) {
      toaster.error({
        title: "Xatolik",
        description: "Ma'lumotlar saqlanmadi",
      });
    }
  }
};

export default LessonView;
