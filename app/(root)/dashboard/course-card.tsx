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
    >
      {enrollment.course.image && (
        <Image
          src={enrollment.course.image.split("public")[1]}
          alt={enrollment.course.title}
          width={200}
          height={200}
        />
      )}
      <Flex w={"full"} flexDirection={"column"} p={"2"} gap={"2"}>
        <Progress.Root w={"full"} value={enrollment.progress}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        <Text>{enrollment.progress}% tugatildi</Text>
        <Text>{enrollment.course.title}</Text>
        <Button onClick={() => router.push(`/dashboard/javascript`)}>
          Davom ettirish
        </Button>
      </Flex>
    </Flex>
  );
};

export default CourseCard;
