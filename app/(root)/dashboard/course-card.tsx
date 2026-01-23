import { Flex } from "@chakra-ui/react/flex";
import Image from "next/image";
import { IEnrollment } from "@/types";
import { Progress } from "@chakra-ui/react/progress";
import { Text } from "@chakra-ui/react/text";
import { Button } from "@chakra-ui/react/button";
import { useRouter } from "next/navigation";

interface Props {
  enrollment: IEnrollment;
}

const CourseCard = ({ enrollment }: Props) => {
  const router = useRouter();

  return (
    <Flex
      w={"48%"}
      flexDirection={"column"}
      shadow={"2xl"}
      rounded={"md"}
      mt={"2"}
      bg={"gray.800"}
      p={"2"}
    >
      {enrollment.course.image && (
        <Flex position={"relative"} w={"full"} h={"200px"}>
          <Image
            src={enrollment.course.image}
            alt={enrollment.course.title}
            fill
            objectFit="cover"
          />
        </Flex>
      )}
      <Flex w={"full"} flexDirection={"column"} mt={"4"} gap={"2"}>
        <Progress.Root w={"full"} value={enrollment.progress}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Text>{enrollment.progress}% tugatildi</Text>
        <Text>{enrollment.course.title}</Text>
        <Button
          onClick={() =>
            router.push(
              `/dashboard/${enrollment.course.slug}?lessonId=${enrollment.currentLessonId}`,
            )
          }
        >
          Davom ettirish
        </Button>
      </Flex>
    </Flex>
  );
};

export default CourseCard;
