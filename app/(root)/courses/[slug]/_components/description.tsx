import { Text } from "@chakra-ui/react/text";
import { Flex } from "@chakra-ui/react/flex";
import { BsCircleFill } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { Grid, GridItem } from "@chakra-ui/react/grid";

interface Props {
  description: string;
  whatsLearn: string[];
  requirements: string[];
}

const Description = ({ description, whatsLearn, requirements }: Props) => {
  return (
    <Flex flexDirection={"column"} gap={2}>
      <Text fontSize={"lg"} fontWeight={"bold"} mt={"3"}>
        Description
      </Text>
      <Text>{description}</Text>
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
