import { Span } from "@chakra-ui/react/span";
import { Accordion } from "@chakra-ui/react/accordion";
import { Flex } from "@chakra-ui/react/flex";
import { HStack } from "@chakra-ui/react";

const Curriculum = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Accordion.Root collapsible defaultValue={["category"]}>
        <Accordion.Item value={"Section 1"}>
          <Accordion.ItemTrigger p={"3"}>
            <Flex
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Span flex="1" fontSize={"xl"}>
                Section 1
              </Span>

              <HStack></HStack>
            </Flex>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent p={"3"}></Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Flex>
  );
};

export default Curriculum;
