"use client";

import { Flex } from "@chakra-ui/react/flex";
import { Text } from "@chakra-ui/react/text";
import { BiStar } from "react-icons/bi";
import { useRatingModal } from "@/hooks/use-rating-modal";
import { useSearchParams } from "next/navigation";

const RatingModalOpener = () => {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  const { onOpenChange } = useRatingModal();

  return (
    lessonId && (
      <Flex
        flexDirection={"row"}
        gap={"1"}
        alignItems={"center"}
        cursor={"pointer"}
        onClick={() => onOpenChange(true)}
      >
        <Text color={"yellow"}>Baholash</Text>
        <BiStar color={"yellow"} />
      </Flex>
    )
  );
};

export default RatingModalOpener;
