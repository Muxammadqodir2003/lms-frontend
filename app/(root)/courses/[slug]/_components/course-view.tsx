"use client";

import { useGetCourseBySlugQuery } from "@/services/user/userApi";
import { Loader } from "@chakra-ui/react/loader";
import { Flex } from "@chakra-ui/react/flex";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { HStack } from "@chakra-ui/react/stack";
import { RatingGroup } from "@chakra-ui/react/rating-group";
import { PiStudent } from "react-icons/pi";
import { BsClock } from "react-icons/bs";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import State from "./state";
import RightSide from "./right-side";
import { getDuration, getLessons } from "@/lib/helper/getCourseData";

interface Props {
  slug: string;
}

const CourseView = ({ slug }: Props) => {
  const { data, isLoading, isError } = useGetCourseBySlugQuery(slug);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return (
    <Flex w={"full"} flexDirection={"column"}>
      <Flex
        w={"full"}
        gap={"3"}
        bg={"gray.700"}
        position={"relative"}
        p={"2"}
        rounded={"md"}
      >
        <Flex flexDirection={"column"} w={"60%"}>
          <Heading>{data?.title}</Heading>
          <Text>{data?.subTitle}</Text>
          <Flex flexDirection={"row"} flexWrap={"wrap"} gap={"3"}>
            <RatingGroup.Root count={5} defaultValue={data?.rating} size="sm">
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
            <HStack>
              <PiStudent /> O'quvchilar soni: {data?.studentsCount}
            </HStack>
            <HStack>
              <BsClock /> Oxirgi yangilanish:{" "}
              {data?.updatedAt &&
                format(data?.updatedAt!, "dd MMM yyyy", { locale: uz })}
            </HStack>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        flexDirection={"column"}
        w={{ base: "full", md: "58%", lg: "58%", xl: "58%" }}
        gap={"3"}
        p={"2"}
      >
        <State
          course={data!}
          whatsLearn={data?.whatsLearn!}
          requirements={data?.requirements!}
          description={data?.description!}
        />
      </Flex>
      <RightSide
        courseId={String(data?.id!)}
        image={data?.image!}
        lessons={getLessons(data!)}
        duration={getDuration(data!)}
        level={data?.level!}
        language={data?.language!}
        price={data?.price!}
        slug={slug}
      />
    </Flex>
  );
};

export default CourseView;
