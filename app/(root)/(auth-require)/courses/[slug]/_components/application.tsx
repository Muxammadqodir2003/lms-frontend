import { Flex } from "@chakra-ui/react/flex";
import { Accordion } from "@chakra-ui/react/accordion";
import { Span } from "@chakra-ui/react/span";
import { Text } from "@chakra-ui/react/text";
import { Loader } from "@chakra-ui/react";
import { useGetSectionsQuery } from "@/services/section/sectionApi";
import { getDuration } from "@/lib/helper/getCourseData";
import { getApiErrorMessage } from "@/lib/helper/error-handler";

interface Props {
  slug: string;
}

const Application = ({ slug }: Props) => {
  const { data, isLoading, isError, error } = useGetSectionsQuery(slug);

  if (isLoading) return <Loader />;
  if (isError) return <div>{getApiErrorMessage(error)}</div>;

  return (
    <Flex w={"full"} mt={"3"} p={"2"}>
      <Accordion.Root multiple>
        {data?.map((section, index) => (
          <Accordion.Item key={index} value={section.id.toString()}>
            <Accordion.ItemTrigger py={"4"} px={"2"} bg={"green.500"}>
              <Span flex="1">{section.name}</Span>
              <Text>{getDuration(section.totalDuration)}</Text>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                {section.lessons.map((lesson, index) => (
                  <Flex
                    w={"98%"}
                    mx={"auto"}
                    py={"3"}
                    px={"2"}
                    key={index}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <Text>{lesson.name}</Text>
                    <Text>{getDuration(lesson.duration)}</Text>
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

export default Application;
