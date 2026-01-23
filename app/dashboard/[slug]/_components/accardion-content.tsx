"use client";

import {
  getLessonsLength,
  transformSecondsToMinutes,
} from "@/lib/helper/getCourseData";
import { useGetSectionsByCourseSlugQuery } from "@/services/section/sectionApi";
import { Accordion } from "@chakra-ui/react/accordion";
import { Flex } from "@chakra-ui/react/flex";
import { Text } from "@chakra-ui/react/text";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BiCheckCircle, BiPlayCircle } from "react-icons/bi";

interface AccardionContentProps {
  slug: string;
}

const AccardionContent = ({ slug }: AccardionContentProps) => {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");

  const { data, isLoading, isError } = useGetSectionsByCourseSlugQuery(slug);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;

  return (
    <Flex w={"full"} mt={{ base: "2", md: "2", lg: "0", xl: "0" }}>
      <Accordion.Root collapsible>
        {data?.sections.map((section, index) => (
          <Accordion.Item key={index} value={String(section.id)}>
            <Accordion.ItemTrigger
              w={"full"}
              justifyContent={"space-between"}
              bg={"green.500"}
              alignItems={"center"}
              px={"2"}
              py={"3"}
            >
              <Text>{section.name}</Text>
              <Flex gap={"2"}>
                <Text>
                  {transformSecondsToMinutes(getLessonsLength(section))}
                </Text>
                <Accordion.ItemIndicator />
              </Flex>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                {section.lessons.map((lesson) => (
                  <Flex
                    w={"full"}
                    px={"2"}
                    py={"3"}
                    justifyContent={"space-between"}
                    key={lesson.id}
                    bg={
                      lessonId === String(lesson.id)
                        ? "gray.800"
                        : "transparent"
                    }
                  >
                    <Flex alignItems={"center"} gap={"2"}>
                      {data?.completedLessons.some(
                        (id) => id === Number(lesson.id),
                      ) ? (
                        <BiCheckCircle color="blue" />
                      ) : (
                        <BiPlayCircle color="white" />
                      )}
                      <Link href={`/dashboard/${slug}?lessonId=${lesson.id}`}>
                        <Text>{lesson.name}</Text>
                      </Link>
                    </Flex>
                    <Text>{transformSecondsToMinutes(lesson.duration)}</Text>
                  </Flex>
                ))}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Flex>
  );
};

export default AccardionContent;
