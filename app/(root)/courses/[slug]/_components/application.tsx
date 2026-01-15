import { Flex } from "@chakra-ui/react/flex";
import { Accordion } from "@chakra-ui/react/accordion";
import { Span } from "@chakra-ui/react/span";
import { ISection } from "@/types";

interface Props {
  sections: ISection[];
}

const Application = ({ sections }: Props) => {
  return (
    <Flex w={"full"} mt={"3"} p={"2"}>
      <Accordion.Root multiple>
        {sections.map((section, index) => (
          <Accordion.Item key={index} value={section.id.toString()}>
            <Accordion.ItemTrigger>
              <Span flex="1">{section.name}</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>
                {section.lessons.map((lesson, index) => (
                  <Accordion.Item key={index} value={lesson.id.toString()}>
                    <Accordion.ItemTrigger>
                      <Span flex="1">{lesson.name}</Span>
                      <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                      <Accordion.ItemBody>
                        {lesson.description}
                      </Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </Accordion.Item>
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
