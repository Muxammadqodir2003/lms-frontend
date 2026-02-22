import { useGetLessonByIdQuery } from "@/services/lesson/lessonApi";
import { Flex } from "@chakra-ui/react/flex";
import { Text } from "@chakra-ui/react/text";
import AccardionContent from "./accardion-content";
import { Box, Button, Loader } from "@chakra-ui/react";
import { useCompleteLessonMutation } from "@/services/user/userApi";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { IError } from "@/types";
import { Suspense } from "react";
import { getApiErrorMessage } from "@/lib/helper/error-handler";

interface LessonWatchProps {
  lessonId: string;
  slug: string;
}

const LessonWatch = ({ lessonId, slug }: LessonWatchProps) => {
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetLessonByIdQuery({
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
    } catch (error) {
      toaster.error({
        title: "Xatolik",
        description: getApiErrorMessage(error),
      });
    }
  };

  if (isLoading)
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"full"}
        h={"full"}
      >
        <Loader />
      </Flex>
    );
  if (isError) return <div>Error</div>;

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      w={"full"}
    >
      <Flex w="full" aspectRatio={16 / 9}>
        {isLoading && (
          <Flex
            w="full"
            h="full"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Loader />
          </Flex>
        )}
        {!isLoading && (
          <video
            src={data?.video}
            controls
            preload="metadata"
            controlsList="nodownload"
            disablePictureInPicture
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}
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

      {data?.description && data.description.length > 0 && (
        <Box
          w="full"
          p={"2"}
          mt={"4"}
          bg={"gray.800"}
          rounded={"md"}
          className="ql-snow" // Quill'ning ba'zi struktura stillari uchun
          css={{
            ".ql-editor": {
              padding: "0 !important", // Ko'rsatishda ortiqcha padding kerakmas
            },
            a: {
              color: "#63B3ED !important", // blue.300 rangi (dark fonda yaxshi ko'rinadi)
              textDecoration: "underline !important", // Tagiga chiziq chizish
              cursor: "pointer !important",
              transition: "color 0.2s ease",
              _hover: {
                color: "blue.400 !important", // Kursorni olib borganda rang o'zgarishi
              },
            },
            // Barcha ichki elementlarning inline ranglarini bekor qilish
            "p, span, h1, h2, h3, li": {
              backgroundColor: "transparent !important",
              color: "white !important", // Yoki o'zingizga ma'qul rang
              lineHeight: "1.7",
            },
          }}
        >
          <div className="ql-editor">{parse(data.description)}</div>
        </Box>
      )}

      <Box
        w={"full"}
        display={{ base: "block", md: "block", lg: "none", xl: "none" }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AccardionContent slug={slug} />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default LessonWatch;
