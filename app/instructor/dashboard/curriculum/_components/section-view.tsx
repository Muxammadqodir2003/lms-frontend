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
import { Accordion } from "@chakra-ui/react/accordion";
import SectionItem from "./section-item";
import { Loader } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import {
  useGetSectionsQuery,
  useReorderSectionMutation,
} from "@/services/section/sectionApi";
import { getApiErrorMessage } from "@/lib/helper/error-handler";

const SectionView = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError, error } = useGetSectionsQuery(slug);
  const [reorderSection] = useReorderSectionMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  if (isLoading) return <Loader />;

  if (isError) return <p>{getApiErrorMessage(error)}</p>;

  return (
    <Accordion.Root mt={"3"} variant={"plain"} collapsible>
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        {data && (
          <SortableContext
            items={data?.map((item) => item?.id)}
            strategy={verticalListSortingStrategy}
          >
            {data?.map((item) => (
              <SectionItem key={item.id} section={item} />
            ))}
          </SortableContext>
        )}
      </DndContext>
    </Accordion.Root>
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id == over.id) return;

    const oldIndex = data?.findIndex((item) => item?.id === active.id);
    const newIndex = data?.findIndex((item) => item?.id === over.id);

    const newSections = arrayMove(data!, oldIndex!, newIndex!);
    try {
      await reorderSection({ sections: newSections, slug });
    } catch (error) {
      toaster.error({
        title: "Error",
        description: "Failed to reorder sections",
      });
    }
  }
};

export default SectionView;
