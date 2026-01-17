import { Flex } from "@chakra-ui/react/flex";
import { Accordion } from "@chakra-ui/react/accordion";
import { Span } from "@chakra-ui/react/span";
import { ISection } from "@/types";
import { Text } from "@chakra-ui/react/text";
import { transformSecondsToMinutes } from "@/lib/helper/getCourseData";

interface Props {
  sections: ISection[];
}

const Application = ({ sections }: Props) => {
  return (
    <Flex w={"full"} mt={"3"} p={"2"}>
      <Accordion.Root multiple>
        {sections.map((section, index) => (
          <Accordion.Item key={index} value={section.id.toString()}>
            <Accordion.ItemTrigger py={"4"} px={"2"} bg={"green.500"}>
              <Span flex="1">{section.name}</Span>
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

export default Application;
