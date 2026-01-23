import { Text } from "@chakra-ui/react/text";
import { Flex } from "@chakra-ui/react/flex";
import { BsCircleFill } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { Grid, GridItem } from "@chakra-ui/react/grid";
import { Box } from "@chakra-ui/react";
import parse from "html-react-parser";

interface Props {
  description: string;
  whatsLearn: string[];
  requirements: string[];
}

const Description = ({ description, whatsLearn, requirements }: Props) => {
  return (
    <Flex flexDirection={"column"} gap={2}>
      <Text fontSize={"lg"} fontWeight={"bold"} mt={"3"}>
        {description && (
          <Box
            w="full"
            className="ql-snow"
            css={{
              ".ql-editor": {
                padding: "0 !important",
              },
              "p, span, h1, h2, h3, li": {
                backgroundColor: "transparent !important",
                color: "white !important",
                lineHeight: "1.7",
              },
            }}
          >
            <div className="ql-editor">{parse(description)}</div>
          </Box>
        )}
      </Text>
      <Text fontSize={"lg"} fontWeight={"bold"} mt={"3"}>
        What you will learn
      </Text>
      <Grid templateColumns={"repeat(2, 1fr)"} gap={2}>
        {whatsLearn.map((item, index) => (
          <GridItem key={index}>
            <Flex flexDirection={"row"} gap={2} alignItems={"center"}>
              <BiCheck />
              <Text>{item}</Text>
            </Flex>
          </GridItem>
        ))}
      </Grid>
      <Text fontSize={"lg"} fontWeight={"bold"} mt={"3"}>
        Requirements
      </Text>
      {requirements.map((item, index) => (
        <Flex key={index} flexDirection={"row"} gap={2} alignItems={"center"}>
          <BsCircleFill size={12} />
          <Text>{item}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Description;
