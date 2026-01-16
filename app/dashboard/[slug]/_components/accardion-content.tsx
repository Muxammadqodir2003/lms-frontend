"use client";

import { getLessonsLength } from "@/lib/helper/getCourseData";
import { useGetSectionsByCourseSlugQuery } from "@/services/section/sectionApi";
import { Accordion } from "@chakra-ui/react/accordion";
import { Flex } from "@chakra-ui/react/flex";
import { Text } from "@chakra-ui/react/text";

interface AccardionContentProps {
  slug: string;
}

const AccardionContent = ({ slug }: AccardionContentProps) => {
  const { data, isLoading, isError } = useGetSectionsByCourseSlugQuery(slug);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error</Text>;

  return (
    <Flex w={"full"}>
      <Accordion.Root collapsible>
        {data?.map((section, index) => (
          <Accordion.Item key={index} value={String(section.id)}>
            <Accordion.ItemTrigger>
              <Text>{section.name}</Text>
              <Text>{getLessonsLength(section)}</Text>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                {section.lessons.map((lesson) => (
                  <Flex
                    w={"full"}
                    justifyContent={"space-between"}
                    key={lesson.id}
                  >
                    <Text>{lesson.name}</Text>
                    <Text>{lesson.duration}</Text>
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
