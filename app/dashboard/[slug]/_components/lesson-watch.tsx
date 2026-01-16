import { useGetLessonByIdQuery } from "@/services/lesson/lessonApi";
import { Flex } from "@chakra-ui/react/flex";
import { Text } from "@chakra-ui/react/text";
import AccardionContent from "./accardion-content";

interface LessonWatchProps {
  lessonId: string;
  slug: string;
}

const LessonWatch = ({ lessonId, slug }: LessonWatchProps) => {
  const { data, isLoading, isError } = useGetLessonByIdQuery(lessonId);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Flex flexDirection={"row"} justifyContent={"space-between"}>
        <Text>LessonWatch</Text>
        <Text>{data?.duration}</Text>
      </Flex>
      <Text>{data?.description}</Text>

      <AccardionContent slug={slug} />
    </Flex>
  );
};

export default LessonWatch;
