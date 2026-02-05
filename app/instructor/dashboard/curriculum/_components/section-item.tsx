"use client";

import { HStack } from "@chakra-ui/react/stack";
import { Flex } from "@chakra-ui/react/flex";
import { Accordion } from "@chakra-ui/react/accordion";
import { LiaStackExchange } from "react-icons/lia";
import { Text } from "@chakra-ui/react/text";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { ISection } from "@/types";
import { useSectionModalStore } from "@/hooks/useSectionModal";
import { useEditedCourse } from "@/hooks/useEditedCourse";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LessonView from "./lesson-view";
import { useDeleteSectionMutation } from "@/services/section/sectionApi";

interface SectionItemProps {
  section: ISection;
}

const SectionItem = ({ section }: SectionItemProps) => {
  const { setIsOpen } = useSectionModalStore();
  const { setEditedSection } = useEditedCourse();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  const [deleteSection, { isLoading }] = useDeleteSectionMutation();

  return (
    <>
      <Accordion.Item
        py={"3"}
        key={section.id}
        value={section.id.toString()}
        disabled={isLoading}
        style={style}
        ref={setNodeRef}
      >
        <Accordion.ItemTrigger>
          <Flex
            w={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <HStack {...attributes} {...listeners}>
              <LiaStackExchange />
              <Text cursor={"pointer"}>{section.name}</Text>
            </HStack>
            <HStack spaceX={"2"}>
              <MdEdit
                cursor={"pointer"}
                size={16}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                  setEditedSection(section);
                }}
              />
              <FaTrash
                cursor={"pointer"}
                size={12}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSection(section.id);
                }}
              />
            </HStack>
          </Flex>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>
            <LessonView sectionId={section.id} />
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </>
  );
};

export default SectionItem;
