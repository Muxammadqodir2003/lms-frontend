"use client";

import { useGetCourseBySlugQuery } from "@/services/instructor/instructorApi";
import { Loader } from "@chakra-ui/react/loader";
import { Flex } from "@chakra-ui/react/flex";
import { Button } from "@chakra-ui/react/button";
import { FaCirclePlus } from "react-icons/fa6";
import { Separator } from "@chakra-ui/react/separator";
import { Text } from "@chakra-ui/react/text";
import { useSectionModalStore } from "@/hooks/useSectionModal";
import SectionFromModal from "./section-from.modal";
import SectionView from "./section-view";
import { useEditedCourse } from "@/hooks/useEditedCourse";

const Curriculum = ({ slug }: { slug: string }) => {
  const { setIsOpen } = useSectionModalStore();
  const { setEditedSection } = useEditedCourse();
  const { data, isLoading, error } = useGetCourseBySlugQuery(slug);

  if (isLoading) return <Loader />;

  if (error) return <p>Error</p>;

  return (
    <>
      <SectionFromModal slug={slug} />
      <Flex flexDirection={"column"} p={"3"}>
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text fontSize={"2xl"}>Bo'lim yaratish</Text>
          <Button
            variant={"ghost"}
            onClick={() => {
              setIsOpen(true);
              setEditedSection(null);
            }}
          >
            <FaCirclePlus />
          </Button>
        </Flex>
        <Separator colorPalette={"whiteAlpha"} w={"full"} mt={"2"} />

        <Flex w={"full"}>
          <SectionView slug={slug} />
        </Flex>
      </Flex>
    </>
  );
};

export default Curriculum;
