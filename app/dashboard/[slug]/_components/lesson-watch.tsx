import { useGetLessonByIdQuery } from "@/services/lesson/lessonApi";
import { Flex } from "@chakra-ui/react/flex";
import { Text } from "@chakra-ui/react/text";
import AccardionContent from "./accardion-content";
import { Box, Button } from "@chakra-ui/react";

interface LessonWatchProps {
  lessonId: string;
  slug: string;
}

const LessonWatch = ({ lessonId, slug }: LessonWatchProps) => {
  const { data, isLoading, isError } = useGetLessonByIdQuery(lessonId);
  console.log(data);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      w={"full"}
    >
      <Flex w="full" aspectRatio={16 / 9}>
        <video
          src={data?.video}
          controls
          preload="metadata"
          controlsList="nodownload"
          onCanPlay={() => console.log("Video ready")}
          onError={(e) => console.log("Video error:", e)}
          disablePictureInPicture
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Flex>
      <Flex
        w={"full"}
        mt={"4"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Text>{data?.name}</Text>
        <Button px={"4"} onClick={() => {}}>
          Completed
        </Button>
      </Flex>
      <Text>{data?.description}</Text>

      <Box
        w={"full"}
        display={{ base: "block", md: "block", lg: "none", xl: "none" }}
      >
        <AccardionContent slug={slug} />
      </Box>
    </Flex>
  );
};

export default LessonWatch;
