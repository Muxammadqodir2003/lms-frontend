import { useGetLessonByIdQuery } from "@/services/lesson/lessonApi";
import { Flex } from "@chakra-ui/react/flex";
import { Text } from "@chakra-ui/react/text";
import AccardionContent from "./accardion-content";
import { Box, Button } from "@chakra-ui/react";
import { useCompleteLessonMutation } from "@/services/user/userApi";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { ILesson } from "@/types";
interface LessonWatchProps {
  lessonId: string;
  slug: string;
}

const LessonWatch = ({ lessonId, slug }: LessonWatchProps) => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetLessonByIdQuery({
    lessonId,
    slug,
  });
  const [completeLesson, { isLoading: isLessonLoading }] =
    useCompleteLessonMutation();

  const handleCompleteLesson = async () => {
    try {
      const data = await completeLesson({
        lessonId: +lessonId,
        slug,
      }).unwrap();
      console.log(data);
      if (!data.finished) {
        router.push(`/dashboard/${slug}?lessonId=${data.nextLessonId}`);
        toaster.success({
          title: "Muvaffaqiyatli",
          description: "Darsni tugatish muvaffaqiyatli bajarildi",
        });
      } else {
        toaster.success({
          title: "Muvaffaqiyatli",
          description: "Tabriklaymiz! Siz kursni tugatdingiz!",
        });
        router.push(`/courses`);
      }
    } catch (error: any) {
      toaster.error({
        title: "Xatolik",
        description: error?.data?.message,
      });
    }
  };

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
        <Button
          px={"4"}
          onClick={() => handleCompleteLesson()}
          disabled={isLessonLoading}
        >
          Darsni tugatish
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
